import * as fs from 'node:fs';

export interface Level {
    [id: string]: LevelData
}

export interface LevelData {
    name: string;
    description: string;
    min: Coordinate;
    max: Coordinate;
    map: LevelMap;
}

export interface Coordinate {
    x: number;
    y: number;
}

export interface LevelMap {
    [id: string]: Tile;
}

export interface Tile {
    wall: number;
}

export const levels: Level = {}

const levelsPath = './levels/'
const fileNames = fs.readdirSync(levelsPath).filter(file => file.match(/\.json$/));
fileNames.forEach((fileName: string)=> {
    const level = JSON.parse(fs.readFileSync(levelsPath + fileName, 'utf8').toString()) as LevelData
    levels[level.name] = level
});