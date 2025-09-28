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

import type { Response } from "express"
import axios, { AxiosError } from "axios"
import type { NamespaceEntitlementEpic, RequestWithJwt } from "./types/types"
import { getUserData } from "./databaseHandler"
import { log, LogLevel } from "./loggingInterop"

export const H1_EPIC_ENTITLEMENTS = [
    "0a73eaedcac84bd28b567dbec764c5cb", // Hitman 1 Standard Edition 
    "81aecb49a60b47478e61e1cbd68d63c5", // Hitman 1 GOTY upgrade
]

export const H1_STEAM_ENTITLEMENTS = [
    "737780", // HITMAN - GOTY Suit Pack (HITMAN - GOTY Outfit Bundle)
    "725353", // HITMAN - Bonus Campaign Patient Zero
    "725352", // HITMAN - GOTY Cowboy Suit
    "725351", // HITMAN - GOTY Raven Suit
    "725350", // HITMAN - GOTY Clown Suit
    "664270", // HITMAN - Japanese V/O Pack
    "588780", // HITMAN - Digital Bonus Content
    "588660", // HITMAN - Blood Money Requiem Pack
    "505201", // HITMAN - Intro Pack
    "505200", // HITMAN - FULL EXPERIENCE Upgrade
    "505180", // HITMAN - FULL EXPERIENCE
    "440972", // HITMAN - White Rubber Duck Explosive
    "440971", // HITMAN - Silenced ICA-19 Chrome Pistol
    "440970", // HITMAN - Requiem Legacy Suit
    "440962", // HITMAN: Episode 6 - Hokkaido
    "440961", // HITMAN: Episode 5 - Colorado
    "440960", // HITMAN: Episode 4 - Bangkok
    "440940", // HITMAN: Bonus Episode
    "440930", // HITMAN: Episode 3 - Marrakesh
    "439890", // HITMAN: Episode 2 - Sapienza
    "439870", // HITMAN: Episode 1 - Paris
]

export const H3_EPIC_ENTITLEMENTS = [
    // DUBAI:
    "06d4d61bbb774ca99c1661bee04fbde0",
    // DARTMOOR:
    "2e4ad3e9aa9b4dcfa709b3f3b44cbf94",
    // BERLIN:
    "a9b1afdd05584441aeec75ba230b2e54",
    // CHONGQING:
    "66246e4364134f4689da72e9c6731687",
    // MENDOZA:
    "4216cdf59dbc4f19af227be076520202",
    // CARPATHIANMOUNTAINS:
    "8a690003855745e884d5040c6bc9ede8",
    // H3DELUXE:
    "bc610b36c75442299edcbe99f6f0fb60",
    // H3TRINITY:
    "5d06a6c6af9b4875b3530d5328f61287",
    // H1STANDARD:
    "0b59243cb8aa420691b66be1ecbe68c0",
    // H1GOTY:
    "894d1e6771044f48a8fdde934b8e443a",
    // H1REQUIEM:
    "e698e1a4b63947b0bc9349a5ae2dc015",
    // H3PASSH2:
    "391d08a543dc43a083eb50246916a291",
    // H3PASSH2EXPANSION:
    "afa4b921503f43339c360d4b53910791",
    // H2EXECUTIVE:
    "6408de14f7dc46b9a33adcf6cbc4d159",
    // EIDERGOLDEDITIONAUDIENCE:
    "b4e2e682cecd42b3a7017ee4838b4593",
    // H3PREPURCHASE1:
    "1dea1e39a8044a69b4020845afb4bd97",
    // H3PREPURCHASE2:
    "feeac4b521734f22ae99e8ac55a5f896",
    // SINGREED:
    "0e8632b4cdfb415e94291d97d727b98d",
    // SINPRIDE:
    "3f9adc216dde44dda5e829f11740a0a2",
    // SINSLOTH:
    "aece009ff59441c0b526f8aa69e24cfb",
    // SINLUST:
    "dfe5aeb89976450ba1e0e2c208b63d33",
    // SINGLUTTONY:
    "30107bff80024d1ab291f9cd3bac9fac",
    // SINENVY:
    "9e936ed2507a473db6f53ad24d2da587",
    // SINWRATH:
    "0403062df0d347619c8dcf043c65c02e",
    // WOASTANDARD:
    "a3509775467d4d6a8a7adffe518dc204",
    // WOADELUXE:
    "84a1a6fda4fb48afbb78ee9b2addd475",
    // MAKESHIFT:
    "08d2bc4d20754191b6c488541d2b4fa1",
    // CONCRETEART:
    "a1e9a63fa4f3425aa66b9b8fa3c9cc35",
    // THESARAJEVOSIX:
    "28455871cd0d4ffab52f557cc012ea5e",
    // SAMBUCA:
    "9220c020262f420da06eb46a4b1ce86f",
    // PENICILLIN:
    "6cdf07da030d4f66acd50eaf3cd234c7",
    // TOMORROWLAND:
    "f04198e0ffcf49079b5ec77bb6b66891",
    // LAMBIC:
    "70a9afcc8de84b6ab0f2b45b2018559b",
    // FRENCHMARTINI:
    "256eeeb3d8044aa1840e1606d268e0b2",
    // BAIJU:
    "04cb1b3e5b424308be25236f6bc1b2fb",
]

