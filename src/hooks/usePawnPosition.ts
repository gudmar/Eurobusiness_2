import { tColors } from "../Data/types";
import { usePawnFieldIndex } from "./usePawnFieldIndex";

export const usePawnPosition = (color: tColors) => {
    const index = usePawnFieldIndex(color);
    const position = {x: 100, y: 200}
    return position
}