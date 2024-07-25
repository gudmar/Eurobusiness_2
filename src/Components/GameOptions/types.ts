import { FC } from "react";
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
    cost: number
}

export type tQuotation = [ key: string, value: tBuildingsPermitRecord[] ]

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

export type tDataKey = 'buyBuildings' | 'sellBuildings';

export type tEstateOptionsProps = {estate: tObject<any>}

export type tCountries = { reason: string} | {actions: tObject<any>[], type: OptionTypes}

export type tLocationAfterTransaction = {
    cityName: tCity,
    nrOfHouses: number,
    nrOfHotels: number,
}

export type tSellBuildingOption = {
    locationsAfterTransaction: tLocationAfterTransaction[],
    nrOfSoldHotels: number,
    nrOfSoldHouses: number,
    price: number,
}

export type tPresentSingleSellBuildingOption = {
    description: string,
    optionVariants: tSellBuildingOption[],
    playerName: string,
    index: number
}

export type tGetCountries = (options: tObject<any>) => tObject<any>

export type tEstateOptions = {
    estate: tObject<any>,
    estateName: string,
    playerName: string,
}

type tDisplayAlternativeProps = {
    estateName: string, props: any
}

type tDisplayAlternative = (props: tDisplayAlternativeProps) => JSX.Element | null

export type tWithDisplayOptionsAsCountries = {
    // EstateOptions: FC<tEstateOptions<EstateOptionsType>>,
    DisplayAlternative?: tDisplayAlternative,
    EstateOptions: () => JSX.Element,
    countriesKey: string,
    getCountries: tGetCountries,
}
