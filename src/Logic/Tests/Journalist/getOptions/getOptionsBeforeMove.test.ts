import { ATENY, AUSTRIA, BARCELONA, GLASGOW, GREECE, GREEN, INSBRUK, ITALY, LIVERPOOL, LONDON, MADRIT, MEDIOLAN, NEAPOL, RED, ROME, SALONIKI, SEWILLA, WIEDEN, YELLOW } from "../../../../Data/const"
import { getTestableOptions } from "../../../Journalist/getOptions"
import { tJournalistOutputArrayOrRejection, tJournalistState } from "../../../Journalist/types"
import { SellBuildingsRejected } from "../../../Journalist/utils/constants"
import { BuildingPermitRejected, NrOfHouses } from "../../../Journalist/utils/getBuildingPermits"
import { NoBuildingPermitResults } from "../../../Journalist/utils/getBuyBuildingsOptions"
import { PlegdeEstatesReasons } from "../../../Journalist/utils/getPlegdeOptions"
import { SellEstatesReasons } from "../../../Journalist/utils/getSellEstatesOptions"
import { getSellingPermitsCategory } from "../../../Journalist/utils/getSellingPermits"
import { expandTestData } from "../../../Journalist/utils/sellingPermitsMock"
import { getMockedGameState, getPlayerColor } from "../getGameStateMock/getGameStateMock"
import { getMockResponseGetter } from "../getGameStateMock/getResponse"
import { DORIN } from "../getGameStateMock/getStateTemplate"

const throwIfNoPermits = (options: tJournalistState) => {
    if (!('payload' in options.buyBuildings)) throw new Error('No payload in options.buyBuildings')
}

const getBuyBuildingsExpectedResponse = getMockResponseGetter(BuildingPermitRejected.ownsOnlyPart);
const getSellBuildingsExpectedResponse = getMockResponseGetter(SellBuildingsRejected.NoBuildings);

