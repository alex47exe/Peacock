/*
 *     The Peacock Project - a HITMAN server replacement.
 *     Copyright (C) 2021-2025 The Peacock Project Team
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

import { AxiosError, AxiosResponse } from "axios"
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
import { getRemoteService } from "./utils"

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
