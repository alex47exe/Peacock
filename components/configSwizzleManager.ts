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

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import Roadmap from "../static/Roadmap.json"
import StoreData from "../static/StoreData.json"
import FilterData from "../static/FilterData.json"
import LocationsData from "../static/LocationsData.json"
import GameChangerProperties from "../static/GameChangerProperties.json"
import allunlockables from "../static/allunlockables.json"
import ServerVersionConfig from "../static/ServerVersionConfig.json"
import OnlineConfig from "../static/OnlineConfig.json"
import PrivacyPolicy from "../static/PrivacyPolicy.json"
import UserDefault from "../static/UserDefault.json"
import AgencyPickups from "../static/AgencyPickups.json"
import Entrances from "../static/Entrances.json"
import LeaderboardEntriesTemplate from "../static/LeaderboardEntriesTemplate.json"
import LeaderboardsViewTemplate from "../static/LeaderboardsViewTemplate.json"
import MissionEndReadyTemplate from "../static/MissionEndReadyTemplate.json"
import MissionEndNotReadyTemplate from "../static/MissionEndNotReadyTemplate.json"
import SelectAgencyPickupTemplate from "../static/SelectAgencyPickupTemplate.json"
import SelectEntranceTemplate from "../static/SelectEntranceTemplate.json"
import StashpointTemplate from "../static/StashpointTemplate.json"
import LoadMenuTemplate from "../static/LoadMenuTemplate.json"
import SaveMenuTemplate from "../static/SaveMenuTemplate.json"
import Playstyles from "../static/Playstyles.json"
import HubPageData from "../static/HubPageData.json"
import DashboardCategoryEscalation from "../static/DashboardCategoryEscalation.json"
import GlobalChallenges from "../static/GlobalChallenges.json"
import ContractsTemplate from "../static/ContractsTemplate.json"
import CreateContractPlanningTemplate from "../static/CreateContractPlanningTemplate.json"
import CreateContractReturnTemplate from "../static/CreateContractReturnTemplate.json"
import PlayerProfilePage from "../static/PlayerProfileView.json"
import Legacyallunlockables from "../static/Legacyallunlockables.json"
import LegacyGlobalChallenges from "../static/LegacyGlobalChallenges.json"
import LegacySafehouseTemplate from "../static/LegacySafehouseTemplate.json"
import LegacyHubTemplate from "../static/LegacyHubTemplate.json"
import LegacyPlanningTemplate from "../static/LegacyPlanningTemplate.json"
import LegacySelectAgencyPickupTemplate from "../static/LegacySelectAgencyPickupTemplate.json"
import LegacySelectEntranceTemplate from "../static/LegacySelectEntranceTemplate.json"
import LegacyStashpointTemplate from "../static/LegacyStashpointTemplate.json"
import LegacyUserDefault from "../static/LegacyUserDefault.json"
import LegacyContractSearchResponseTemplate from "../static/LegacyContractSearchResponseTemplate.json"
import LegacyFilterData from "../static/LegacyFilterData.json"
import PlayNextTemplate from "../static/PlayNextTemplate.json"
import LookupContractByIdTemplate from "../static/LookupContractByIdTemplate.json"
import LookupContractFavoriteTemplate from "../static/LookupContractFavoriteTemplate.json"
import MissionStories from "../static/MissionStories.json"
import DebriefingLeaderboardsTemplate from "../static/DebriefingLeaderboardsTemplate.json"
import LegacyHitsCategoryTemplate from "../static/LegacyHitsCategoryTemplate.json"
import LegacyStoreData from "../static/LegacyStoreData.json"
import LegacyDestinationTemplate from "../static/LegacyDestinationTemplate.json"
import LegacyLocationsData from "../static/LegacyLocationsData.json"
import LegacySaveMenuTemplate from "../static/LegacySaveMenuTemplate.json"
import LegacyLoadMenuTemplate from "../static/LegacyLoadMenuTemplate.json"
import LegacyLookupContractByIdTemplate from "../static/LegacyLookupContractByIdTemplate.json"
import EiderDashboard from "../static/EiderDashboard.json"
import H2allunlockables from "../static/H2allunlockables.json"
import H2DestinationsData from "../static/H2DestinationsData.json"
import H2StoreData from "../static/H2StoreData.json"
import H2ContractSearchResponseTemplate from "../static/H2ContractSearchResponseTemplate.json"
import H2LocationsData from "../static/H2LocationsData.json"
import H2FilterData from "../static/H2FilterData.json"
import H2DashboardTemplate from "../static/H2DashboardTemplate.json"
import H2LookupContractTemplate from "../static/H2LookupContractTemplate.json"
import Videos from "../static/Videos.json"
import ChallengeLocationTemplate from "../static/ChallengeLocationTemplate.json"
import H2ChallengeLocationTemplate from "../static/H2ChallengeLocationTemplate.json"
import H2CareerTemplate from "../static/H2CareerTemplate.json"
import H2SniperContentTemplate from "../static/H2SniperContentTemplate.json"
import LegacyChallengeLocationTemplate from "../static/LegacyChallengeLocationTemplate.json"
import ReportTemplate from "../static/ReportTemplate.json"
import ContractSearchPageTemplate from "../static/ContractSearchPageTemplate.json"
import ContractSearchPaginateTemplate from "../static/ContractSearchPaginateTemplate.json"
import ContractSearchResponseTemplate from "../static/ContractSearchResponseTemplate.json"
import LegacyDebriefingChallengesTemplate from "../static/LegacyDebriefingChallengesTemplate.json"
import DebriefingChallengesTemplate from "../static/DebriefingChallengesTemplate.json"
import MasteryUnlockablesTemplate from "../static/MasteryUnlockablesTemplate.json"
import DiscordRichAssetsForBricks from "../static/DiscordRichAssetsForBricks.json"
import EscalationCodenames from "../static/EscalationCodenames.json"
import ScoreOverviewTemplate from "../static/ScoreOverviewTemplate.json"
import PeacockGameChangerProperties from "../static/PeacockGameChangerProperties.json"
import MultiplayerPresets from "../static/MultiplayerPresets.json"
import LobbySlimTemplate from "../static/LobbySlimTemplate.json"
import MasteryDataForLocationTemplate from "../static/MasteryDataForLocationTemplate.json"
import LegacyMasteryLocationTemplate from "../static/LegacyMasteryLocationTemplate.json"
import DefaultCpdConfigs from "../static/DefaultCpdConfigs.json"
import EvergreenGameChangerProperties from "../static/EvergreenGameChangerProperties.json"
import AreaMap from "../static/AreaMap.json"
import ArcadePageTemplate from "../static/ArcadePageTemplate.json"
import HitsCategoryElusiveTemplate from "../static/HitsCategoryElusiveTemplate.json"
import HitsCategoryContractAttackTemplate from "../static/HitsCategoryContractAttackTemplate.json"
import MissionRewardsTemplate from "../static/MissionRewardsTemplate.json"
import SniperUnlockables from "../static/SniperUnlockables.json"
import VersusUnlockables from "../static/VersusUnlockables.json"
import LegacyStatisticsTemplate from "../static/LegacyStatisticsTemplate.json"
import DynresModal from "../static/DynresModal.json"
import type { GameVersion } from "./types/types"
import { fastClone } from "./utils"

