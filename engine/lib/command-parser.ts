export const parseCommand = (command: string): [string, string[]] => {
    command = command.toUpperCase();
    console.log(command);
    const [argc, argv] = command.split(' ');
    if (argv !== undefined) {
        return [argc, argv.split(',')];
    }
    return [argc, argv];
};
