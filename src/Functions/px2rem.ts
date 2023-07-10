export const px2rem = (px:number, precision = 2): string => {
    const pxToRemFactor = 1 / 16;
    const inRem = pxToRemFactor * px;
    const roundedInRem = inRem.toFixed(precision);
    return `${roundedInRem}.rem`
}