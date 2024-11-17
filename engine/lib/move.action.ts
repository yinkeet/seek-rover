import { Action } from './action.ts';
import { directionRingBuffer } from '/lib/direction.ts';
import { Metadata } from './metadata.ts';

export class MoveAction implements Action {
    constructor(public metadata: Metadata) {}

    perform(_args?: string[]): boolean {
        const tile =
            this.metadata.levelMap[`${this.metadata.x}-${this.metadata.y}`];
        const direction = directionRingBuffer.get(this.metadata.direction)[0];
        // Collision with wall
        if (tile.wall === direction) return false;
        this.metadata.x += this.metadata.translationOffset[0];
        this.metadata.y += this.metadata.translationOffset[1];
        return true;
    }
}
