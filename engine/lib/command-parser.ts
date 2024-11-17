export const parseCommand = (command: string): [string, string[]] => {
    const [argc, argv] = command.split(' ')
    if (argv !== undefined) {
        return [argc, argv.split(',')]
    }
    return [argc, argv]
};