describe('Testing getOptions', () => {
    xit('Should allow to move player in each of below cases, when player is not in prison', () => {
        // const options = getTestableOptions()
    })
    describe('Before move', () => {
        describe('Buildings', () => {
            describe('Should not buy cases', () => {
                xit('Should return a reason for no permit to buy houses, when player cannot purchase them', () => {

                })
                it('Should not add a possiblity to buy buildings when player still did not move for the first time', () => {
                    const state = getMockedGameState();
                    const options = getTestableOptions(state);
                    expect(options.buyBuildings).toEqual({reason: NoBuildingPermitResults.GameNotStartedYet})
                })
                it('Should not add possibility to buy houses and return a reason NOFullCountries when player does not control every city in some conutry', () => {
                    const dorinEstates = [ SALONIKI, NEAPOL, MEDIOLAN, BARCELONA, MADRIT, LIVERPOOL, LONDON ];
                    const state = getMockedGameState({
                        currentPlayer: [DORIN],
                        estatesOwner: [DORIN, dorinEstates],
                    });
                    const listOfDorinsEstateNames = (() => {
                        const dorinColor = getPlayerColor(state, DORIN);
                        const ownedEstateNames = state.boardFields.filter((field) => {
                            if ('owner' in field) {
                                const owner = field?.owner;
                                return field?.owner === dorinColor    
                            }
                            return false;
                        }).map(({name}) => name);
                        return ownedEstateNames;
                    })()
                    const options = getTestableOptions(state);
                    expect(listOfDorinsEstateNames).toEqual(dorinEstates)
                    expect(options.buyBuildings).toEqual({reason: NoBuildingPermitResults.NoFullCountries});
                });
                it('Should not add possiblity to buy houses when player already bought 3 houses in the round and has where to build houses', () => {
                    const dorinEstates = [ SALONIKI, ATENY, NEAPOL, MEDIOLAN, ROME, BARCELONA, SEWILLA, MADRIT, LIVERPOOL, GLASGOW ];
                    const state = getMockedGameState({
                        estatesOwner: [DORIN, dorinEstates],
                        currentPlayer: [DORIN],
                        housesInTurn: [[3, DORIN]],
                    });
                    const options = getTestableOptions(state);
                    expect(options.buyBuildings).toEqual({reason: NoBuildingPermitResults.HousePurchaseLimitReached})
                });
                it('Should not add possiblity to buy hotels when player already bought 3 of them in a round, but has where to build them', () => {
                    const dorinEstates = [ SALONIKI, ATENY, NEAPOL, MEDIOLAN, ROME, BARCELONA, SEWILLA, MADRIT, LIVERPOOL, GLASGOW ];
                    const state = getMockedGameState({
                        estatesOwner: [DORIN, dorinEstates],
                        currentPlayer: [DORIN],
                        hotelsInRound: [[3, DORIN]],
                    });
                    const options = getTestableOptions(state);
                    expect(options.buyBuildings).toEqual({reason: NoBuildingPermitResults.HotelPurcahseLimitReached})
                })
                it('Should not add possiblity to buy buildings when player owns a country, but a city in it is mortgaged', () => {
                    const dorinEstates = [ SALONIKI, NEAPOL, MEDIOLAN, ROME, SEWILLA, MADRIT];
                    const state = getMockedGameState({
                        estatesOwner: [DORIN, dorinEstates],
                        currentPlayer: [DORIN],
                        estatesDelta: [
                            {
                                estateName: MEDIOLAN,
                                props: {
                                    owner: GREEN, isPlegded: true,
                                }
                            }
                        ]
                    });
                    const expected = getBuyBuildingsExpectedResponse({
                        [ITALY]: BuildingPermitRejected.plegded,
                    })
                    const options = getTestableOptions(state);
                    if (!('payload' in options.buyBuildings)) throw new Error('Payload not in buyBuildings')
                    expect(options.buyBuildings.payload).toEqual(expected)
                })
                it('Should not add a possiblity to buy buildings when player is in prison and has turns to wait, but has where to build buildings', () => {
                    const dorinEstates = [ SALONIKI, ATENY, NEAPOL, MEDIOLAN, ROME, SEWILLA, MADRIT];
                    const state = getMockedGameState({
                        estatesOwner: [DORIN, dorinEstates],
                        currentPlayer: [DORIN],
                        toJail: [DORIN],
                    });
                    const options = getTestableOptions(state);
                    expect(options.buyBuildings).toEqual({ reason: NoBuildingPermitResults.InJail })    
                })
                it('Should not add a possiblity to buy buildings when player has a country, but no more room for buildings', () => {
                    // 1 full countrym, 2/3 of other country
                    const dorinEstates = [ SALONIKI, ATENY, NEAPOL, MEDIOLAN, ROME, SEWILLA, MADRIT];
                    const state = getMockedGameState({
                        estatesOwner: [DORIN, dorinEstates],
                        currentPlayer: [DORIN],
                        estatesDelta: [
                            { estateName: SALONIKI, props: { owner: GREEN, nrOfHotels: 4 } },
                            { estateName: ATENY, props: { owner: GREEN, nrOfHotels: 4 } },
                            { estateName: NEAPOL, props: { owner: GREEN, nrOfHotels: 4 } },
                            { estateName: MEDIOLAN, props: { owner: GREEN, nrOfHotels: 4 } },
                            { estateName: ROME, props: { owner: GREEN, nrOfHotels: 4 } },
                        ]
                    });
                    const options = getTestableOptions(state);
                    const expectedResponse = getBuyBuildingsExpectedResponse({
                        [GREECE]: BuildingPermitRejected.alreadyBuild,
                        [ITALY]: BuildingPermitRejected.alreadyBuild,
                    })
                    if (!('payload' in options.buyBuildings)) throw new Error('No payload in options.buyBuildings')
                    expect(options.buyBuildings.payload).toEqual(expectedResponse)
                })
                describe('Collapse reasons', () => {
                    it('Should return a single reason when player has no money to buy a house on any estate he owns', () => {
                        const dorinEstates = [ MEDIOLAN, ROME, SEWILLA, MADRIT, INSBRUK, WIEDEN];
                        const state = getMockedGameState({
                            estatesOwner: [DORIN, dorinEstates],
                            currentPlayer: [DORIN],
                            setMoney: [[399, DORIN]]
                        });
                        const options = getTestableOptions(state);
                        expect(options.buyBuildings).toEqual({reason: NoBuildingPermitResults.NoMoney})    
                    })
                })
            });
            describe('Should buy cases', () => {
                it('Should add a possiblity to buy houses when player has a not plegged country with space', () => {
                    // {
                    //     GREECE: buildingPossibilities,
                    //     ITALY: buildingPossibilities,
                    //     SPAIN: .....
                    // }
                    const dorinEstates = [ INSBRUK, WIEDEN, SALONIKI, NEAPOL, MEDIOLAN];
                    const state = getMockedGameState({
                        estatesOwner: [DORIN, dorinEstates],
                        currentPlayer: [DORIN],
                    });
                    const options = getTestableOptions(state);
                    if (!('payload' in options.buyBuildings)) throw new Error('Payload not in options.buyBuildings');
                    const permits = options.buyBuildings.payload;
                    const countryNamesNotAustria = Object.keys(permits).filter((countryName) => countryName !== AUSTRIA)
                    countryNamesNotAustria.forEach((countryName ) => {
                        const countryResult: tJournalistOutputArrayOrRejection = permits[countryName];
                        expect(countryResult).toEqual({
                            reason: BuildingPermitRejected.ownsOnlyPart,
                            country: countryName,
                        });
                    });

                    const austriaPermit = permits[AUSTRIA];
                    const expectedAustriaPermit = {
                        [NrOfHouses.one]: [
                          { locationOne: [ "Insbruck", ], cost: 400, },
                          { locationOne: [ "Wien", ], cost: 400, },
                        ],
                        hotelReason: "Each city should have at least 4 houses or 1 hotel",
                        [NrOfHouses.two]: [
                          { locationOne: [ "Insbruck", "Wien", ], cost: 800, },
                        ],
                        [NrOfHouses.three]: [
                          { locationOne: ["Insbruck",], locationTwo: [ "Wien", ], cost: 1200, },
                          { locationOne: [ "Wien", ], locationTwo: [ "Insbruck", ], cost: 1200, },
                        ],
                      }
                    expect(austriaPermit.permits).toEqual(expectedAustriaPermit);
                    expect(austriaPermit.country).toEqual(AUSTRIA)

                })
            });
            describe('Should not sell buildings cases with reason', () => {
                it('Should not allow to sell buildings when player has no buildings but has a country', () => {
                    const dorinEstates = [ INSBRUK, WIEDEN, SALONIKI, NEAPOL, MEDIOLAN];
                    const state = getMockedGameState({
                        estatesOwner: [DORIN, dorinEstates],
                        currentPlayer: [DORIN],
                    });
                    const options = getTestableOptions(state);
                    const expected = { reason: SellBuildingsRejected.NoBuildings}
                    expect(options.sellBuildings).toEqual(expected);
                })
                it('Should not allow to sell buildings when player is in jail', () => {
                    const dorinEstates = [ INSBRUK, WIEDEN, SALONIKI, NEAPOL, MEDIOLAN];
                    const state = getMockedGameState({
                        estatesOwner: [DORIN, dorinEstates],
                        currentPlayer: [DORIN],
                        estatesDelta: [
                            { estateName: INSBRUK, props: { owner: GREEN, nrOfHouses: 4 } },
                            { estateName: WIEDEN, props: { owner: GREEN, nrOfHotels: 1 } },
                        ],
                        toJail: [DORIN],
                    });
                    const options = getTestableOptions(state);
                    const expected = { reason: SellBuildingsRejected.InJail}
                    expect(options.sellBuildings).toEqual(expected);
                })
            })
            describe('Should sell buildings cases', () => {
                it('Should allow to sell buildings when player has buildings and is not in prison', () => {
                    const dorinEstates = [ ROME, MEDIOLAN, NEAPOL, SALONIKI, BARCELONA ];
                    const state = getMockedGameState({
                        estatesOwner: [DORIN, dorinEstates],
                        currentPlayer: [DORIN],
                        estatesDelta: [
                            { estateName: ROME, props: { owner: GREEN, nrOfHouses: 1 } },
                            { estateName: MEDIOLAN, props: { owner: GREEN, nrOfHouses: 1 } },
                        ],
                    });
                    const options = getTestableOptions(state);
                    const EXPECTED_ITALY = expandTestData({
                        [getSellingPermitsCategory({ nrOfSoldHotels: 0, nrOfSoldHouses: 0, price: 0 })]: [
                            {solution: '0h_1h_1h', price: 0},
                        ],                    
                        [getSellingPermitsCategory({nrOfSoldHotels: 0, nrOfSoldHouses: 1, price: 50})]: [
                            {solution: '0h_1h_0h', price: 50},
                            {solution: '0h_0h_1h',  price: 50}
                        ],
                        [getSellingPermitsCategory({nrOfSoldHotels: 0, nrOfSoldHouses: 2, price: 100})]: [
                            {solution: '0h_0h_0h', price: 100},
                        ],
                    }, [NEAPOL, MEDIOLAN, ROME])
                    const expected = getSellBuildingsExpectedResponse({
                        [ITALY]: EXPECTED_ITALY,
                    })
                    if (!('payload' in options.sellBuildings)) throw new Error('No payload in options.sellBuildings')
                    const result = options.sellBuildings.payload;
                    expect(options.sellBuildings.payload).toEqual(expected);
                })
            })
        })
        describe('Estates', () => {
            describe( 'No options case with explanation', () => {
                it('Should not add any key sellEstates to options in case player has no estates', () => {
                    const state = getMockedGameState({});
                    const options = getTestableOptions(state);
                    const isSellEstateKey = 'sellEstates' in options;
                    expect(isSellEstateKey).toBeFalsy();
                })
                it('Should not allow to plegde any estate when player has all estates plegded', () => {
                    const dorinEstates = [ ROME, MEDIOLAN, NEAPOL, SALONIKI, BARCELONA ];
                    const state = getMockedGameState({
                        estatesOwner: [DORIN, dorinEstates],
                        currentPlayer: [DORIN],
                        estatesDelta: [
                            { estateName: ROME, props: { owner: GREEN, isPlegded: true } },
                            { estateName: MEDIOLAN, props: { owner: GREEN, isPlegded: true } },
                            { estateName: NEAPOL, props: { owner: GREEN, isPlegded: true } },
                            { estateName: SALONIKI, props: { owner: GREEN, isPlegded: true } },
                            { estateName: BARCELONA, props: { owner: GREEN, isPlegded: true } },

                            { estateName: LONDON, props: { owner: RED, isPlegded: true } },
                            { estateName: ATENY, props: { owner: YELLOW, isPlegded: true } },
                        ],
                    });
                    const options = getTestableOptions(state);
                    expect(options.plegdeEstates).toEqual({reason: PlegdeEstatesReasons.EveryPlegded})
                })
                it('Should add reason when for plegding estates when player is in preason', () => {
                    const dorinEstates = [ ROME, MEDIOLAN, NEAPOL, SALONIKI, BARCELONA ];
                    const state = getMockedGameState({
                        estatesOwner: [DORIN, dorinEstates],
                        currentPlayer: [DORIN],
                        toJail: [DORIN],
                    });
                    const options = getTestableOptions(state);
                    expect(options.plegdeEstates).toEqual({reason: PlegdeEstatesReasons.InJail})

                })
                it('Should add reason when for selling estates when player is in preason', () => {
                    const dorinEstates = [ ROME, MEDIOLAN, NEAPOL, SALONIKI, BARCELONA ];
                    const state = getMockedGameState({
                        estatesOwner: [DORIN, dorinEstates],
                        currentPlayer: [DORIN],
                        toJail: [DORIN],
                    });
                    const options = getTestableOptions(state);
                    expect(options.sellEstates).toEqual({reason: SellEstatesReasons.InJail})
                })
                it('Should not allow to sell estates when player has buildings on it', () => {
                            
                })  
                it('Should not allow to plegde estates when player has buildings on it', () => {

                })  

                it('Should not allow to sell an estate when there are no houses on it, but there are still houses on other cities in the same country', () => {
                    // Though plegding this estate may be possible
                })
                it('Should not allow to unpleged an estate when player has not plegede estates', () => {

                })
                it('Should NOT allow to unplegde an estate when player has a plegded estate, and has NO MONEY to unplegde it', () => {
                    
                })
                it('Should not allow to sell estates when there are buildings on it', () => {

                })
                it ('Should not allow to sell estate when it is plegded, and thre are buildings in other cities of this country', () => {

                })
                it ('Should not allow to buy an estate when it has no owner, when this is a before move phase', () => {

                })
                describe('Collapse options', () => {
                    it('Should return a single plegde option when no unplegded estates owned', () => {

                    })
                    it('Should return a single unplegde option when no plegded estates owned', () => {

                    })
                    it('Should return a single not sell option when no estates owned', () => {

                    })
                    it('Should return a single not sell option when only COUNTRIES with buildings owned', () => {

                    })
                })
            })
            describe('Add options', () => {
                it('Should allow to plegde an estate when player has no houses on it but has houses on other estates from this country', () => {

                })
                it('Should allow to unplegde an estate when player has plegede estates and enought money to perform this operation', () => {

                })
                it('Should allow to sell an estate that has no buildings on it as long as there are not buildings in other citeis of the some country', () => {

                })
                it('Should allow to sell a plegded estate when there are no buildings in other cities of this country', () => {

                })
            })
        });
        describe('Get out of prison cards', () => {
            it('Should not allow to sell a get out of prison card when player has no such a card', () => {

            })
            it('Should not allow to sell a get out of prison card when player is still in jail', () => {

            })
            it('Should allow to sell a get out of prison card when player has one', () => {

            })
        })
        describe('Fields: chance, tax, guarded parking, first field after start, start field', () => {
            it('Should not charge for a tax field when it is beforeMove phase, as player was already charged for it', () =>{

            })
            it('Should not charge for a guarded parking when it is beforeMove phase, as player was already charged for it', () => {

            })
            it('Should not give money for start when there is beforeMove phase', () => {

            })
            it('Should not allow to draw a chance card when it is before move phase', () => {

            })
            it('Should not put player to jail when it is before move phase', () => {

            })
            it('Should force player to wait a turn when he is still in prison', () => {
                // Includes not ability to move
            })
        })
    })
})
