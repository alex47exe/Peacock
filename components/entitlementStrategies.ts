/*
 *     The Peacock Project - a HITMAN server replacement.
 *     Copyright (C) 2021-2026 The Peacock Project Team
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU Affero General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU Affero General Public License for more details.
 *
 *     You should have received a copy of the GNU Affero General Public License
 *     along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import axios, { AxiosError, AxiosResponse } from "axios"
import { log, LogLevel } from "./loggingInterop"
import { userAuths } from "./officialServerAuth"
import {
    H1_EPIC_ENTITLEMENTS,
    H1_STEAM_ENTITLEMENTS,	
    H2_STEAM_ENTITLEMENTS,
    H3_EPIC_ENTITLEMENTS,
    H3_STEAM_ENTITLEMENTS,
    ALL_ENTITLEMENTS,
    SCPC_ENTITLEMENTS,
} from "./platformEntitlements"
import { GameVersion } from "./types/types"
import {
    AppTicket,
    getRemoteService,
    parseAppTicket,
    PEACOCKVERSTRING,
} from "./utils"
import { getFlag } from "./flags"

// An in-memory cache of valid Steam ownership ticket hashes (they're valid for up to 21 days)
// For most users, this won't provide any benefit since they'll be restarting Peacock often,
// but this is more here for those running it 24/7 on a server somewhere.
const STEAM_TICKET_CACHE: Set<string> = new Set()

/**
 * The base class for an entitlement strategy.
 *
 * @internal
 */
abstract class EntitlementStrategy {
    abstract get(
        accessToken: string,
        userId: string,
    ): string[] | Promise<string[]>

    abstract get(
        clientToken: string,
        identity: string,
        steamId: string,
    ): string[] | Promise<string[]>
}

/**
 * Provider for HITMAN 3 on Epic Games Store.
 *
 * @internal
 */
export class EpicH3Strategy extends EntitlementStrategy {
    override get() {
        return ALL_ENTITLEMENTS
    }
}

/**
 * Provider for any Steam-based game using the ISteamUserAuth API.
 *
 * @internal
 */
type SteamAuthMethod = "OFFICIAL" | "BACKEND" | "STEAM" | "STEAM_STRICT"
type SteamAuthResult =
    | {
          success: true
          steamId: string
          entitlements: string[]
      }
    | {
          success: false
          code: number
          error: string
      }
type SteamAuthResponse = {
    response: {
        error?: {
            errorcode: number
            errordesc: string
        }
        params?: {
            result: string
            steamid: string
            ownersteamid: string
            vacbanned: boolean
            publisherbanned: boolean
        }
    }
}
type SteamAuthBackendResponse =
    | {
          success: true
          steam_id: string
          entitlements: string[]
      }
    | {
          success: false
          error: string
      }

export class SteamStrategy extends EntitlementStrategy {
    private readonly _apiKey: string = getFlag("steamApiKey") as SteamAuthMethod
    public readonly isValid: boolean = false

    constructor() {
        super()

        const method = getFlag("steamAuthenticationMethod") as SteamAuthMethod

        switch (method) {
            case "BACKEND": {
                const host = getFlag("leaderboardsHost") as string

                if (!host) {
                    log(
                        LogLevel.WARN,
                        "steamAuthenticationMethod is set to 'BACKEND' but 'leaderboardsHost' is null or empty - using official!",
                        "SteamStrategy",
                    )
                    break
                }

                this.isValid = true
                break
            }
            case "STEAM":
            case "STEAM_STRICT": {
                if (!this._apiKey) {
                    log(
                        LogLevel.WARN,
                        `steamAuthenticationMethod is set to '${method}' but 'steamApiKey' is null or empty${method !== "STEAM_STRICT" ? " - using official" : ""}!`,
                        "SteamStrategy",
                    )
                    break
                }

                this.isValid = true
                break
            }
            case "OFFICIAL":
                break
        }
    }

    private async _getFromBackend(
        clientToken: string,
        identity: string,
    ): Promise<SteamAuthResult> {
        try {
            const host = getFlag("leaderboardsHost") as string
            const resp = await axios.post(
                `${host}/peacock/steam/validate_ticket`,
                {
                    ticket: clientToken,
                    identity,
                },
                {
                    headers: {
                        "Peacock-Version": PEACOCKVERSTRING,
                    },
                    validateStatus: (status) =>
                        status === 400 || (status >= 200 && status < 300),
                },
            )

            if (resp.status !== 200 && resp.status !== 400) {
                return {
                    success: false,
                    code: resp.status,
                    error: `${resp.statusText}`,
                }
            }

            const data = resp.data as SteamAuthBackendResponse

            if (!data.success) {
                return {
                    success: false,
                    code: resp.status,
                    error: data.error,
                }
            }

            return {
                success: true,
                steamId: data.steam_id,
                entitlements: data.entitlements,
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                return {
                    success: false,
                    code: error.response?.status ?? 400,
                    error: `${error.response?.statusText}`,
                }
            } else {
                return {
                    success: false,
                    code: 400,
                    error: `${error}`,
                }
            }
        }
    }