export const H3_STEAM_ENTITLEMENTS = [
    "3957470", // HITMAN 3 - The Bruce Lee Pack
    "3711140", // HITMAN 3 - The Banker Pack
    "3254350", // HITMAN 3 - The Splitter Pack
    "3110360", // HITMAN 3 - The Drop Pack
    "2973650", // HITMAN 3 - The Disruptor Pack
    "2828470", // HITMAN 3 - The Undying Pack
    "2475260", // HITMAN 3 - Sarajevo Six Campaign Pack
    "2184791", // HITMAN 3 - Makeshift Pack
    "2184790", // HITMAN 3 - Street Art Pack
    "1843460", // HITMAN 3 Access Pass: HITMAN 1 GOTY Edition
    "1829605", // HITMAN 3 - Dubai
    "1829604", // HITMAN 3 - Dartmoor
    "1829603", // HITMAN 3 - Berlin
    "1829602", // HITMAN 3 - Chongqing
    "1829601", // HITMAN 3 - Mendoza
    "1829600", // HITMAN 3 - Carpathian Mountains
    "1829596", // HITMAN 3 - Trinity Pack
    "1829595", // HITMAN 3 Access Pass: HITMAN 1 GOTY Upgrade
    "1829594", // HITMAN 3 - VR Access
    "1829593", // HITMAN 3 Access Pass: HITMAN 1 Complete First Season
    "1829592", // HITMAN 3 Access Pass: HITMAN 2 Standard
    "1829591", // HITMAN 3 - Deluxe Pack
    "1829590", // HITMAN 3 Access Pass: HITMAN 2 Expansion
    "1829587", // HITMAN 3 - Seven Deadly Sins Collection
    "1829586", // HITMAN 3 - Seven Deadly Sins Act 7: Wrath
    "1829585", // HITMAN 3 - Seven Deadly Sins Act 6: Envy
    "1829584", // HITMAN 3 - Seven Deadly Sins Act 5: Gluttony
    "1829583", // HITMAN 3 - Seven Deadly Sins Act 4: Lust
    "1829582", // HITMAN 3 - Seven Deadly Sins Act 3: Sloth
    "1829581", // HITMAN 3 - Seven Deadly Sins Act 2: Pride
    "1829580", // HITMAN 3 - Seven Deadly Sins Act 1: Greed
]

export const H2_STEAM_ENTITLEMENTS = [
    "1131050", // HITMAN 2 - Silver to Gold Upgrade
    "1083220", // HITMAN 2 - Miami Bundle
    "960832", // HITMAN 2 - GOTY Legacy Pack Upgrade
    "960831", // HITMAN 2 - GOTY Legacy Pack
    "957735", // HITMAN 2 - Siberia
    "957733", // HITMAN 2 - Hantu Port
    "957731", // HITMAN 2 - Haven Island
    "957730", // HITMAN 2 - New York
    "957698", // HITMAN 2 - Collector's Pack
    "957697", // HITMAN 2 - Executive Pack
    "957696", // HITMAN 2 - Special Assignments Pack 2
    "957695", // HITMAN 2 - Special Assignments Pack 1
    "957694", // HITMAN 2 - Smart Casual Pack
    "957693", // HITMAN 2 - Winter Sports Pack
    "957690", // HITMAN 2 - Expansion Pass
    "953096", // HITMAN 2 - Requiem Legacy Suit
    "953095", // HITMAN 2 - Silenced ICA-19 Chrome Pistol
    "953094", // HITMAN 2 - White Rubber Duck Explosive
    "953093", // HITMAN 2 - GOTY Clown Suit
    "953092", // HITMAN 2 - GOTY Raven Suit
    "953091", // HITMAN 2 - GOTY Cowboy Suit
    "953090", // HITMAN 2 - Bonus Campaign Patient Zero
    "950562", // HITMAN 2 - Himmelstein
    "950561", // HITMAN 2 - Isle of Sgàil
    "950560", // HITMAN 2 - Whittleton Creek
    "950559", // HITMAN 2 - Mumbai
    "950558", // HITMAN 2 - Santa Fortuna
    "950557", // HITMAN 2 - Miami
    "950556", // HITMAN 2 - Hawke's Bay
    "950555", // HITMAN - Legacy: Hokkaido
    "950554", // HITMAN - Legacy: Colorado
    "950553", // HITMAN - Legacy: Bangkok
    "950552", // HITMAN - Legacy: Bonus Missions
    "950551", // HITMAN - Legacy: Marrakesh
    "950550", // HITMAN - Legacy: Sapienza
    "950540", // HITMAN - Legacy: Paris
]

