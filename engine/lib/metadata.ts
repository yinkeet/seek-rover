import { LevelData } from '/levels/index.ts';
import { Direction } from './direction.ts';


export interface Metadata {
    x: number;
    y: number;
    direction: Direction,
    translationOffset: [number, number]
    levelData: LevelData
}