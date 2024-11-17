export interface Action {
    perform: (args: string[] | undefined) => boolean;
}