    private async _getFromSteam(
        clientToken: string,
        ticket: AppTicket,
        identity: string,
    ): Promise<SteamAuthResult> {
        // We already check this before calling, but it's just for sanity.
        if (!ticket?.valid) {
            return {
                success: false,
                code: 400,
                error: "Invalid app ticket.",
            }
        }

        try {
            const resp = await axios(
                "https://api.steampowered.com/ISteamUserAuth/AuthenticateUserTicket/v1",
                {
                    params: {
                        key: this._apiKey,
                        appid: ticket.appId,
                        ticket: clientToken,
                        identity,
                    },
                },
            )

            if (resp.status !== 200) {
                return {
                    success: false,
                    code: resp.status,
                    error: `${resp.statusText}`,
                }
            }

            const data = resp.data as SteamAuthResponse

            if (data.response.error) {
                return {
                    success: false,
                    code: data.response.error.errorcode,
                    error: `${data.response.error.errordesc}`,
                }
            }

            if (data.response.params!.result !== "OK") {
                return {
                    success: false,
                    code: 200,
                    error: `${data.response.params!.result}`,
                }
            }

            ticket.dlc.unshift(ticket.appId)
            return {
                success: true,
                steamId: data.response.params!.steamid,
                entitlements: ticket.dlc,
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                return {
                    success: false,
                    code: error.response?.status ?? 400,
                    error: `${error.response?.statusText}`,
                }
            } else {
                return {
                    success: false,
                    code: 400,
                    error: `${error}`,
                }
            }
        }
    }

    // @ts-expect-error There are two functions we can overload
    override async get(
        clientToken: string,
        identity: string,
        steamId: string,
    ): Promise<string[]> {
        if (!this.isValid) return []

        const ticket = parseAppTicket(Buffer.from(clientToken, "hex"))

        if (!ticket?.valid) {
            log(LogLevel.WARN, "Invalid ticket.", "SteamStrategy")
            return []
        }

        if (STEAM_TICKET_CACHE.has(ticket.hash)) {
            ticket.dlc.unshift(ticket.appId)
            return ticket.dlc
        }

        const authMethod = getFlag(
            "steamAuthenticationMethod",
        ) as SteamAuthMethod
        const res = await (authMethod === "BACKEND"
            ? this._getFromBackend(clientToken, identity)
            : this._getFromSteam(clientToken, ticket, identity))

        if (!res.success) {
            log(
                LogLevel.WARN,
                `Failed to get entitlements from ${authMethod.split("_")[0]}. Code: ${res.code}, Error: ${res.error} `,
                "SteamStrategy",
            )
            return []
        }

        if (res.steamId !== steamId) {
            log(
                LogLevel.WARN,
                `Encountered mismatched SteamID when validating authentication token! Expected: ${steamId}, Got: ${res.steamId}`,
                "SteamStrategy",
            )
            return []
        }

        STEAM_TICKET_CACHE.add(ticket.hash)

        return res.entitlements
    }
}

/**
 * Provider for any game using the official servers.
 *
 * @internal
 */
export class IOIStrategy extends EntitlementStrategy {
    override get() {
        return ALL_ENTITLEMENTS
    }
}

/**
 * Provider for HITMAN 2016 on Epic Games.
 *
 * @internal
 */
export class EpicH1Strategy extends EntitlementStrategy {
    override get() {
        return ALL_ENTITLEMENTS
    }
}

/**
 * Provider for HITMAN: Sniper Challenge (Hawk) on Steam.
 *
 * @internal
 */
export class SteamScpcStrategy extends EntitlementStrategy {
    override get() {
        return SCPC_ENTITLEMENTS
    }
}

/**
 * Provider for HITMAN 2016 on Steam.
 *
 * @internal
 */
export class SteamH1Strategy extends EntitlementStrategy {
    override get() {
        return ALL_ENTITLEMENTS
    }
}

/**
 * Provider for HITMAN 2 on Steam.
 *
 * @internal
 */
export class SteamH2Strategy extends EntitlementStrategy {
    override get() {
        return ALL_ENTITLEMENTS
    }
}
