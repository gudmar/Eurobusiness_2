import { Color, ColorErrors } from "../../Color/Color";

describe('Parsing colors by Color class correctly', () => {
    describe('Testing if Color class parses rgb and rgba patterns correctly', () => {
        it('Should parse correclty when given rgb(0,0,0)', () => {
            const input = 'rgba(0,0,0)'
            const colorInstance = new Color(input);
            const {r, g, b, a} = colorInstance;
            expect(r).toBe(0)
            expect(g).toBe(0)
            expect(b).toBe(0)
            expect(a).toBe(0)
        })
        it('Should parse correclty when given rgb(255, 1, 23)', () => {
            const input = 'rgb(255, 1, 23)'
            const colorInstance = new Color(input);
            const {r, g, b, a} = colorInstance;
            expect(r).toBe(255)
            expect(g).toBe(1)
            expect(b).toBe(23)
            expect(a).toBe(0)
        })
        it('Should parse correctly when given rgb value with opacity', () => {
            const input = 'rgba(255, 1, 23, 0.43)'
            const colorInstance = new Color(input);
            const {r, g, b, a} = colorInstance;
            expect(r).toBe(255)
            expect(g).toBe(1)
            expect(b).toBe(23)
            expect(a).toBe(0.43)
        })
    })
    describe('Parsing hsl and hsla colors correctly', () => {
        it('Should parse when given hsl(0,0,0) correctly', () => {
            const input = 'hsl(0,0,0)'
            const colorInstance = new Color(input);
            const { h, s, l, a }  = colorInstance;
            expect(h).toBe(0)
            expect(s).toBe(0)
            expect(l).toBe(0)
            expect(a).toBe(0)            
        })
        it('Should parse when given hsl(23, 44, 123) correctly', () => {
            const input = 'hsl(23, 44, 123)'
            const colorInstance = new Color(input);
            const { h, s, l, a }  = colorInstance;
            expect(h).toBe(23)
            expect(s).toBe(44)
            expect(l).toBe(123)
            expect(a).toBe(0)            
        })
        it('Should parse hsla when given hsla(23,44,123,0.44) correctly', () => {
            const input = 'hsl(23,44,123,0.44)'
            const colorInstance = new Color(input);
            const { h, s, l, a }  = colorInstance;
            expect(h).toBe(23)
            expect(s).toBe(44)
            expect(l).toBe(123)
            expect(a).toBe(0.44)            
        })
    })
    describe('Parsing hexadecimals', () => {
        it('Should parse when hex #000 given', () => {
            const input = '#000';
            const colorInstance = new Color(input);
            const {r, g, b, a} = colorInstance;
            expect(r).toBe(0)
            expect(g).toBe(0)
            expect(b).toBe(0)
            expect(a).toBe(0)
        })
        it.only('Should parse when hex with 3 digit symbols given', () => {
            const input = '#123';
            const colorInstance = new Color(input);
            const {r, g, b, a} = colorInstance;
            expect(r).toBe(17)
            expect(g).toBe(34)
            expect(b).toBe(51)
            expect(a).toBe(0)
        })
        it('Should parse when hex with 3 character symbols given', () => {
            const input = '#abc';
            const colorInstance = new Color(input);
            const {r, g, b, a} = colorInstance;
            expect(r).toBe(170)
            expect(g).toBe(187)
            expect(b).toBe(204)
            expect(a).toBe(0)
        })
        it('Should parse when hex with 3 character symbols with capital letters given', () => {
            const input = '#aBC';
            const colorInstance = new Color(input);
            const {r, g, b, a} = colorInstance;
            expect(r).toBe(170)
            expect(g).toBe(187)
            expect(b).toBe(204)
            expect(a).toBe(0)
        })
        it('Should parse when hex with 000000 given', () => {
            const input = '#000000';
            const colorInstance = new Color(input);
            const {r, g, b, a} = colorInstance;
            expect(r).toBe(0)
            expect(g).toBe(0)
            expect(b).toBe(0)
            expect(a).toBe(0)
        })
        it('Should parse when hex with 6 digits given', () => {
            const input = '#011083';
            const colorInstance = new Color(input);
            const {r, g, b, a} = colorInstance;
            expect(r).toBe(1)
            expect(g).toBe(16)
            expect(b).toBe(131)
            expect(a).toBe(0)
        })
        it('Should parse when hex with 6 digits and characters given', () => {
            const input = '#a11f83';
            const colorInstance = new Color(input);
            const {r, g, b, a} = colorInstance;
            expect(r).toBe(161)
            expect(g).toBe(31)
            expect(b).toBe(131)
            expect(a).toBe(0)
        })
        it('Should parse when hex with 6 digits and capital characters given', () => {
            const input = '#A11F83';
            const colorInstance = new Color(input);
            const {r, g, b, a} = colorInstance;
            expect(r).toBe(161)
            expect(g).toBe(31)
            expect(b).toBe(131)
            expect(a).toBe(0)
        })
        it('Should parse when hex with opacity', () => {
            const input = '#a11f8387';
            const colorInstance = new Color(input);
            const {r, g, b, a} = colorInstance;
            expect(r).toBe(161)
            expect(g).toBe(31)
            expect(b).toBe(131)
            expect(a).toBe(53)
        })
        it('Should throw when hex is not of a proper size', () => {
            const tooShort1 = '#93';
            const tooShort2 = '#9234';
            const tooShort3 = '#12345';
            const tooLong = '#1234567';
            const testData = [tooShort1, tooShort2, tooShort3, tooLong];
            const throwingFunctions = testData.map(
                (input) => {
                    const instanceCreator = () => new Color(input);
                    return instanceCreator
                }
            );
            throwingFunctions.forEach((f) => expect(f).toThrow(ColorErrors.hexNotProperSize))
        })
    })
})