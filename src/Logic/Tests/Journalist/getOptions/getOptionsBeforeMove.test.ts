import { descriptors } from "../../../../Data/boardFields"
import { CHANCE_CARDS_BLUE, CHANCE_CARDS_RED } from "../../../../Data/chanceCards"
import { ATENY, AUSTRIA, BARCELONA, CHANCE_RED, EAST_RAILWAYS, GLASGOW, GREECE, GREEN, INSBRUK, ITALY, LIVERPOOL, LONDON, MADRIT, MEDIOLAN, NEAPOL, PLANT, POWER_STATION, RAILWAYS, RED, ROME, SALONIKI, SEWILLA, UK, WEST_RAILWAYS, WIEDEN, YELLOW } from "../../../../Data/const"
import { ACTIONS } from "../../../Chance/ChanceCardHolder"
import { getTestableOptions } from "../../../Journalist/getOptions"
import { OptionTypes, tJournalistOutputArrayOrRejection, tJournalistState } from "../../../Journalist/types"
import { SellBuildingsRejected } from "../../../Journalist/utils/constants"
import { BuildingPermitRejected, NrOfHouses } from "../../../Journalist/utils/getBuildingPermits"
import { NoBuildingPermitResults } from "../../../Journalist/utils/getBuyBuildingsOptions"
import { SpecialCardsReasons } from "../../../Journalist/utils/getGetOutFromPrisonCardOptions"
import { PlegdeEstatesReasons } from "../../../Journalist/utils/getPlegdeOptions"
import { SellEstatesReasons } from "../../../Journalist/utils/getSellEstatesOptions"
import { getSellingPermitsCategory } from "../../../Journalist/utils/getSellingPermits"
import { UnplegdeEstatesReasons } from "../../../Journalist/utils/getUnplegdeOptions"
import { expandTestData } from "../../../Journalist/utils/sellingPermitsMock"
import { TurnPhases } from "../../../types"
import { getMockedGameState, getPlayerColor } from "../getGameStateMock/getGameStateMock"
import { getMockResponseGetter } from "../getGameStateMock/getResponse"
import { BALIN, DORIN } from "../getGameStateMock/getStateTemplate"
import { tSetSpecialCardsToPlayers } from "../getGameStateMock/types"

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
                it('Should return reason notPlayerTurn, for buying houses when options cauculated for player not being a current player', () => {
                    const dorinEstates = [ SALONIKI, ATENY, NEAPOL, MEDIOLAN, BARCELONA, MADRIT, LIVERPOOL, LONDON, GLASGOW ];
                    const state = getMockedGameState({
                        currentPlayer: [BALIN],
                        estatesOwner: [DORIN, dorinEstates],
                        estatesDelta: [
                            {
                                estateName: WIEDEN,
                                props: {
                                    owner: YELLOW,
                                }
                            },
                            {
                                estateName: INSBRUK,
                                props: {
                                    owner: YELLOW,
                                }
                            }
                        ]

                    });
                    const options = getTestableOptions(state, DORIN);
                    expect(options.buyBuildings).toEqual({reason: NoBuildingPermitResults.NotGoodMoment});
                })
                it('Should return reaosn notPlayerTurn for buying houses when palayer already moved', () => {
                    const dorinEstates = [ SALONIKI, ATENY, NEAPOL, MEDIOLAN, BARCELONA, MADRIT, LIVERPOOL, LONDON, GLASGOW ];
                    const state = getMockedGameState({
                        currentPlayer: [DORIN],
                        estatesOwner: [DORIN, dorinEstates],
                        estatesDelta: [
                            {
                                estateName: WIEDEN,
                                props: {
                                    owner: YELLOW,
                                }
                            },
                            {
                                estateName: INSBRUK,
                                props: {
                                    owner: YELLOW,
                                }
                            }
                        ],
                        setGamePhase: TurnPhases.AfterMove,
                    });
                    const options = getTestableOptions(state, DORIN);
                    expect(options.buyBuildings).toEqual({reason: NoBuildingPermitResults.NotGoodMoment});
                })
                it('Should not add a possiblity to buy buildings when player still did not move for the first time', () => {
                    const state = getMockedGameState();
                    const options = getTestableOptions(state, DORIN);
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
                    const options = getTestableOptions(state, DORIN);
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
                    const options = getTestableOptions(state, DORIN);
                    expect(options.buyBuildings).toEqual({reason: NoBuildingPermitResults.HousePurchaseLimitReached})
                });
                it('Should not add possiblity to buy hotels when player already bought 3 of them in a round, but has where to build them', () => {
                    const dorinEstates = [ SALONIKI, ATENY, NEAPOL, MEDIOLAN, ROME, BARCELONA, SEWILLA, MADRIT, LIVERPOOL, GLASGOW ];
                    const state = getMockedGameState({
                        estatesOwner: [DORIN, dorinEstates],
                        currentPlayer: [DORIN],
                        hotelsInRound: [[3, DORIN]],
                    });
                    const options = getTestableOptions(state, DORIN);
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
                    const options = getTestableOptions(state, DORIN);
                    // if (!('payload' in options.buyBuildings)) throw new Error('Payload not in buyBuildings')
                    expect((options as any).buyBuildings.actions[0].payload).toEqual(expected)
                })
                it('Should not add a possiblity to buy buildings when player is in prison and has turns to wait, but has where to build buildings', () => {
                    const dorinEstates = [ SALONIKI, ATENY, NEAPOL, MEDIOLAN, ROME, SEWILLA, MADRIT];
                    const state = getMockedGameState({
                        estatesOwner: [DORIN, dorinEstates],
                        currentPlayer: [DORIN],
                        toJail: [DORIN],
                    });
                    const options = getTestableOptions(state, DORIN);
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
                    const options = getTestableOptions(state, DORIN);
                    const expectedResponse = getBuyBuildingsExpectedResponse({
                        [GREECE]: BuildingPermitRejected.alreadyBuild,
                        [ITALY]: BuildingPermitRejected.alreadyBuild,
                    })
                    expect((options as any).buyBuildings.actions[0].payload).toEqual(expectedResponse)
                })
                describe('Collapse reasons', () => {
                    it('Should return a single reason when player has no money to buy a house on any estate he owns', () => {
                        const dorinEstates = [ MEDIOLAN, ROME, SEWILLA, MADRIT, INSBRUK, WIEDEN];
                        const state = getMockedGameState({
                            estatesOwner: [DORIN, dorinEstates],
                            currentPlayer: [DORIN],
                            setMoney: [[399, DORIN]]
                        });
                        const options = getTestableOptions(state, DORIN);
                        expect((options as any).buyBuildings).toEqual({reason: NoBuildingPermitResults.NoMoney})
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
                    const options = getTestableOptions(state, DORIN);
                    const permits = (options as any).buyBuildings.actions[0].payload;
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
                    const options = getTestableOptions(state, DORIN);
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
                    const options = getTestableOptions(state, DORIN);
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
                    const options = getTestableOptions(state, DORIN);
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
                    expect((options as any).sellBuildings.actions[0].payload).toEqual(expected);
                })
            })
        })
        describe('Estates', () => {
            describe( 'No options case with explanation', () => {
                it('Should not add any key sellEstates to options in case player has no estates', () => {
                    const state = getMockedGameState({});
                    const options = getTestableOptions(state, DORIN);
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
                    const options = getTestableOptions(state, DORIN);
                    expect(options.plegdeEstates).toEqual({reason: PlegdeEstatesReasons.EveryPlegded})
                })
                it('Should add reason when for plegding estates when player is in preason', () => {
                    const dorinEstates = [ ROME, MEDIOLAN, NEAPOL, SALONIKI, BARCELONA ];
                    const state = getMockedGameState({
                        estatesOwner: [DORIN, dorinEstates],
                        currentPlayer: [DORIN],
                        toJail: [DORIN],
                    });
                    const options = getTestableOptions(state, DORIN);
                    expect(options.plegdeEstates).toEqual({reason: PlegdeEstatesReasons.InJail})

                })
                it('Should add reason when for selling estates when player is in preason', () => {
                    const dorinEstates = [ ROME, MEDIOLAN, NEAPOL, SALONIKI, BARCELONA ];
                    const state = getMockedGameState({
                        estatesOwner: [DORIN, dorinEstates],
                        currentPlayer: [DORIN],
                        toJail: [DORIN],
                    });
                    const options = getTestableOptions(state, DORIN);
                    expect(options.sellEstates).toEqual({reason: SellEstatesReasons.InJail})
                })
                it('Should not allow to sell estates when player has buildings on it', () => {
                        const dorinEstates = [ ROME, MEDIOLAN, NEAPOL, SALONIKI, BARCELONA, ATENY ];
                        const state = getMockedGameState({
                            estatesOwner: [DORIN, dorinEstates],
                            currentPlayer: [DORIN],
                            estatesDelta: [
                                { estateName: NEAPOL, props: { owner: GREEN, nrOfHouses: 2} },
                                { estateName: ATENY, props: { owner: GREEN, nrOfHotels: 1 } }, // Not a valid case, normally 1 hotel with no houses on neighbour shouls not happen    
                                { estateName: LONDON, props: { owner: RED} },
                            ],
                        });
                        const options = getTestableOptions(state, DORIN);
                        const payload = (options as any).sellEstates.actions[0].payload
                        const outputForItaly =    payload[ITALY]
                        const outputForGreece =   payload[GREECE]
                        const outputForLondon =   payload[UK][LONDON]
                        const outputForLiverpol = payload[UK][LIVERPOOL]

                        expect(outputForItaly).toEqual({reason: SellEstatesReasons.Buildings})
                        expect(outputForGreece).toEqual({reason: SellEstatesReasons.Buildings})
                        expect(outputForLondon).toEqual({reason: SellEstatesReasons.NotOwner})
                        expect(outputForLiverpol).toEqual({reason: SellEstatesReasons.NotOwner})
                })  
                it('Should not allow to sell esate player does not own. Not city estates case', () => {
                    const dorinEstates = [ ROME, MEDIOLAN, NEAPOL, SALONIKI, BARCELONA, ATENY ];
                    const state = getMockedGameState({
                        estatesOwner: [DORIN, dorinEstates],
                        currentPlayer: [DORIN],
                    });
                    const options = getTestableOptions(state, DORIN);
                    const payload = (options as any).sellEstates.actions[0].payload;
                    const outputForRailway = payload[RAILWAYS][EAST_RAILWAYS]
                    const outputForPowerPlant = payload[PLANT][POWER_STATION]

                    expect(outputForRailway).toEqual({reason: SellEstatesReasons.NotOwner})
                    expect(outputForPowerPlant).toEqual({reason: SellEstatesReasons.NotOwner})

                })
                it('Should not allow to plegde estates that player does not own', () => {
                    const dorinEstates = [ ROME, MEDIOLAN, NEAPOL, SALONIKI, BARCELONA, ATENY ];
                    const state = getMockedGameState({
                        estatesOwner: [DORIN, dorinEstates],
                        currentPlayer: [DORIN],
                    });
                    const options = getTestableOptions(state, DORIN);
                    const payload = (options as any).plegdeEstates.actions[0].payload;
                    const outputForRailway =    payload[RAILWAYS][EAST_RAILWAYS]
                    const outputForPowerPlant = payload[PLANT][POWER_STATION]
                    const outputForLondon =     payload[UK][LONDON]

                    expect(outputForRailway).toEqual({reason: PlegdeEstatesReasons.NotOwner})
                    expect(outputForPowerPlant).toEqual({reason: PlegdeEstatesReasons.NotOwner})
                    expect(outputForLondon).toEqual({reason: PlegdeEstatesReasons.NotOwner})
                })

                it('Should not allow to plegde estates when player has buildings on it', () => {
                    const dorinEstates = [ ROME, MEDIOLAN, SALONIKI, BARCELONA, ATENY ];
                    const state = getMockedGameState({
                        estatesOwner: [DORIN, dorinEstates],
                        currentPlayer: [DORIN],
                        estatesDelta: [
                            { estateName: ROME, props: { owner: GREEN, nrOfHouses: 1 } },
                            { estateName: MEDIOLAN, props: { owner: GREEN, nrOfHotels: 1 } },
                        ],
                    });
                    const options = getTestableOptions(state, DORIN);
                    const payload = (options as any).plegdeEstates.actions[0].payload;
                    const outputForRome = payload[ITALY][ROME];
                    const outputForMediolan = payload[ITALY][MEDIOLAN];

                    expect(outputForRome).toEqual({reason: PlegdeEstatesReasons.Buildings})
                    expect(outputForMediolan).toEqual({reason: PlegdeEstatesReasons.Buildings})
                    
                })  
                it('Should not allow to plegde estates when it is already plegded', () => {
                    const dorinEstates = [ ROME, MEDIOLAN, SALONIKI, BARCELONA, ATENY ];
                    const state = getMockedGameState({
                        estatesOwner: [DORIN, dorinEstates],
                        currentPlayer: [DORIN],
                        estatesDelta: [
                            { estateName: ROME, props: { owner: GREEN, isPlegded: true } },
                            { estateName: WEST_RAILWAYS, props: {owner: GREEN, isPlegded: true}},
                            { estateName: POWER_STATION, props: {owner: GREEN, isPlegded: true}}
                        ],
                    });
                    const options = getTestableOptions(state, DORIN);
                    const payload = (options as any).plegdeEstates.actions[0].payload
                    const outputForRome =    payload[ITALY][ROME];
                    const outputForRailway = payload[RAILWAYS][WEST_RAILWAYS];
                    const outputForPlant =   payload[PLANT][POWER_STATION];

                    expect(outputForRome).toEqual({reason: PlegdeEstatesReasons.Plegded})
                    expect(outputForRailway).toEqual({reason: PlegdeEstatesReasons.Plegded})
                    expect(outputForPlant).toEqual({reason: PlegdeEstatesReasons.Plegded})
                })  

                it('Should allow to plegde estate, when other estate in the same country has buildings on it', () => {
                    const dorinEstates = [ ROME, MEDIOLAN, NEAPOL, SALONIKI, BARCELONA, ATENY ];
                    const state = getMockedGameState({
                        estatesOwner: [DORIN, dorinEstates],
                        currentPlayer: [DORIN],
                        estatesDelta: [
                            { estateName: ROME, props: { owner: GREEN, nrOfHouses: 4 } },
                            { estateName: MEDIOLAN, props: { owner: GREEN, nrOfHotels: 1 } },
                        ],
                    });
                    const options = getTestableOptions(state, DORIN);
                    const outputForNeapol = (options as any).plegdeEstates.actions[0].payload[ITALY][NEAPOL];
                    expect(outputForNeapol).toEqual({
                        reason: PlegdeEstatesReasons.Allowed,
                        price: descriptors.Neapol.mortgage,
                    })
                })
                it ('Should not allow to sell estate when it is plegded, and there are buildings in other cities of this country', () => {
                    const dorinEstates = [ ROME, MEDIOLAN, NEAPOL, SALONIKI, BARCELONA, ATENY ];
                    const state = getMockedGameState({
                        estatesOwner: [DORIN, dorinEstates],
                        currentPlayer: [DORIN],
                        estatesDelta: [
                            { estateName: ROME, props: { owner: GREEN, nrOfHouses: 4 } },
                            { estateName: MEDIOLAN, props: { owner: GREEN, nrOfHotels: 1 } },
                            { estateName: NEAPOL, props: { owner: GREEN, isPlegded: true } },
                        ],
                    });
                    const options = getTestableOptions(state, DORIN);
                    const outputForItaly = (options as any).sellEstates.actions[0].payload[ITALY];
                    expect(outputForItaly).toEqual({
                        reason: SellEstatesReasons.Buildings,
                    })
                })
                it('Should not allow to plegde when player in jail', () => {
                    const dorinEstates = [ ROME, MEDIOLAN, NEAPOL];
                    const state = getMockedGameState({
                        estatesOwner: [DORIN, dorinEstates],
                        currentPlayer: [DORIN],
                        toJail: [DORIN]
                    });
                    const options = getTestableOptions(state, DORIN);
                    const output = options.plegdeEstates;
                    expect(output).toEqual({
                        reason: PlegdeEstatesReasons.InJail,
                    })
                })
                it('Should not allow to unpleged an estate when player has not plegeded estates', () => {
                    const dorinEstates = [ ROME, MEDIOLAN, NEAPOL];
                    const state = getMockedGameState({
                        estatesOwner: [DORIN, dorinEstates],
                        currentPlayer: [DORIN],
                        estatesDelta: [
                            { estateName: ROME, props: { owner: GREEN, isPlegded: false } },
                            { estateName: MEDIOLAN, props: { owner: GREEN, isPlegded: false } },
                            { estateName: NEAPOL, props: { owner: GREEN, isPlegded: false } },
                        ],
                    });
                    const options = getTestableOptions(state, DORIN);
                    const output = options.unplegdeEstates;
                    expect(output).toEqual({
                        reason: UnplegdeEstatesReasons.EveryUnplegded,
                    })
                })
                it('Should not allow to unpleged an estate when player is in jail', () => {
                    const dorinEstates = [ ROME, MEDIOLAN, NEAPOL];
                    const state = getMockedGameState({
                        estatesOwner: [DORIN, dorinEstates],
                        currentPlayer: [DORIN],
                        toJail: [DORIN],
                        estatesDelta: [
                            { estateName: ROME, props: { owner: GREEN, isPlegded: true } },
                            { estateName: MEDIOLAN, props: { owner: GREEN, isPlegded: true } },
                            { estateName: NEAPOL, props: { owner: GREEN, isPlegded: true } },
                        ],
                    });
                    const options = getTestableOptions(state, DORIN);
                    const output = options.unplegdeEstates;
                    expect(output).toEqual({
                        reason: UnplegdeEstatesReasons.InJail,
                    })
                })
                it('Should NOT allow to unplegde an estate when player has a plegded estate, and has NO MONEY to unplegde it', () => {
                    const dorinEstates = [ ROME, MEDIOLAN, NEAPOL];
                    const state = getMockedGameState({
                        estatesOwner: [DORIN, dorinEstates],
                        currentPlayer: [DORIN],
                        setMoney: [[0, DORIN]],
                        estatesDelta: [
                            { estateName: ROME, props: { owner: GREEN, isPlegded: true } },
                            { estateName: MEDIOLAN, props: { owner: GREEN, isPlegded: true } },
                            { estateName: NEAPOL, props: { owner: GREEN, isPlegded: true } },
                        ],
                    });
                    const options = getTestableOptions(state, DORIN);
                    const payload = (options as any).unplegdeEstates.actions[0].payload;
                    const outputRome =     payload[ITALY][ROME];
                    const outputMediolan = payload[ITALY][MEDIOLAN];
                    const outputNeapol =   payload[ITALY][NEAPOL];
                    expect(outputMediolan).toEqual({ 
                        reason: UnplegdeEstatesReasons.NoMoney, 
                        price: 100
                    });
                    expect(outputNeapol).toEqual({ 
                        reason: UnplegdeEstatesReasons.NoMoney, 
                        price: 100
                    });
                    expect(outputRome).toEqual({ 
                        reason: UnplegdeEstatesReasons.NoMoney, 
                        price: 120
                    });
                })
                it('Should not allow to buyout from mortgage when not proper game phase', () => {
                    const dorinEstates = [ ROME, MEDIOLAN, NEAPOL];
                    const state = getMockedGameState({
                        estatesOwner: [DORIN, dorinEstates],
                        currentPlayer: [DORIN],
                        setGamePhase: TurnPhases.AfterMove,
                        estatesDelta: [
                            { estateName: ROME, props: { owner: GREEN, isPlegded: true } },
                            { estateName: MEDIOLAN, props: { owner: GREEN, isPlegded: true } },
                            { estateName: NEAPOL, props: { owner: GREEN, isPlegded: true } },
                        ],
                    });
                    const options = getTestableOptions(state, DORIN);
                    const result = options.unplegdeEstates;
                    expect(result).toEqual({reason: UnplegdeEstatesReasons.NotGoodMoment})
                })
                it('Should not allow to buyout from mortgage when not players turn', () => {
                    const dorinEstates = [ ROME, MEDIOLAN, NEAPOL];
                    const state = getMockedGameState({
                        estatesOwner: [DORIN, dorinEstates],
                        currentPlayer: [BALIN],
                        estatesDelta: [
                            { estateName: ROME, props: { owner: GREEN, isPlegded: true } },
                            { estateName: MEDIOLAN, props: { owner: GREEN, isPlegded: true } },
                            { estateName: NEAPOL, props: { owner: GREEN, isPlegded: true } },
                        ],
                    });
                    const options = getTestableOptions(state, DORIN);
                    const result = options.unplegdeEstates;
                    expect(result).toEqual({reason: UnplegdeEstatesReasons.WrongTurn})
                })
                
            })
        });
        describe('Get out of prison cards', () => {
            it('Should not allow to sell a get out of prison card when player has no such a card', () => {
                const state = getMockedGameState({
                    currentPlayer: [DORIN],
                    setGamePhase: TurnPhases.BeforeMove
                });
                const options = getTestableOptions(state, DORIN);
                const result = options.specialCards;
                expect(result).toEqual({reason: SpecialCardsReasons.NotOwner})
            })
            it('Should not allow to sell a get out of prison card when player is still in jail, should NOT allow to use it', () => {
                const redSpecialCardDescription = CHANCE_CARDS_RED[15].descriptions.en;
                const setCards:  tSetSpecialCardsToPlayers = [[ [redSpecialCardDescription], DORIN,]];
                const state = getMockedGameState({
                    currentPlayer: [DORIN],
                    setGamePhase: TurnPhases.BeforeMove,
                    toJail: [DORIN],
                    setCards
                });
                const options = getTestableOptions(state, DORIN);
                expect(options.specialCards).toBeUndefined();
                // expect(result).toEqual({
                //     type: OptionTypes.UseSpecialCard,
                //     isMandatory: false,
                //     payload: [redSpecialCardDescription],
                // })
            })
            it('Should allow to sell a get out of prison card when player has one', () => {
                const redSpecialCardDescription = CHANCE_CARDS_RED[15].descriptions.en;
                const blueSpecialCardDescription = CHANCE_CARDS_BLUE[6].descriptions.en;
                const cards = [blueSpecialCardDescription, redSpecialCardDescription]
                const setCards:  tSetSpecialCardsToPlayers = [[ cards, DORIN,]];
                const state = getMockedGameState({
                    currentPlayer: [DORIN],
                    setGamePhase: TurnPhases.BeforeMove,
                    setCards
                });
                const options = getTestableOptions(state, DORIN);
                const result = options.specialCards;
                expect(result).toEqual({
                    isMandatory: false,
                    [ACTIONS]: [
                        {
                            type: OptionTypes.SellSpecialCard,
                            payload: cards,        
                        }
                    ]
                })
            });
        })
        describe('Fields: chance, tax, guarded parking, first field after start, start field', () => {
            it('Should not charge for a tax field when it is beforeMove phase, as player was already charged for it', () =>{
                const TAX_FIELD_INDEX = 38;
                const state = getMockedGameState({
                    currentPlayer: [DORIN],
                    setGamePhase: TurnPhases.BeforeMove,
                    movePlayers: [[TAX_FIELD_INDEX, DORIN]],
                });
                const options = getTestableOptions(state, DORIN);
                const result = options.pay;
                expect(result).toBeUndefined();
            })
            it('Should not change for tax when not players turn', () => {
                const state = getMockedGameState({
                    currentPlayer: [BALIN],
                    setGamePhase: TurnPhases.AfterMove,
                    movePlayers: [[38, DORIN]],
                });
                const options = getTestableOptions(state, DORIN);
                const result = options.pay;
                expect(result).toBeUndefined();
            })
            it('Should not charge for a guarded parking when it is beforeMove phase, as player was already charged for it', () => {
                const GUARDED_PARKING_FIELD_INDEX = 4;
                const state = getMockedGameState({
                    currentPlayer: [DORIN],
                    setGamePhase: TurnPhases.BeforeMove,
                    movePlayers: [[GUARDED_PARKING_FIELD_INDEX, DORIN]],
                });
                const options = getTestableOptions(state, DORIN);
                const result = options.pay;
                expect(result).toBeUndefined();
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
