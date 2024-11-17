import blank_5_5 from "./blank-5-5.json" with { type: "json" };

export interface Level {
    [id : string]: LevelMap
}

export interface LevelMap {
    [id: string]: Tile
}

export interface Tile {
    wall: number
}

export const levels: Level = {
    "5-5-blank": blank_5_5 as LevelMap
}