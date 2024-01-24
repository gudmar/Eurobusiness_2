import { useThemesAPI } from "../../../Contexts/ThemeContext";
import { CITY, PLANT, RAILWAY } from "../../../Data/const";
import { tBoardField, tColors, tEstateTypes } from "../../../Data/types";
import { usePlayersColors } from "../../../hooks/usePlayersColors";
import { BoardCreator, getBoard } from "../../../Logic/BoardCaretaker";
import { tField } from "../../../Logic/boardTypes";
import { useStyles } from "./styles";

type tEstateArgs = {
    estate: tField,
    selectedEstateName: string,
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

const Estate = ({estate, selectedEstateName}: tEstateArgs) => {
    const { theme } = useThemesAPI();
    const classes: {[key:string]: string} = useStyles(theme as any);
    const {type, name} = estate;
    const estateType = type as tEstateTypes;
    const isSelected = name === selectedEstateName;
    const appliedClasses = getEstateClasses({type: estateType, isSelected, classes})
    return (
        <li className={appliedClasses}>{estate.name}</li>
    )
}

const EstatesList = ({estates, selectedEstateName }: iEditEstateArgs) => {
    const { theme } = useThemesAPI();
    const classes: {[key:string]: string} = useStyles(theme as any);

    return (
        <div className={classes.scrollContainer}>
            <ul className={classes.list}>
                { estates.map((estate) => <Estate key={estate.name} estate={estate} selectedEstateName = {selectedEstateName}/>) }
            </ul>
        </div>
    )
}

interface iEditEstateArgs {
    estates: tField[],
    selectedEstateName: string,
}

const EditEstate = ({}) => {
    return (
        <>
        </>
    )
}

const useEstatesEditor = () => {
    const boardEndpoint = getBoard();
    const playersColors = usePlayersColors();
    const boardCaretaker = boardEndpoint.provideCaretaker();
    const estates = boardEndpoint.estates;
    return {
        estates,
        selectedEstateName: '',
        playersColors,
    }
}

export const EstatesStateEditor = ({name, setActive, currentActiveSection}: any) => {
    const { theme } = useThemesAPI();
    const classes: {[key:string]: string} = useStyles(theme as any);
    const estateTypes = [
        {type: CITY},
        {type: PLANT},
        {type: RAILWAY},
    ]
    const {
        estates,
        selectedEstateName,
        playersColors,
    } = useEstatesEditor();
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
                <EstatesList estates = {estates} selectedEstateName={selectedEstateName} />
                <EditEstate />
            </div>
        </div>
    )
}