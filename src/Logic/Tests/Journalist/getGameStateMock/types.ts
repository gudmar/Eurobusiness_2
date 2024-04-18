import { BLUE_CARDS_SET_NAME, RED_CARDS_SET_NAME, SPECIAL_CARD_BLUE, SPECIAL_CARD_RED } from "../../../../Data/chanceCards"
import { tGameState } from "../../../../Functions/PersistRetrieveGameState/types"
import { iCityFieldState, iNonCityEstatesFieldState } from "../../../boardTypes"

export type tChangePropsInEstateDelta = {
  estateName: string,
  props: iCityFieldState | iNonCityEstatesFieldState
}

export type tChangePropsInEstatesDelta = tChangePropsInEstateDelta[]

export type tChangeEstatesOwner = [ownerName: string, estatesList: string[]]

type tChangeNrOfHotelsBoughtInRound = [nrOfHotelsInRound: number, playerName: string]

export type tChangeNrHotelsBoughtInRoundByPlayers = tChangeNrOfHotelsBoughtInRound[]

type tMovePlayer = [playerName: string, fieldNr: number];

export type tMovePlayers = tMovePlayer[];

type tSetPlayerMoney = [playerName: string, money: number]

export type tSetEachPlayerMoney = tSetPlayerMoney[];

type tSpecialCard = typeof SPECIAL_CARD_RED | typeof SPECIAL_CARD_BLUE;

type tSetSpecialCardsToPlayer = [playerName: string, specialCards: tSpecialCard[]]

export type tSetSpecialCardsToPlayers = tSetSpecialCardsToPlayer[]

export type tPutPlayersWithNamesToJail = string[]

export type tSetTurnsToWaitOnPlayers = string[]

export type tMakePlayersLoseGame = string[]

export type tChangeNrOfHousesBoughtInTurn = [nrOfHousesInTurn: number, playerName: string]

export type tGetGameStateMockOptions = {
    estatesDelta?: tChangePropsInEstatesDelta,
    estatesOwner?: tChangeEstatesOwner,
    hotelsInRound?: tChangeNrHotelsBoughtInRoundByPlayers,
    housesInTurn?: tChangeNrOfHousesBoughtInTurn,
    movePlayers?: tMovePlayers,
    setMoney?: tSetEachPlayerMoney,
    setCards?: tSetSpecialCardsToPlayers,
    toJail?: tPutPlayersWithNamesToJail,
    playersWait?: tSetTurnsToWaitOnPlayers,
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
