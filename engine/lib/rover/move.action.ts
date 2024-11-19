import { Action } from './action.ts';
import { directionCollisionRingBuffer } from '/lib/direction.ts';
import { Metadata } from '/lib/metadata.ts';
import { clamp } from '/lib/utils.ts';

export class MoveAction implements Action {
    id = "MOVE"

    constructor(public metadata: Metadata) {}

    perform(_args?: string[]): boolean {
        const tile = this.metadata.levelData
            .map[`${this.metadata.x}-${this.metadata.y}`];
        const direction = directionCollisionRingBuffer.get(
            this.metadata.direction,
        );

        // Collision with wall
        if (tile.wall && direction) return true;

        // Translate the movement
        // Clamp to boundaries
        this.metadata.x = clamp(
            this.metadata.x + this.metadata.translationOffset[0],
            this.metadata.levelData.min.x,
            this.metadata.levelData.max.x,
        );
        this.metadata.y = clamp(
            this.metadata.y + this.metadata.translationOffset[1],
            this.metadata.levelData.min.y,
            this.metadata.levelData.max.y,
        );
        return true;
    }
}
