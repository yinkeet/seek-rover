import { levels } from '/levels/index.ts';
import { Metadata } from '../../lib/metadata.ts';
import { Direction, translationRingBuffer } from '/lib/direction.ts';
import { RotateAction } from '/lib/rover/rotate.action.ts';
import { assertEquals } from 'jsr:@std/assert';

Deno.test('Rotate action - right', () => {
    const metadata: Metadata = {
        x: 0,
        y: 0,
        direction: Direction.NORTH,
        translationOffset: translationRingBuffer.get(Direction.NORTH),
        levelData: levels['5-5-blank'],
    };
    const action = new RotateAction(metadata, 2);
    assertEquals(action.perform(undefined), true);
    assertEquals(metadata.x, 0);
    assertEquals(metadata.y, 0);
    assertEquals(metadata.direction, Direction.EAST);
    assertEquals(metadata.translationOffset, [1, 0]);

    assertEquals(action.perform(undefined), true);
    assertEquals(metadata.x, 0);
    assertEquals(metadata.y, 0);
    assertEquals(metadata.direction, Direction.SOUTH);
    assertEquals(metadata.translationOffset, [0, -1]);

    assertEquals(action.perform(undefined), true);
    assertEquals(metadata.x, 0);
    assertEquals(metadata.y, 0);
    assertEquals(metadata.direction, Direction.WEST);
    assertEquals(metadata.translationOffset, [-1, 0]);

    assertEquals(action.perform(undefined), true);
    assertEquals(metadata.x, 0);
    assertEquals(metadata.y, 0);
    assertEquals(metadata.direction, Direction.NORTH);
    assertEquals(metadata.translationOffset, [0, 1]);
});

Deno.test('Rotate action - left', () => {
    const metadata: Metadata = {
        x: 0,
        y: 0,
        direction: Direction.NORTH,
        translationOffset: translationRingBuffer.get(Direction.NORTH),
        levelData: levels['5-5-blank'],
    };
    const action = new RotateAction(metadata, -2);
    assertEquals(action.perform(undefined), true);
    assertEquals(metadata.x, 0);
    assertEquals(metadata.y, 0);
    assertEquals(metadata.direction, Direction.WEST);
    assertEquals(metadata.translationOffset, [-1, 0]);

    assertEquals(action.perform(undefined), true);
    assertEquals(metadata.x, 0);
    assertEquals(metadata.y, 0);
    assertEquals(metadata.direction, Direction.SOUTH);
    assertEquals(metadata.translationOffset, [0, -1]);

    assertEquals(action.perform(undefined), true);
    assertEquals(metadata.x, 0);
    assertEquals(metadata.y, 0);
    assertEquals(metadata.direction, Direction.EAST);
    assertEquals(metadata.translationOffset, [1, 0]);

    assertEquals(action.perform(undefined), true);
    assertEquals(metadata.x, 0);
    assertEquals(metadata.y, 0);
    assertEquals(metadata.direction, Direction.NORTH);
    assertEquals(metadata.translationOffset, [0, 1]);
});
