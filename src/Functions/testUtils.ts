export const mockMathRandom = (mathRandomValueGenerator: () => number, callback: () => unknown) => {
    jest.spyOn(global.Math, 'random').mockReturnValue(mathRandomValueGenerator());
    const result = callback();
    jest.spyOn(global.Math, 'random').mockRestore();
    return result;
}
export const zeroRandomGenerator = () => 0;
