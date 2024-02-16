import { round } from "../round";
import { COLOR_ALIACES, tColorAliace, tColorAliaces } from "./colorAliases";
import { hsl2rgb } from "./hslToRgb";
import { rgb2hsl } from "./rgbToHsl";
import { tHsl, tHsla, tRgb, tRgba } from "./types";

const HEX = 16;

export enum ColorErrors {
    hexNotProperSize = 'Hexadecimal number is not of a proper size',
    notSupported = 'Syntax for this color is not supported',
}

export const hexAlpha2decAlpha = (hexAlpha: string) => {
    const MAX_16_BIT_HEXADECIMAL_VALUE = 255;
    const PERCENTAGE_FACTOR = 100;
    const hexToDecimal = parseInt(hexAlpha, HEX);
    const normalized = Math.round(hexToDecimal * PERCENTAGE_FACTOR / MAX_16_BIT_HEXADECIMAL_VALUE) / PERCENTAGE_FACTOR;
    return normalized;
}

const FULL_ANGLE = 360;

const normalizeAngle = (angle: number) => {
    if (angle >= 0) return angle % FULL_ANGLE;
    const absAngle = Math.abs(angle);
    const normalizedDelta = absAngle % FULL_ANGLE;
    const result = FULL_ANGLE - normalizedDelta;
    return result;
}
export const  sumAnglesUpTo360 = (angleA: number, angleB: number) => {
    const result = normalizeAngle(angleA + angleB);
    return result;
}

export class Color {
    private _h: number = 0;
    private _l: number = 0;
    private _s: number = 0;
    private _r: number = 0;
    private _g: number = 0;
    private _b: number = 0;
    private _a: number = 0;
    set h(v: number) { this._h = v}
    set l(v: number) { this._l = round(v, 2)}
    set s(v: number) { this._s = round(v, 2)}
    set r(v: number) { this._r = v}
    set g(v: number) { this._g = v}
    set b(v: number) { this._b = v}
    set a(v: number) { this._a = round(v, 2)}

    get h() {return this._h}
    get l() {return this._l}
    get s() {return this._s}
    get r() {return this._r}
    get g() {return this._g}
    get b() {return this._b}
    get a() {return this._a}
    private _isHsl(color:string) {
        const result = /^hsl/.test(color.toLocaleLowerCase());
        return result;
    }
    private _isRgb(color: string) {
        const result = /^rgb/.test(color.toLocaleLowerCase());
        return result;
    }
    private _isHex(color: string) {
        const result = /^#/.test(color.toLocaleLowerCase());
        return result;
    }
    private _isRgba(color: string) {
        const result = /^rgba/.test(color.toLocaleLowerCase());
        return result;
    }

    private _getRgbaFromArray(arr: number[]) {
        const [r, g, b, a] = arr;
        this._r = r;
        this._g = g;
        this._b = b;
        if (a !== undefined) this._a = a;
    }
    private _getHslaFromArray(arr: number[]) {
        const [h, s, l, a] = arr;
        this.h = h;
        this.s = s;
        this.l = l;
        if (a !== undefined) this._a = a;
    }
    private _parseWithBrackets(color: string) {
        const indexOfOpenBracket = color.indexOf('(');
        const indexOfCloseBracket = color.indexOf(')');
        const noBrackets = color.substring(indexOfOpenBracket + 1, indexOfCloseBracket);
        const arr = noBrackets.split(',').map((val) => parseFloat(val));
        return arr
    }

    private _parseRgba(color: string){
        const arr = this._parseWithBrackets(color);
        const result = this._getRgbaFromArray(arr);
        return result;
    }

    private _parseHsla(color: string){
        const arr = this._parseWithBrackets(color);
        const result = this._getHslaFromArray(arr);
        return result;
    }

    private _throwErrorIfHexNotProperLength(hexNoTag: string) {
        const { length } = hexNoTag;
        const allowedLengths = [3, 6, 8];
        const isAllowedLength = allowedLengths.includes(length);
        if (!isAllowedLength) throw new Error(ColorErrors.hexNotProperSize)
    }

    private _parseShortHexBit(hexBit: string) {
        const decimal = parseInt(hexBit, HEX);
        const SHORT_HEX_TO_DEC_FACTOR = 17;
        const result = SHORT_HEX_TO_DEC_FACTOR * decimal;
        return result;
    }

    private _parseShortHex(hexNoTag: string) {
        const r = hexNoTag[0];
        const g = hexNoTag[1];
        const b = hexNoTag[2];
        this._r = this._parseShortHexBit(r);
        this._g = this._parseShortHexBit(g);
        this._b = this._parseShortHexBit(b);
    }

    private _parseLongHex(hexNoTag: string) {
        const r = hexNoTag.substring(0, 2);
        const g = hexNoTag.substring(2, 4);
        const b = hexNoTag.substring(4, 6);
        const a = hexNoTag.substring(6);
        this._r = parseInt(r, HEX);
        this._g = parseInt(g, HEX);
        this._b = parseInt(b, HEX);
        const parsedA = parseInt(a, HEX);
        if (isNaN(parsedA)) return;
        this._a = hexAlpha2decAlpha(a);
    }

