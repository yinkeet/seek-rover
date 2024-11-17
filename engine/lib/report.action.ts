import { Action } from './action.ts';
import { Direction } from '/lib/direction.ts';
import { Metadata } from './metadata.ts';

export class ReportAction implements Action {
    constructor(public metadata: Metadata, public angularStep: number) {}

    perform(_args?: string[]): boolean {
        const directionName = Direction[this.metadata.direction];
        console.log(`${this.metadata.x},${this.metadata.y},${directionName}`)
        return true;
    }
}
