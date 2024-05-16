import { isPrimitive } from "../isPrimitive"

const primitives = [
    1, 't', true, 0b010, 0o765, 0xfac, undefined, null,
]
const notPrimitives = [
    [], {}, ()=>{}, new Map(), new Set(), new Date(),
]

describe('Testing isPrimitive', () => {
    it('Should return true when one of primitives is given', () => {
        primitives.forEach((value) => {
            const result = isPrimitive(value);
            expect(result).toBeTruthy();
        })  
    })
    it('Should return false when one of non primitives is given', () => {
        notPrimitives.forEach((value) => {
            const result = isPrimitive(value);
            expect(result).toBeFalsy();
        })  
    })

})