export class ArrayElementsCounter {
    private _originalArray: unknown[];
    private _counted: Map<unknown, number> = new Map();
    constructor(arr: unknown[]) {
        this._originalArray = arr;
        arr.forEach(this._countSingleElement.bind(this))
    }

    get isRepetition() {
        const numbersOfElements = [...this._counted.values()];
        const isRepetition = numbersOfElements.some((item: number) => item > 1)
        return isRepetition;
    }

    get repetitions() {
        const numbersOfElements = [...this._counted.values()];
        return numbersOfElements;
    }

    private _countSingleElement(item: unknown) {
        const element = JSON.stringify(item)
        const repetitions = this._counted.get(element);
        if (!repetitions) {
            this._counted.set(element, 1);
            return;
        }
        this._counted.set(element, repetitions + 1);
    }
}
