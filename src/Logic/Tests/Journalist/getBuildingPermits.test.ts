import { AMSTERDAM, ATENY, BARCELONA, BLUE, BRUKSELA, FRANKFURT, GOTEBORG, INSBRUK, LIVERPOOL, LONDON, MADRIT, MALMO, MEDIOLAN, NEAPOL, POWER_STATION, RED, ROME, ROTTERDAM, SALONIKI, SEWILLA, SZTOKHOLM, WATER_PLANT } from "../../../Data/const";
import { BuildingPermitRejected, getBuildingPermits } from "../../Journalist/utils/getBuildingPermits";
import { Players } from "../../Players/Players";
import { changeEstates, getStateMock } from "./ChanceCardStateMocks";
import { permits_0h0H_0h0H, permits_0h0H_0h0H_0h0H, permits_0h0H_1h0H_0h0H, permits_0h1H_4h0H, permits_0h1H_4h0H_4h0H, permits_1h0H_0h0H, permits_1h0H_0h0H_1h0H, permits_1h0H_1h0H_0h0H, permits_3h0H_3h0H_3h0H, permits_4h0H_0h1H, permits_4h0H_0h1H_0h1H, permits_4h0H_3h0H_3h0H, permits_4h0H_4h0H_4h0H } from "./getBuildingPermitsMocks_outputs";
import { readyState1, readyState2, readyState3 } from "./getBuildingPermitsMocks_statePreparation";

Players.playerNameToPlayerColor = () => RED;

const ESTATES_RED = [
    ATENY, SALONIKI, // GREECE
    NEAPOL, MEDIOLAN, ROME, //ITALY
    BARCELONA, SEWILLA, // SPAIN, not all
    LIVERPOOL, // UK not all
    POWER_STATION, WATER_PLANT, // PLANTS
    SZTOKHOLM, GOTEBORG, MALMO, // SZWECJA
]

const ESTATES_BLUE = [
    MADRIT, //SPAIN
    ROTTERDAM, BRUKSELA, AMSTERDAM, // BENELUX
]

const changeRedOwnerDeltas = ESTATES_RED.map((estateName) => ({
    estateName,
    props: { owner: RED }
}));
const changeBlueOwnerDetails = ESTATES_BLUE.map((estateName) => ({
    estateName,
    props: { owner: BLUE }
}))
const changeOwnerDeltas = [...changeBlueOwnerDetails, ...changeRedOwnerDeltas];

const state = getStateMock();
const stateWithChangedOwner = changeEstates(state, changeOwnerDeltas);
const changeBuildingsDeltasForErrorTesting = [
    {
        estateName: ATENY,
        props: {
            nrOfHotels: 1
        },
    },
    {
        estateName: SALONIKI,
        props: {
            nrOfHotels: 1
        }
    },
    {
        estateName: 'London',
        props: {
            nrOfHotels: 1
        }
    },
    {
        estateName: 'Mediolan',
        props: {
            nrOfHouses: 2
        }
    },
    {
        estateName: SZTOKHOLM,
        props: {
            isPlegded: true,
        }
    },
]
const stateChangedBuildings = changeEstates(stateWithChangedOwner, changeBuildingsDeltasForErrorTesting);

