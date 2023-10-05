import { usePlayerData } from "../../hooks/usePlayerData";

export const Pawns = () => {
    const { allPlayersStates } = usePlayerData(null);
    return (
        <>
            allPlayersStates.map({
                name, money, specialCards, color, fieldNr, isInPosition, nrTurnsToWait, isGameLost
            }) => {
                    return (<Pawn color={color}/>)
            }
        </>
    )
}