import { tEntry } from "../../Types/types";
import { findEntry } from "../findEntry";

const FALSE_RESLT = {
    result: false
}

describe('Testing findEntry', () => {
    it('Should return false with not defined path when no such entry', () => {
        const expectedEntry: tEntry = ['key', 'value'];
        const obj = {
            a: '123',
            b: {
                c: false,
                d: {
                    arr: [1, 3, false, 'asdf']
                }
            }
        }
        const result = findEntry(obj, expectedEntry)
        expect(result).toEqual(FALSE_RESLT);
    })
    it('Should return false and given path when entry is in flat object', () => {
        const expectedEntry: tEntry = ['a', '123'];
        const obj = {
            a: '123',
            b: {
                c: false,
                d: {
                    arr: [1, 3, false, 'asdf']
                }
            }
        }
        const result = findEntry(
            obj, expectedEntry
        )
        const expectedResult = {
            result: true,
            path: './'
        }
        expect(result).toEqual(expectedResult);
    })
    it('Should return true resul when given object with nested entry, that is wanted', () => {
        const expectedEntry: tEntry = ['e', 123];
        const obj = {
            a: '123',
            b: {
                c: false,
                d: {
                    e: 123,
                    arr: [1, 3, false, 'asdf']
                }
            }
        }
        const result = findEntry(obj, expectedEntry)
        const expectedResult = {
            result: true,
            path: './b/d/'
        }
        expect(result).toEqual(expectedResult);
    })
    it('Should return true result when given object has entry nested in some array', () => {
        const expectedEntry: tEntry = ['e', 123];
        const obj = {
            a: '123',
            b: {
                c: false,
                d: {
                    arr: [1, 3, false, 'asdf', {f: {e: 123}}]
                }
            }
        }
        const result = findEntry(obj, expectedEntry)
        const expectedResult = {
            result: true,
            path: './b/d/arr/4/f/'
        }
        expect(result).toEqual(expectedResult);
    })
});
