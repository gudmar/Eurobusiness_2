type tGetFromArrayFunction = (arr: number[]) => void;

export enum ColorErrors {
    hexNotProperSize = 'Hexadecimal number is not of a proper size',
}

export const hexAlpha2decAlpha = (hexAlpha: string) => {
    return 0;
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

    private _parseHex(color: string){
        //1 to 17
    }

    constructor(color: string) {
        if (this._isRgb(color)) this._parseRgba(color)
        if (this._isHsl(color)) this._parseHsla(color)
    }

}

