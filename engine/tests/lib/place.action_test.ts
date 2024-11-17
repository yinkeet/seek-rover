import { levels } from '/levels/index.ts';
import { Metadata } from '../../lib/metadata.ts';
import { Direction, translationRingBuffer } from '/lib/direction.ts';
import { PlaceAction } from '/lib/place.action.ts';
import { assertEquals } from 'jsr:@std/assert';

Deno.test('Place action with undefined arguments', () => {
    const action = new PlaceAction({
        x: -1,
        y: -1,
        direction: Direction.NORTH,
        translationOffset: translationRingBuffer.get(Direction.NORTH)[0],
        levelData: levels['5-5-blank'],
    });
    assertEquals(action.perform(undefined), false);
});

Deno.test('Place action with insufficient arguments', () => {
    const action = new PlaceAction({
        x: -1,
        y: -1,
        direction: Direction.NORTH,
        translationOffset: translationRingBuffer.get(Direction.NORTH)[0],
        levelData: levels['5-5-blank'],
    });
    assertEquals(action.perform(['a', '1']), false);
});

Deno.test('Place action with invalid x argument', () => {
    const action = new PlaceAction({
        x: -1,
        y: -1,
        direction: Direction.NORTH,
        translationOffset: translationRingBuffer.get(Direction.NORTH)[0],
        levelData: levels['5-5-blank'],
    });
    assertEquals(action.perform(['a', '1', 'NORTH']), false);
});

Deno.test('Place action with invalid y argument', () => {
    const action = new PlaceAction({
        x: -1,
        y: -1,
        direction: Direction.NORTH,
        translationOffset: translationRingBuffer.get(Direction.NORTH)[0],
        levelData: levels['5-5-blank'],
    });
    assertEquals(action.perform(['1', 'a', 'NORTH']), false);
});

Deno.test('Place action with invalid direction argument', () => {
    const action = new PlaceAction({
        x: -1,
        y: -1,
        direction: Direction.NORTH,
        translationOffset: translationRingBuffer.get(Direction.NORTH)[0],
        levelData: levels['5-5-blank'],
    });
    assertEquals(action.perform(['1', 'a', 'SOMETHING']), false);
});

Deno.test('Place action with valid arguments', () => {
    const metadata: Metadata = {
        x: -1,
        y: -1,
        direction: Direction.NORTH,
        translationOffset: translationRingBuffer.get(Direction.NORTH)[0],
        levelData: levels['5-5-blank'],
    };
    const action = new PlaceAction(metadata);
    assertEquals(action.perform(['1', '2', 'SOUTH']), true);
    assertEquals(metadata.x, 1);
    assertEquals(metadata.y, 2);
    assertEquals(metadata.direction, Direction.SOUTH);
    assertEquals(metadata.translationOffset, [0, -1]);
});
