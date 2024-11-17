import { RingBuffer } from './ring-buffer.ts';

export enum Direction {
    NORTH,
    NORTHEAST,
    EAST,
    SOUTHEAST,
    SOUTH,
    SOUTHWEST,
    WEST,
    NORTHWEST
}

export const directionRingBuffer = new RingBuffer(
    Direction.NORTH, 
    Direction.NORTHEAST, 
    Direction.EAST, 
    Direction.SOUTHEAST, 
    Direction.SOUTH, 
    Direction.SOUTHWEST, 
    Direction.WEST, 
    Direction.NORTHWEST
);

export const directionCollisionRingBuffer = new RingBuffer(8, 9, 1, 5, 4, 6, 2, 10);

export const translationRingBuffer =  new RingBuffer<[number, number]>([0,1], [1,1], [1,0], [1,-1], [0,-1], [-1,-1], [-1,0], [-1,1])