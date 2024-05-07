import { descriptors } from "../Data/boardFields"
import { iCityField, iNonCityEstates, tBoard, tBoardField } from "../Data/types";
import { tObject } from "../Logic/types";

export const mapCitiesToCountries = () => {
    const fieldDescriptors: tObject<any> = descriptors;
    const fieldNames = Object.keys(descriptors);
    const result = fieldNames.reduce((acc: tObject<any>, fieldName) => {
        const fieldValue: tObject<any> = fieldDescriptors[fieldName]
        const isFieldACity = 'housePrice' in fieldValue;
        if (!isFieldACity) return acc
        if (!fieldValue.country.hasOwnProperty(acc)) { 
            // ==================== LINE ABOVE IS AN ERROR
            // -----------------------------------------
            // --------------------------------------------
            //================================================
            acc[fieldValue.country] = []
        }
        const city = {...fieldValue, name: fieldName}
        acc[fieldValue.country].push(city);
        return acc;
    }, {})
    return result;
}

interface iCityFieldWithName extends iCityField {name: string}
interface iNonCityEstateFieldWithName extends iNonCityEstates {name: string}
export type tEstateFieldWithName = iCityFieldWithName | iNonCityEstateFieldWithName

export const mapEstatesToCountries = () => {
    const fieldDescriptors: tObject<any> = descriptors;
    const fieldNames = Object.keys(descriptors);
    const result = fieldNames.reduce((acc: tObject<any>, fieldName) => {
        const fieldValue: tBoardField = fieldDescriptors[fieldName]
        const isFieldACity = 'price' in fieldValue;
        if (!isFieldACity) return acc
        if (!acc.hasOwnProperty(fieldValue.country)) {
            acc[fieldValue.country] = []
        }
        const estate: tEstateFieldWithName = {...fieldValue, name: fieldName}
        acc[fieldValue.country].push(estate);
        return acc;
    }, {})
    return result;
}
