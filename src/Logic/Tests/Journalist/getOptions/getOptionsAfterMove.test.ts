import { descriptors } from "../../../../Data/boardFields"
import { SPECIAL_CARD_BLUE } from "../../../../Data/chanceCards"
import { ATENY, BANK, BARCELONA, CHANCE_BLUE, CHANCE_RED, EAST_RAILWAYS, GREEN, INSBRUK, ITALY, MEDIOLAN, NEAPOL, POWER_STATION, ROME, SALONIKI, SOUTH_RAILWAY, WATER_PLANT, WEST_RAILWAYS, WIEDEN, YELLOW } from "../../../../Data/const"
import { GUARDED_PARKING_FEE, START_FIELD_MONEY, TAX_FEE } from "../../../../Data/fees"
import { ACTIONS } from "../../../Chance/ChanceCardHolder"
import { GET_MONEY, IS_MANDATORY, PASSING_START, PAYLOAD, REASON, TYPE } from "../../../Journalist/const"
import { getTestableOptions } from "../../../Journalist/getOptions"
import { OptionTypes } from "../../../Journalist/types"
import { SellBuildingsRejected } from "../../../Journalist/utils/constants"
import { NoBuildingPermitResults } from "../../../Journalist/utils/getBuyBuildingsOptions"
import { GO_TO_JAIL_INDEX } from "../../../Journalist/utils/getGoToJailOptions"
import { NoTurnEndReasons } from "../../../Journalist/utils/getMayPlayerEndGameOptions"
import { DontPayForVisitReasons, GUARDED_PARKING_FIELD_INDEX, TAX_FIELD_INDEX } from "../../../Journalist/utils/getPaymentOptions"
import { PlegdeEstatesReasons } from "../../../Journalist/utils/getPlegdeOptions"
import { getSellingPermitsCategory } from "../../../Journalist/utils/getSellingPermits"
import { PassingStartPaymentErrors } from "../../../Journalist/utils/getShouldPayForPassingStartOptions"
import { expandTestData } from "../../../Journalist/utils/sellingPermitsMock"
import { PassStartPayments } from "../../../Player/types"
import { DoneThisTurn, TurnPhases } from "../../../types"
import { getMockedGameState } from "../getGameStateMock/getGameStateMock"
import { getMockResponseGetter } from "../getGameStateMock/getResponse"
import { BALIN, DORIN } from "../getGameStateMock/getStateTemplate"
import { AFTER_NEAPOL_FIELD_INDEX, AFTER_START_FIELD_INDEX, BEFORE_START_FIELD_INDEX, BLUE_CHANCE_FIELD_INDEX, MADRIT_INDEX, NEAPOL_FEE, NEAPOL_INDEX, NEAPOL_WITH_4_HOUSES_FEE, NEAPOL_WITH_HOTEL_FEE, RED_CHANCE_FIELD_INDEX, SOUTH_RAILWAY_FIELD_INDEX, START_FIELD_INDEX, WATER_PLANT_FIELD_INDEX } from "./const"


const getSellBuildingsExpectedResponse = getMockResponseGetter(SellBuildingsRejected.NoBuildings);


