export const isPrimitive = (value: any) => {
    if (value === null) return true;
    const primitiveTypes = [
        'string', 'number', 'boolean', 'undefined'
    ]
    const result = primitiveTypes.some((typeName: string) => typeName === typeof value);
    return result;
}
