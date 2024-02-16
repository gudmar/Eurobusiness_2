import { tHsl } from "./types";

export const hsl2rgb = ({h, s, l}: tHsl) => {
    // https://www.30secondsofcode.org/js/s/hsl-to-rgb/
    const k = (n: number) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) =>
      l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    const roundedF = (n:number) => Math.ceil(255 * f(n));

    return {r:roundedF(0), g:roundedF(8), b:roundedF(4)};
  };
