import { tPlayerName } from "../Components/Pawns/types";
import { tBoardFieldPosition } from "../Contexts/fieldSizes/types";
import { useFieldSize } from "../Contexts/fieldSizes/useFieldSizes"
import { PLAYER_1, PLAYER_2, PLAYER_3, PLAYER_4 } from "../Data/const";

type tQuater = {widthMax: number, heightMax: number, widthMin: number, heightMin: number}

const getPawnSize = (quater: tQuater, fieldSizes: tBoardFieldPosition): tBoardFieldPosition => {
    const {widthMax, heightMax, widthMin, heightMin} = quater;
    const {top, left} = fieldSizes;
    const pawnDiameter = (widthMax - widthMin) / 3;
    const pawnOffset = -pawnDiameter / 2;
    const pawnTop = top + (heightMax - heightMin) / 2 + pawnOffset;
    const pawnLeft = left + (widthMax - widthMin) / 2 + pawnOffset;
    const result = {
        top: pawnTop, left: pawnLeft, width: pawnDiameter, height: pawnDiameter
    }
    return result;
}

const calculatePawnCords = (pawnName: tPlayerName, fieldSizes: tBoardFieldPosition): tBoardFieldPosition => {
    const { width, height} = fieldSizes;
    const q1: tQuater = {widthMax: width / 2, heightMin: 0, widthMin: 0, heightMax: height / 2};
    const q2: tQuater = {widthMax: width, heightMin: 0, widthMin: width / 2, heightMax: height / 2};
    const q3: tQuater = {widthMax: width / 2, heightMin: height / 2, widthMin: 0, heightMax: height};
    const q4: tQuater = {widthMax: width, heightMin: height / 2, widthMin: width / 2, heightMax: height};
    
    switch(pawnName) {
        case PLAYER_1: {
            const result = getPawnSize(q1, fieldSizes);
            return result;
        };
        case PLAYER_2: {
            const result = getPawnSize(q2, fieldSizes);
            return result;
        };
        case PLAYER_3: {
            const result = getPawnSize(q3, fieldSizes);
            return result;
        };
        case PLAYER_4: {
            const result = getPawnSize(q4, fieldSizes);
            return result;
        };
        default: throw new Error(`Player named ${pawnName} not possible`)
    }
}

export const usePawnCordinance = (pawnName: tPlayerName, fieldIndex: number) => {
    const { state } = useFieldSize();
    const fieldSizes = state[fieldIndex];
    const pawnCords = calculatePawnCords(pawnName, fieldSizes)
    return pawnCords;
}
