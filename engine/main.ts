import { input } from 'npm:@inquirer/prompts';
import { Direction, translationRingBuffer } from './lib/direction.ts';
import { levels } from '/levels/index.ts';
import { Metadata } from './lib/metadata.ts';
import { parseCommand } from './lib/command-parser.ts';
import { PlaceAction } from './lib/place.action.ts';
import { Action } from './lib/action.ts';
import { MoveAction } from './lib/move.action.ts';
import { RotateAction } from './lib/rotate.action.ts';
import { ReportAction } from './lib/report.action.ts';
import { GameState } from './lib/gamestate.ts';

let gameState = GameState.Loading;

// Angular steps
const angularStep = 2;

// Create a metadata object
const metadata: Metadata = {
    x: -1,
    y: -1,
    direction: Direction.NORTH,
    translationOffset: translationRingBuffer.get(Direction.NORTH),
    levelData: levels['5-5-blank'],
};

// Load all actions
const actions: { [id: string]: Action } = {
    'PLACE': new PlaceAction(metadata),
    'MOVE': new MoveAction(metadata),
    'LEFT': new RotateAction(metadata, -angularStep),
    'RIGHT': new RotateAction(metadata, angularStep),
    'REPORT': new ReportAction(metadata),
};

gameState = GameState.Init;

while (gameState === GameState.Init) {
    const command = await input({ message: 'Enter your command:' });
    const [argc, argv] = parseCommand(command.trim());
    if (!(argc in actions)) {
        console.error('Invalid command');
    } else if (argc.toUpperCase() !== 'PLACE') {
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
