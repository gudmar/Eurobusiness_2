import { FC, useEffect, useState } from "react"
import { getTestableOptions } from "../../Logic/Journalist/getOptions";
import { tObject } from "../../Logic/types"
import { getGameState } from "../../Functions/PersistRetrieveGameState/utils";
import { Button } from "../Button/Button";
import { OptionTypes } from "../../Logic/Journalist/types";
import { isDefinedNotEmptyString } from "../../Functions/isDefined";

const useGameOptions = (playerName: string) => {
    const [options, setOptions] = useState<tObject<any>>({});
    const refreshGameState = () => {
        const currentGameState = getGameState()
        const options = getTestableOptions(currentGameState, playerName);
        setOptions(options);
    }
    useEffect(refreshGameState, []);
    return {
        options, refreshGameState,
    }
}

type tActionType = {
    payload?: any,
    type: OptionTypes,
}

type tEstate = {
    name: string,
    reason?: string,
    actions?: tActionType[]
};

type tEstateProps = {
    estate: tEstate,
    isOpen: boolean,
}

const Estate = ({estate, isOpen}: tEstateProps) => {
    return (<div>{estate.name}</div>)
}

type tEstatesProps = {estates: tEstate[]}

const Estates = ({estates}: tEstatesProps) => {
    return (
        <>
            {
                estates.map((estate) => <Estate estate = {estate} isOpen={true}/>)
            }
        </>
    )
}

type iSingleCountryProps = {
    country: tObject<any>,
    countryName: string,
}

const getEstatesPropsFromEntries = (country: tObject<any>) => {
    const entreis = Object.entries(country);
    const getSingleEstate = ([key, value]: [key: string, value: tEstate]) => {
        const {actions, reason} = value;
        return ({ name: key, actions, reason, })
    }
    const props = entreis.map(getSingleEstate);
    return props;
}

const SingleCountry = ({country, countryName}: iSingleCountryProps) => {
    const classes: any = null
    const estatesProps = getEstatesPropsFromEntries(country)
    return (
        <div className={classes.country}>
            <div className={classes.countryName}>{countryName}</div>
            <Estates estates={estatesProps}/>
        </div>
    )
}


const withRejections = (ActionComponent: FC<tObject<any>>) => ({ country }: tObject<any>) => {

}

const withDisplayOptionsAsCountries = (EstateOptions: FC<tObject<any>>) => (props: tObject<any>) => {
    const countries = Object.keys(props.options);
    return (
        <>
            {
                countries.map((key: string) => (<SingleCountry country={props.options[key]} countryName = {key}/>))
            }
        </>
    )
}

const DisplayOptionsAsCountries = (props: tObject<any>) => {
    const countries = Object.keys(props.options);
    return (
        <>
            {
                countries.map((key: string) => (<SingleCountry country={props.options[key]} countryName = {key}/>))
            }
        </>
    )
}

const withPresentReason = (Actions: FC<tObject<any>>) => ({reason, actions}: tObject<any>) => {
    if (reason) return (<>{reason}</>)
    return (
        <Actions actions={actions} />
    )
}

const EndTurnActions = ({actions}: tObject<any>) => {
    return (
        <div>
            <h3>Sure you want to end turn?</h3>
            <Button disabled={false} action={()=>{}} label={'Yes'} />
            <Button disabled={false} action={()=>{}} label={'No'} />
        </div>
    )
}

const EndTurnOptions = withPresentReason(EndTurnActions);

const AcceptModneyActions = ({actions}: tObject<any>) => {
    return (
        <div>
            <h3>You have to accept payment</h3>
            <Button disabled={false} action={() => {}} label={'Accept'}/>
        </div>
    )
}

const AcceptMoney = withPresentReason(AcceptModneyActions);

const optionKeyToButtonPropsMap = {
    buyBuildings: {
        buttonName: 'Buy buildings',
        component: DisplayOptionsAsCountries,
    },
    endTurn: {
        buttonName: 'End turn',
        component: EndTurnOptions,
    },
    getMoney: {
        buttonName: 'Get money',
        component: AcceptMoney,
    },
    plegdeEstates: {
        buttonName: 'Plegde estates',
        component: 
    }
}

export const GameOptions = ({playerName}: any) => {
    const {options, refreshGameState} = useGameOptions(playerName);
    const optionsEntries = Object.entries(options);
    const getOptionButton = ([key, value]: [string, any]) => {
        <Button></Button>
    }
    return (
        optionsEntries.map(getOptionButton)
    )
}
