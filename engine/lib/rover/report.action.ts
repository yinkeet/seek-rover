import { Action } from './action.ts';
import { Direction } from '/lib/direction.ts';
import { Metadata } from '/lib/metadata.ts';

export class ReportAction implements Action {
    id = "REPORT"

    constructor(public metadata: Metadata) {}

    perform(_args?: string[]): boolean {
        const directionName = Direction[this.metadata.direction];
        console.log(`Output: ${this.metadata.x},${this.metadata.y},${directionName}`)
        return true;
    }
}
