export const getShiftIndex = (offset: number, arrLength: number) => (index: number) => {
    if (index < 0) throw new Error('Provided index should be >= 0 ');
    if (arrLength <= 0) throw new Error('Array length should be > 0');
    if (offset >= arrLength) throw new Error('Offset should be less then arr length')
    if (offset + index < 0) throw new Error(`Calculated index is ${offset + index}, it is < 0 and this is not expected`)
    const shiftedIndex = index + offset;
    const doesOverflow = shiftedIndex > arrLength;
    const overflowResult = shiftedIndex % arrLength;
    return doesOverflow ? overflowResult : shiftedIndex;
}

export const shiftBoardIndexBy1 = getShiftIndex(1, 40);
export const shiftBoardIndexByNeg1 = getShiftIndex(-1, 40);
