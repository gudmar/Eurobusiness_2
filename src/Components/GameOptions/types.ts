import { tCity } from "../../Data/types";
import { OptionTypes } from "../../Logic/Journalist/types";
import { NrOfHotels, NrOfHouses } from "../../Logic/Journalist/utils/getBuildingPermits";
import { tObject } from "../../Logic/types";

export type tActionType = {
    payload?: any,
    type: OptionTypes,
}

export type tEstate = {
    name: string,
    reason?: string,
    actions?: tActionType[]
};

export type tEstateProps = {
    estate: tEstate,
    isOpen: boolean,
}

export type tEstatesProps = {estates: tEstate[]}

export type iSingleCountryProps = {
    country: tObject<any>,
    countryName: string,
}


export type tBuildingsPermitRecord = {
    locationOne?: tCity[],
    locationTwo?: tCity[],
    locationThree?: tCity[],
    oneHotel?: tCity[],
    cost: number
}
export type tBuildingsPermit = {
    [NrOfHouses.one]?:   tBuildingsPermitRecord[],
    [NrOfHouses.two]?:   tBuildingsPermitRecord[],
    [NrOfHouses.three]?: tBuildingsPermitRecord[],
    hotelReason?: string,
    houseReason?: string,
    [NrOfHotels.one]?:   tBuildingsPermitRecord[],
    [NrOfHotels.two]?:   tBuildingsPermitRecord[],
    [NrOfHotels.three]?: tBuildingsPermitRecord[],
    reason?: string,
}

type tTransactionForCountry = tBuildingsPermit

type tRejectionForCountry = {
    reason: string,
    country: string,
}

export type tTransactionForEachCountry = tObject<tTransactionForCountry | tRejectionForCountry>

type tBuildingTransactions = {
    payload: tTransactionForEachCountry,
    type: OptionTypes,
}
    
type tBuildingTransactionActions = {
    isMandatory: boolean,
    actions: tBuildingTransactions[] // IN this case single element 
}

type tBuildingTransactionsCollapsedReason = {reason: string} | string

export type tBuyBuildings = tBuildingTransactionsCollapsedReason | tBuildingTransactionActions;

