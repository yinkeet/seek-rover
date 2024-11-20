export const parseCommand = (command: string): [string, string[]] => {
    command = command.toUpperCase();
    // Echo the command back out
    console.log(command);
    // Split command and arguments
    const [argc, argv] = command.split(' ');
    if (argv !== undefined) {
        // Split arguments into array of strings
        return [argc, argv.split(',')];
    }
    return [argc, argv];
};
