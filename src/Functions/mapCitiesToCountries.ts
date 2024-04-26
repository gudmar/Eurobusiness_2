import { descriptors } from "../Data/boardFields"
import { tObject } from "../Logic/types";

export const mapCitiesToCountries = () => {
    const fieldDescriptors: tObject<any> = descriptors;
    const fieldNames = Object.keys(descriptors);
    const result = fieldNames.reduce((acc: tObject<any>, fieldName) => {
        const fieldValue: tObject<any> = fieldDescriptors[fieldName]
        const isFieldACity = 'housePrice' in fieldValue;
        if (!isFieldACity) return acc
        if (!fieldValue.country.hasOwnProperty(acc)) {
            acc[fieldValue.country] = []
        }
        const city = {...fieldValue, name: fieldName}
        acc[fieldValue.country].push(city);
        return acc;
    }, {})
    return result;
}