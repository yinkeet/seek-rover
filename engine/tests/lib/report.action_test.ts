import { levels } from '/levels/index.ts';
import { Metadata } from '../../lib/metadata.ts';
import { Direction, translationRingBuffer } from '/lib/direction.ts';
import { ReportAction } from '/lib/report.action.ts';
import { assertEquals } from 'jsr:@std/assert';
import { assertSpyCall, spy } from "jsr:@std/testing/mock";

Deno.test('Report action', () => {
    const logSpy = spy(console, "log");

    const metadata: Metadata = {
        x: 0,
        y: 0,
        direction: Direction.NORTH,
        translationOffset: translationRingBuffer.get(Direction.NORTH),
        levelData: levels['5-5-blank'],
    };
    const action = new ReportAction(metadata);
    assertEquals(action.perform(undefined), true);
    assertSpyCall(logSpy, 0, {
        args: ["Output: 0,0,NORTH"]
    });
});