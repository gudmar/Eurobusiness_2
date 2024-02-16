import { round } from "../round";
import { tRgb } from "./types";

export const rgb2hsl = ({r: red, g: green, b: blue}: tRgb) => {
    const {r, g, b} = normalize(red, green, blue);
    const maxColorIngr = Math.max(r, g, b);
    const minColorIngr = Math.min(r, g, b);
    const delta = maxColorIngr - minColorIngr;
    const roundHue = function(hue: number):number{
      const value = Math.round(hue * 60);
      return value < 0 ? value + 360 : value
    }
    const calculateHue = function(): number{
      if (delta == 0) return 0;
      if (maxColorIngr == r) return roundHue(((g - b) / delta) % 6);
      if (maxColorIngr == g) return roundHue(((b - r) / delta) + 2);
      return roundHue((r - g) / delta + 4);
    }
    const calculateLight = function() {
      return (maxColorIngr + minColorIngr) / 2;
    }
    const calculateSaturation = function() {
      return delta == 0 ? 0 : delta / (1 - Math.abs(2 * calculateLight() - 1));
    }
    return {h: round(calculateHue(), 2), s: round(calculateSaturation(), 2), l: round(calculateLight(), 2)}
}

const normalize = (r: number, g: number, b: number) => {
    return {r: r / 255, g: g / 255, b: b / 255}
}
