import { levels } from '/levels/index.ts';
import { Metadata } from '../../lib/metadata.ts';
import { Direction, translationRingBuffer } from '/lib/direction.ts';
import { MoveAction } from '/lib/move.action.ts';
import { assertEquals } from 'jsr:@std/assert';

Deno.test('Move action with string arguments', () => {
    const metadata: Metadata = {
        x: 1,
        y: 1,
        direction: Direction.NORTH,
        translationOffset: translationRingBuffer.get(Direction.NORTH)[0],
        levelData: levels['5-5-blank'],
    };
    const action = new MoveAction(metadata);
    assertEquals(action.perform(undefined), true);
    assertEquals(metadata.x, 1);
    assertEquals(metadata.y, 2);
    assertEquals(metadata.direction, Direction.NORTH);
    assertEquals(metadata.translationOffset, [0, 1]);
});

Deno.test('Move north', () => {
    const metadata: Metadata = {
        x: 1,
        y: 1,
        direction: Direction.NORTH,
        translationOffset: translationRingBuffer.get(Direction.NORTH)[0],
        levelData: levels['5-5-blank'],
    };
    const action = new MoveAction(metadata);
    assertEquals(action.perform(undefined), true);
    assertEquals(metadata.x, 1);
    assertEquals(metadata.y, 2);
    assertEquals(metadata.direction, Direction.NORTH);
    assertEquals(metadata.translationOffset, [0, 1]);
});

Deno.test('Move south', () => {
    const metadata: Metadata = {
        x: 1,
        y: 1,
        direction: Direction.SOUTH,
        translationOffset: translationRingBuffer.get(Direction.SOUTH)[0],
        levelData: levels['5-5-blank'],
    };
    const action = new MoveAction(metadata);
    assertEquals(action.perform(undefined), true);
    assertEquals(metadata.x, 1);
    assertEquals(metadata.y, 0);
    assertEquals(metadata.direction, Direction.SOUTH);
    assertEquals(metadata.translationOffset, [0, -1]);
});

Deno.test('Move east', () => {
    const metadata: Metadata = {
        x: 1,
        y: 1,
        direction: Direction.EAST,
        translationOffset: translationRingBuffer.get(Direction.EAST)[0],
        levelData: levels['5-5-blank'],
    };
    const action = new MoveAction(metadata);
    assertEquals(action.perform(undefined), true);
    assertEquals(metadata.x, 2);
    assertEquals(metadata.y, 1);
    assertEquals(metadata.direction, Direction.EAST);
    assertEquals(metadata.translationOffset, [1, 0]);
});

Deno.test('Move west', () => {
    const metadata: Metadata = {
        x: 1,
        y: 1,
        direction: Direction.WEST,
        translationOffset: translationRingBuffer.get(Direction.WEST)[0],
        levelData: levels['5-5-blank'],
    };
    const action = new MoveAction(metadata);
    assertEquals(action.perform(undefined), true);
    assertEquals(metadata.x, 0);
    assertEquals(metadata.y, 1);
    assertEquals(metadata.direction, Direction.WEST);
    assertEquals(metadata.translationOffset, [-1, 0]);
});

Deno.test('Move north collide with wall', () => {
    const metadata: Metadata = {
        x: 0,
        y: 4,
        direction: Direction.NORTH,
        translationOffset: translationRingBuffer.get(Direction.NORTH)[0],
        levelData: levels['5-5-blank'],
    };
    const action = new MoveAction(metadata);
    assertEquals(action.perform(undefined), true);
    assertEquals(metadata.x, 0);
    assertEquals(metadata.y, 4);
    assertEquals(metadata.direction, Direction.NORTH);
    assertEquals(metadata.translationOffset, [0, 1]);
});

Deno.test('Move south collide with wall', () => {
    const metadata: Metadata = {
        x: 0,
        y: 0,
        direction: Direction.SOUTH,
        translationOffset: translationRingBuffer.get(Direction.SOUTH)[0],
        levelData: levels['5-5-blank'],
    };
    const action = new MoveAction(metadata);
    assertEquals(action.perform(undefined), true);
    assertEquals(metadata.x, 0);
    assertEquals(metadata.y, 0);
    assertEquals(metadata.direction, Direction.SOUTH);
    assertEquals(metadata.translationOffset, [0, -1]);
});

Deno.test('Move east collide with wall', () => {
    const metadata: Metadata = {
        x: 4,
        y: 0,
        direction: Direction.EAST,
        translationOffset: translationRingBuffer.get(Direction.EAST)[0],
        levelData: levels['5-5-blank'],
    };
    const action = new MoveAction(metadata);
    assertEquals(action.perform(undefined), true);
    assertEquals(metadata.x, 4);
    assertEquals(metadata.y, 0);
    assertEquals(metadata.direction, Direction.EAST);
    assertEquals(metadata.translationOffset, [1, 0]);
});

Deno.test('Move west collide with wall', () => {
    const metadata: Metadata = {
        x: 0,
        y: 0,
        direction: Direction.WEST,
        translationOffset: translationRingBuffer.get(Direction.WEST)[0],
        levelData: levels['5-5-blank'],
    };
    const action = new MoveAction(metadata);
    assertEquals(action.perform(undefined), true);
    assertEquals(metadata.x, 0);
    assertEquals(metadata.y, 0);
    assertEquals(metadata.direction, Direction.WEST);
    assertEquals(metadata.translationOffset, [-1, 0]);
});