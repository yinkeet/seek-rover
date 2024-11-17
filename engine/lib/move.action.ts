import { Action } from './action.ts';
import { directionRingBuffer } from '/lib/direction.ts';
import { Metadata } from './metadata.ts';
import { clamp } from '/lib/utils.ts';

export class MoveAction implements Action {
    constructor(public metadata: Metadata) {}

    perform(_args?: string[]): boolean {
        const tile =
            this.metadata.levelData.map[`${this.metadata.x}-${this.metadata.y}`];
        const direction = directionRingBuffer.get(this.metadata.direction)[0];
        
        // Collision with wall
        if (tile.wall && direction) return true;

        // Translate the movement
        // Clamp to boundaries
        this.metadata.x = clamp(this.metadata.x + this.metadata.translationOffset[0], 0 , this.metadata.levelData.width);
        this.metadata.y = clamp(this.metadata.y + this.metadata.translationOffset[1], 0 , this.metadata.levelData.height);
        return true;
    }
}
