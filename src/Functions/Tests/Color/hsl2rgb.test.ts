import { hsl2rgb } from "../../Color/hslToRgb";

const testSuit = [
    {output: {r:   255, g: 0  ,   b: 0    }, input: {h: 0,   s: 1, l: 0.50 }},
    {output: {r:   0,   g: 128,   b: 0    }, input: {h: 120, s: 1, l: 0.25 }},
    {output: {r:   0,   g: 0  ,   b: 255  }, input: {h: 240, s: 1, l: 0.50 }},
    {output: {r:   0,   g: 0  ,   b: 0    }, input: {h: 0,   s: 0.0,   l: 0.0  }},
    {output: {r:   255, g: 255  , b: 0    }, input: {h: 60,  s: 1, l: 0.50 }},
    {output: {r:   255, g: 255  , b: 255  }, input: {h: 0,   s: 0.0,   l: 1}},
    {output: {r:   255, g:   0  , b: 255  }, input: {h: 300, s: 1, l: 0.50 }},
    {output: {r:   123, g: 123  , b: 123  }, input: {h: 0,   s: 0.0,   l: 0.48 }},
    {output: {r:   123, g: 24  ,  b: 222  }, input: {h: 270, s: 0.81,  l: 0.48 }},
    {output: {r:   122, g: 24  ,  b: 22   }, input: {h: 1,   s: 0.70,  l: 0.28 }},
    {output: {r:   145, g: 201  , b: 126  }, input: {h: 105, s: 0.41,  l: 0.64 }},
    {output: {r:    40, g: 119  , b: 119  }, input: {h: 180, s: 0.50,  l: 0.31 }},
]

describe('Testing conversion from hsl to rgb', () => {
    testSuit.forEach(({input, output}) => {
        const {r, g, b} = output;
        const {h, s, l} = input;
        const rgbStr = `rgb(${r}, ${g}, ${b})`;
        const hslStr = `hsl(${h}, ${s}%, ${l}%)`;
        it(`It should return ${rgbStr} when given ${hslStr}`, () => {
                const result = hsl2rgb({h, s: s, l: l});
                expect(result.r).toBe(r);
                expect(result.g).toBe(g);
                expect(result.b).toBe(b)
        })
    })
})
