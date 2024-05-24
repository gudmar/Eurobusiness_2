import { BANK, PLANT, RAILWAY } from "../../../Data/const";
import { GUARDED_PARKING_FEE, TAX_FEE } from "../../../Data/fees";
import { iCityField, iNonCityEstates } from "../../../Data/types";
import { createPath } from "../../../Functions/createPath";
import { tGameState } from "../../../Functions/PersistRetrieveGameState/types";
import { iChanceFieldState, iCityFieldState, iFieldState, iNonCityEstatesFieldState, iOtherFieldTypesFieldState, isCityFieldState } from "../../boardTypes";
import { DoneThisTurn, TurnPhases } from "../../types";
import { IS_MANDATORY, PAY, PAYLOAD, TYPE } from "../const";
import { OptionTypes, tJournalistOptionsUnderDevelopement } from "../types";
import { getCurrentPlayer, getFieldData, getFieldIfOwned, getNrPlantsPlayerOwns, getNrRailwaysPlayerOwns, getPlayer, getPlayerByColor, isCurrentPlayerQueried } from "./commonFunctions";
import {tStateModifierArgs } from "./types";

export const TAX_FIELD_INDEX = 38;
export const GUARDED_PARKING_FIELD_INDEX = 4;

const TAXABLE_FIELD_INDEX_TO_FEE_MAP = {
    [TAX_FIELD_INDEX]: TAX_FEE,
    [GUARDED_PARKING_FIELD_INDEX]: GUARDED_PARKING_FEE,
}
type tTaxableFieldIndexes = typeof TAX_FIELD_INDEX | typeof GUARDED_PARKING_FIELD_INDEX
const TAX_FIELD_INDEXES = Object.keys(TAXABLE_FIELD_INDEX_TO_FEE_MAP).map((index) => parseInt(index))

const checkIfOnTaxableField = (options: tGameState) => {
    const currentPlayer = getCurrentPlayer(options);
    const isOnTaxableField = TAX_FIELD_INDEXES.includes(currentPlayer.fieldNr);
    return isOnTaxableField;
}

const getTaxFee = (options: tGameState) => {
    const currentPlayerIndex = getCurrentPlayer(options).fieldNr;
    const result = TAXABLE_FIELD_INDEX_TO_FEE_MAP[currentPlayerIndex as tTaxableFieldIndexes]
    if (!result) throw new Error(`Cannot map current field index ${currentPlayerIndex} to tax fee`)
    return result;
}

const checkIfGoodMomentForPayment = (options: tGameState) => {
    const {doneThisTurn, turnPhase} = options.game;
    if (turnPhase !== TurnPhases.AfterMove) return false;
    if (doneThisTurn.includes(DoneThisTurn.PayedForVisit)) return false;
    return true;
}

export enum DontPayForVisitReasons {
    NotEstate = 'No need to pay for a non estate field,',
    BankOwned = 'Stoping by on the bank owned field is for free',
    OwnerInPrison = 'No need to pay for stopping by if owner is in prison',
    Plegded = 'No need to pay if estate is plegded',
}

const getVisitFeesIndex = ({ nrOfHouses, nrOfHotels }: iCityFieldState) => {
    const NO_BUILDINGS_INDEX = 0;
    const HOTEL_INDEX = 5;
    if (nrOfHotels > 1 || nrOfHouses > 4) throw new Error('Too many buildings in getVisitFeesIndex')
    if (nrOfHotels === 1) return HOTEL_INDEX;
    if (nrOfHouses > 0) return nrOfHouses;
    return NO_BUILDINGS_INDEX;
}

const getCityStopByFee = (field: iFieldState) => {
    if (!('nrOfHouses' in field)) throw new Error('Field is not a city field')
    const { nrOfHotels, nrOfHouses, name } = field;
    const fieldData = getFieldData(name)
    if (!('visit' in fieldData)) throw new Error(`${name} is not a city field`)
    const visitFees = fieldData.visit;
    const visitFeeIndex = getVisitFeesIndex(field);
    const result = visitFees![visitFeeIndex];
    return result;
}

type tGetStopByFee = {
    gameState: tGameState, field: iFieldState, type: string
}

const fieldTypeToOwnedEstatesMap = {
    [PLANT]: getNrPlantsPlayerOwns,
    [RAILWAY]: getNrRailwaysPlayerOwns,
}

