import { BANK } from "../Data/const";
import { tOwner } from "../Data/types";
import { usePlayersColors } from "./usePlayersColors";

export const useEstateOwners = () => {
    const colors = usePlayersColors();
    const owners: tOwner[] = [...colors, BANK]
    return owners;
}