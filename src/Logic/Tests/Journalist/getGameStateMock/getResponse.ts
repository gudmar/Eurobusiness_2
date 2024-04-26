import { mapCitiesToCountries } from "../../../../Functions/mapCitiesToCountries";
import { BuildingPermitRejected } from "../../../Journalist/utils/getBuildingPermits";
import { tObject } from "../../../types";

type tCountry = string;

type delta = {
    [key: tCountry]: string,
}

export const getMockResponse = (delta:delta) => {
    const citiesInCountries = mapCitiesToCountries();
    const countries = Object.keys(citiesInCountries);
    const result = countries.reduce((acc: tObject<any>, country) => {
        if (!acc?.[country]) {
            acc[country] = {
                reason: BuildingPermitRejected.ownsOnlyPart,
                country,
            }
        }
        if (delta?.[country]) {
            acc[country] = {
                reason: delta[country],
                country
            };
        }
        return acc;
    }, {});
    return result;
}