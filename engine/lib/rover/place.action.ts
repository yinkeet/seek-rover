import { Action } from './action.ts';
import { Metadata } from '/lib/metadata.ts';
import { Direction, translationRingBuffer } from '/lib/direction.ts';
import { z, ZodError, ZodIssue } from 'npm:zod';

export class PlaceAction implements Action {
    id = "PLACE"

    constructor(public metadata: Metadata) {}

    perform(args?: string[]): boolean {
        if (args === undefined || args.length != 3) {
            console.error('Error: X, Y and direction required')
            return false;
        }

        const schema = z.tuple([
            // Validation for x
            z.coerce.number({
                errorMap: () => ( { message: `Error: X must be an integer between ${this.metadata.levelData.min.x} and ${this.metadata.levelData.max.x}` } )
            }).min(this.metadata.levelData.min.x).max(this.metadata.levelData.max.x),
            // Validation for y
            z.coerce.number({
                errorMap: () => ( { message: `Error: Y must be an integer between ${this.metadata.levelData.min.y} and ${this.metadata.levelData.max.y}` } )
            }).min(this.metadata.levelData.min.y).max(this.metadata.levelData.max.y),
            // Validation for direction
            z.enum(['NORTH', 'SOUTH', 'EAST', 'WEST'], {
                message: "Error: Supported directions are ['NORTH', 'SOUTH', 'EAST', 'WEST']"
            }),
        ]);

        const result = schema.safeParse(args)
        if (!result.success) {
            result.error.issues.forEach((issue) => {
                console.error(issue.message)        
            })
            return false;
        }

        this.metadata.x = result.data[0];
        this.metadata.y = result.data[1];
        // Change direction name back to enum direction value
        const direction = Direction[result.data[2] as keyof typeof Direction];
        this.metadata.direction = direction;
        // Change the translaction offset according to the direction
        this.metadata.translationOffset = translationRingBuffer.get(direction);
        return true;
    }
}
