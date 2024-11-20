export class RingBuffer<T> {
    private array: T[];
    public size: number;

    constructor(...array: T[]) {
        this.array = array;
        this.size = array.length;
    }

    get(index: number): T {
        // Handle negative index
        if (index < 0) index += this.size;
        // Handle overflow index
        const newIndex = index % this.size;
        return this.array[newIndex];
    }
}