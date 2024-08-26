import { tEstate } from "../../Data/types";
import { BoardCaretaker } from "../../Logic/BoardCaretaker";
import { Players } from "../../Logic/Players/Players";
import { Button, ButtonColorScheme } from "../Button/Button";
import { bankOwnedEstatesActions, tBankOwnedEstatesActionsKeys, tOptionsComponentArgs } from "./types";

export const HandleBankOwnedEstate = ({ gameOptions, refreshFunction }: tOptionsComponentArgs) => {
    const { handleStayOnBankOwnedEstate } = gameOptions;
    if (!handleStayOnBankOwnedEstate) return null;
    const { actions, reason } = handleStayOnBankOwnedEstate;
    if (reason) return <>{reason}</>
    return (
        <div>
            {
                actions.map(({type}: {type: tBankOwnedEstatesActionsKeys}) => 
                    <Button
                        colorVariant={ButtonColorScheme.light}
                        label={type}
                        action={
                            () => {
                                const currentPlayerField = Players.instance.currentPlayer.fieldNr;
                                const estateName = BoardCaretaker.getFieldByIndex(currentPlayerField)!.name as unknown as tEstate;
                                if (estateName){
                                    bankOwnedEstatesActions[type]({playerName: gameOptions.playerName, estateName, refreshFunction})
                                }
                            }
                        }/>
                )
            }
        </div>
    )
}
