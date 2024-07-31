import { tObject } from "../Logic/types"
import { tEntry, tPrimitiveEntry } from "../Types/types"
import { isPrimitive } from "./isPrimitive"

export type tFindInPathArgs = {
    obj: tObject<any>,
    entry: tEntry,
    path?: string,
    result?: boolean,
}

export type tFindEntryResult = {
    result: boolean, path?: string
}

const VALUE_INDEX = 1;

const findInPath = (args: tFindInPathArgs): tFindInPathArgs => {
    const { obj, entry, path, result } = args;
    if (result === false) return args;
    const isPrimitiveValue = isPrimitive(obj);
    if (isPrimitiveValue) return {...args, result: false}
    const entriesInCrrentPath = Object.entries(obj);
    const entryIndex = entriesInCrrentPath.findIndex(([key, value]) => {
        const isMatch = entry[0] === key && entry[1] === value;
        return isMatch
    })
    const notFound = entryIndex === -1;
    if (notFound) {
        const result = entriesInCrrentPath.reduce((acc: tFindInPathArgs | null, [currentKey, currentValue]) => {
            if (acc) return acc;
            console.log('Current entyr', currentKey, currentValue)
            const resultForCurrentEntry: tFindInPathArgs = findInPath({
                obj: currentValue,
                entry,
                path: `${path}/${currentKey}`,
            });
            if (resultForCurrentEntry.result) return resultForCurrentEntry;
            return acc;
        }, null)
        return result || args;
    }
    const foundEntry = entriesInCrrentPath[entryIndex];
    const outcome = {
        path: `${path}/`,
        obj: foundEntry[VALUE_INDEX],
        entry,
        result: true,
    }
    return outcome
}

export const findEntry = ( obj: tObject<any>, entry: tPrimitiveEntry ): tFindEntryResult => {
    const outcome = findInPath({
        obj, entry, path: '.'
    })
    return { result: outcome.result || false, path: outcome.path === '.' ? undefined: outcome.path };
}
