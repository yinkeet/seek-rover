export interface Action {
    readonly id: string;
    perform: (args?: string[]) => boolean;
}