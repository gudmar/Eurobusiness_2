import { usePlayerData } from "../../hooks/usePlayerData";
import { iPlayerState } from "../../Logic/Players/types";
import { Pawn } from "./Pawn";
import { iPawnArgs } from "./types";

export const Pawns = ({playerDescriptors}: iPawnArgs) => {
    const { allPlayersStates } = usePlayerData(playerDescriptors);
    console.log(playerDescriptors, allPlayersStates)
    return (
        <>
            {allPlayersStates?.map(({
                name, money, specialCards, color, fieldNr, isInPrison, nrTurnsToWait, isGameLost
            }: iPlayerState) => {
                    return (<Pawn key={color} color={color}/>)
            })}
        </>
    )
}