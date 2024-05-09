import { tObject } from "../Logic/types";

export const getErrorMessage = (type: string) => `Cannot create a property of ${type}`

const throwIfIllegalType = (value: unknown) => {
    const illegalTypes = [
        'string', 'number', 'boolean', 'symbol', 'bigint'
    ]
    const type = typeof value
    const conditions = [
        illegalTypes.includes(type),
        Array.isArray(type),
    ]
    if (conditions.some((val) => val)) throw new Error ( getErrorMessage(type))
    
}

export const createPath = (targetObject: tObject<any>, path: string[]): tObject<any> => {
    if (path.length === 0) return targetObject;
    const toCreate = path[0];
    if (!targetObject[path[0]] ) { 
        throwIfIllegalType(targetObject);
        targetObject[toCreate] = {};
    }
    path.splice(0, 1);
    return createPath(targetObject[toCreate], path)
}
