// type tHouseLocations = {
//     locationOne: string[], locationTwo: string[], cost: number,
// }

import { WIEDEN, AUSTRIA, INSBRUK, GREECE, ATENY, SALONIKI, ITALY, NEAPOL, MEDIOLAN, ROME, SPAIN, BARCELONA, MADRIT, SEWILLA, UK, GLASGOW, LIVERPOOL, LONDON, BENELUX, AMSTERDAM, ROTTERDAM, BRUKSELA, SWEEDEN, MALMO, GOTEBORG, SZTOKHOLM, RFN, KOLONIA, BONN } from "../../../Data/const";
import { BuildingPermitRejected, NrOfHotels, NrOfHouses } from "../../Journalist/utils/getBuildingPermits";

// export type tBuidlingApproved = {
//     country: string,
//     permits: {
//         [NrOfHouses.one]: tHouseLocations[],
//         [NrOfHouses.two]: tHouseLocations[]
//         [NrOfHouses.three]: tHouseLocations[],
//     }
// }

export const permits_0h0H_0h0H = {
    country: AUSTRIA,
    permits: {
        [NrOfHouses.one]: [
            { locationOne: [INSBRUK], cost: 400 },
            { locationOne: [WIEDEN], cost: 400 }
        ],
        [NrOfHouses.two]: [
            { locationOne: [INSBRUK, WIEDEN], cost: 800 }
        ],
        [NrOfHouses.three]: [
            { locationOne: [INSBRUK], locationTwo: [WIEDEN], cost: 1200 },
            { locationOne: [WIEDEN], locationTwo: [INSBRUK], cost: 1200 },
        ],
    }
}

export const permits_1h0H_0h0H = {
    country: GREECE,
    permits: {
        [NrOfHouses.one]: [
            { locationOne: [ATENY], cost: 100 }
        ],
        [NrOfHouses.two]: [
            { locationOne: [SALONIKI, ATENY], cost: 200 },
            { locationTwo: [ATENY], cost: 200 },
        ],
        [NrOfHouses.three]: [
            { locationOne: [SALONIKI], locationTwo: [ATENY], cost: 300 },
        ],
    }
}

export const permits_0h0H_0h0H_0h0H = {
    country: ITALY,
    permits: {
        [NrOfHouses.one]: [
            {locationOne: [NEAPOL], cost: 100},
            {locationOne: [MEDIOLAN], cost: 100},
            {locationOne: [ROME], cost: 100},
        ],
        [NrOfHouses.two]: [
            {locationOne: [NEAPOL, MEDIOLAN], cost: 200},
            {locationOne: [NEAPOL, ROME], cost: 200},
            {locationOne: [MEDIOLAN, ROME], cost: 200},
        ],
        [NrOfHouses.three]: [
            {locationOne: [NEAPOL, MEDIOLAN, ROME], cost: 300},
        ],
    }
}

export const permits_0h0H_1h0H_0h0H = {
    country: SPAIN,
    permits: {
        [NrOfHouses.one]: [
            {locationOne: [BARCELONA], cost: 200},
            {locationOne: [MADRIT], cost: 200},
        ],
        [NrOfHouses.two]: [
            {locationOne: [BARCELONA, MADRIT], cost: 400},
        ],
        [NrOfHouses.three]: [
            {locationOne: [BARCELONA, SEWILLA, MADRIT], cost: 600},
            {locationOne: [BARCELONA], locationTwo: [MADRIT], cost: 600},
            {locationOne: [MADRIT], locationTwo: [BARCELONA], cost: 600},
        ],
    }
}


export const permits_1h0H_0h0H_1h0H = {
    country: UK,
    permits: {
        [NrOfHouses.one]: [
            {locationOne: [GLASGOW], cost: 200},
        ],
        [NrOfHouses.two]: [
            {locationTwo: [GLASGOW], cost: 400},
            {locationOne: [GLASGOW, LIVERPOOL], cost: 400},
            {locationOne: [GLASGOW, LONDON], cost: 400},
        ],
        [NrOfHouses.three]: [
            {locationOne: [GLASGOW, LIVERPOOL, LONDON], cost: 600},
            {locationOne: [LIVERPOOL], locationTwo: [GLASGOW], cost: 600},
            {locationOne: [LONDON], locationTwo: [GLASGOW], cost: 600},
        ],
    }
}

export const permits_1h0H_1h0H_0h0H = {
    country: BENELUX,
    permits: {
        [NrOfHouses.one]: [
            {locationOne: [AMSTERDAM], cost: 300},
        ],
        [NrOfHouses.two]: [
            {locationOne: [AMSTERDAM, ROTTERDAM], cost: 600},
            {locationOne: [AMSTERDAM, BRUKSELA], cost: 600},
            {locationTwo: [AMSTERDAM], cost: 600},
        ],
        [NrOfHouses.three]: [
            {locationOne: [ROTTERDAM, BRUKSELA, AMSTERDAM], cost: 900},
            {locationOne: [ROTTERDAM], locationTwo: [AMSTERDAM], cost: 900},
            {locationOne: [BRUKSELA], locationTwo: [AMSTERDAM], cost: 900},
        ],
    }
}

