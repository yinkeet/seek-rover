import { RingBuffer } from '/lib/ring-buffer.ts';
import { assertEquals } from "jsr:@std/assert";

Deno.test("RingBuffer positive index get test", () => {
    const ringBuffer = new RingBuffer<number>(1, 2, 3, 4);
    assertEquals(ringBuffer.get(5), [2, 1]);
});

Deno.test("RingBuffer negative index get test", () => {
    const ringBuffer = new RingBuffer<number>(1, 2, 3, 4);
    assertEquals(ringBuffer.get(-2), [3, 2]);
    assertEquals(ringBuffer.get(-3), [2, 1]);
});