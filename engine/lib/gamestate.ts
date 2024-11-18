export enum GameState {
    Loading,   // Load level, configs, metadata and logics
    LevelSelect,    // Select level
    Init,   // Waiting for rover placement
    Running // All commands accepted here
}