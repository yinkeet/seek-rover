export class RingBuffer<T> {
    private array: T[];
    public size: number;

    constructor(...array: T[]) {
        this.array = array;
        this.size = array.length;
    }

    get(index: number): [T, number] {
        if (index < 0) index += this.size;
        const newIndex = index % this.size;
        return [this.array[newIndex], newIndex];
    }
}