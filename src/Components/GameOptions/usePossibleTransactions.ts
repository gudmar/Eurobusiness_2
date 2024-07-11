import { useState } from "react";
import { tJournalistState, tOption, tRejection } from "../../Logic/Journalist/types";

import { tDataKey } from "./types";

const getPermits = (gameOptions: tJournalistState, dataKey: tDataKey) => {
    return (gameOptions?.[dataKey] as tOption)?.actions?.[0]?.payload
}
export const getRejectionReason = (gameOptions: tJournalistState,dataKey: tDataKey) => {
    const nestedReason = (gameOptions?.[dataKey] as tOption)?.actions?.[0]?.payload.reason;
    const flatReason = (gameOptions?.[dataKey] as tRejection)?.reason;
return nestedReason || flatReason;
}

export const usePossibleTransactions = (gameOptions: tJournalistState, dataKey: tDataKey) => {
    const [selectedCountryName, setSelectedCountryName] = useState<string>('');
    if (selectedCountryName === '') {}
    const permits = getPermits(gameOptions, dataKey);
    const rejectionReason = getRejectionReason(gameOptions, dataKey);
    return { 
        permits,
        setSelectedCountryName,
        selectedCountryName,
        rejectionReason,
    }
}