describe('Testing getBuildingPermits', () => {
    it('Should throw an error when given a not existing estate', () => {
        const throwingFunction = () => getBuildingPermits({gameState: stateChangedBuildings, playerName: RED, cityName: 'Glowow'});
        expect(throwingFunction).toThrow();
    });
    it('Should return an object with rejected reason when given an estate where buildings cannot be created', () => {
        const reason = getBuildingPermits({gameState: stateChangedBuildings, playerName: RED, cityName: POWER_STATION})?.reason;
        expect(reason).toBe(BuildingPermitRejected.notACity);
    });
    it('Should return an object with rejected reason when given an estate in country, where some other estate is plegded', () => {
        const reason = getBuildingPermits({gameState: stateChangedBuildings, playerName: RED, cityName: GOTEBORG})?.reason;
        expect(reason).toBe(BuildingPermitRejected.plegded)
    });
    it('Should return an object with rejected reason when given a plegded estate', () => {
        const reason = getBuildingPermits({gameState: stateChangedBuildings, playerName: RED, cityName: SZTOKHOLM})?.reason;
        expect(reason).toBe(BuildingPermitRejected.plegded)
    });
    it('Should return an object with rejected reason when gieven estate belongs to another player / bank', () => {
        const reasonAnotherPlayer = getBuildingPermits({gameState: stateChangedBuildings, playerName: RED, cityName: MADRIT})?.reason;
        const reasonAnotherBank = getBuildingPermits({gameState: stateChangedBuildings, playerName: RED, cityName: LONDON})?.reason;
        expect(reasonAnotherPlayer).toBe(BuildingPermitRejected.ownsOnlyPart)
        expect(reasonAnotherBank).toBe(BuildingPermitRejected.ownsOnlyPart)

    });
    it('Should return an object with rejected reason when given estate is in a country, where some other city belongs to another pleyer / bank', () => {
        const reasonAnotherPlayer = getBuildingPermits({gameState: stateChangedBuildings, playerName: RED, cityName: BARCELONA})?.reason;
        const reasonAnotherBank = getBuildingPermits({gameState: stateChangedBuildings, playerName: RED, cityName: LIVERPOOL})?.reason;
        expect(reasonAnotherPlayer).toBe(BuildingPermitRejected.ownsOnlyPart)
        expect(reasonAnotherBank).toBe(BuildingPermitRejected.ownsOnlyPart)
    });
    it('Should return an object with rejected reason when given estate is in a country where each city has a hotel', () => {
        const reasonAlreadyHotels = getBuildingPermits({gameState: stateChangedBuildings, playerName: RED, cityName: SALONIKI})?.reason;
        expect(reasonAlreadyHotels).toBe(BuildingPermitRejected.alreadyBuild)
    });
    it('Should return an object with rejected reason when bank has no houses and only houses might have been build in cities of some country', () => {

    })
    it('Should return an object with rejected reason when bank has no hotels and there is a max nr of houses in each city in the country', () => {

    })
    describe('Testing successfull building permits. Each when player owns all estates, none is plegede', () => {
        describe('changeBuildingsDeltasSuccess1', () => {
            it('Should return an object with the country name and permits for up to 4 houses when [0h0H, 0h0H]', () => {
                //Austria
                // const permits = getBuildingPermits({gameState: readyState1, playerName: RED, cityName: INSBRUK});
                // expect(permits).toEqual(permits_0h0H_0h0H);
            })
            it('Should return an object with the country name and permits for up to 4 houses when [1h0H, 0h0H]', () => {
                //Grecja
                // const permits = getBuildingPermits({gameState: readyState1, playerName: RED, cityName: ATENY});
                // expect(permits).toEqual(permits_1h0H_0h0H);
        
            })
            it('Should return an object with the country name and permits for up to 4 houses when [0h0H, 0h0H, 0h0H]', () => {
                //Włochy
                // const permits = getBuildingPermits({gameState: readyState1, playerName: RED, cityName: NEAPOL});
                // expect(permits).toEqual(permits_0h0H_0h0H_0h0H);
            })
            it('Should return an object with the country name and permits for up to 4 houses when [0h0H, 1h0H, 0h0H]', () => {
                //Hiszpania
                // const permits = getBuildingPermits({gameState: readyState1, playerName: RED, cityName: MADRIT});
                // expect(permits).toEqual(permits_0h0H_1h0H_0h0H);
            })
            it('Should return an object with the country name and permits for up to 4 houses when [1h0H, 0h0H, 1h0H]', () => {
                //UK
                // const permits = getBuildingPermits({gameState: readyState1, playerName: RED, cityName: LONDON});
                // expect(permits).toEqual(permits_1h0H_0h0H_1h0H);
            })
            it('Should return an object with the country name and permits for up to 4 houses when [1h0H, 1h0H, 0h0H]', () => {
                //Benelux
                // const permits = getBuildingPermits({gameState: readyState1, playerName: RED, cityName: ROTTERDAM});
                // expect(permits).toEqual(permits_1h0H_1h0H_0h0H);
            })
            it('Should return an object with the country name and permits for up to 4 houses when [3h0H, 3h0H, 3h0H]', () => {
                //Szwecja
                // const permits = getBuildingPermits({gameState: readyState1, playerName: RED, cityName: GOTEBORG});
                // expect(permits).toEqual(permits_3h0H_3h0H_3h0H);
            })
            it('Should return an object with the country name and permits for up to 4 houses when [4h0H, 3h0H, 3h0H]', () => {
                //RFN
                // const permits = getBuildingPermits({gameState: readyState1, playerName: RED, cityName: FRANKFURT});
                // expect(permits).toEqual(permits_4h0H_3h0H_3h0H);
        
            })
        }),
        describe('changeBuildingsDeltasSuccess2', () => {
            it('Should return an object with the country name and permits for up to 3 houses when, [2h0H, 3h0H]', () => {
                //Grecja
                // const permits = getBuildingPermits({gameState: readyState2, playerName: RED, cityName: ATENY});
                // expect(permits).toEqual(permits_4h0H_3h0H_3h0H);            
            })
            it('Should return an object with permits when [0h1H, 4h0H]', () => {
                //Austria
                // const permits = getBuildingPermits({gameState: readyState2, playerName: RED, cityName: INSBRUK});
                // expect(permits).toEqual(permits_0h1H_4h0H);
            })
            it('Should return an object with the country name and permits for up to 4 houses when [0h1H, 4h0H, 4h0H]', () => {
                //Hiszpania
                // const permits = getBuildingPermits({gameState: readyState2, playerName: RED, cityName: BARCELONA});
                // expect(permits).toEqual(permits_0h1H_4h0H_4h0H);
            })
            it('Should return an object with the country name and permits for up to 4 houses when [4h0H, 0h1H, 0h1H]', () => {
                // UK
                // const permits = getBuildingPermits({gameState: readyState2, playerName: RED, cityName: LIVERPOOL});
                // expect(permits).toEqual(permits_4h0H_0h1H_0h1H);
            })    
        });
        describe('changeBuildingsDeltasSuccess3', () => {
            it('Should return an object with permits when [4h0H, 0h1H]', () => {
                //Grecja
                // const permits = getBuildingPermits({gameState: readyState3, playerName: RED, cityName: SALONIKI});
                // expect(permits).toEqual(permits_4h0H_0h1H);
            })    
            it('Should return an option to purchase hotels when each city has 4 houses', () => {
                //Spain
                // const permits = getBuildingPermits({gameState: readyState3, playerName: RED, cityName: SALONIKI});
                // expect(permits).toEqual(permits_4h0H_4h0H_4h0H);
            })
        })
    })
    describe('Player already bough some hotels in this turn. Limit of hotels per turn is 3', () => {
        // Nr of hotels purchased in a turn has to be saved to the game state!!
    })

})