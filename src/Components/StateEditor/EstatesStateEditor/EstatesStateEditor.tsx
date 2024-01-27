import { useState } from "react";
import { NR_OF_HOTELS } from "../../../Constants/constants";
import { useThemesAPI } from "../../../Contexts/ThemeContext";
import { CITY, PLANT, RAILWAY } from "../../../Data/const";
import { tBoardField, tColors, tEstateTypes } from "../../../Data/types";
import { isDefined } from "../../../Functions/isDefined";
import { usePlayersColors } from "../../../hooks/usePlayersColors";
import { BoardCreator, getBoard } from "../../../Logic/BoardCaretaker";
import { tEstateField } from "../../../Logic/boardTypes";
import { StateEditorForm } from "../../StateEditorForm/StateEditorForm";
import { StateEditorEntry } from "../../StateEditorForm/StateEditorFormEntry";
import { EstateEditorFieldNames } from "./const";
import { useStyles } from "./styles";
import { iEditEstateArgs, tEditEstate, tEstateArgs, tGetEstateClassesArgs, tSelectedEstate, tSetSelectEstateFunction } from "./types";
import { useEstatesEditor } from "./useEstatesEditor";

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

const EstatesTestFieldEdit = ({title, value, handler}: tEstatesTestFieldEditArgs ) => {
    
    return (
        <></>
    )
}


const EditEstate = ({selectedEstate}: tEditEstate) => {
    console.log(selectedEstate)
    const {
        estateColor,
        country,
        hotelPrice,
        housePrice,
        index,
        isPlegded,
        mortgage,
        name,
        nrOfHouse,
        nrOfHotels,
        owner,
        price,
        type,
        visit,
        setIsPlegded,
        setNrOfHotels,
        setNrOfHouses,
        setOwner,
    } = useEstatesEditor(selectedEstate);

    const fieldsOrder = [
        { title: EstateEditorFieldNames.name, value: name, },
        { title: EstateEditorFieldNames.type, value: type, },
        { title: EstateEditorFieldNames.owner, value: owner, handler: setOwner },
        { title: EstateEditorFieldNames.price, value: price, },
        { title: EstateEditorFieldNames.visit, value: visit, },
        { title: EstateEditorFieldNames.mortgage, value: mortgage, },
        { title: EstateEditorFieldNames.isPlegded, value: isPlegded, handler: setIsPlegded},
        { title: EstateEditorFieldNames.country, value: country, },
        { title: EstateEditorFieldNames.nrOfHouses, value: nrOfHouse, handler: setNrOfHouses},
        { title: EstateEditorFieldNames.housePrice, value: housePrice,},
        { title: EstateEditorFieldNames.nrOfHotels, value: nrOfHotels, handler: setNrOfHotels},
        { title: EstateEditorFieldNames.hotelPrice, value: hotelPrice },
    ].filter(({value}) => isDefined(value) )

    const {
    } = useEstatesEditor(selectedEstate);

    if (!selectedEstate) return <></>
    return (
        <StateEditorForm
            headline = {`Edit ${selectedEstate.name}`} 
            logAction = {() => {}}
        >
            {fieldsOrder.map(({title, value, handler}) =>
                    <StateEditorEntry
                        title = {title}
                        currentValue = {(value ?? '').toString()}
                    >{}</StateEditorEntry>
            )
            }
        </StateEditorForm>
        // <ul>
        //     {
        //         fieldsOrder.map(({title, value, handler}) => <EstatesTestFieldEdit title={title} value={value} handler={handler} />)
        //     }
        // </ul>
    )
}

type tEstateFieldType = any;

type tEstatesTestFieldEditArgs = {
    title: string, value: tEstateFieldType, handler?: (val: tEstateFieldType) => void
}

const useSelectEstate = () => {
    const estateTypes = [
        {type: CITY},
        {type: PLANT},
        {type: RAILWAY},
    ]
    const boardEndpoint = getBoard();
    
    const boardCaretaker = boardEndpoint.provideCaretaker();
    const estates = boardEndpoint.estates.filter(({type}) => [CITY, PLANT, RAILWAY].includes(type)) as tEstateField[];
    const playersColors = usePlayersColors();
    const [selectedEstate, setSelectedEstate] = useState<tSelectedEstate>(null);
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
                <EditEstate selectedEstate={selectedEstate}/>
            </div>
        </div>
    )
}