import { mapCitiesToCountries } from "../../../../Functions/mapCitiesToCountries";
import { BuildingPermitRejected } from "../../../Journalist/utils/getBuildingPermits";
import { tObject } from "../../../types";

type tCountry = string;
type tPermits = any[];

type delta = {
    [key: tCountry]: string | tPermits,
}

export const getMockResponseGetter  = (defaultReason: string) => (delta: delta) => {
    const citiesInCountries = mapCitiesToCountries();
    const countries = Object.keys(citiesInCountries);
    const result = countries.reduce((acc: tObject<any>, country) => {
        if (!acc?.[country]) {
            acc[country] = {
                reason: defaultReason,
                country,
            }
        }
        const solution = delta?.[country]
        if (solution) {
            if (typeof solution === 'string') {
                acc[country] = {
                    reason: solution,
                    country
                };    
            } else if (typeof solution === 'object') {
                acc[country] = {
                    ...solution,
                    country
                };    
            }
        }
        return acc;
    }, {});
    return result;
}

// export const getMockResponse = (delta:delta) => {
//     const citiesInCountries = mapCitiesToCountries();
//     const countries = Object.keys(citiesInCountries);
//     const result = countries.reduce((acc: tObject<any>, country) => {
//         if (!acc?.[country]) {
//             acc[country] = {
//                 reason: BuildingPermitRejected.ownsOnlyPart,
//                 country,
//             }
//         }
//         if (delta?.[country]) {
//             acc[country] = {
//                 reason: delta[country],
//                 country
//             };
//         }
//         return acc;
//     }, {});
//     return result;
// }