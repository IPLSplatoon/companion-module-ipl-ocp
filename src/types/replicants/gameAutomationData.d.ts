/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface GameAutomationData {
	actionInProgress?: 'END_GAME' | 'START_GAME' | 'NONE';
	nextTaskForAction?: {
		name: string;
		index: number;
		executionTimeMillis: number;
	} | null;
}