export const permits_3h0H_3h0H_3h0H = {
    country: SWEEDEN,
    permits: {
        [NrOfHouses.one]: [
            {locationOne: [MALMO], cost: 300},
            {locationOne: [GOTEBORG], cost: 300},
            {locationOne: [SZTOKHOLM], cost: 300},
        ],
        [NrOfHouses.two]: [
            {locationOne: [MALMO, GOTEBORG], cost: 600},
            {locationOne: [MALMO, SZTOKHOLM], cost: 600},
            {locationOne: [GOTEBORG, SZTOKHOLM], cost: 600},
        ],
        [NrOfHouses.three]: [
            {locationOne: [MALMO, GOTEBORG, SZTOKHOLM], cost: 900},
        ],
    }
}

export const permits_4h0H_3h0H_3h0H = {
    country: RFN,
    permits: {
        [NrOfHouses.one]: [
            {locationOne: [KOLONIA], cost: 400},
            {locationOne: [BONN], cost: 400}
        ],
        [NrOfHouses.two]: [
            {locationOne: [KOLONIA, BONN], cost: 800},
        ],
        hotelReason: BuildingPermitRejected.citiesNotBigEnough,
        // [NrOfHouses.three]: [], // not existing as it is empty
    },
    
}

export const permits_2h0H_3h0H = {
    country: GREECE,
    permits: {
        [NrOfHouses.one]: [
            {locationOne: [SALONIKI], cost: 100},
        ],
        [NrOfHouses.two]: [
            {locationOne: [SALONIKI, ATENY], cost: 200},
            {locationTwo: [SALONIKI], cost: 200},
        ],
        [NrOfHouses.three]: [
            {locationOne: [ATENY], locationTwo: [SALONIKI], cost: 300}
        ],
    }
}

export const permits_2h0H_3h0H_NotEnoughHouses = {
    country: GREECE,
    
    permits: {
        [NrOfHouses.one]: [
            {locationOne: [SALONIKI], cost: 100},
        ],
        [NrOfHouses.two]: [
            {locationOne: [SALONIKI, ATENY], cost: 200},
            {locationTwo: [SALONIKI], cost: 200},
        ],
        houseReason: BuildingPermitRejected.noHousesLeftInBank,
    }
}

export const permits_0h1H_4h0H = {
    country: AUSTRIA,
    permits: {
        [NrOfHotels.one]: [
            {locationOne: [WIEDEN], cost: 400}
        ]
    }
}

export const permits_0h1H_4h0H_4h0H = {
    country: SPAIN,
    permits: {
        [NrOfHotels.one]: [
            {locationOne: [SEWILLA], cost: 200},
            {locationOne: [MADRIT], cost: 200},
        ],
        [NrOfHotels.two]: [
            {locationOne: [SEWILLA, MADRIT], cost: 400},
        ]
    }
}

export const permits_4h0H_0h1H_0h1H = {
    country: UK,
    permits: {
        [NrOfHotels.one]: [
            {locationOne: [LIVERPOOL], cost: 200},
        ],
    }
}

export const permits_4h0H_0h1H = {
    country: GREECE,
    permits: {
        [NrOfHotels.one]: [
            {locationOne: [SALONIKI], cost: 100}
        ]
    }
}

export const permits_4h0H_4h0H_4h0H = {
    country: SPAIN,
    permits: {
        [NrOfHotels.one]: [
            {locationOne: [BARCELONA], cost: 200},
            {locationOne: [SEWILLA], cost: 200},
            {locationOne: [MADRIT], cost: 200},
        ],
        [NrOfHotels.two]: [
            {locationOne: [BARCELONA, SEWILLA], cost: 400},
            {locationOne: [BARCELONA, MADRIT], cost: 400},
            {locationOne: [SEWILLA, MADRIT], cost: 400},
        ],
        [NrOfHotels.three]: [
            {locationOne: [BARCELONA, SEWILLA, MADRIT], cost: 600}
        ]
    }
}

export const permits_4h0H_4h0H_4h0H_2HotelsLeft = {
    country: SPAIN,
    
    permits: {
        hotelReason: BuildingPermitRejected.noHotelsLeftInBank,
        [NrOfHotels.one]: [
            {locationOne: [BARCELONA], cost: 200},
            {locationOne: [SEWILLA], cost: 200},
            {locationOne: [MADRIT], cost: 200},
        ],
        [NrOfHotels.two]: [
            {locationOne: [BARCELONA, SEWILLA], cost: 400},
            {locationOne: [BARCELONA, MADRIT], cost: 400},
            {locationOne: [SEWILLA, MADRIT], cost: 400},
        ],
    }
}

export const permits_4h0H_4h0H_4h0H_0HotelsLeft = {
    country: SPAIN,
    
    permits: {
        hotelReason: BuildingPermitRejected.noHotelsLeftInBank,
    }
}
