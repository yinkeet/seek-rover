import { Action } from './action.ts';
import { Metadata } from './metadata.ts';
import { Direction, translationRingBuffer } from './direction.ts';
import { z } from 'npm:zod';

export class PlaceAction implements Action {
    constructor(public metadata: Metadata) {}

    perform(args?: string[]): boolean {
        if (args === undefined) return false;
        if (args.length != 3) return false;

        args[2] = args[2].toUpperCase();

        const numberSchema = z.coerce.number().nonnegative()
        const directionSchema = z.enum(['NORTH', 'SOUTH', 'EAST', 'WEST'])

        try {
            numberSchema.parse(args[0]);
            numberSchema.parse(args[1]);
            directionSchema.parse(args[2]);
        } catch(_error) {
            return false;
        }

        this.metadata.x = parseInt(args[0])
        this.metadata.y = parseInt(args[1])
        const direction = Direction[args[2] as keyof typeof Direction];
        this.metadata.direction = direction;
        this.metadata.translationOffset = translationRingBuffer.get(direction);
        return true;
    }
}
