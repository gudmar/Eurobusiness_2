import { LOST_PLAYER_DISPLAY_COLOR } from "../../Constants/constants";
import { usePlayerData } from "../../hooks/usePlayerData";
import { Pawn } from "./Pawn";
import { iPawnArgs } from "./types";

export const Pawns = ({playerDescriptors}: iPawnArgs) => {
    const { allPlayersStates } = usePlayerData(playerDescriptors);
    return (
        <>
            {allPlayersStates?.map(({
                name, money, specialCards, color, fieldNr, isInPrison, nrTurnsToWait, isGameLost
            }: any) => {
                    return (<Pawn key={color} isLost={isGameLost} color={color}/>)
            })}
        </>
    )
}