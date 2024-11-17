import { clamp } from '/lib/utils.ts';
import { assertEquals } from "jsr:@std/assert";

Deno.test("Clamp lower test", () => {
    const value = clamp(0, 5, 10);
    assertEquals(value, 5);
});

Deno.test("Clamp in between test", () => {
    const value = clamp(7, 5, 10);
    assertEquals(value, 7);
});

Deno.test("Clamp upper test", () => {
    const value = clamp(15, 5, 10);
    assertEquals(value, 10);
});