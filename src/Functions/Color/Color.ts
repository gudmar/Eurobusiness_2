import { COLOR_ALIACES, tColorAliace, tColorAliaces } from "./colorAliases";

type tGetFromArrayFunction = (arr: number[]) => void;

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

export class Color {
    private _h: number = 0;
    private _l: number = 0;
    private _s: number = 0;
    private _r: number = 0;
    private _g: number = 0;
    private _b: number = 0;
    private _a: number = 0;
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
        this._h = h;
        this._s = s;
        this._l = l;
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

    constructor(color: string) {
        this._throwIfNotSupported(color)
        if (this._isRgb(color)) this._parseRgba(color)
        if (this._isHsl(color)) this._parseHsla(color)
        if (this._isHex(color)) this._parseHex(color);
        if (this._isAlias(color)) this._parseAlias(color);
    }

}

