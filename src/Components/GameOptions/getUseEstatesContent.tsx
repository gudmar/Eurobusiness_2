import { FC, useEffect, useState } from "react";
import { tObject } from "../../Logic/types";
import { tEstateOptionsProps } from "./types";

const getCountriesFromValidActions = (options: tObject<any>) => {
    const countries = options?.actions?.[0]?.payload;
    return countries;
}

export const getUseEstatesContent = (ComponentToDislpayIn: FC<tEstateOptionsProps>, options: tObject<any>) => {
    const useEstatesContent = () => {
        const countries = getCountriesFromValidActions(options);
        const [presentedCountryName, setPresentedContryName] = useState<string>('');
        const [presentedEstateName, setPresentedEstatesName] = useState<string>('');
        const estate = countries?.[presentedCountryName]?.[presentedEstateName];
        useEffect(() => console.log('Estate', estate, options, countries), [estate])
        const setUnsetCountryName = (name: string) => {
            if (name === presentedCountryName) {
                setPresentedContryName('');
            } else {
                setPresentedContryName(name)
            }
        }
        const EstateContent = () => (
            <ComponentToDislpayIn estate={estate} />
        )
        return { 
            EstateContent,
            setPresentedContryName: setUnsetCountryName,
            setPresentedEstatesName,
            presentedCountryName,
            presentedEstateName
        };
    }
    return useEstatesContent;
}