describe('Options after player move', () => {
    // * End turn actions on start, not guarded parking, visit jail are added authomaticaly
    // * Should allow to sell houses, sell estates plegde estates as normal
    // * AUctions are not tested here at least YET

    describe('Testing if player passed start', () => {
        // + AFTER MOVE
        // + Normal start pass
        // + Cofasz się o 3 pola,
        // + Wracasz do Madrytu => Prawdopodobnie trzeba dodać didPassStart do playera
        // + Wracasz na start => z automatu dodać => jeżeli index 1 a potem inny to płać
        // + Idziesz do więzienia, nie przechodzisz przez start, nie dostajesz 400 // Tutaj flaga didPassStart
        // + Idziesz do Neapolu, jeżeli przechodzisz przez start otrzymujesz ...  // Flagi nie trzeba
        // + Wracasz do bruxeli, jeżeli przechodzisz przez start dostajesz 400 ... // Wracasz, więc jeszcze kierunek dochodzi.. Jeżeli byłeś na 5 a wracasz na 6 to przechodzisz przez start cofając się
        // + Idziesz do kolei wschodnich, jeżeli przechodzisz...
        // + Wracasz do wiednia... Nie ma nic o starcie, więc trzeba wymusić nie płacenie podczas tej operacji // Flaga

        it('Should return not proper player when current player is different than given player', () => {
            const state = getMockedGameState({
                currentPlayer: [DORIN],
                setGamePhase: TurnPhases.AfterMove,
            });
            const options = getTestableOptions(state, BALIN);
            const result = options[GET_MONEY]?.[PASSING_START];
            expect(result).toEqual({[REASON]: PassingStartPaymentErrors.NotCurrentPlayer});
        })
        it('Should return not proper player reason when current player is not given player and game phase is not after-move', () => {
            const state = getMockedGameState({
                currentPlayer: [DORIN],
                setGamePhase: TurnPhases.BeforeMove, // this is second reason for not getting payment, but player is stronger reason
            });
            const options = getTestableOptions(state, BALIN);
            const result = options[GET_MONEY]?.[PASSING_START];
            expect(result).toEqual({[REASON]: PassingStartPaymentErrors.NotCurrentPlayer});
        })
        it('Should return not good game phase reason when in before-move game phase', () => {
            const state = getMockedGameState({
                currentPlayer: [DORIN],
                setGamePhase: TurnPhases.BeforeMove,
            });
            const options = getTestableOptions(state, DORIN);
            const result = options[GET_MONEY]?.[PASSING_START];
            expect(result).toEqual({[REASON]: PassingStartPaymentErrors.NotGoodMoment});
        });
        it('Should accept payment when player just passed start: from field 0 to > 0', () => {
            const state = getMockedGameState({
                currentPlayer: [DORIN],
                setGamePhase: TurnPhases.AfterMove,
                movePlayers: [[AFTER_START_FIELD_INDEX, DORIN]],
                lastPlayersField: [[START_FIELD_INDEX, DORIN]],
                shouldPayForStart: [[PassStartPayments.NotSet, DORIN]],
            });
            const options = getTestableOptions(state, DORIN);
            const result = options[GET_MONEY]?.[PASSING_START];
            expect(result).toEqual({
                [IS_MANDATORY]: true,
                [ACTIONS]: [
                    {
                        [TYPE]: OptionTypes.GetMoney,
                        [PAYLOAD]: START_FIELD_MONEY,
                    }
                ]
            });
        })
        it('Should accept payment when player just passed start (from field > current field)', () => {
            const state = getMockedGameState({
                currentPlayer: [DORIN],
                setGamePhase: TurnPhases.AfterMove,
                movePlayers: [[START_FIELD_INDEX, DORIN]],
                lastPlayersField: [[BEFORE_START_FIELD_INDEX, DORIN]],
                shouldPayForStart: [[PassStartPayments.NotSet, DORIN]],
            });
            const options = getTestableOptions(state, DORIN);
            const result = options[GET_MONEY]?.[PASSING_START];
            expect(result).toEqual({
                [IS_MANDATORY]: true,
                [ACTIONS]: [
                    {
                        [TYPE]: OptionTypes.GetMoney,
                        [PAYLOAD]: START_FIELD_MONEY,
                    }
                ]
            });
        })
        it('Should not accept payment when player was moved 3 fields back and shouldPayForPassingStart was set to not-to-pay', () => {
            const state = getMockedGameState({
                currentPlayer: [DORIN],
                setGamePhase: TurnPhases.AfterMove,
                movePlayers: [[9, DORIN]],
                lastPlayersField: [[6, DORIN]],
                shouldPayForStart: [[PassStartPayments.DoNot, DORIN]],
            });
            const options = getTestableOptions(state, DORIN);
            const result = options[GET_MONEY]?.[PASSING_START];
            expect(result).toEqual({ [REASON]: PassingStartPaymentErrors.Forbidden});
        })

        it('Should not accept payment when player was moved 3 fields back from Saloniki to Tax collection', () => {
            const state = getMockedGameState({
                currentPlayer: [DORIN],
                setGamePhase: TurnPhases.AfterMove,
                movePlayers: [[1, DORIN]],
                lastPlayersField: [[38, DORIN]],
                shouldPayForStart: [[PassStartPayments.DoNot, DORIN]],
            });
            const options = getTestableOptions(state, DORIN);
            const result = options[GET_MONEY]?.[PASSING_START];
            expect(result).toEqual({ [REASON]: PassingStartPaymentErrors.Forbidden});
        })
        it('Should not accept payment when player is given chance card "you go back to Madrit" as there is no statement about paying for passing start: from ROME case', () => {
            const ROME_INDEX = 9
            const state = getMockedGameState({
                currentPlayer: [DORIN],
                setGamePhase: TurnPhases.AfterMove,
                movePlayers: [[MADRIT_INDEX, DORIN]],
                lastPlayersField: [[ROME_INDEX, DORIN]],
                shouldPayForStart: [[PassStartPayments.DoNot, DORIN]],
            });
            const options = getTestableOptions(state, DORIN);
            const result = options[GET_MONEY]?.[PASSING_START];
            expect(result).toEqual({ [REASON]: PassingStartPaymentErrors.Forbidden});
        })
        it('Should accept payment when player goes to Neapoly and passes start)', () => {
            const state = getMockedGameState({
                currentPlayer: [DORIN],
                setGamePhase: TurnPhases.AfterMove,
                movePlayers: [[NEAPOL_INDEX, DORIN]],
                lastPlayersField: [[BEFORE_START_FIELD_INDEX, DORIN]],
                shouldPayForStart: [[PassStartPayments.NotSet, DORIN]],
            });
            const options = getTestableOptions(state, DORIN);
            const result = options[GET_MONEY]?.[PASSING_START];
            expect(result).toEqual({
                [IS_MANDATORY]: true,
                [ACTIONS]: [
                    {
                        [TYPE]: OptionTypes.GetMoney,
                        [PAYLOAD]: 400        
                    }
                ]
            });
        })
        it('Should not accept payment when player goes to Neapoly and does not pass start)', () => {
            const state = getMockedGameState({
                currentPlayer: [DORIN],
                setGamePhase: TurnPhases.AfterMove,
                movePlayers: [[NEAPOL_INDEX, DORIN]],
                lastPlayersField: [[AFTER_START_FIELD_INDEX, DORIN]],
                shouldPayForStart: [[PassStartPayments.NotSet, DORIN]],
            });
            const options = getTestableOptions(state, DORIN);
            const result = options[GET_MONEY]?.[PASSING_START];
            expect(result).toEqual({ [REASON]: PassingStartPaymentErrors.NotPassed});
        })
        it('Should not accept payment when player goes (back) to Neapoly and does not pass start)', () => {
            const state = getMockedGameState({
                currentPlayer: [DORIN],
                setGamePhase: TurnPhases.AfterMove,
                movePlayers: [[NEAPOL_INDEX, DORIN]],
                lastPlayersField: [[AFTER_NEAPOL_FIELD_INDEX, DORIN]],
                shouldPayForStart: [[PassStartPayments.ForceBackward, DORIN]],
            });
            const options = getTestableOptions(state, DORIN);
            const result = options[GET_MONEY]?.[PASSING_START];
            expect(result).toEqual({ [REASON]: PassingStartPaymentErrors.NotPassed});
        })
        it('Should accept payment when player goes (back) to Neapoly and does passes start)', () => {
            const state = getMockedGameState({
                currentPlayer: [DORIN],
                setGamePhase: TurnPhases.AfterMove,
                movePlayers: [[NEAPOL_INDEX, DORIN]],
                lastPlayersField: [[AFTER_START_FIELD_INDEX, DORIN]],
                shouldPayForStart: [[PassStartPayments.ForceBackward, DORIN]],
            });
            const options = getTestableOptions(state, DORIN);
            const result = options[GET_MONEY]?.[PASSING_START];
            expect(result).toEqual({
                [IS_MANDATORY]: true,
                [ACTIONS]: [
                    {
                        [TYPE]: OptionTypes.GetMoney,
                        [PAYLOAD]: START_FIELD_MONEY,
                    }
                ]
            });
        })

        it('Should not give money option for start, when money already payed', () => {
            // some new state variable needed
            const state = getMockedGameState({
                currentPlayer: [DORIN],
                setGamePhase: TurnPhases.AfterMove,
                movePlayers: [[NEAPOL_INDEX, DORIN]],
                lastPlayersField: [[AFTER_NEAPOL_FIELD_INDEX, DORIN]],
                shouldPayForStart: [[PassStartPayments.NotSet, DORIN]],
                addDoneThisTurn: [DoneThisTurn.GotMoneyForStart]
            });
            const options = getTestableOptions(state, DORIN);
            const result = options[GET_MONEY]?.[PASSING_START];
            expect(result).toEqual({ [REASON]: PassingStartPaymentErrors.AlreadyGotMoney });
        })
    });

    describe('Should not cases', () => {
        it('Should not allow to build anything when in after move phase', () => {
            // const options = getTestableOptions();
            const dorinEstates = [ INSBRUK, WIEDEN, SALONIKI, NEAPOL, MEDIOLAN];
            const state = getMockedGameState({
                estatesOwner: [DORIN, dorinEstates],
                currentPlayer: [DORIN],
                setGamePhase: TurnPhases.AfterMove,
            });
            const options = getTestableOptions(state, DORIN);
            const result = options.buyBuildings

            expect(result).toEqual({ reason: NoBuildingPermitResults.NotGoodMoment })

        })
        it('Should not give an option to pay for a guqrded car park when in beforeMove phase', () => {
            const state = getMockedGameState({
                currentPlayer: [DORIN],
                setGamePhase: TurnPhases.BeforeMove,
                movePlayers: [[GUARDED_PARKING_FIELD_INDEX, DORIN], [TAX_FIELD_INDEX, BALIN]]
            })
            const options = getTestableOptions(state, DORIN);
            const paymentStatus = options.pay;
            expect(paymentStatus).toBeUndefined();
        })
        it('Should not give an option to pay for a guqrded car park when in afterMove phase, but player already payed', () => {
            const state = getMockedGameState({
                currentPlayer: [DORIN],
                setGamePhase: TurnPhases.AfterMove,
                movePlayers: [[GUARDED_PARKING_FIELD_INDEX, DORIN], [TAX_FIELD_INDEX, BALIN]],
                addDoneThisTurn: [DoneThisTurn.PayedForVisit],
                
            })
            const options = getTestableOptions(state, DORIN);
            const paymentStatus = options.pay;
            expect(paymentStatus).toBeUndefined();
        })

        it('Should not add anything to draw chance card option when player not on chance card field', () => {
            const state = getMockedGameState({
                currentPlayer: [DORIN],
                setGamePhase: TurnPhases.AfterMove,
                movePlayers: [[GUARDED_PARKING_FIELD_INDEX, DORIN], [TAX_FIELD_INDEX, BALIN]],
                addDoneThisTurn: [DoneThisTurn.PayedForVisit],
                
            })
            const options = getTestableOptions(state, DORIN);
            const  drawChanceCardStatus = options.drawChanceCard;
            expect(drawChanceCardStatus).toBeUndefined();
        })
        it('Should not add anything to draw chance card option when player on chance field but chance card was already drawn', () => {
            const state = getMockedGameState({
                currentPlayer: [DORIN],
                setGamePhase: TurnPhases.AfterMove,
                movePlayers: [[BLUE_CHANCE_FIELD_INDEX, DORIN] ],
                addDoneThisTurn: [DoneThisTurn.DrawnChanceCard],
            })
            const options = getTestableOptions(state, DORIN);
            const  drawChanceCardStatus = options.drawChanceCard;
            expect(drawChanceCardStatus).toBeUndefined();
        })
        // it('Should not add anything to draw chance card option when player on chance field but it is before move phase', () => {
        //     const state = getMockedGameState({
        //         currentPlayer: [DORIN],
        //         setGamePhase: TurnPhases.BeforeMove,
        //         movePlayers: [[BLUE_CHANCE_FIELD_INDEX, DORIN] ],
        //     })
        //     const options = getTestableOptions(state, DORIN);
        //     const  drawChanceCardStatus = options.drawChanceCard;
        //     expect(drawChanceCardStatus).toBeUndefined();
        // }) TEST in getOptionsBeforeMove

    })
    describe('Should cases', () => {
        it('Should allow to sell houses when player has some and in after move phase', () => {
            const dorinEstates = [ ROME, MEDIOLAN, NEAPOL, SALONIKI, BARCELONA ];
            const state = getMockedGameState({
                estatesOwner: [DORIN, dorinEstates],
                currentPlayer: [DORIN],
                estatesDelta: [
                    { estateName: ROME, props: { owner: GREEN, nrOfHouses: 1 } },
                    { estateName: MEDIOLAN, props: { owner: GREEN, nrOfHouses: 1 } },
                ],
                setGamePhase: TurnPhases.AfterMove,
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
            const result = (options as any).sellBuildings.actions[0].payload;
            expect(result).toEqual(expected);
        })
        it('Should allow to plegde an estate when player has an estate that may be plegeded in after move phase', () => {
            const dorinEstates = [ ROME, MEDIOLAN, NEAPOL, SALONIKI, BARCELONA, ATENY ];
            const state = getMockedGameState({
                estatesOwner: [DORIN, dorinEstates],
                currentPlayer: [DORIN],
                estatesDelta: [
                    { estateName: ROME, props: { owner: GREEN, nrOfHouses: 4 } },
                    { estateName: MEDIOLAN, props: { owner: GREEN, nrOfHotels: 1 } },
                ],
                setGamePhase: TurnPhases.AfterMove,
            });
            const options = getTestableOptions(state, DORIN);
            const outputForNeapol = (options as any).plegdeEstates.actions![0].payload[ITALY][NEAPOL];
            expect(outputForNeapol).toEqual({
                reason: PlegdeEstatesReasons.Allowed,
                price: descriptors.Neapol.mortgage,
            })
        })
        it('Should return a mandatory option of paying for a guarded parking when player just stepped on one', () => {
            const state = getMockedGameState({
                currentPlayer: [DORIN],
                setGamePhase: TurnPhases.AfterMove,
                movePlayers: [[GUARDED_PARKING_FIELD_INDEX, DORIN], [TAX_FIELD_INDEX, BALIN]]
            })
            const options = getTestableOptions(state, DORIN);
            const expectedPaymentStatus = {
                [IS_MANDATORY]: true,
                [ACTIONS]: [
                    {
                        [TYPE]: OptionTypes.Pay,
                        [PAYLOAD]: {
                            target: BANK,
                            ammount: GUARDED_PARKING_FEE,
                        }        
                    }
                ]
            }
            const paymentStatus = options.pay?.visigingOtherPlayersEstate;
            expect(paymentStatus).toEqual(expectedPaymentStatus);
        })
        it('Should add a mandatory payment when stepped on other players posession: no houses case', () => {
            const balinEstates = [ ROME, MEDIOLAN, NEAPOL];
            const state = getMockedGameState({
                estatesOwner: [BALIN, balinEstates],
                currentPlayer: [DORIN],
                setGamePhase: TurnPhases.AfterMove,
                movePlayers: [[NEAPOL_INDEX, DORIN]]
            });
            const options = getTestableOptions(state, DORIN);
            const result = options.pay?.visigingOtherPlayersEstate;
            const expectedResult = {
                [IS_MANDATORY]: true,
                [ACTIONS]: [
                    {
                        [TYPE]: OptionTypes.Pay,
                        [PAYLOAD]: {
                            target: BALIN,
                            ammount: NEAPOL_FEE,
                        }        
                    }
                ]
            }
            expect(result).toEqual(expectedResult)
        })
        it('Should add a mandatory payment when stepped on other players posession: houses case', () => {
            const balinEstates = [ ROME, MEDIOLAN, NEAPOL];
            const state = getMockedGameState({
                estatesOwner: [BALIN, balinEstates],
                currentPlayer: [DORIN],
                setGamePhase: TurnPhases.AfterMove,
                movePlayers: [[NEAPOL_INDEX, DORIN]],
                estatesDelta: [
                    { estateName: NEAPOL, props: { owner: YELLOW, nrOfHouses: 4 } },
                ]

            });
            const options = getTestableOptions(state, DORIN);
            const result = options.pay?.visigingOtherPlayersEstate;
            const expectedResult = {
                [IS_MANDATORY]: true,
                [ACTIONS]: [
                    {
                        [TYPE]: OptionTypes.Pay,
                        [PAYLOAD]: {
                            target: BALIN,
                            ammount: NEAPOL_WITH_4_HOUSES_FEE,
                        }        
                    }
                ]
            }
            expect(result).toEqual(expectedResult)
        })

        it('Should add a mandatory payment when stepped on other players posession: hotel case', () => {
            const balinEstates = [ ROME, MEDIOLAN, NEAPOL];
            const state = getMockedGameState({
                estatesOwner: [BALIN, balinEstates],
                currentPlayer: [DORIN],
                setGamePhase: TurnPhases.AfterMove,
                movePlayers: [[NEAPOL_INDEX, DORIN]],
                estatesDelta: [
                    { estateName: NEAPOL, props: { owner: YELLOW, nrOfHotels: 1 } },
                ]

            });
            const options = getTestableOptions(state, DORIN);
            const result = options.pay?.visigingOtherPlayersEstate;
            const expectedResult = {
                [IS_MANDATORY]: true,
                [ACTIONS]: [
                    {
                        [TYPE]: OptionTypes.Pay,
                        [PAYLOAD]: {
                            target: BALIN,
                            ammount: NEAPOL_WITH_HOTEL_FEE,
                        }        
                    }
                ]
            }
            expect(result).toEqual(expectedResult)
        })

        it('Should not add a payment for field, when owner is in jail', () => {
            const balinEstates = [ ROME, MEDIOLAN, NEAPOL];
            const state = getMockedGameState({
                estatesOwner: [BALIN, balinEstates],
                currentPlayer: [DORIN],
                setGamePhase: TurnPhases.AfterMove,
                movePlayers: [[NEAPOL_INDEX, DORIN]],
                estatesDelta: [
                    { estateName: NEAPOL, props: { owner: YELLOW, nrOfHouses: 4 } },
                ],
                toJail: [BALIN]
            });
            const options = getTestableOptions(state, DORIN);
            const result = options.pay?.visigingOtherPlayersEstate;
            const expectedResult = {reason: DontPayForVisitReasons.OwnerInPrison}
            expect(result).toEqual(expectedResult)
        })

        it('Should not add a payment for field, when owner is bank', () => {
            const state = getMockedGameState({
                currentPlayer: [DORIN],
                setGamePhase: TurnPhases.AfterMove,
                movePlayers: [[NEAPOL_INDEX, DORIN]],
            });
            const options = getTestableOptions(state, DORIN);
            const result = options.pay?.visigingOtherPlayersEstate;
            const expectedResult = {reason: DontPayForVisitReasons.BankOwned}
            expect(result).toEqual(expectedResult)
        })
        it('Should not add a payment for field, when plegded', () => {
            const balinEstates = [ ROME, MEDIOLAN, NEAPOL];
            const state = getMockedGameState({
                estatesOwner: [BALIN, balinEstates],
                currentPlayer: [DORIN],
                setGamePhase: TurnPhases.AfterMove,
                movePlayers: [[NEAPOL_INDEX, DORIN]],
                estatesDelta: [
                    { estateName: NEAPOL, props: { owner: YELLOW, isPlegded: true } },
                ],
            });
            const options = getTestableOptions(state, DORIN);
            const result = options.pay?.visigingOtherPlayersEstate;
            const expectedResult = {reason: DontPayForVisitReasons.Plegded}
            expect(result).toEqual(expectedResult)
        })
        it('Should add mandatory payment when railways owned by an oponent, 2 railway case', () => {
            const balinEstates = [ ROME, MEDIOLAN, NEAPOL, SOUTH_RAILWAY, WEST_RAILWAYS];
            const state = getMockedGameState({
                estatesOwner: [BALIN, balinEstates],
                currentPlayer: [DORIN],
                setGamePhase: TurnPhases.AfterMove,
                movePlayers: [[SOUTH_RAILWAY_FIELD_INDEX, DORIN]],
                estatesDelta: [
                    { estateName: NEAPOL, props: { owner: YELLOW, isPlegded: true } },
                ],
            });
            const options = getTestableOptions(state, DORIN);
            const result = options.pay?.visigingOtherPlayersEstate;
            const expectedResult = {
                [IS_MANDATORY]: true,
                [ACTIONS]: [
                    {
                        [TYPE]: OptionTypes.Pay,
                        [PAYLOAD]: {
                            target: BALIN,
                            ammount: 100,
                        }        
                    }
                ]
            }
            expect(result).toEqual(expectedResult)
        })
        it('Should add mandatory payment when railways owned by an oponent, 3 railway case', () => {
            const balinEstates = [ ROME, MEDIOLAN, NEAPOL, SOUTH_RAILWAY, WEST_RAILWAYS, EAST_RAILWAYS];
            const state = getMockedGameState({
                estatesOwner: [BALIN, balinEstates],
                currentPlayer: [DORIN],
                setGamePhase: TurnPhases.AfterMove,
                movePlayers: [[SOUTH_RAILWAY_FIELD_INDEX, DORIN]],
                estatesDelta: [
                    { estateName: NEAPOL, props: { owner: YELLOW, isPlegded: true } },
                ],
            });
            const options = getTestableOptions(state, DORIN);
            const result = options.pay?.visigingOtherPlayersEstate;
            const expectedResult = {
                [IS_MANDATORY]: true,
                [ACTIONS]: [
                    {
                        [TYPE]: OptionTypes.Pay,
                        [PAYLOAD]: {
                            target: BALIN,
                            ammount: 200
                        }        
                    }
                ]
            }
            expect(result).toEqual(expectedResult)
        })
        it('Should not add payment on railway field if plegded', () => {
            const balinEstates = [ ROME, MEDIOLAN, NEAPOL, SOUTH_RAILWAY, WEST_RAILWAYS, EAST_RAILWAYS];
            const state = getMockedGameState({
                estatesOwner: [BALIN, balinEstates],
                currentPlayer: [DORIN],
                setGamePhase: TurnPhases.AfterMove,
                movePlayers: [[SOUTH_RAILWAY_FIELD_INDEX, DORIN]],
                estatesDelta: [
                    { estateName: SOUTH_RAILWAY, props: { owner: YELLOW, isPlegded: true } },
                ],
            });
            const options = getTestableOptions(state, DORIN);
            const result = options.pay?.visigingOtherPlayersEstate;
            const expectedResult = {
                reason: DontPayForVisitReasons.Plegded
            }            
            expect(result).toEqual(expectedResult)
        })

        it('Should add mandatory payment when plant owned by an opponent', () => {
            const balinEstates = [ ROME, MEDIOLAN, NEAPOL, WATER_PLANT, POWER_STATION];
            const state = getMockedGameState({
                estatesOwner: [BALIN, balinEstates],
                currentPlayer: [DORIN],
                setGamePhase: TurnPhases.AfterMove,
                movePlayers: [[WATER_PLANT_FIELD_INDEX, DORIN]],
                estatesDelta: [
                    { estateName: WATER_PLANT, props: { owner: YELLOW, isPlegded: false } },
                ],
            });
            const options = getTestableOptions(state, DORIN);
            const result = options.pay?.visigingOtherPlayersEstate;
            const expectedResult = {
                [IS_MANDATORY]: true,
                [ACTIONS]: [
                    {
                        [TYPE]: OptionTypes.Pay,
                        [PAYLOAD]: {
                            ammount: descriptors[WATER_PLANT].visit[1],
                            target: BALIN,
                        }        
                    }
                ]
            }            
            expect(result).toEqual(expectedResult)
        })

        it('Should return a mandatory draw a RED chance card when player stepped on a chance field', () => {
            const state = getMockedGameState({
                currentPlayer: [DORIN],
                setGamePhase: TurnPhases.AfterMove,
                movePlayers: [[RED_CHANCE_FIELD_INDEX, DORIN]],
            });
            const options = getTestableOptions(state, DORIN);
            const result = options.drawChanceCard;
            const expectedResult = {
                [IS_MANDATORY]: true,
                [ACTIONS]: [
                    {
                        [TYPE]: OptionTypes.DrawChanceCard,
                        [PAYLOAD]: CHANCE_RED,        
                    }
                ]
            }            
            expect(result).toEqual(expectedResult)
        })
        it('Should return a mandatory draw a BLUE chance card when player stepped on a chance field', () => {
            const state = getMockedGameState({
                currentPlayer: [DORIN],
                setGamePhase: TurnPhases.AfterMove,
                movePlayers: [[BLUE_CHANCE_FIELD_INDEX, DORIN]],
            });
            const options = getTestableOptions(state, DORIN);
            const result = options.drawChanceCard;
            const expectedResult = {
                [IS_MANDATORY]: true,
                [ACTIONS]: [
                    {
                        [TYPE]: OptionTypes.DrawChanceCard,
                        [PAYLOAD]: CHANCE_BLUE,        
                    }
                ]
            }            
            expect(result).toEqual(expectedResult)
        })
        it('Should add a mandatory option to go to jail when player has no get out of jail card and steps on the go to jail field', () => {
            const state = getMockedGameState({
                currentPlayer: [DORIN],
                setGamePhase: TurnPhases.AfterMove,
                movePlayers: [[GO_TO_JAIL_INDEX, DORIN]],
            });
            const options = getTestableOptions(state, DORIN);
            const result = options.goToJail;
            const expectedResult = {
                [IS_MANDATORY]: true,
                [ACTIONS]: [
                    { [TYPE]: OptionTypes.GoToJail },
                ]
            }            
            expect(result).toEqual(expectedResult)
        })
        it('Should add a mandatory option to go to jail or use get out of jail card when player stepps on the go to jail field', () => {
            const state = getMockedGameState({
                currentPlayer: [DORIN],
                setGamePhase: TurnPhases.AfterMove,
                movePlayers: [[GO_TO_JAIL_INDEX, DORIN]],
                setCards: [[[SPECIAL_CARD_BLUE], DORIN]]
            });
            const options = getTestableOptions(state, DORIN);
            const expectedResult = {
                [IS_MANDATORY]: true,
                [ACTIONS]: [
                    { [TYPE]: OptionTypes.GoToJail },
                    { [TYPE]: OptionTypes.UseSpecialCard },
                ]
                
            }            
            expect(options.goToJail).toEqual(expectedResult)
        })
        it('Should not add a mandatory option to go to jail when player already went there this turn', () => {
            const state = getMockedGameState({
                currentPlayer: [DORIN],
                setGamePhase: TurnPhases.AfterMove,
                movePlayers: [[GO_TO_JAIL_INDEX, DORIN]],
                setCards: [[[SPECIAL_CARD_BLUE], DORIN]],
                // toJail: [DORIN],
                addDoneThisTurn: [DoneThisTurn.GoneToJail]
            });
            const options = getTestableOptions(state, DORIN);
            expect(options.goToJail).toBeUndefined();
        });
        it('Should force to end turn when player is in jail', () => {
            const state = getMockedGameState({
                currentPlayer: [DORIN],
                setGamePhase: TurnPhases.AfterMove,
                movePlayers: [[GO_TO_JAIL_INDEX, DORIN]],
                lastPlayersField: [[3, DORIN]],
                setCards: [[[SPECIAL_CARD_BLUE], DORIN]],
                toJail: [DORIN],
                addDoneThisTurn: [DoneThisTurn.GoneToJail]
            });
            const options = getTestableOptions(state, DORIN);
            const expected = {
                [IS_MANDATORY]: true,
                [ACTIONS]: [
                    { [TYPE]: OptionTypes.EndTurn },
                ]
            }
            expect(options.endTurn).toEqual(expected);
        })
        it('Should not allow to end turn when there are pending chance cards', () => {
            const state = getMockedGameState({
                currentPlayer: [DORIN],
                setGamePhase: TurnPhases.AfterMove,
                lastPlayersField: [[2, DORIN]],
                movePlayers: [[RED_CHANCE_FIELD_INDEX, DORIN]],
                setCards: [[[SPECIAL_CARD_BLUE], DORIN]],
            });
            const options = getTestableOptions(state, DORIN);
            const expected = { [REASON]: NoTurnEndReasons.MandatoryAction }
            expect(options.endTurn).toEqual(expected);
        })
        it('Should not allow to end turn when player is in beforeMove phase', () => {
            const state = getMockedGameState({
                currentPlayer: [DORIN],
                setGamePhase: TurnPhases.BeforeMove,
                movePlayers: [[RED_CHANCE_FIELD_INDEX, DORIN]],
                setCards: [[[SPECIAL_CARD_BLUE], DORIN]],
            });
            const options = getTestableOptions(state, DORIN);
            const expected = { [REASON]: NoTurnEndReasons.MoveFirst }
            expect(options.endTurn).toEqual(expected);
        });
        it('Should not allow to end turn when there is a payment for staying at other players field', () => {
            const balinEstates = [ ROME, MEDIOLAN, NEAPOL, SOUTH_RAILWAY, WEST_RAILWAYS, EAST_RAILWAYS];
            const state = getMockedGameState({
                estatesOwner: [BALIN, balinEstates],
                currentPlayer: [DORIN],
                setGamePhase: TurnPhases.AfterMove,
                movePlayers: [[SOUTH_RAILWAY_FIELD_INDEX, DORIN]],
                estatesDelta: [
                    { estateName: NEAPOL, props: { owner: YELLOW, isPlegded: true } },
                ],
            });
            const options = getTestableOptions(state, DORIN);
            const result = options.endTurn
            const expectedResult = { reason: NoTurnEndReasons.MandatoryAction}
            expect(result).toEqual(expectedResult)

        })
        it('Should not allow to end turn when there is a necessity to buy or auction an estate', () => {
            const balinEstates = [ ROME, MEDIOLAN, NEAPOL, POWER_STATION];
            const state = getMockedGameState({
                estatesOwner: [BALIN, balinEstates],
                currentPlayer: [DORIN],
                setGamePhase: TurnPhases.AfterMove,
                setMoney: [[5, DORIN]],
                movePlayers: [[WATER_PLANT_FIELD_INDEX, DORIN]],
            });
            const options = getTestableOptions(state, DORIN);
            const expected = { reason: NoTurnEndReasons.MandatoryAction}
            expect(options.endTurn).toEqual(expected)
        })
        it('Should not allow to end turn when there is money for the start pass to be payed', () => {
            const state = getMockedGameState({
                currentPlayer: [DORIN],
                setGamePhase: TurnPhases.AfterMove,
                movePlayers: [[AFTER_START_FIELD_INDEX, DORIN]],
                lastPlayersField: [[START_FIELD_INDEX, DORIN]],
                shouldPayForStart: [[PassStartPayments.NotSet, DORIN]],
            });
            const options = getTestableOptions(state, DORIN);
            expect(options.endTurn).toEqual({ reason: NoTurnEndReasons.MandatoryAction });

        })
        it('Should not allow to end turn when player has to go to jail', () => {
            const state = getMockedGameState({
                currentPlayer: [DORIN],
                setGamePhase: TurnPhases.AfterMove,
                movePlayers: [[GO_TO_JAIL_INDEX, DORIN]],
                lastPlayersField: [[AFTER_START_FIELD_INDEX, DORIN]],
                shouldPayForStart: [[PassStartPayments.NotSet, DORIN]],
            });
            const options = getTestableOptions(state, DORIN);
            const result = options.endTurn;
            expect(result).toEqual({
                reason: NoTurnEndReasons.MandatoryAction,
            });

        })
        it('Should add a mandatory action to pay the tax, when player stepps on the tax field', () => {
            const state = getMockedGameState({
                currentPlayer: [DORIN],
                setGamePhase: TurnPhases.AfterMove,
                movePlayers: [[TAX_FIELD_INDEX, DORIN], [GUARDED_PARKING_FIELD_INDEX, BALIN]]
            })
            const options = getTestableOptions(state, DORIN);
            const expectedPaymentStatus = {
                [IS_MANDATORY]: true,
                [ACTIONS]: [
                    {
                        [TYPE]: OptionTypes.Pay,
                        [PAYLOAD]: {
                            target: BANK,
                            ammount: TAX_FEE,
                        }        
                    }
                ]
            }
            const paymentStatus = options.pay?.visigingOtherPlayersEstate;
            expect(paymentStatus).toEqual(expectedPaymentStatus);
        })
        it('Should not add a mandatory action to auction or buy an estate when player just stepped bank owned estate but player is not current player', () => {
            const state = getMockedGameState({
                currentPlayer: [BALIN],
                setGamePhase: TurnPhases.AfterMove,
                movePlayers: [[WATER_PLANT_FIELD_INDEX, DORIN]],
            });
            const options = getTestableOptions(state, DORIN);
            const result = options.handleStayOnBankOwnedEstate
            expect(result).toBeUndefined();
        })

        it('Should not add a mandatory action to auction or buy an estate when player just stepped on owned by some player estate', () => {
            const balinEstates = [ ROME, MEDIOLAN, NEAPOL, WATER_PLANT, POWER_STATION];
            const state = getMockedGameState({
                estatesOwner: [BALIN, balinEstates],
                currentPlayer: [DORIN],
                setGamePhase: TurnPhases.AfterMove,
                movePlayers: [[WATER_PLANT_FIELD_INDEX, DORIN]],
                estatesDelta: [
                    { estateName: WATER_PLANT, props: { owner: YELLOW, isPlegded: false } },
                ],
            });
            const options = getTestableOptions(state, DORIN);
            const result = options.handleStayOnBankOwnedEstate;
            expect(result).toBeUndefined();
        })
        it('Should not add a mandatory action to auction or buy an estate when player just stepped on not an estate field', () => {
            const state = getMockedGameState({
                currentPlayer: [DORIN],
                setGamePhase: TurnPhases.AfterMove,
                movePlayers: [[RED_CHANCE_FIELD_INDEX, DORIN]],
            });
            const options = getTestableOptions(state, DORIN);
            const result = options.handleStayOnBankOwnedEstate;
            expect(result).toBeUndefined();
        })
        it('Should not add a mandatory action to auction or buy an estate when player just stepped on banks estate but it is before move phase', () => {
            const state = getMockedGameState({
                currentPlayer: [DORIN],
                setGamePhase: TurnPhases.BeforeMove,
                movePlayers: [[RED_CHANCE_FIELD_INDEX, DORIN]],
            });
            const options = getTestableOptions(state, DORIN);
            const result = options.handleStayOnBankOwnedEstate;
            expect(result).toBeUndefined();
        })
        it('Should not add a mandatory action to auction or buy an estate when player just stepped on banks estate but selling estate is already done', () => {
            const state = getMockedGameState({
                currentPlayer: [DORIN],
                setGamePhase: TurnPhases.AfterMove,
                movePlayers: [[WATER_PLANT_FIELD_INDEX, DORIN]],
                addDoneThisTurn: [DoneThisTurn.BoughtEstate]
            });
            const options = getTestableOptions(state, DORIN);
            const result = options.handleStayOnBankOwnedEstate;
            expect(result).toBeUndefined();
        })
        it('Should add a mandatory action to auction estate when player just stepped on it but has not money to purchase it', () => {
            const balinEstates = [ ROME, MEDIOLAN, NEAPOL, POWER_STATION];
            const state = getMockedGameState({
                estatesOwner: [BALIN, balinEstates],
                currentPlayer: [DORIN],
                setGamePhase: TurnPhases.AfterMove,
                setMoney: [[5, DORIN]],
                movePlayers: [[WATER_PLANT_FIELD_INDEX, DORIN]],
            });
            const options = getTestableOptions(state, DORIN);
            const estate = state.boardFields.find(({name}) => name === WATER_PLANT);
            const expected = {
                [IS_MANDATORY]: true,
                [ACTIONS]: [
                    {
                        [TYPE]: OptionTypes.AuctionEstate,
                        [PAYLOAD]: estate        
                    }
                ]
            }
            expect(options.handleStayOnBankOwnedEstate).toEqual(expected)
        })

        it('Should add a mandatory action to auction or buy an estate when player just stepped on not owned estate and has money for it', () => {
            const balinEstates = [ ROME, MEDIOLAN, NEAPOL, POWER_STATION];
            const state = getMockedGameState({
                estatesOwner: [BALIN, balinEstates],
                currentPlayer: [DORIN],
                setGamePhase: TurnPhases.AfterMove,
                movePlayers: [[WATER_PLANT_FIELD_INDEX, DORIN]],
            });
            const options = getTestableOptions(state, DORIN);
            const result = options.handleStayOnBankOwnedEstate;
            const estate = state.boardFields.find(({name}) => name === WATER_PLANT);
            const expected = {
                [IS_MANDATORY]: true,
                [ACTIONS]: [
                    {
                        [TYPE]: OptionTypes.AuctionEstate,
                        [PAYLOAD]: estate        
                    },
                    {
                        [TYPE]: OptionTypes.BuyEstate,
                        [PAYLOAD]: estate        
                    }
                ]
            }
            expect(result).toEqual(expected);
        })
    })
})
