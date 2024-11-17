export enum GameState {
    Loading,   // Load level, configs, metadata and logics
    Init,   // Waiting for rover placement
    Running // All commands accepted here
}