import { BLUE, GREEN, RED, YELLOW } from "../../Data/const";
import { tColors } from "../../Data/types";
import { iPoint, iLocationData } from "./types"

const getCenterCords = ({top, left, width, height}: iLocationData): iPoint => {
    const x = top + (height / 2);
    const y = left + (width / 2);
    return { x, y }
}

const getNewSize= ({top, left, width, height}: iLocationData) => {
    const {x, y} = getCenterCords({top, left, width, height})
    const newWidth = y - left;
    const newHeight = x - height;
    return {newHeight, newWidth}
}

const getTopLeftQuarter = ({top, left, width, height}: iLocationData) => {
    const {newWidth, newHeight} = getNewSize({top, left, width, height})
    return {
        top, left, width: newWidth, height: newHeight
    }
}
const getTopRightQuarter = ({top, left, width, height}: iLocationData) => {
    const {newWidth, newHeight} = getNewSize({top, left, width, height})
    return {
        top, left: left + newWidth, width: newWidth, height: newHeight,
    }
}
const getBottomLeftQuarter = ({top, left, width, height}: iLocationData) => {
    const {newWidth, newHeight} = getNewSize({top, left, width, height})
    return {
        top: top + newHeight, left, width: newWidth, height: newHeight
    }
}
const getBottmRightQuarter = ({top, left, width, height}: iLocationData) => {
    const {newWidth, newHeight} = getNewSize({top, left, width, height})
    return {
        top: top + newHeight,
        left: left + newWidth,
        width: newWidth,
        height: newHeight,
    }
}

const getPawnLocationInQuarter = ({top, left, width, height}: iLocationData, pawnDiameter: number): iPoint => {
    // pawnDiameter: width and size of a pawn are equal
    const {x, y} = getCenterCords({top, left, width, height});
    const pawnRadius = pawnDiameter / 2;
    return {
        x: x - pawnRadius,
        y: y - pawnRadius,
    }
}

const PAWN_LOCATION_MAPPING = {
    [BLUE]: getTopLeftQuarter,
    [RED]: getTopRightQuarter,
    [YELLOW]: getBottomLeftQuarter,
    [GREEN]: getBottmRightQuarter,
}


export const getPawnLocation = ({top, left, width, height}: iLocationData, pawnDiameter: number, pawnColor: tColors) => {
    const quaterCalculationFunction = PAWN_LOCATION_MAPPING[pawnColor];
    const quaterCords = quaterCalculationFunction({top, left, width, height});
    const pawnLocation = getPawnLocationInQuarter(quaterCords, pawnDiameter);
    return pawnLocation;
}