const getStopByFee = ({ gameState, field, type }: tGetStopByFee) => {
    const fieldData = getFieldData(field.name)
    if (!('visit' in fieldData && 'owner' in field)) throw new Error(`${field.name} is not an estate field`)
    const visitFees = fieldData.visit;
    const estatesPlayerOwnsCounter = fieldTypeToOwnedEstatesMap[type as keyof typeof fieldTypeToOwnedEstatesMap];
    const nrOfOwnedPlants = estatesPlayerOwnsCounter(gameState, field.owner)
    const visitFeeIndex = nrOfOwnedPlants - 1;
    const result = visitFees![visitFeeIndex];
    return result;
}

const getRailwayStopByFee = (gameState: tGameState, field: iFieldState) => {
    const result = getStopByFee({gameState, field, type: RAILWAY});
    return result;
}

const getPlantStopByFee = (gameState: tGameState, field: iFieldState) => {
    const result = getStopByFee({gameState, field, type: PLANT});
    return result;
}

const isCityField = (field: iFieldState) => {
    const result = ('nrOfHouses' in field);
    return result;
}

const isRailway = (field: iFieldState) => {
    if (!('type' in field)) return false;
    return field.type === RAILWAY;
}

const isPlant = (field: iFieldState) => {
    if (!('type' in field)) return false;
    return field.type === PLANT;
}

const addPayForEstateVisitOptions = (args: tStateModifierArgs) => {
    const { options, state, playerName } = args;
    const field = getFieldIfOwned(options!, playerName);
    createPath(state, [PAY]);
    if (!field) {
        state.pay!.visigingOtherPlayersEstate = {
            reason: DontPayForVisitReasons.NotEstate
        }
        return state
    };
    const isBankOwner = field.owner === BANK;
    if (isBankOwner) {
        state.pay!.visigingOtherPlayersEstate = {
            reason: DontPayForVisitReasons.BankOwned
        }
        return state
    }
    if (field.isPlegded) {
        state.pay!.visigingOtherPlayersEstate = {
            reason: DontPayForVisitReasons.Plegded
        }
        return state
    };
    const { color: playerColor } = getPlayer(options!, playerName)
    const isQueriedPlayerOwner = playerColor === field.owner;
    if (isQueriedPlayerOwner) return state;
    const ownerPlayer = getPlayerByColor(options!, field.owner);
    const isOwnerInJail = ownerPlayer.isInPrison;
    if (isOwnerInJail) {
        state.pay!.visigingOtherPlayersEstate = {
            reason: DontPayForVisitReasons.OwnerInPrison
        }
        return state
    };
    if (isCityField(field)) {
        state.pay!.visigingOtherPlayersEstate = {
            [IS_MANDATORY]: true,
            [TYPE]: OptionTypes.Pay,
            [PAYLOAD]: {
                target: ownerPlayer.name,
                ammount: getCityStopByFee(field)
            }
        }
        return state;
    }
    if (isRailway(field)) {
        const ammount = getRailwayStopByFee(options!, field);
        state.pay!.visigingOtherPlayersEstate = {
            [IS_MANDATORY]: true,
            [TYPE]: OptionTypes.Pay,
            [PAYLOAD]: {
                target: ownerPlayer.name,
                ammount
            }
        }
        return state
    }
    if (isPlant(field)) {
        const ammount = getPlantStopByFee(options!, field);
        state.pay!.visigingOtherPlayersEstate = {
            [IS_MANDATORY]: true,
            [TYPE]: OptionTypes.Pay,
            [PAYLOAD]: {
                target: ownerPlayer.name,
                ammount
            }
        }
    }
    return state;
}

export const getPaymentOptions = (args: tStateModifierArgs): tJournalistOptionsUnderDevelopement => {
    const { options, state, playerName } = args;
    const isCurrentPlayer = isCurrentPlayerQueried(options!, playerName);
    if (!isCurrentPlayer) {
        return state;
    }
    const isGoodMomentForPayment = checkIfGoodMomentForPayment(options!);
    if (!isGoodMomentForPayment) return state;
    const isOnTaxableField = checkIfOnTaxableField(options!);
    if (isOnTaxableField) {
        const payment = {
            [IS_MANDATORY]: true,
            [TYPE]: OptionTypes.Pay,
            [PAYLOAD]: {
                target: BANK,
                ammount: getTaxFee(options!)
            }
        };
        createPath(state, [PAY]);
        state.pay!.visigingOtherPlayersEstate = payment;
        return state;
    }
    addPayForEstateVisitOptions(args)
    return state
}
