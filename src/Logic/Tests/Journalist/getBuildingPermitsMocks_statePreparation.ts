import { AMSTERDAM, ATENY, BARCELONA, BONN, BRUKSELA, FRANKFURT, GLASGOW, GOTEBORG, INSBRUK, KOLONIA, LIVERPOOL, LONDON, MADRIT, MALMO, MEDIOLAN, NEAPOL, RED, ROME, ROTTERDAM, SALONIKI, SEWILLA, SZTOKHOLM, WIEDEN } from "../../../Data/const";
import { Players } from "../../Players/Players";
import { changeEstates, getStateMock } from "./ChanceCardStateMocks";

Players.playerNameToPlayerColor = () => RED;

const ESTATES_SUCCESS_1 = [
    ATENY, SALONIKI, // GREECE
    INSBRUK, WIEDEN, // AUSTRIA
    NEAPOL, MEDIOLAN, ROME, // italy
    BARCELONA, SEWILLA, MADRIT, // SPAIN
    LIVERPOOL, GLASGOW, LONDON, // UK
    ROTTERDAM, BRUKSELA, AMSTERDAM, //BENELUX
    MALMO, GOTEBORG, SZTOKHOLM, //Szwecja
    FRANKFURT, KOLONIA, BONN, // Niemcy
    INSBRUK, WIEDEN, // Austria
]
const ESTATES_SUCCESS_2 = [
    ATENY, SALONIKI, // GREECE
    INSBRUK, WIEDEN, // AUSTRIA
    BARCELONA, SEWILLA, MADRIT, // SPAIN
    LIVERPOOL, GLASGOW, LONDON, // UK
]

const ESTATES_SUCCESS_3 = [
    ATENY, SALONIKI, // GREECE
    INSBRUK, WIEDEN, // AUSTRIA
]


const changeRedOwnerDeltas = ESTATES_SUCCESS_1.map((estateName) => ({
    estateName, props: {owner: RED}
}));

const state1 = getStateMock();
const state2 = getStateMock();
const state3 = getStateMock();

const stateWithRedOwner1 = changeEstates(state1, changeRedOwnerDeltas);
const stateWithRedOwner2 = changeEstates(state2, changeRedOwnerDeltas);
const stateWithRedOwner3 = changeEstates(state3, changeRedOwnerDeltas);

const changeBuildingsDeltasSuccess1 = [
    // { estateName: ATENY, props: { nrOfHouses: 1 } },
    { estateName: SALONIKI, props: { nrOfHouses: 1 } },
    // { estateName: INSBRUK, props: { nrOfHouses: 1 } },

    { estateName: SEWILLA, props: { nrOfHouses: 1 } },

    { estateName: LIVERPOOL, props: { nrOfHouses: 1 } },
    { estateName: LONDON, props: { nrOfHouses: 1 } },

    { estateName: ROTTERDAM, props: { nrOfHouses: 1 } },
    { estateName: BRUKSELA, props: { nrOfHouses: 1 } },

    { estateName: MALMO, props: { nrOfHouses: 3 } },
    { estateName: GOTEBORG, props: { nrOfHouses: 3 } },
    { estateName: SZTOKHOLM, props: { nrOfHouses: 3 } },

    { estateName: FRANKFURT, props: { nrOfHouses: 4 } },
    { estateName: KOLONIA, props: { nrOfHouses: 3 } },
    { estateName: BONN, props: { nrOfHouses: 3 } },
];

export const readyState1 = changeEstates(stateWithRedOwner1, changeBuildingsDeltasSuccess1);

const changeBuildingsDeltasSuccess2 = [
    { estateName: ATENY, props: { nrOfHouses: 2 } },
    { estateName: SALONIKI, props: { nrOfHouses: 3 } },

    { estateName: INSBRUK, props: { nrOfHotels: 1 } },
    { estateName: WIEDEN, props: { nrOfHouses: 4 } },

    { estateName: BARCELONA, props: { nrOfHotels: 1 } },
    { estateName: SEWILLA, props: { nrOfHouses: 4 } },
    { estateName: MADRIT, props: { nrOfHouses: 4 } },

    { estateName: LIVERPOOL, props: { nrOfHouses: 4 } },
    { estateName: GLASGOW, props: { nrOfHotels: 1 } },
    { estateName: LONDON, props: { nrOfHotels: 1 } },
]

const changeBuildingsDeltasSuccess3 = [
    { estateName: ATENY, props: { nrOfHouses: 4 } },
    { estateName: SALONIKI, props: { nrOfHotels: 1 } },

    { estateName: INSBRUK, props: { nrOfHotels: 1 } },
    { estateName: WIEDEN, props: { nrOfHouses: 4 } },

    { estateName: BARCELONA, props: { nrOfHouses: 4 } },
    { estateName: SEWILLA, props: { nrOfHouses: 4 } },
    { estateName: MADRIT, props: { nrOfHouses: 4 } },
]

export const readyState2 = changeEstates(stateWithRedOwner2, changeBuildingsDeltasSuccess2);
export const readyState3 = changeEstates(stateWithRedOwner3, changeBuildingsDeltasSuccess3);


