import { levels } from '/levels/index.ts';
import { Metadata } from '../../lib/metadata.ts';
import { Direction, translationRingBuffer } from '/lib/direction.ts';
import { PlaceAction } from '/lib/rover/place.action.ts';
import { assertEquals } from 'jsr:@std/assert';
import { assertSpyCall, spy } from 'jsr:@std/testing/mock';

Deno.test('Place action with undefined arguments', () => {
    const action = new PlaceAction({
        x: -1,
        y: -1,
        direction: Direction.NORTH,
        translationOffset: translationRingBuffer.get(Direction.NORTH),
        levelData: levels['5-5-blank'],
    });
    assertEquals(action.perform(undefined), false);
});

Deno.test('Place action with insufficient arguments', () => {
    const action = new PlaceAction({
        x: -1,
        y: -1,
        direction: Direction.NORTH,
        translationOffset: translationRingBuffer.get(Direction.NORTH),
        levelData: levels['5-5-blank'],
    });
    assertEquals(action.perform(['a', '1']), false);
});

Deno.test('Place action with invalid x argument', () => {
    const logSpy = spy(console, 'error');

    const action = new PlaceAction({
        x: -1,
        y: -1,
        direction: Direction.NORTH,
        translationOffset: translationRingBuffer.get(Direction.NORTH),
        levelData: levels['5-5-blank'],
    });
    assertEquals(action.perform(['a', '1', 'NORTH']), false);
    assertSpyCall(logSpy, 0, {
        args: ['Error: X and Y must be non-negative integer'],
    });
    logSpy.restore();
});

Deno.test('Place action with invalid y argument', () => {
    const logSpy = spy(console, 'error');

    const action = new PlaceAction({
        x: -1,
        y: -1,
        direction: Direction.NORTH,
        translationOffset: translationRingBuffer.get(Direction.NORTH),
        levelData: levels['5-5-blank'],
    });
    assertEquals(action.perform(['1', 'a', 'NORTH']), false);
    assertSpyCall(logSpy, 0, {
        args: ['Error: X and Y must be non-negative integer'],
    });
    logSpy.restore();
});

Deno.test('Place action with invalid direction argument', () => {
    const logSpy = spy(console, 'error');

    const action = new PlaceAction({
        x: -1,
        y: -1,
        direction: Direction.NORTH,
        translationOffset: translationRingBuffer.get(Direction.NORTH),
        levelData: levels['5-5-blank'],
    });
    assertEquals(action.perform(['0', '0', 'SOMETHING']), false);
    assertSpyCall(logSpy, 0, {
        args: [
            "Error: Supported directions are ['NORTH', 'SOUTH', 'EAST', 'WEST']",
        ],
    });
    logSpy.restore();
});

Deno.test('Place action with valid arguments', () => {
    const metadata: Metadata = {
        x: -1,
        y: -1,
        direction: Direction.NORTH,
        translationOffset: translationRingBuffer.get(Direction.NORTH),
        levelData: levels['5-5-blank'],
    };
    const action = new PlaceAction(metadata);
    assertEquals(action.perform(['1', '2', 'SOUTH']), true);
    assertEquals(metadata.x, 1);
    assertEquals(metadata.y, 2);
    assertEquals(metadata.direction, Direction.SOUTH);
    assertEquals(metadata.translationOffset, [0, -1]);
});
