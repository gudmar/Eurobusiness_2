import { BLUE_CARDS_SET_NAME, RED_CARDS_SET_NAME, SPECIAL_CARD_BLUE, SPECIAL_CARD_RED } from "../../../../Data/chanceCards"
import { tGameState } from "../../../../Functions/PersistRetrieveGameState/types"
import { PassStartPayments } from "../../../Player/types"
import { TurnPhases } from "../../../types"
// import { iCityFieldState, iNonCityEstatesFieldState } from "../../../boardTypes"

type tProp = {
  [key: string]: any
}

export type tChangePropsInEstateDelta = {
  estateName: string,
  // props: iCityFieldState | iNonCityEstatesFieldState
  props: tProp
}

export type tChangePropsInEstatesDelta = tChangePropsInEstateDelta[]

export type tChangeEstatesOwner = [ownerName: string, estatesList: string[]]

type tChangeNrOfHotelsBoughtInRound = [nrOfHotelsInRound: number, playerName: string]

export type tChangeNrHotelsBoughtInRoundByPlayers = tChangeNrOfHotelsBoughtInRound[]

type tMovePlayer = [ fieldNr: number, playerName: string];

export type tMovePlayers = tMovePlayer[];

type tSetPlayerMoney = [ money: number, playerName: string]

export type tSetEachPlayerMoney = tSetPlayerMoney[];

type tSpecialCard = typeof SPECIAL_CARD_RED | typeof SPECIAL_CARD_BLUE;

type tSetSpecialCardsToPlayer = [ specialCards: tSpecialCard[], playerName: string]

export type tSetSpecialCardsToPlayers = tSetSpecialCardsToPlayer[]

type tPlayerName = string;

export type tPutPlayersWithNamesToJail = tPlayerName[];

export type tSetTurnsToWaitOnPlayers = string[]

export type tMakePlayersLoseGame = string[]

type tChangeNrOfHousesBoughtInTurn = [nrOfHousesInTurn: number, playerName: string]

export type tChangeNrOfHousesBoughtInTurnByPlayers = [nrOfHousesInTurn: number, playerName: string][]

export type tChangeCurrentPlayer = [name: string];

export type tChangeShouldPayForStart = [newValue: PassStartPayments, playerName: string];

type tChangeShouldStartPayments = tChangeShouldPayForStart[]

export type tGetGameStateMockOptions = {
    estatesDelta?: tChangePropsInEstatesDelta,
    estatesOwner?: tChangeEstatesOwner,
    hotelsInRound?: tChangeNrHotelsBoughtInRoundByPlayers,
    housesInTurn?: tChangeNrOfHousesBoughtInTurnByPlayers,
    movePlayers?: tMovePlayers,
    setMoney?: tSetEachPlayerMoney,
    setCards?: tSetSpecialCardsToPlayers,
    toJail?: tPutPlayersWithNamesToJail,
    playersWait?: tSetTurnsToWaitOnPlayers,
    currentPlayer?: tChangeCurrentPlayer,
    setGamePhase?: TurnPhases,
    lastPlayersField?: tMovePlayers,
    shouldPayForStart?: tChangeShouldStartPayments,
}

export type tProps = {
    [key: string]: any,
  }
  
export type tChangeInEstate = {
    estateName: string, 
    props: tProps,
}

export type tCardType = typeof BLUE_CARDS_SET_NAME | typeof RED_CARDS_SET_NAME;

export type tStateModifierArgs = {state: tGameState, options?: tGetGameStateMockOptions}
