import { Action } from '/lib/rover/action.ts';
import { Metadata } from '/lib/metadata.ts';
import { PlaceAction } from '/lib/rover/place.action.ts';
import { MoveAction } from '/lib/rover/move.action.ts';
import { RotateAction } from '/lib/rover/rotate.action.ts';
import { ReportAction } from '/lib/rover/report.action.ts';
import * as Constants from '/lib/rover/constants.ts';

export * from '/lib/rover/action.ts';
export * from '/lib/rover/constants.ts';
export * from '/lib/rover/place.action.ts';
export * from '/lib/rover/move.action.ts';
export * from '/lib/rover/rotate.action.ts';
export * from '/lib/rover/report.action.ts';

export const useActions = (
    metadata: Metadata,
    angularStep: number,
): { [id: string]: Action } => {
    return {
        [Constants.ACTION_ID_PLACE]: new PlaceAction(metadata),
        [Constants.ACTION_ID_MOVE]: new MoveAction(metadata),
        [Constants.ACTION_ID_LEFT]: new RotateAction(metadata, -angularStep),
        [Constants.ACTION_ID_RIGHT]: new RotateAction(metadata, angularStep),
        [Constants.ACTION_ID_REPORT]: new ReportAction(metadata),
    };
};
