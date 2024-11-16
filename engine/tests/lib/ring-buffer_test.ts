import { RingBuffer } from '/lib/ring-buffer.ts';
import { assertEquals } from "jsr:@std/assert";

Deno.test("RingBuffer get test", () => {
    const ringBuffer = new RingBuffer<number>(1, 2, 3, 4);
    assertEquals(ringBuffer.get(5), [2, 1]);
});