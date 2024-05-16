import { tObject } from "../Logic/types"
import { isPrimitive } from "./isPrimitive"

type tGetAllEntreisWithKeyObject = tObject<any> | tObject<any>[]

type tGetKeyRecursivlyArgs = {
    obj: tGetAllEntreisWithKeyObject, key: string, path: string, result: tObject<any>[]
}

const getKeysOfNotPrimitives = (obj: tObject<any>) => {
    const keys = Object.keys(obj);
    const result = keys.filter((key: string) => {
        const value: any = obj[key];
        const result = !isPrimitive(value);
        return result
    })
    return result
}

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

export const getAllEntreisWithKey = (obj: tGetAllEntreisWithKeyObject, key: string) => {
    
    
    return []
}