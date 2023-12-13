type tRangeRecursiveArgs = {
    startNumber?: number,
    step: number,
    arr: number[],
    endNumber?: number
}

const SmallToBig = ({startNumber, endNumber, step, arr}: tRangeRecursiveArgs): number[] => {
    if (endNumber === undefined || startNumber === undefined) throw new Error('startNumber and endNumber have to be defined')
    if (endNumber < startNumber) return arr;
    const newArr = [...arr, startNumber];
    return SmallToBig({startNumber: startNumber + step, endNumber, step, arr: newArr})
}

const rangeBigToSmall = ({startNumber, endNumber, step, arr}: tRangeRecursiveArgs): number[] => {
    if (endNumber === undefined || startNumber === undefined) throw new Error('startNumber and endNumber have to be defined')
    if (endNumber > startNumber) return arr;
    const newArr = [...arr, startNumber];
    return rangeBigToSmall({startNumber: startNumber + step, endNumber, step, arr: newArr})
}

const getAutoStep = (from: number, to?: number): number => {
    if (to === undefined) { return 1}
    if (from === undefined) { throw new Error('from has to be defined')}
    return from >= to ? -1 : 1
}

export const range = (from: number, to?: number, step?: number) => {
    const autoStep = step || getAutoStep(from, to);
    if (step === 0) throw new Error('Step should be !== 0');
    if (from <= 0 && to === undefined) {
        const result = SmallToBig({startNumber: from, endNumber: 0, step: autoStep, arr: []})
        return result;
    }
    if (from > 0 && to === undefined) {
        const result = SmallToBig({startNumber: 0, endNumber: from, step: autoStep, arr: []});
        return result;
    }
    if (from < to!) {
        if (autoStep <= 0) throw  new Error(`It is not possible to create a range from ${from} to ${to} with step ${autoStep}`)
        const result = SmallToBig({startNumber: from, endNumber: to, step: autoStep, arr: []})
        return result;
    }
    if (from > to!) {
        if (autoStep >= 0) throw  new Error(`It is not possible to create a range from ${from} to ${to} with step ${autoStep}`)
        const result = rangeBigToSmall({startNumber: from, endNumber: to, step: autoStep, arr: []})
        return result;
    }
    return []
}