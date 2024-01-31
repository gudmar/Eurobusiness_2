import { useEffect, useState } from "react";
import { BANK } from "../../../Data/const";
import { tOwner } from "../../../Data/types";
import { usePlayersColors } from "../../../hooks/usePlayersColors";
import { Checkbox } from "../../Interactors/Checkbox/Checkbox";
import { NumberInput } from "../../Interactors/NumberInput/NumberInput";
import { SingleSelectFromList } from "../../Interactors/SingleSelectFromList/SingleSelectFromList";
import { tEstatesTestFieldEditArgs } from "./types";

const getNrOfHousesTooltip = (args: tEstatesTestFieldEditArgs ) => {
    const { owner, nrOfHotels, nrOfHouses, isPlegeded } = args;
    if (owner === BANK) return 'Cannot set houses when bank is an owner'
    if (isPlegeded) return 'Cannot set houses on plegded estate'
    if (nrOfHotels !== 0) return 'Cannot set houses when there is a hotel'
    return ''
}
export const EditNrHouses = (args: tEstatesTestFieldEditArgs ) => {
    const {title, value, handler, owner, nrOfHotels, nrOfHouses, isPlegeded} = args
    const tooltip = getNrOfHousesTooltip(args);
    const isEnabled = tooltip === '';
    return (
        <NumberInput 
            value={value}
            label={"Nr of houses"}
            onChange={handler || (() => {})}
            isRequired={false}
            min={0}
            max={0}
            step={1}
            disabledTooltip={tooltip}
            enableConditionFunction={() => isEnabled}
        />
    )    
}

const getNrOfHotelsTooltip = (args: tEstatesTestFieldEditArgs ) => {
    const { owner, nrOfHotels, nrOfHouses, isPlegeded } = args;
    if (owner === BANK) return 'Cannot set houses when bank is an owner'
    if (isPlegeded) return 'Cannot set houses on plegded estate'
    if (nrOfHouses !== 0) return 'Cannot set houses when there is a house'
    return ''
}
export const EditNrHotels = (args: tEstatesTestFieldEditArgs ) => {
    const {title, value, handler, owner, nrOfHotels, nrOfHouses, isPlegeded} = args
    const tooltip = getNrOfHotelsTooltip(args);
    const isEnabled = tooltip === '';
    return (
        <NumberInput
            value={value}
            label={"Nr of hotels"}
            onChange={handler || (() => {})}
            isRequired={false}
            min={0}
            max={0}
            step={1}
            disabledTooltip={tooltip}
            enableConditionFunction={() => isEnabled}
        />
    )    
}

const getIsPlegdedTooltip = (args: tEstatesTestFieldEditArgs ) => {
    const { owner, nrOfHotels, nrOfHouses, isPlegeded } = args;
    if (owner === BANK) return 'Cannot plegde estate owned by the bank'
    return ''
}

export const EditIsPlegded = (args: tEstatesTestFieldEditArgs ) => {
    const {title, value, handler, owner, nrOfHotels, nrOfHouses, isPlegeded} = args
    const tooltip = getIsPlegdedTooltip(args);
    const isEnabled = tooltip === '';
    const checked = value === 'false' ? false : true;
    return (
        <Checkbox
            checked={checked}
            label={"Is plegded"}
            onChange={handler || (() => {})}
            disabledTooltip={tooltip}
            enableConditionFunction={() => isEnabled}
        />
    )    
}

const getOwnerTooltip = (args: tEstatesTestFieldEditArgs ) => {
    const { owner, nrOfHotels, nrOfHouses, isPlegeded } = args;
    return ''
}
export const EditOwner = (args: tEstatesTestFieldEditArgs ) => {
    // const {title, value, handler, nrOfHotels, nrOfHouses, isPlegeded} = args
    const [owner, setOwner] = useState<any>(null);
    const [handler, setHandler] = useState<any>(null);
    useEffect(() => {
        const {title, value, handler, owner, nrOfHotels, nrOfHouses, isPlegeded} = args
        console.log('Args of EditNrHotels changed',handler, owner);
        // const owner = args.owner;
        setHandler(handler)
        setOwner(owner)
    }, [args])
    useEffect(() => console.log('Handler changd', handler, [handler]))
    const playersColors = usePlayersColors();
    const players = [...playersColors, BANK];
    const tooltip = getOwnerTooltip(args);
    const isEnabled = tooltip === '';
    useEffect(() => console.log('Owner in EditOwner', owner), [owner])
    return (
        <SingleSelectFromList
            small={true}
            key={owner}
            defaultValue={owner}
            label={`Owner ${owner}`}
            onSelect={handler || (() => {})}
            items={players}
            disabledTooltip={tooltip}
            enableConditionFunction={() => isEnabled}
        />
    )    
}