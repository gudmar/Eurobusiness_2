import { BLUE_CARDS_SET_NAME, RED_CARDS_SET_NAME } from "../../../Data/chanceCards";
import { tOwner } from "../../../Data/types";
import { tGameState } from "../../../Functions/PersistRetrieveGameState/types";
import { tEstateField } from "../../boardTypes";
import { getStateMock } from "./getGameStateMock/getStateTemplate";
import { tCardType } from "./getGameStateMock/types";

export const getStateForRedChanceCardsTest = (cardIndex: number) => {
    const result = getStateForChanceCardsTest(cardIndex, RED_CARDS_SET_NAME);
    return result
}

export const getStateForBlueChanceCardsTest = (cardIndex: number) => {
    const result = getStateForChanceCardsTest(cardIndex, BLUE_CARDS_SET_NAME);
    return result
}

// type tProps = {
//   [key: string]: any,
// }

// type tChangeInEstate = {
//   estateName: string, 
//   props: tProps,
// }

// const changeEstate = (state: tGameState, {estateName, props}: tChangeInEstate) => {
//   const fields = state.boardFields;
//   const field = fields.find((f) => f.name === estateName);
//   Object.entries(props).forEach(([key, value]) => {
//     (field as any)[key] = value
//   })
//   return state;
// }

// export const changeEstates = (state: tGameState, deltas: tChangeInEstate[]) => {
//   deltas.forEach((delta) => changeEstate(state, delta));
//   return state;
// }

// export const changeEstatesOwner = (state: tGameState, listOfEstateNames: string[], ownerColor: string) => {
//   const fields = state.boardFields;
//   fields.forEach((field) => {
//     if (listOfEstateNames.includes(field.name)) {
//       (field as unknown as tEstateField).owner = ownerColor as unknown as tOwner
//     }
//   })
//   return state
// }

export const getStateForChanceCardsTest = (cardIndex: number, key: tCardType) => {
    const state = getStateMock();
    const {chanceCards} = state;
    const cards = chanceCards[key];
    const ordered = cards.cardsInOrder;
    const [cardAtIndex] = ordered.splice(cardIndex, 1);
    ordered.unshift(cardAtIndex);
}

export type tSetNrOfHotelsBoughtInRowArgs = {
  state: tGameState,
  color: string,
  nrHotelsBoughtInRound: number
}

export const setNrOfHotelsBoughtInRow = ({state ,color, nrHotelsBoughtInRound}: tSetNrOfHotelsBoughtInRowArgs) => {
  const player = state.players.playersList.find((player) => player.color === color);
  if (!player) throw new Error(`Player ${color} no found`)
  player.nrOfHotelsPurchasedInRound = nrHotelsBoughtInRound;
}
