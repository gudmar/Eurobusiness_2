import { tGetBuildingPermitsArgs } from "./getBuildingPermits";
import { tCountries } from "../../../Data/types";
import { tGameState } from "../../../Functions/PersistRetrieveGameState/types";


export type tGetSellingPermitsArgs = {
    gameState: tGameState,
    country: tCountries,
    playerName: string,
}

export enum NotAbleToSellBuildingsReasons {
    noBuildings = 'No buildings in this country',
    noHousesLeft = 'No houses. Not able to exchange hotels for houses. Can sell all hotels instead'
}

export const getSellingPermits = (args: tGetBuildingPermitsArgs) => {
    const MAX_NR_OF_BUILDINGS = 3;
    const {gameState, playerName, cityName} = args;

}

