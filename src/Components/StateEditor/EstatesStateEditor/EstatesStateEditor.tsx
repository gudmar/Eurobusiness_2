import { FC, useEffect, useState } from "react";
import { useThemesAPI } from "../../../Contexts/ThemeContext";
import { CITY, PLANT, RAILWAY } from "../../../Data/const";
import { tColors, tEstateTypes, tOwner } from "../../../Data/types";
import { isDefined } from "../../../Functions/isDefined";
import { usePlayersColors } from "../../../hooks/usePlayersColors";
import { getBoard } from "../../../Logic/BoardCaretaker";
import { tEstateField } from "../../../Logic/boardTypes";
import { StateEditorForm } from "../../StateEditorForm/StateEditorForm";
import { CollapsedEditorEntry } from "../../StateEditorForm/StateEditorFormEntry";
import { EstateEditorFieldNames } from "./const";
import { EditIsPlegded, EditNrHotels, EditNrHouses, EditOwner } from "./EditFields";
import { useStyles } from "./styles";
import { iEditEstateArgs, tEditEstate, tEstateArgs, tEstatesTestFieldEditArgs, tGetEstateClassesArgs, tSelectedEstate, tSetSelectEstateFunction } from "./types";
import { useEstatesEditor } from "./useEstatesEditor";
import { useSelectEstate } from "./useSelectEstate";

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

const EstatesTestFieldEdit = (args: tEstatesTestFieldEditArgs ) => {
    const title = args.title;
    
    switch (title) {
        case EstateEditorFieldNames.owner: return (
            <EditOwner {...args}/>
        )
        case EstateEditorFieldNames.nrOfHotels: return (
            <EditNrHotels {...args}/>
        )
        case EstateEditorFieldNames.nrOfHouses: return (
            <EditNrHouses {...args}/>
        )
        case EstateEditorFieldNames.isPlegded: return (
            <EditIsPlegded {...args}/>
        )
        default: return <></>
    }

}


const EditEstate = ({selectedEstate}: tEditEstate) => {
    const { theme } = useThemesAPI();
    const classes: {[key:string]: string} = useStyles(theme as any);
    const logSelectedEstatesState = () => {
        const state = selectedEstate?.state;
    }
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


    if (!selectedEstate) return <></>
    return (
        <div className={classes.limitWidth}>
            <StateEditorForm
                headline = {`Edit ${selectedEstate.name}`}
                logAction = {logSelectedEstatesState}
            >
                {fieldsOrder.map(({title, value, handler}) => {
                        const child = <EstatesTestFieldEdit
                                title={title}
                                value={(value ?? '').toString()}
                                handler={handler}
                                owner={owner}
                                nrOfHotels={nrOfHotels}
                                nrOfHouses={nrOfHouse}
                                isPlegeded={isPlegded}
                            />
                        return (
                                <CollapsedEditorEntry
                                    title = {title}
                                    currentValue = {(value ?? '').toString()}
                                >
                                    {handler && child }
                                </CollapsedEditorEntry>
                            )
                        }
                    )
                }
            </StateEditorForm>
        </div>
    )    
}

export const EstatesStateEditor = () => {
    const { theme } = useThemesAPI();
    const classes: {[key:string]: string} = useStyles(theme as any);
    const {
        estateTypes,
        selectEstate,
        selectedEstate,
        selectedEstateName,
        filteredEstates,
        // playersColors,
        estateOwners,
        setSearchPattern,
        toggleEstateType,
        toggleOwner,
        searchPattern,
        ownersFilter,
        estateTypesFilter,
    } = useSelectEstate()


    return (
        <div className={classes.rows}>
            <h2 className={classes.headline}>Estates editor</h2>
            <div className={classes.estatesFiltering}>
                <fieldset>
                    <legend>Search estates</legend>
                    <input
                        className={classes.searchBox}
                        type='text'
                        value={searchPattern}
                        onChange={(e) => setSearchPattern(e.target.value)}
                    />
                </fieldset>
                <fieldset>
                    <legend>Owned by player</legend>
                    <ul>
                        {
                            estateOwners.map((estateOwner: tOwner) => <li key={estateOwner}>
                                <input 
                                    id={`${estateOwner}`} 
                                    type='checkbox' 
                                    onClick={() => toggleOwner(estateOwner)}
                                    checked={ ownersFilter.includes(estateOwner) }
                                />
                                <label htmlFor={`${estateOwner}`}>{estateOwner}</label>

                            </li>)
                        }
                    </ul>
                </fieldset>
                <fieldset>
                    <legend>Estate types</legend>
                    <ul>
                        {
                            estateTypes.map((type) => <li key={type}>
                                <input 
                                    id = {`${type}`} 
                                    type='checkbox' 
                                    onClick={() => toggleEstateType(type)}
                                    checked={estateTypesFilter.includes(type)}
                                />
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