import { useEffect, useState } from "react";
import { iPawnPosition } from "../../Components/Pawns/types";
import { tColors } from "../../Data/types";
import { usePawnFieldIndex } from "../../hooks/usePawnFieldIndex";
import { useThemeConverter } from "../../hooks/useThemeConverter";
import { useFieldSizeGetters } from "./useFieldLocation";

const NOT_VALID_POSITION = {top: 0, left: 0}

export const useCalculatedPawnPosition = (color: tColors ) => {
    const {pawnSize} = useThemeConverter();

    // throw new Error('pawn size should be set in one place, theme seems best place')
    const fieldIndex = usePawnFieldIndex(color)
    const [position, setPosition] = useState<iPawnPosition>(NOT_VALID_POSITION)
    const { calculatePawnLocation } = useFieldSizeGetters();
    useEffect(() => {
        if (calculatePawnLocation) {
            const {x, y} = calculatePawnLocation(fieldIndex, pawnSize, color);
            setPosition({left: y, top: x})
        }
    }, [color, fieldIndex, calculatePawnLocation])
    // useEffect(() => {
    //     console.log(`Player ${color} position: top ${position.top}, left ${position.left}`)
    // }, [position, color])
    return position;
}