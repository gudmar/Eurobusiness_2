import { tColors } from "../../Data/types";

const Pawn = ({color}: {color: tColors}) => {
    const {x, y} = usePawnPosition(color);
    const fieldIndex = usePawnFieldIndex(color);

}