/**
 * All the configurations. Gets modified before being exported.
 *
 * @private
 */
const configs = {
    Roadmap,
    StoreData,
    FilterData,
    LocationsData,
    LeaderboardsViewTemplate,
    LeaderboardEntriesTemplate,
    GameChangerProperties,
    allunlockables,
    ServerVersionConfig,
    OnlineConfig,
    PrivacyPolicy,
    UserDefault,
    AgencyPickups,
    Entrances,
    MissionEndReadyTemplate,
    MissionEndNotReadyTemplate,
    SelectAgencyPickupTemplate,
    SelectEntranceTemplate,
    StashpointTemplate,
    LoadMenuTemplate,
    SaveMenuTemplate,
    Playstyles,
    HubPageData,
    DashboardCategoryEscalation,
    GlobalChallenges,
    ContractsTemplate,
    CreateContractPlanningTemplate,
    CreateContractReturnTemplate,
    PlayerProfilePage,
    Legacyallunlockables,
    LegacyGlobalChallenges,
    LegacySafehouseTemplate,
    LegacyHubTemplate,
    LegacyPlanningTemplate,
    LegacySelectAgencyPickupTemplate,
    LegacySelectEntranceTemplate,
    LegacyStashpointTemplate,
    LegacyUserDefault,
    LegacyFilterData,
    PlayNextTemplate,
    LookupContractByIdTemplate,
    LookupContractFavoriteTemplate,
    MissionStories,
    DebriefingLeaderboardsTemplate,
    LegacyHitsCategoryTemplate,
    LegacyStoreData,
    LegacyDestinationTemplate,
    LegacyLocationsData,
    LegacySaveMenuTemplate,
    LegacyLoadMenuTemplate,
    LegacyContractSearchResponseTemplate,
    LegacyDebriefingChallengesTemplate,
    DebriefingChallengesTemplate,
    LegacyLookupContractByIdTemplate,
    EiderDashboard,
    H2allunlockables,
    H2DestinationsData,
    H2StoreData,
    H2ContractSearchResponseTemplate,
    H2LocationsData,
    H2LookupContractByIdTemplate: H2LookupContractTemplate,
    H2LookupContractFavoriteTemplate: H2LookupContractTemplate,
    H2FilterData,
    H2CareerTemplate,
    H2DashboardTemplate,
    H2SniperContentTemplate,
    Videos,
    ChallengeLocationTemplate,
    H2ChallengeLocationTemplate,
    LegacyChallengeLocationTemplate,
    ReportTemplate,
    ContractSearchPageTemplate,
    ContractSearchPaginateTemplate,
    ContractSearchResponseTemplate,
    MasteryUnlockablesTemplate,
    DiscordRichAssetsForBricks,
    EscalationCodenames,
    ScoreOverviewTemplate,
    PeacockGameChangerProperties,
    MultiplayerPresets,
    LobbySlimTemplate,
    MasteryDataForLocationTemplate,
    LegacyMasteryLocationTemplate,
    DefaultCpdConfigs,
    EvergreenGameChangerProperties,
    AreaMap,
    ArcadePageTemplate,
    HitsCategoryElusiveTemplate,
    HitsCategoryContractAttackTemplate,
    MissionRewardsTemplate,
    SniperUnlockables,
    VersusUnlockables,
    LegacyStatisticsTemplate,
    DynresModal,
}