export const STEAM_NAMESPACE_2016 = "236870"
export const EPIC_NAMESPACE_2016 = "3c06b15a8a2845c0b725d4f952fe00aa"
export const STEAM_NAMESPACE_SCPC = "783781"
export const STEAM_NAMESPACE_2018 = "863550"
export const EPIC_NAMESPACE_2021 = "ed55aa5edc5941de92fd7f64de415793"
export const STEAM_NAMESPACE_2021 = "1659040"

export const ALL_ENTITLEMENTS = [STEAM_NAMESPACE_2016, EPIC_NAMESPACE_2016, STEAM_NAMESPACE_SCPC, STEAM_NAMESPACE_2018, EPIC_NAMESPACE_2021, STEAM_NAMESPACE_2021].concat(H1_EPIC_ENTITLEMENTS).concat(H1_STEAM_ENTITLEMENTS).concat(H2_STEAM_ENTITLEMENTS).concat(H3_EPIC_ENTITLEMENTS).concat(H3_STEAM_ENTITLEMENTS)

export const SCPC_ENTITLEMENTS = [STEAM_NAMESPACE_2016, "783781"]

export function getPlatformEntitlements(
    req: RequestWithJwt,
    res: Response,
): void {
    log(LogLevel.DEBUG, `Platform issuer: ${req.body.issuerId}`)

    const exts = getUserData(req.jwt.unique_name, req.gameVersion).Extensions
        .entP

    res.json(exts)
}

/**
 * Gets a user's entitlements through Epic.
 *
 * @param namespace The Epic namespace.
 * @param epicUid The user's Epic ID.
 * @param epicAuth The user's Epic authentication token.
 * @see https://dev.epicgames.com/docs/services/en-US/WebAPIRef/EcomWebAPI/index.html
 * @returns A string array with the user's entitlements, or an empty array if failed to acquire entitlements.
 */
export async function getEpicEntitlements(
    namespace: string,
    epicUid: string,
    epicAuth: string,
): Promise<string[]> {
    async function getEnts(
        ents: string[],
    ): Promise<NamespaceEntitlementEpic[]> {
        const v: { headers: Record<string, string> } = {
            headers: {},
        }

        v.headers["Authorization"] = `bearer ${epicAuth}`

        const url = `https://api.epicgames.dev/epic/ecom/v1/platforms/EPIC/identities/${epicUid}/ownership?nsCatalogItemId=${ents
            .map((e) => `${namespace}:${e}`)
            .join(`&nsCatalogItemId=`)}`

        let result: NamespaceEntitlementEpic[] = []

        try {
            result = (await axios(url, v)).data as NamespaceEntitlementEpic[]
        } catch (error) {
            if (error instanceof AxiosError) {
                log(
                    LogLevel.ERROR,
                    `Failed to get entitlements from Epic: got ${error.response?.status} ${error.response?.statusText}.`,
                )
            } else {
                log(
                    LogLevel.ERROR,
                    `Failed to get entitlements from Epic: ${JSON.stringify(
                        error,
                    )}.`,
                )
            }
        }

        return result
    }

    const actuallyOwned = new Set<string>()
    const res = await getEnts(H3_EPIC_ENTITLEMENTS)

    if (res) {
        for (const ent of res) {
            if (ent.owned) {
                actuallyOwned.add(ent.itemId)
            }
        }
    }

    return Array.from(actuallyOwned)
}
