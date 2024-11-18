import blank_5_5 from "./blank-5-5.json" with { type: "json" };
import no_walls_5_5 from "./no-walls-5-5.json" with { type: "json" };

export interface Level {
    [id : string]: LevelData
}

export interface LevelData {
    min: Coordinate,
    max: Coordinate,
    map: LevelMap;
}

export interface Coordinate {
    x: number;
    y: number;
}

export interface LevelMap {
    [id: string]: Tile
}

export interface Tile {
    wall: number
}

export const levels: Level = {
    "5-5-blank": blank_5_5 as LevelData,
    "5-5-no-walls": no_walls_5_5 as LevelData,
}