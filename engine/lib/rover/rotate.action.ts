import { Action } from './action.ts';
import { directionRingBuffer, translationRingBuffer } from '/lib/direction.ts';
import { Metadata } from '/lib/metadata.ts';

export class RotateAction implements Action {
    constructor(public metadata: Metadata, public angularStep: number) {}

    perform(_args?: string[]): boolean {
        // Get current index on ring buffer
        const currentIndex = this.metadata.direction;

        // New direction
        this.metadata.direction = directionRingBuffer.get(
            currentIndex + this.angularStep,
        );

        // Get new translation offset by moving the index by -2 on the ring buffer
        this.metadata.translationOffset = translationRingBuffer.get(
            currentIndex + this.angularStep,
        );
        return true;
    }
}
