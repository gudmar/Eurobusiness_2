import { tObject } from "../Logic/types";

export type tThrowIfNotContainKeysArgs = {
    source: string,
    keys: string[],
    objectToValidate: tObject<any>
}

export const throwIfNotContainKeys = ({source, keys, objectToValidate}: tThrowIfNotContainKeysArgs) => {
    const objKeys = Object.keys(objectToValidate);
    keys.forEach((key: string) => {
        if (!objKeys.includes(key)) throw new Error(`From [${source}]: Object should contain key [${key}]`)
    })
}
