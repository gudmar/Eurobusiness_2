import { AMSTERDAM, ATENY, BARCELONA, BONN, BRUKSELA, CHANCE_BLUE_BOTTOM, CHANCE_BLUE_LEFT, CHANCE_BLUE_RIGHT, CHANCE_RED_BOTTOM, CHANCE_RED_RIGHT, CHANCE_RED_TOP, EAST_RAILWAYS, FRANKFURT, FREE_PARK, GLASGOW, GOTEBORG, GO_TO_JAIL, GUARDED_PARKING, INSBRUK, JAIL, KOLONIA, LIVERPOOL, LONDON, MADRIT, MALMO, MEDIOLAN, NEAPOL, NORTH_RAILWAYS, POWER_STATION, ROME, ROTTERDAM, SALONIKI, SEWILLA, SOUTH_RAILWAY, START, SZTOKHOLM, TAX, WATER_PLANT, WEST_RAILWAYS, WIEDEN } from "../../Data/const";
import { tBoardFieldNames } from "../../Data/types";
import { DimanetionsOperations, tBoardDimensions, tBoardFieldPosition, tBoundingClientRectKeys, tDimensionAction, tUseRefOnDiv } from "./types";

const getInitialBoardFieldPosition = () => ({
    top: 0, left: 0, width: 0, height: 0,
})

export const getInitialState = () => ({
        [START]: getInitialBoardFieldPosition(),
        [ATENY]: getInitialBoardFieldPosition(),
        [CHANCE_BLUE_RIGHT]:  getInitialBoardFieldPosition(),
        [CHANCE_BLUE_BOTTOM]: getInitialBoardFieldPosition(),
        [CHANCE_BLUE_LEFT]:   getInitialBoardFieldPosition(),
        [CHANCE_RED_RIGHT]:   getInitialBoardFieldPosition(),
        [CHANCE_RED_BOTTOM]:  getInitialBoardFieldPosition(),
        [CHANCE_RED_TOP]:     getInitialBoardFieldPosition(),
        [SALONIKI]:           getInitialBoardFieldPosition(),
        [GUARDED_PARKING]:    getInitialBoardFieldPosition(),
        [FREE_PARK]:          getInitialBoardFieldPosition(),
        [JAIL]:               getInitialBoardFieldPosition(),
        [GO_TO_JAIL]:         getInitialBoardFieldPosition(),
        [SOUTH_RAILWAY]:      getInitialBoardFieldPosition(),
        [NEAPOL]:    getInitialBoardFieldPosition(),
        [MEDIOLAN]:  getInitialBoardFieldPosition(),
        [ROME]:      getInitialBoardFieldPosition(),
        [BARCELONA]: getInitialBoardFieldPosition(),
        [POWER_STATION]: getInitialBoardFieldPosition(),
        [SEWILLA]: getInitialBoardFieldPosition(),
        [MADRIT]:  getInitialBoardFieldPosition(),
        [WEST_RAILWAYS]: getInitialBoardFieldPosition(),
        [LIVERPOOL]: getInitialBoardFieldPosition(),
        [GLASGOW]:   getInitialBoardFieldPosition(),
        [LONDON]:    getInitialBoardFieldPosition(),
        [ROTTERDAM]: getInitialBoardFieldPosition(),
        [BRUKSELA]:  getInitialBoardFieldPosition(),
        [AMSTERDAM]: getInitialBoardFieldPosition(),
        [NORTH_RAILWAYS]: getInitialBoardFieldPosition(),
        [MALMO]:          getInitialBoardFieldPosition(),
        [GOTEBORG]:       getInitialBoardFieldPosition(),
        [WATER_PLANT]:    getInitialBoardFieldPosition(),
        [SZTOKHOLM]:      getInitialBoardFieldPosition(),
        [FRANKFURT]:      getInitialBoardFieldPosition(),
        [KOLONIA]:        getInitialBoardFieldPosition(),
        [BONN]:           getInitialBoardFieldPosition(),
        [EAST_RAILWAYS]:  getInitialBoardFieldPosition(),
        [INSBRUK]:        getInitialBoardFieldPosition(),
        [TAX]:            getInitialBoardFieldPosition(),
        [WIEDEN]:         getInitialBoardFieldPosition() 
})
type tShouldStateChange = { name: tBoardFieldNames, state: tBoardDimensions, newSizes: tBoardFieldPosition }

type tComparable = {
    [keyName: string]: number | string, 
}

const areSizesTheSame = <ComparableType extends tComparable>(sizeA: ComparableType, sizeB: ComparableType) => {
    const keysA = Object.keys(sizeA);
    const nrOfKeysA = keysA.length
    const nrOfKeysB = Object.keys(sizeB).length;
    if (nrOfKeysA !== nrOfKeysB) return false;
    const nrOfDifferentes = (keysA as tBoundingClientRectKeys[]).reduce((nr, aItem) => {
        const nrDifferences = sizeA[aItem] === sizeB[aItem] ? 0 : 1
        return nr + nrDifferences
    }, 0)
    return nrOfDifferentes === 0; 
}

const shouldStateChange = ({name, state, newSizes} : tShouldStateChange) => {
    const oldSizes = state[name];
    const areEqual = areSizesTheSame(oldSizes, newSizes);
    return !areEqual;
}
const getStateDependingOnClientRect = (name: tBoardFieldNames, state: tBoardDimensions, newSizes: tBoardFieldPosition ) => {
    const stateShouldChange = shouldStateChange({name, state ,newSizes});
    if (stateShouldChange) {
        return {...state, [name]: newSizes}
    }
    return state;
}

const getPositionDataFromReference = (fieldReference: tUseRefOnDiv):tBoardFieldPosition => {
    const node = fieldReference.current;
    const {top, left, width, height} = node.getBoundingClientRect();
    return ({top, left, width, height})
}

export const reducer = (state: tBoardDimensions, action: tDimensionAction): tBoardDimensions => {
    const {type, payload} = action;
    switch (type) {
        case DimanetionsOperations.update: {
            const fieldName: tBoardFieldNames = payload.fieldName;
            const fieldReference = payload.reference;
            const newSize = getPositionDataFromReference(fieldReference);
            const isFieldDefined = state[fieldName];
            if (isFieldDefined) {
                const nextState = getStateDependingOnClientRect(fieldName, state, newSize)
                return nextState
            } else {
                const newState = {...state, [`${fieldName}`]: {...newSize}}
                return newState
            }
        }
        default: throw new Error(`Unknown operation type: ${type}`)
    }
}
