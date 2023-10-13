import { AMSTERDAM, ATENY, BARCELONA, BONN, BRUKSELA, CHANCE_BLUE_BOTTOM, CHANCE_BLUE_LEFT, CHANCE_BLUE_RIGHT, CHANCE_RED_BOTTOM, CHANCE_RED_RIGHT, CHANCE_RED_TOP, EAST_RAILWAYS, FRANKFURT, FREE_PARK, GLASGOW, GOTEBORG, GO_TO_JAIL, GUARDED_PARKING, INSBRUK, JAIL, KOLONIA, LIVERPOOL, LONDON, MADRIT, MALMO, MEDIOLAN, NEAPOL, NORTH_RAILWAYS, POWER_STATION, ROME, ROTTERDAM, SALONIKI, SEWILLA, SOUTH_RAILWAY, START, SZTOKHOLM, TAX, WATER_PLANT, WEST_RAILWAYS, WIEDEN } from "../../Data/const";
import { tColors } from "../../Data/types";
import { iAny, tClassFromInterface } from "../../Types/types";
import { iPlayerState } from "../Players/types";
import { iCityMemento, iNonCityEstatesMemento } from "../types";

export interface iVisitor {

}

export type tVisitor = tClassFromInterface<undefined, iAny>;

export interface iBoardMemento {
    [START]: undefined,
    [ATENY]: iCityMemento,
    [CHANCE_BLUE_RIGHT]: undefined,
    [CHANCE_BLUE_BOTTOM]: undefined,
    [CHANCE_BLUE_LEFT]: undefined,
    [CHANCE_RED_RIGHT]: undefined,
    [CHANCE_RED_BOTTOM]: undefined,
    [CHANCE_RED_TOP]: undefined,
    [SALONIKI]: iCityMemento,
    [GUARDED_PARKING]: undefined,
    [FREE_PARK]: undefined,
    [JAIL]: undefined,
    [GO_TO_JAIL]: undefined,
    [SOUTH_RAILWAY]: iNonCityEstatesMemento,
    [NEAPOL]: iCityMemento,
    [MEDIOLAN]: iCityMemento,
    [ROME]: iCityMemento,
    [BARCELONA]: iCityMemento,
    [POWER_STATION]: iNonCityEstatesMemento,
    [SEWILLA]: iCityMemento,
    [MADRIT]:iCityMemento,
    [WEST_RAILWAYS]: iNonCityEstatesMemento,
    [LIVERPOOL]: iCityMemento,
    [GLASGOW]: iCityMemento,
    [LONDON]: iCityMemento,
    [ROTTERDAM]: iCityMemento,
    [BRUKSELA]: iCityMemento,
    [AMSTERDAM]: iCityMemento,
    [NORTH_RAILWAYS]: iNonCityEstatesMemento,
    [MALMO]: iCityMemento,
    [GOTEBORG]: iCityMemento,
    [WATER_PLANT]: iNonCityEstatesMemento,
    [SZTOKHOLM]: iCityMemento,
    [FRANKFURT]: iCityMemento,
    [KOLONIA]: iCityMemento,
    [BONN]: iCityMemento,
    [EAST_RAILWAYS]: iNonCityEstatesMemento,
    [INSBRUK]: iCityMemento,
    [TAX]: undefined,
    [WIEDEN]: iCityMemento,
}

export interface iBankMemento extends iBoardMemento {}


export interface iGameState {
    players: iPlayerState[],
    currentPlayerColor: tColors,
    board: iBoardMemento,
    bank: iBankMemento
}