Object.keys(configs).forEach((cfg) => {
    // Parse the string into an object
    configs[cfg] = JSON.parse(configs[cfg])
})

export { configs }

/**
 * Get a config file.
 * Configs for H1 start with "Legacy", "H2" for HITMAN 2, and no prefix for HITMAN 3.
 *
 * @param config The name of the config file.
 * @param clone If the value should be cloned (saves memory if false, but as a side effect, modifications will affect the actual config).
 * @returns The config.
 * @throws {Error} If the config file specified doesn't exist.
 */
export function getConfig<T = unknown>(
    config: keyof typeof configs,
    clone: boolean,
): T {
    if (configs.hasOwnProperty.call(configs, config)) {
        if (!clone) {
            return configs[config]
        }

        // properly create object clones
        // this could be better, but this is the best temporary solution
        return fastClone(configs[config])
    }

    throw new Error(`Tried to lookup config that does not exist: ${config}`)
}

/**
 * Get a config file intended for the specified game version.
 *
 * @param config The name of the config file.
 * @param gameVersion The game's version ("h1", "h2", or "h3").
 * @param clone If the config should be cloned (saves memory if false, but as a side effect, modifications will affect the actual config).
 * @returns The config.
 * @see getConfig
 * @throws {Error} If the config file specified doesn't exist.
 */
export function getVersionedConfig<T = unknown>(
    config: string,
    gameVersion: GameVersion,
    clone: boolean,
): T {
    let h1Prefix = ""

    if (
        // is this scpc, do we have a scpc config?
        gameVersion === "scpc" &&
        Object.hasOwn(configs, `Scpc${config}`)
    ) {
        h1Prefix = "Scpc"
    } else {
        // no scpc config, fall back to legacy
        if (["scpc", "h1"].includes(gameVersion)) {
            h1Prefix = "Legacy"
        }
    }

    // if this is H2, but we don't have a h2 specific config, fall back to h3
    if (gameVersion === "h2" && !configs[`H2${config}`]) {
        return getConfig(config, clone)
    }

    return getConfig(
        `${h1Prefix}${gameVersion === "h2" ? "H2" : ""}${config}`,
        clone,
    )
}
