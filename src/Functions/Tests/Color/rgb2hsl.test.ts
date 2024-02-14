import { rgb2hsl } from "../../Color/Color";

// https://github.com/gudmar/notePad/blob/master/src/app/services/rgb-2-hsl.service.spec.ts
const testSuit = [
        {input: {r:   255, g: 0  ,   b: 0    }, output: {h: 0,   s: 1, l: 0.50 }},
        {input: {r:   0,   g: 128,   b: 0    }, output: {h: 120, s: 1, l: 0.25 }},
        {input: {r:   0,   g: 0  ,   b: 255  }, output: {h: 240, s: 1, l: 0.50 }},
        {input: {r:   0,   g: 0  ,   b: 0    }, output: {h: 0,   s: 0.0,   l: 0.0  }},
        {input: {r:   255, g: 255  , b: 0    }, output: {h: 60,  s: 1, l: 0.50 }},
        {input: {r:   255, g: 255  , b: 255  }, output: {h: 0,   s: 0.0,   l: 1}},
        {input: {r:   255, g:   0  , b: 255  }, output: {h: 300, s: 1, l: 0.50 }},
        {input: {r:   123, g: 123  , b: 123  }, output: {h: 0,   s: 0.0,   l: 0.48 }},
        {input: {r:   123, g: 23  ,  b: 223  }, output: {h: 270, s: 0.81,  l: 0.48 }},
        {input: {r:   123, g: 23  ,  b: 22   }, output: {h: 1,   s: 0.70,  l: 0.28 }},
        {input: {r:   146, g: 201  , b: 127  }, output: {h: 105, s: 0.41,  l: 0.64 }},
        {input: {r:    40, g: 120  , b: 120  }, output: {h: 180, s: 0.50,  l: 0.31 }},
]
describe('Testing RGB to HSL conversion', () => {
        testSuit.forEach(({input, output}) => {
                const {r, g, b} = input;
                const {h, s, l} = output;
                const inputStr = `rgb(${r}, ${g}, ${b})`;
                const inputHsl = `hsl(${h}, ${s}%, ${l})%`;
                it(`It should return ${inputHsl} when given ${inputStr}`, () => {
                        const result = rgb2hsl({r, g, b});
                        expect(result.h).toBe(h);
                        expect(result.s).toBe(s);
                        expect(result.l).toBe(l)
                })
        })
})