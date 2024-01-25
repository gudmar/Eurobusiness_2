import { useState } from "react";
import { useThemesAPI } from "../../../Contexts/ThemeContext";
import { CITY, PLANT, RAILWAY } from "../../../Data/const";
import { tBoardField, tColors, tEstateTypes } from "../../../Data/types";
import { usePlayersColors } from "../../../hooks/usePlayersColors";
import { BoardCreator, getBoard } from "../../../Logic/BoardCaretaker";
import { tField } from "../../../Logic/boardTypes";
import { useStyles } from "./styles";

type tSelectedEstate = tField | null;
type tSetSelectEstateFunction = (estate: tSelectedEstate) => void


type tEstateArgs = {
    estate: tField,
    selectedEstateName: string,
    setSelectEstate: tSetSelectEstateFunction,
}

type tGetEstateClassesArgs = {
    type: tEstateTypes, isSelected: boolean, classes: {[key:string]: string}
}

const getEstateClasses = (args: tGetEstateClassesArgs) => {
    const {type, isSelected, classes} = args;
    const types = {
        [CITY]: `${classes.listCity}`,
        [PLANT]: `${classes.listPlant}`,
        [RAILWAY]: `${classes.listRailway}`,
    }
    const isSelectedClass = isSelected ? `${classes.selected}` : `${classes.notSelected}`;
    const result = `${types[type]} ${isSelectedClass} ${classes.listItem}`
    return result;
}

const Estate = ({estate, selectedEstateName, setSelectEstate}: tEstateArgs) => {
    const { theme } = useThemesAPI();
    const classes: {[key:string]: string} = useStyles(theme as any);
    const {type, name} = estate;
    const estateType = type as tEstateTypes;
    const isSelected = name === selectedEstateName;
    const appliedClasses = getEstateClasses({type: estateType, isSelected, classes})
    return (
        <li className={appliedClasses} onClick={() => setSelectEstate(estate)}>{estate.name}</li>
    )
}

const EstatesList = ({estates, selectedEstate, setSelectEstate }: iEditEstateArgs) => {
    const { theme } = useThemesAPI();
    const classes: {[key:string]: string} = useStyles(theme as any);
    const selectedEstateName = selectedEstate?.name || '';

    return (
        <div className={classes.scrollContainer}>
            <ul className={classes.list}>
                { estates.map((estate) => <Estate 
                    key={estate.name}
                    estate={estate}
                    selectedEstateName = {selectedEstateName}
                    setSelectEstate={setSelectEstate}
                />) }
            </ul>
        </div>
    )
}

interface iEditEstateArgs {
    estates: tField[],
    selectedEstate: tSelectedEstate,
    setSelectEstate: tSetSelectEstateFunction,
}

const EditEstate = ({}) => {
    return (
        <>
        </>
    )
}

const useSelectEstate = () => {
    const estateTypes = [
        {type: CITY},
        {type: PLANT},
        {type: RAILWAY},
    ]
    const boardEndpoint = getBoard();
    
    const boardCaretaker = boardEndpoint.provideCaretaker();
    const estates = boardEndpoint.estates;
    const playersColors = usePlayersColors();
    const [selectedEstate, setSelectedEstate] = useState<tField | null>(null);
    const selectEstate = (estate: tSelectedEstate) => estate?.name ? setSelectedEstate(estate) : null;
    const setSearchPattern = (pattern:string) => {};
    const togglePlayerColorForFilter = (color: tColors) => {}
    const toggleEstatesTypeForFilter = (estateType: tEstateTypes) => {}
    return {
        estateTypes,
        selectEstate,
        selectedEstate,
        selectedEstateName: selectEstate?.name || '',
        filteredEstates: estates,
        playersColors,
        setSearchPattern,
        toggleEstatesTypeForFilter,
        togglePlayerColorForFilter,
    }
}

const useEstatesEditor = (editedEstate: tField | null) => {

    const boardEndpoint = getBoard();    
    const boardCaretaker = boardEndpoint.provideCaretaker();
    const estates = boardEndpoint.estates;
    return {
        estates,
    }
}

export const EstatesStateEditor = ({name, setActive, currentActiveSection}: any) => {
    const { theme } = useThemesAPI();
    const classes: {[key:string]: string} = useStyles(theme as any);
    const {
        estateTypes,
        selectEstate,
        selectedEstate,
        selectedEstateName,
        filteredEstates,
        playersColors,
        setSearchPattern,
        toggleEstatesTypeForFilter,
        togglePlayerColorForFilter,
    } = useSelectEstate()
    const {
    } = useEstatesEditor(selectedEstate);
    return (
        <div className={classes.rows}>
            <h2 className={classes.headline}>Estates editor</h2>
            <div className={classes.estatesFiltering}>
                <fieldset>
                    <legend>Search estates</legend>
                    <input className={classes.searchBox} type='text'></input>
                </fieldset>
                <fieldset>
                    <legend>Owned by player</legend>
                    <ul>
                        {
                            playersColors.map((color: tColors) => <li key={color}>
                                <input id={`${color}`} type='checkbox' />
                                <label htmlFor={`${color}`}>{color}</label>

                            </li>)
                        }
                    </ul>
                </fieldset>
                <fieldset>
                    <legend>Estate types</legend>
                    <ul>
                        {
                            estateTypes.map(({type}) => <li key={type}>
                                <input id = {`${type}`} type='checkbox'/>
                                <label htmlFor={`${type}`}>{type}</label>
                            </li>)
                        }
                    </ul>
                </fieldset>
            </div>
            <div className={classes.columns}>
                <EstatesList estates = {filteredEstates} selectedEstate={selectedEstate} setSelectEstate={selectEstate}/>
                <EditEstate />
            </div>
        </div>
    )
}