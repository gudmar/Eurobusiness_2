import { INITIAL_NR_HOTELS, INITIAL_NR_HOUSES } from "../../../Constants/constants";
import { AMSTERDAM, ATENY, BARCELONA, BLUE, BRUKSELA, FRANKFURT, GOTEBORG, INSBRUK, LIVERPOOL, LONDON, MADRIT, MALMO, MEDIOLAN, NEAPOL, POWER_STATION, RED, ROME, ROTTERDAM, SALONIKI, SEWILLA, SZTOKHOLM, WATER_PLANT, WIEDEN } from "../../../Data/const";
import { Bank } from "../../Bank/Bank";
import { BuildingPermitRejected, getBuildingPermits, tBuidlingApproved, tBuildingPermits, tHouseLocations } from "../../Journalist/utils/getBuildingPermits";
import { Players } from "../../Players/Players";
import { noHotelsInBankOutput, noHousesInBankOutput, permits_0h0H_0h0H, permits_0h0H_0h0H_0h0H, permits_0h0H_1h0H_0h0H, permits_0h1H_4h0H, permits_0h1H_4h0H_4h0H, permits_1h0H_0h0H, permits_1h0H_0h0H_1h0H, permits_1h0H_1h0H_0h0H, permits_2h0H_3h0H, permits_2h0H_3h0H_NotEnoughHouses, permits_2_hotels_bought, permits_3h0H_3h0H_3h0H, permits_4h0H_0h1H, permits_4h0H_0h1H_0h1H, permits_4h0H_3h0H_3h0H, permits_4h0H_4h0H_4h0H, permits_4h0H_4h0H_4h0H_0HotelsLeft, permits_4h0H_4h0H_4h0H_2HotelsLeft } from "./getBuildingPermitsMocks_outputs";
import { readyState1, readyState2, readyState3, readyState4 } from "./getBuildingPermitsMocks_statePreparation";
import { changeEstates } from "./getGameStateMock/getGameStateMock";
import { DWALIN, getStateMock } from "./getGameStateMock/getStateTemplate";

const ESTATES_RED = [
    ATENY, SALONIKI, // GREECE
    NEAPOL, MEDIOLAN, ROME, //ITALY
    BARCELONA, SEWILLA, // SPAIN, not all
    LIVERPOOL, // UK not all
    POWER_STATION, WATER_PLANT, // PLANTS
    SZTOKHOLM, GOTEBORG, MALMO, // SZWECJA,
    INSBRUK, WIEDEN, // AUSTRIA
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
    {
        estateName: INSBRUK,
        props: { nrOfHouses: 4}
    },
    {
        estateName: WIEDEN,
        props: { nrOfHouses: 4}
    }
]
const stateChangedBuildings = changeEstates(stateWithChangedOwner, changeBuildingsDeltasForErrorTesting);