    private _parseHex(color: string){
        const colorTagStripped = color.substring(1);
        this._throwErrorIfHexNotProperLength(colorTagStripped);
        if (colorTagStripped.length === 3) {
            const result = this._parseShortHex(colorTagStripped);
            return result;
        }
        this._parseLongHex(colorTagStripped)
    }
    private _isAlias(color: string) {
        const descriptor = (COLOR_ALIACES as tColorAliaces)[color] as tColorAliace;
        return (descriptor !== undefined)
    }

    private _parseAlias(color: string) {
        const {r, g, b} = (COLOR_ALIACES as tColorAliaces)[color] as tColorAliace;
        this._r = r;
        this._g = g;
        this._b = b;
    }

    private _throwIfNotSupported = (color: string) => {
        const conditions = [
            this._isAlias(color),
            this._isHex(color),
            this._isHsl(color),
            this._isRgb(color),
        ]
        const isSupported = conditions.some((result) => result === true)
        if (!isSupported) throw new Error(ColorErrors.notSupported)
    }
    private _convertToHsl() {
        const {h, s, l} = rgb2hsl({ r: this._r, g: this._g, b: this._b });
        this.h = h;
        this.l = round(l, 2);
        this.s = round(s, 2);
    }

    private _convertToRgb() {
        const {r, b, g} = hsl2rgb({h: this.h, l: this.l, s: this.s});
        this._r = r;
        this._g = g;
        this._b = b;
    }

    static getColorAsRgbString([r, g, b]: number[]) {
        return `rgb(${r}, ${g}, ${b})`
    }

    private _makeHslString(hsl: tHsl) {
        return `hsl(${hsl.h}, ${round(hsl.s, 2)*100}%, ${round(hsl.l, 2)*100}%)`
    }

    private _makeHslaString(hsla: tHsla) {
        return `hsl(${hsla.h}, ${hsla.s*100}%, ${hsla.l*100}%, ${hsla.a})`
    }

    private _makeRgbString(rgb: tRgb) {
        return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
    }

    private _makeRgbaString(rgba: tRgba) {
        return `rgb(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`
    }

    private _getContrastColor() {
        const THRESHOLD = 0.3
        const isTooBlue = this._b > 120 && this._r < 120 && this._g < 120;
        const reducedL = isTooBlue ? 100 : (this.l - THRESHOLD) * (-100);
        const lMax1 = reducedL > 1 ? 1 : reducedL;
        const lMin0 = lMax1 < 0 ? 0: lMax1
        console.log(this.l)
        const angle = sumAnglesUpTo360( this.h, 0);
        return this._makeHslString({
            h: angle, s: this.s, l: lMin0
        })
    }

    get contrastColor() {return this._getContrastColor()}


    // private _getComplementaryColorAsHsla() {
    //     const h = sumAnglesUpTo360(this.h, 180);
    //     const s = this._s;
    //     const l = this._l;
    //     const a = this._a;
    //     return this._makeHslaString({h, s, l, a})
    // }

    // private _getComplementaryColorAsHsl() {
    //     const h = sumAnglesUpTo360(this._h, 180);
    //     const s = this._s;
    //     const l = this._l;
    //     return this._makeHslString({h, s, l})
    // }


    // get complementaryAsHslaString() {
    //     return this._getComplementaryColorAsHsla();
    // }

    // get complementaryAsHslString() {
    //     return this._getComplementaryColorAsHsl();
    // }

    private _getHslaType() {
        return {h: this.h, s: this.s, l: this.l, a: this.a}
    }

    private _getComplementaryColorAsRgba() {
        const hsla = this._getHslaType();
        const h = sumAnglesUpTo360(hsla.h, 180);
        const convertedRgb = hsl2rgb({...hsla, h});
        return this._makeRgbaString({...convertedRgb, a: this.a})
    }

    get hsl() {
        return `hsl(h: ${this.h}, s: ${this.s * 100}%, l: ${this.l * 100}%)`
    }

    get hsla() {
        return `hsl(h: ${this.h}, s: ${this.s * 100}%, l: ${this.l * 100}%, a: ${this.a})`
    }

    get rgb() {
        return `rgb(r: ${this.r}, g: ${this.g}, b: ${this.b})`
    }

    get rgba() {
        return `rgb(r: ${this.r}, g: ${this.g}, b: ${this.b}, a: ${this.a})`
    }

    constructor(color: string) {
        this._throwIfNotSupported(color)
        if (this._isRgb(color)) {
            this._parseRgba(color);
            this._convertToHsl();
        }
        if (this._isHsl(color)) {
            this._parseHsla(color);
            this._convertToRgb();
        }

        if (this._isHex(color)) {
            this._parseHex(color);
            this._convertToHsl();
        }
        if (this._isAlias(color)) {
            this._parseAlias(color);
            this._convertToHsl();
        }
    }
}

