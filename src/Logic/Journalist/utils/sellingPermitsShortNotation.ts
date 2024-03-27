
type tTestCityInputNotation = { nrOfHouses: number | null, nrOfHotels: number | null }

export type tTestInputNotation = {
    cities: tTestCityInputNotation[],
    bank: tTestCityInputNotation,
}
enum TokenTypes {
    Number = 'number',
    Code = 'code'
}
type tToken = {type: TokenTypes, value: string}

const breakShortNotation = (shortNotation: string): string[] => {
    const afterLongBreak = shortNotation.split('__');
    const afterShortSplits: string[] = afterLongBreak.reduce((acc: string[], item) => {
        const currentSplit = item.split('_');
        const nextAcc = [...acc, ...currentSplit];
        return nextAcc;
    }, [])
    return afterShortSplits;
}

const tokenizeShortTestNotationBits = (shortHotationBit: string) => {
    const isNumber = (char: string) => /[0-9]/.test(char);
    const getType = (char: string) => isNumber(char) ? TokenTypes.Number : TokenTypes.Code;
    const getLastTokenType = (tokens: tToken[]) => tokens.length === 0 ? null : tokens[tokens.length-1]?.type;
    const appendToLastToken = (tokens: tToken[], char: string) => {
        const lastToken = tokens[tokens.length-1];
        if (tokens.length === 0) throw new Error('Tokens should not be empty here')
        lastToken!.value = `${lastToken?.value}${char}`
        return tokens;
    }
    const pushNewToken = (tokens: tToken[], char: string, type: TokenTypes) => {
        const newToken = {value: char, type};
        tokens.push(newToken);
        return tokens
    }
    const tokens: tToken[] = shortHotationBit.split('').reduce((acc: tToken[], char) => {
        const currentType = getType(char);
        const lastType = getLastTokenType(acc);
        if (lastType === currentType) { appendToLastToken(acc, char) }
        else {
            pushNewToken(acc, char, currentType)
        }
        return acc;
    }, [])
    return tokens;
}

type tParseTree = {
    nrOfHouses: number | null, nrOfHotels: number | null, lastValue: string | number, isLeft: boolean
}

const parseShortTestNotationBits = (shortNotationBit: string) => {
    const tokens: tToken[] = tokenizeShortTestNotationBits(shortNotationBit);
    const parseTree: tParseTree = tokens.reduce((acc: tParseTree, {value, type}) => {
        if (value === 'L' || value === 'l') {acc.lastValue = value; acc.isLeft = true; return acc}
        if (type === TokenTypes.Number) {acc.lastValue = value; acc.lastValue = value; return acc}
        if (value === 'H') {acc.nrOfHotels = parseInt(`${acc.lastValue}`); acc.lastValue = value; return acc;}
        if (value === 'h') {acc.nrOfHouses = parseInt(`${acc.lastValue}`); acc.lastValue = value; return acc;}
        return acc
    }, {nrOfHouses: null, nrOfHotels: null, lastValue: '', isLeft: false});
    const {nrOfHotels, nrOfHouses, isLeft} = parseTree;
    const result = isLeft ? (
        { 
            nrOfHotels: nrOfHotels!==null ? nrOfHotels : 12,
            nrOfHouses: nrOfHouses!==null ? nrOfHouses : 32,
            isLeft
        }
        ) : (
        {
            nrOfHotels: nrOfHotels!==null ? nrOfHotels : 0,
            nrOfHouses: nrOfHouses!==null ? nrOfHouses : 0,
            isLeft
        }
    )
    return result;
}

export const shortTestNotationToJsObject = (shortNotation: string): tTestInputNotation => {
    const brokenShortNotation = breakShortNotation(shortNotation);
    const parseResult = brokenShortNotation.map(parseShortTestNotationBits);
    if (!parseResult.length) throw new Error('Parse result should be not empty')
    const houseLimit = parseResult[parseResult.length - 1].isLeft ? parseResult[parseResult.length-1]!.nrOfHouses : 32;
    const hotelLimit = parseResult[parseResult.length - 1].isLeft ? parseResult[parseResult.length-1]!.nrOfHotels : 12;
    const cityParseResult = parseResult.filter(({isLeft}) => !isLeft);
    const cities = cityParseResult.map(({nrOfHouses, nrOfHotels}) => ({nrOfHotels, nrOfHouses}));
    const bank = {nrOfHouses: houseLimit, nrOfHotels: hotelLimit}
    return {cities, bank}
}

