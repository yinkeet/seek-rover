import { parseCommand } from '/lib/command-parser.ts';
import { assertEquals } from "jsr:@std/assert";

Deno.test("Parse command with extra arguments", () => {
    const [argc, argv] = parseCommand('place 0,0,north');
    assertEquals(argc, 'PLACE');
    assertEquals(argv, ['0', '0', 'NORTH']);
});

Deno.test("Parse command with no extra arguments", () => {
    const [argc, argv] = parseCommand('MOVE');
    assertEquals(argc, 'MOVE');
    assertEquals(argv, undefined);
});