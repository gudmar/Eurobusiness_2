import { tObject } from "../Logic/types"
import { isPrimitive } from "./isPrimitive"

type tGetAllEntreisWithKeyObject = tObject<any> | tObject<any>[]

type tEntriesWithKey = {
    key: string, value: any, path: string[]
}

type tGetKeyRecursivlyArgs = {
    obj: tGetAllEntreisWithKeyObject, key: string, path: string[], result: tEntriesWithKey[]
}

// const getKeysOfNotPrimitives = (obj: tObject<any>) => {
//     const keys = Object.keys(obj);
//     const result = keys.filter((key: string) => {
//         const value: any = obj[key];
//         const result = !isPrimitive(value);
//         return result
//     })
//     return result
// }

const getKeysRecursivly = (args: tGetKeyRecursivlyArgs) => {
    const {obj, key, path, result} = args;
    const keys = Object.keys(obj);
    if (Array.isArray(obj)) throw new Error('An array')
    if (keys.includes(key)) {
        const result = {
            key, value: obj[key], path
        }
    }
}

const fillAllEnterisWithKeyRecursivly = (args: tGetKeyRecursivlyArgs) => {
    const {result, path, obj, key: keyToFind} = args;
    const keys = Object.keys(obj);
    if (!Array.isArray(obj)) {
        const reduced = keys.reduce((acc: tEntriesWithKey[], key) => {
            const isValuePrimitive = isPrimitive(obj[key]);
            const nextPath = [...path, key];
            if (isValuePrimitive) {
                if (key === keyToFind) {
                    acc.push({key, value: obj[key], path})
                }
            } else {
                if (key === keyToFind) {
                    acc.push({key, value: obj[key], path})
                }
                fillAllEnterisWithKeyRecursivly({
                    obj: obj[key], result: acc, path: nextPath, key: keyToFind
                })
            }
            return acc
        }, result)
        return reduced;
    }
    if (Array.isArray(obj)) {
        const reduced = (obj as tObject<any>[]).reduce((acc: tEntriesWithKey[], item, index) => {
            const isValuePrimitive = isPrimitive(item);
            const nextPath = [...path, `${index}`];
            if (isValuePrimitive) {
                return acc;
            } else {
                fillAllEnterisWithKeyRecursivly({
                    obj: obj[index], result: acc, path: nextPath, key: keyToFind
                })
            }
            return acc
    }, result)
    return reduced
}
}

export const getAllEntreisWithKey = (obj: tGetAllEntreisWithKeyObject, keyToFind: string) => {
    const entriesWithKey: tEntriesWithKey[] = [];
    const path = ['.']
    fillAllEnterisWithKeyRecursivly({
        result: entriesWithKey, path, obj, key: keyToFind
    })
    return entriesWithKey
}