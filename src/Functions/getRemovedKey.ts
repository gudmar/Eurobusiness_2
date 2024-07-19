import { tObject } from "../Logic/types";
import { isKeyIncluded } from "./isKeyIncluded";

export const getRemovedKey = (obj: tObject<any>, keyToRemove: string) => {
    if (!isKeyIncluded(obj, keyToRemove)) return obj;
    const nextObj = Object.entries(obj).reduce((acc: tObject<any>, [key, value]) => {
        if (key !== keyToRemove) {
            const nextAcc = {...acc, [key]: value}
            return nextAcc;
        }
        return acc;
    }, {})
    return nextObj;
}