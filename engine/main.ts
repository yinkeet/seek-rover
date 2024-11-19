import { input, select } from 'npm:@inquirer/prompts';
import { Direction, translationRingBuffer } from './lib/direction.ts';
import { Metadata } from './lib/metadata.ts';
import { parseCommand } from './lib/command-parser.ts';
import { ACTION_ID_PLACE, useActions } from './lib/rover/index.ts';
import { GameState } from './lib/gamestate.ts';

let gameState = GameState.Loading;
import { levels } from '/levels/index.ts';

// Angular steps
const angularStep = 2;

gameState = GameState.LevelSelect;
const level = await select<string>({
    message: 'Choose a level',
    choices: Object.values(levels).map((level) => {
        return {
            name: level.description,
            value: level.name
        }
    })
});

// Create a metadata object
const metadata: Metadata = {
    x: -1,
    y: -1,
    direction: Direction.NORTH,
    translationOffset: translationRingBuffer.get(Direction.NORTH),
    levelData: levels[level],
};

// Load all actions
const actions = useActions(metadata, angularStep);

gameState = GameState.Init;

while (gameState === GameState.Init) {
    const command = await input({ message: 'Enter your command:' });
    const [argc, argv] = parseCommand(command.trim());
    if (!(argc in actions)) {
        console.error('Invalid command');
    } else if (argc.toUpperCase() !== ACTION_ID_PLACE) {
        console.log('Place a rover to start');
    } else {
        actions[argc].perform(argv);
        gameState = GameState.Running;
    }
}

while (gameState === GameState.Running) {
    const command = await input({ message: 'Enter your command:' });
    const [argc, argv] = parseCommand(command.trim());
    if (!(argc in actions)) {
        console.error('Invalid command');
    } else {
        actions[argc].perform(argv);
    }
}
