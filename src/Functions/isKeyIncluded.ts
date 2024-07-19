import { tObject } from "../Logic/types";

export const isKeyIncluded = (obj: tObject<any>, key: string) => {
    const keys = Object.keys(obj);
    const result = keys.includes(key);
    return result;
}
