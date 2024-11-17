export interface Action {
    perform: (args?: string[]) => boolean;
}