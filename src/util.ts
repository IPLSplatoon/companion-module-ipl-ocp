import {
	ActiveRound,
	ScoreboardData,
	SwapColorsInternally,
	ActiveBreakScene,
	MusicShown,
	NextRoundStartTime,
	NextRound,
	ObsState,
	ObsConfig,
	GameAutomationData,
	LocaleInfo,
} from './types'
import { BundleDeclaredConfig } from './types/replicants/bundleDeclaredConfig'
import { RuntimeConfig } from './types/replicants/runtimeConfig'
import { NodeCGConnector } from './NodeCGConnector'
import { DropdownChoice } from '@companion-module/base'

/**
 * returns if an object is empty
 * @param obj Object to check
 * @return {boolean}
 */
export function isEmpty(obj: {} | undefined) {
	return obj != null && Object.keys(obj).length === 0
}

export function isBlank(value?: string | null): boolean {
	return value === null || value === undefined || value.trim() === ''
}

export function getBreakSceneChoices(socket: NodeCGConnector<IPLOCBundleMap>): DropdownChoice[] {
	return [
		{ id: 'main', label: 'Main' },
		{ id: 'teams', label: 'Teams' },
		{ id: 'stages', label: 'Stages' },
		...(socket.replicants[DASHBOARD_BUNDLE_NAME]['runtimeConfig']?.activeGraphicsBundles ?? []).flatMap(
			(activeBundle) => {
				const declaredConfig = socket.replicants[DASHBOARD_BUNDLE_NAME]['bundleDeclaredConfig']?.[activeBundle]
				if (declaredConfig != null && declaredConfig.scenes != null) {
					return declaredConfig.scenes.map((scene) => ({
						id: scene.value,
						label: `${scene.names?.EN ?? scene.value} (${activeBundle})`,
					}))
				}
				return []
			}
		),
	]
}

export const DASHBOARD_BUNDLE_NAME = 'ipl-overlay-controls'
export const UNKNOWN_STAGE_NAME = 'Unknown Stage'
export const UNKNOWN_MODE_NAME = 'Unknown Mode'

export type IPLOCBundleMap = {
	[DASHBOARD_BUNDLE_NAME]: IPLOCReplicantMap
}

export interface IPLOCReplicantMap {
	activeRound?: ActiveRound
	scoreboardData?: ScoreboardData
	swapColorsInternally?: SwapColorsInternally
	activeBreakScene?: ActiveBreakScene
	musicShown?: MusicShown
	nextRoundStartTime?: NextRoundStartTime
	nextRound?: NextRound
	obsState?: ObsState
	obsConfig?: ObsConfig
	gameAutomationData?: GameAutomationData
	localeInfo?: LocaleInfo
	bundleDeclaredConfig?: BundleDeclaredConfig
	runtimeConfig?: RuntimeConfig
}