describe('Testing getBuildingPermits', () => {
    beforeEach(() => {
        Bank.nrOfHotels = INITIAL_NR_HOTELS;
        Bank.nrOfHouses = INITIAL_NR_HOUSES;
    })
    it('Should throw an error when given a not existing estate', () => {
        const throwingFunction = () => getBuildingPermits({gameState: stateChangedBuildings, playerName: DWALIN, cityName: 'Glowow'});
        expect(throwingFunction).toThrow();
    });
    it('Should return an object with rejected reason when given an estate where buildings cannot be created', () => {
        const reason = (getBuildingPermits({gameState: stateChangedBuildings, playerName: DWALIN, cityName: POWER_STATION}) as tBuidlingApproved)?.reason;
        expect(reason).toBe(BuildingPermitRejected.notACity);
    });
    it('Should return an object with rejected reason when given an estate in country, where some other estate is plegded', () => {
        const reason = (getBuildingPermits({gameState: stateChangedBuildings, playerName: DWALIN, cityName: GOTEBORG}) as tBuidlingApproved)?.reason;
        expect(reason).toBe(BuildingPermitRejected.plegded)
    });
    it('Should return an object with rejected reason when given a plegded estate', () => {
        const reason = (getBuildingPermits({gameState: stateChangedBuildings, playerName: DWALIN, cityName: SZTOKHOLM}) as tBuidlingApproved)?.reason;
        expect(reason).toBe(BuildingPermitRejected.plegded)
    });
    it('Should return an object with rejected reason when gieven estate belongs to another player / bank', () => {
        const reasonAnotherPlayer = (getBuildingPermits({gameState: stateChangedBuildings, playerName: DWALIN, cityName: MADRIT}) as tBuidlingApproved)?.reason;
        const reasonAnotherBank = (getBuildingPermits({gameState: stateChangedBuildings, playerName: DWALIN, cityName: LONDON}) as tBuidlingApproved)?.reason;
        expect(reasonAnotherPlayer).toBe(BuildingPermitRejected.ownsOnlyPart)
        expect(reasonAnotherBank).toBe(BuildingPermitRejected.ownsOnlyPart)

    });
    it('Should return an object with rejected reason when given estate is in a country, where some other city belongs to another pleyer / bank', () => {
        const reasonAnotherPlayer = (getBuildingPermits({gameState: stateChangedBuildings, playerName: DWALIN, cityName: BARCELONA}) as tBuidlingApproved)?.reason;
        const reasonAnotherBank = (getBuildingPermits({gameState: stateChangedBuildings, playerName: DWALIN, cityName: LIVERPOOL}) as tBuidlingApproved)?.reason;
        expect(reasonAnotherPlayer).toBe(BuildingPermitRejected.ownsOnlyPart)
        expect(reasonAnotherBank).toBe(BuildingPermitRejected.ownsOnlyPart)
    });
    it('Should return an object with rejected reason when given estate is in a country where each city has a hotel', () => {
        const reasonAlreadyHotels = (getBuildingPermits({gameState: stateChangedBuildings, playerName: DWALIN, cityName: SALONIKI}) as tBuidlingApproved)?.reason;
        expect(reasonAlreadyHotels).toBe(BuildingPermitRejected.alreadyBuild)
    });
    it('Should return an object with rejected reason when bank has no houses and only houses might have been build in cities of some country', () => {
        Bank.nrOfHouses = 0;
        stateChangedBuildings.bank.nrOfHouses = 0;
        const reasonNoHouses = getBuildingPermits({gameState: stateChangedBuildings, playerName: DWALIN, cityName: MEDIOLAN, });
        expect(reasonNoHouses).toEqual(noHousesInBankOutput)
    })
    it('Should return an object with rejected reason when bank has no hotels and there is a max nr of houses in each city in the country', () => {
        Bank.nrOfHotels = 0;
        stateChangedBuildings.bank.nrOfHotels = 0;
        const reasonNoHouses = getBuildingPermits({gameState: stateChangedBuildings, playerName: DWALIN, cityName: WIEDEN, });
        expect(reasonNoHouses).toEqual(noHotelsInBankOutput)
    })

    const printHouses = (permits: any) => {
        const entries = Object.entries(permits);
        console.log('Calculated permits:')
        entries.forEach(([key, value]: [string, any]) => {
            console.log(key)
            Object.entries(value).forEach(([k, v]) => {
                if (key !== 'country')
                console.log(k, v)
            })
        })
    }

    const sortPermits = (buildingPermits: tBuildingPermits) => {
        const permits = buildingPermits.permits!;
        if (Object.keys(permits).length === 0) return buildingPermits;
        const permitEntries = Object.entries(permits);
        permitEntries.forEach(([key, rows]: [string, any]) => {
            if (Array.isArray(rows)){
                rows.forEach((row: any) => {
                    Object.values(row).forEach((val) => {
                        if (Array.isArray(val)) {
                            val.sort();
                        };    
                    })
                })    
                rows.sort((a: unknown, b: unknown) => {
                    const aAsString = JSON.stringify(a)
                    const bAsString = JSON.stringify(b);
                    if (aAsString > bAsString) return -1
                    return aAsString === bAsString ? 0 : 1 
                });    
            }
            type tPermitKeys = keyof typeof permits;
            if (key in permits) {
                permits[key as tPermitKeys] = rows;
            }
        })
        return buildingPermits;
    }

    describe('Testing successfull building permits. Each when player owns all estates, none is plegede', () => {
        describe('changeBuildingsDeltasSuccess1', () => {
            it('Should return an object with the country name and permits for up to 3 houses when [0h0H, 0h0H], and message that hotels may not be build', () => {
                //Austria
                const permits = getBuildingPermits({gameState: readyState1, playerName: DWALIN, cityName: INSBRUK});
                expect(permits).toEqual(permits_0h0H_0h0H);
            })
            it('Should return an object with the country name and permits for up to 3 houses when [1h0H, 0h0H]', () => {
                //Grecja
                const permits = getBuildingPermits({gameState: readyState1, playerName: DWALIN, cityName: ATENY});
                expect(sortPermits(permits as tBuildingPermits)).toEqual(sortPermits(permits_1h0H_0h0H));
        
            })
            it('Should return an object with the country name and permits for up to 3 houses when [0h0H, 0h0H, 0h0H]', () => {
                //Włochy
                const permits = getBuildingPermits({gameState: readyState1, playerName: DWALIN, cityName: NEAPOL});
                expect(permits).toEqual(permits_0h0H_0h0H_0h0H);
            })
            it('Should return an object with the country name and permits for up to 3 houses when [0h0H, 1h0H, 0h0H]', () => {
                //Hiszpania
                const permits = getBuildingPermits({gameState: readyState1, playerName: DWALIN, cityName: MADRIT});
                expect(sortPermits(permits as tBuidlingApproved)).toEqual(sortPermits(permits_0h0H_1h0H_0h0H));
            })
            it('Should return an object with the country name and permits for up to 3 houses when [1h0H, 0h0H, 1h0H]', () => {
                //UK
                const permits = getBuildingPermits({gameState: readyState1, playerName: DWALIN, cityName: LONDON});
                printHouses(permits);
                expect(permits).toEqual(permits_1h0H_0h0H_1h0H);
            })
            it('Should return an object with the country name and permits for up to 3 houses when [1h0H, 1h0H, 0h0H]', () => {
                //Benelux
                const permits = getBuildingPermits({gameState: readyState1, playerName: DWALIN, cityName: ROTTERDAM});
                const sortedPermits = sortPermits(permits as tBuidlingApproved)
                const sortedExpectation = sortPermits(permits_1h0H_1h0H_0h0H);
                expect(sortedPermits).toEqual(sortedExpectation);
            }) 
            it('Should return an object with the country name and permits for up to 3 houses when [3h0H, 3h0H, 3h0H]', () => {
                //Szwecja
                const permits = getBuildingPermits({gameState: readyState1, playerName: DWALIN, cityName: GOTEBORG});
                expect(permits).toEqual(permits_3h0H_3h0H_3h0H);
            })
            it('Should return an object with the country name and permits for up to 3 houses when [4h0H, 3h0H, 3h0H]', () => {
                //RFN
                const permits = getBuildingPermits({gameState: readyState1, playerName: DWALIN, cityName: FRANKFURT});
                expect(permits).toEqual(permits_4h0H_3h0H_3h0H);
        
            })
        }),
        describe('changeBuildingsDeltasSuccess2', () => {
            afterEach(() => {
                Bank.nrOfHouses = 40;
            })

            it('Should return an object with the country name and permits for up to 3 houses when, [2h0H, 3h0H]', () => {
                //Grecja
                const permits = getBuildingPermits({gameState: readyState2, playerName: DWALIN, cityName: ATENY});
                const sortedPermits = sortPermits(permits as tBuidlingApproved);
                const sortedExpectation = sortPermits(permits_2h0H_3h0H)
                expect(sortedPermits).toEqual(sortedExpectation);
            })
            it('Should return permits for 1 and 2 houses only if there are only 2 houses left in the bank', () => {
                //Grecja
                Bank.nrOfHouses = 2;
                const permits = getBuildingPermits({gameState: readyState2, playerName: DWALIN, cityName: ATENY});
                printHouses(permits)
                expect(permits).toEqual(permits_2h0H_3h0H_NotEnoughHouses);
                
            })

            it('Should return an object with permits when [0h1H, 4h0H]', () => {
                //Austria
                const permits = getBuildingPermits({gameState: readyState2, playerName: DWALIN, cityName: INSBRUK});
                expect(permits).toEqual(permits_0h1H_4h0H);
            })
            it('Should return an object with the country name and permits for up to 4 houses when [0h1H, 4h0H, 4h0H]', () => {
                //Hiszpania
                const permits = getBuildingPermits({gameState: readyState2, playerName: DWALIN, cityName: BARCELONA});
                printHouses(permits)
                expect(permits).toEqual(permits_0h1H_4h0H_4h0H);
            })
            it('Should return an object with the country name and permits for up to 4 houses when [4h0H, 0h1H, 0h1H]', () => {
                // UK
                const permits = getBuildingPermits({gameState: readyState2, playerName: DWALIN, cityName: LIVERPOOL});
                expect(permits).toEqual(permits_4h0H_0h1H_0h1H);
            })    
        });
        describe('changeBuildingsDeltasSuccess3', () => {
            afterEach(() => Bank.nrOfHotels = 89)
            it('Should return an object with permits when [4h0H, 0h1H]', () => {
                //Grecja
                const permits = getBuildingPermits({gameState: readyState3, playerName: DWALIN, cityName: SALONIKI});
                expect(permits).toEqual(permits_4h0H_0h1H);
            })    
            it('Should return an option to purchase hotels when each city has 4 houses', () => {
                //Spain
                const permits = getBuildingPermits({gameState: readyState3, playerName: DWALIN, cityName: SEWILLA});
                const sortedPermits = sortPermits(permits as tBuidlingApproved);
                const sortedExpected = sortPermits(permits_4h0H_4h0H_4h0H)
                expect(sortedPermits).toEqual(sortedExpected);
            })
            it('Should return permits for 1 or 2 hotels if there are only 2 hotels left in the bank', () => {
                // Spain
                Bank.nrOfHotels = 2;
                const permits = getBuildingPermits({gameState: readyState3, playerName: DWALIN, cityName: SEWILLA});
                expect(permits).toEqual(permits_4h0H_4h0H_4h0H_2HotelsLeft);
            });
            it('Should return reason no hotels left if nr of hotels is 0 and otherwise there would be a possiblity to build up to 3 hotels', () => {
                Bank.nrOfHotels = 0;
                readyState3.bank.nrOfHotels = 0;
                const permits = getBuildingPermits({gameState: readyState3, playerName: DWALIN, cityName: SEWILLA});
                printHouses(permits)
                expect(permits).toEqual(permits_4h0H_4h0H_4h0H_0HotelsLeft);
            })
        })
    })
    describe('Player already bough some hotels in this turn. Limit of hotels per turn is 3', () => {
        // Nr of hotels purchased in a turn has to be saved to the game state!!
        it('Should return 1 hotel and a reason when there is a possibility to purchase 3 hotels, but player already bought 2 hotels in this round', () => {
            const permits = getBuildingPermits({gameState: readyState4, playerName: DWALIN, cityName: SEWILLA});
            expect(permits).toEqual(permits_2_hotels_bought);
        })
    })

})
