import { createPath, getErrorMessage } from "../createPath";

describe('Testing createPaht', () => {
    it('Should create a path when it does not exist', () => {
        const targetObject: any = {};
        const path = ['a', 'b', 'b', 'a']
        createPath(targetObject, path);
        targetObject.a.b.b.a = 'abba'
        expect(targetObject.a.b.b.a).toBe('abba')
    })
    it('Should throw when in path there exists an element and is an array', () => {
        const targetObject: any = {a: {b: []}};
        const path = ['a', 'b', 'b', 'a']
        createPath(targetObject, path);
        targetObject.a.b.b.a = 'abba'
        expect(targetObject.a.b.b.a).toBe('abba')
    })
    it('Should throw when in path there exists an element and is an number', () => {
        const targetObject: any = {a: {b: 33}};
        const path = ['a', 'b', 'b', 'a']
        const throwingFunction = () => createPath(targetObject, path);
        expect(throwingFunction).toThrow(getErrorMessage('number'))
    })
    it('Should create a path, when some of this path exists, but types are legal', () => {
        const targetObject: any = {a: {b: {}}};
        const path = ['a', 'b', 'b', 'a']
        createPath(targetObject, path);
        targetObject.a.b.b.a = 'abba'
        expect(targetObject.a.b.b.a).toBe('abba')
    })
})