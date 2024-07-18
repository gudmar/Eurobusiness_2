import { tCity, tCountries } from "../../Data/types";
import { NrOfHotels, NrOfHouses, tWhatBuildingQuotation } from "../../Logic/Journalist/utils/getBuildingPermits";

export const isOperationNotAllowedInAnyCountry = (countries: tCountries) => {
    const keys = Object.keys(countries);
    return keys.length === 1 && keys[0] === 'reason';
}

const doesQuotationRegardHotel = (whatIsQuoted: tWhatBuildingQuotation ) => {
    const result = whatIsQuoted === NrOfHotels.one || whatIsQuoted === NrOfHotels.two || whatIsQuoted === NrOfHotels.three;
    return result;
}

const doesQuotationRegardHouse = (whatIsQuoted: tWhatBuildingQuotation ) => {
    const result = whatIsQuoted === NrOfHouses.one || whatIsQuoted === NrOfHouses.two || whatIsQuoted === NrOfHouses.three;
    return result
}

export const setIfRegardsHouses = (whatIsQuoted: tWhatBuildingQuotation, valueIfTrue: tCity[] | undefined) => {
    if (doesQuotationRegardHouse(whatIsQuoted)) return valueIfTrue;
}

export const setIfRegardsHotels = (whatIsQuoted: tWhatBuildingQuotation, valueIfTrue: tCity[] | undefined) => {
    if (doesQuotationRegardHotel(whatIsQuoted)) return valueIfTrue;
}

export const getBuildingType = (whatIsQuoted: tWhatBuildingQuotation) => doesQuotationRegardHotel(whatIsQuoted) ? 'hotel': 'house';
