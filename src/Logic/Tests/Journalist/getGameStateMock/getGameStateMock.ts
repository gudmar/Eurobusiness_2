import { tOwner } from "../../../../Data/types";
import { applyStateModifiers, tStateModifier } from "../../../../Functions/applyStateModifiers";
import { tGameState } from "../../../../Functions/PersistRetrieveGameState/types";
import { iNonCityEstatesFieldState, tEstateField } from "../../../boardTypes";
import { iPlayerSnapshot } from "../../../Player/types";
import { TurnPhases } from "../../../types";
import { getStateMock } from "./getStateTemplate";
import { 
  tChangeInEstate, tGetGameStateMockOptions,
  tStateModifierArgs
} from "./types";

const changeEstate = (state: tGameState, {estateName, props}: tChangeInEstate) => {
    const fields = state.boardFields;
    const field = fields.find((f) => f.name === estateName);
    Object.entries(props).forEach(([key, value]) => {
      (field as any)[key] = value
    })
    return state;
  }
  
  export const changeEstates = (state: tGameState, deltas: tChangeInEstate[]) => {
    deltas.forEach((delta) => changeEstate(state, delta));
    return state;
  }
  
  export const changeEstatesOwner = (state: tGameState, listOfEstateNames: string[], ownerColor: string) => {
    const fields = state.boardFields;
    fields.forEach((field) => {
      if (listOfEstateNames.includes(field.name)) {
        (field as unknown as tEstateField).owner = ownerColor as unknown as tOwner
      }
    })
    return state
  }

export const getPlayerColor = (state: tGameState, playerName: string) => {
  const player = state.players.playersList.find(({ name }) => name === playerName);
  return player?.color;
}
  

const applyEstatesDeltas: tStateModifier<tGameState, tGetGameStateMockOptions> = ({state, options}: tStateModifierArgs):tGameState => {
  const deltas = options?.estatesDelta;
  if (!deltas) return state;
  const result = changeEstates(state, deltas);
  return result;
}

const applyOwners = ({state, options}: tStateModifierArgs) => {
  const ownersDelta = options?.estatesOwner;
  if (!ownersDelta) return state;
  const [ownerName, estatesList] = ownersDelta;
  const estates = state.boardFields;
  const joinedNamesAsString = estatesList.join(' | ');
  const ownerColor = getPlayerColor(state, ownerName);
  if (ownerColor === undefined) throw new Error(`Player ${ownerName} does not exist`)
  estates.forEach((estate) => {
    if (joinedNamesAsString.includes(estate?.name)) {
      (estate as iNonCityEstatesFieldState).owner = ownerColor;
    }
  })
  return state;
}

const changeHotelsInRound = (args: tStateModifierArgs) => {
  const { state, options } = args;
  const hotelsInRoundDeltas = options?.hotelsInRound;
  if (hotelsInRoundDeltas === undefined) return state;
  hotelsInRoundDeltas?.forEach((hotelsInRoundDelta) => {
    const [hotelsInRound, playerName] = hotelsInRoundDelta;
    const player = state.players.playersList.find(({name}) => name === playerName);
    if(player === undefined) throw new Error(`Player ${playerName} not found`)
    player.nrOfHotelsPurchasedInRound = hotelsInRound;
  })
  return state;
}

const setCurrentPlayer = (args: tStateModifierArgs) => {
  const { state, options } = args;
  const currentPlayerName = options?.currentPlayer?.[0];
  if (currentPlayerName === undefined) return state;
  const color = getPlayerColor(state, currentPlayerName);
  if (color === undefined) throw new Error(`Players ${currentPlayerName} color not found`)
  state.players.currentPlayersName = currentPlayerName;
  state.currentPlayerName = currentPlayerName;
  return state;
}

const getPlayer = (args: tStateModifierArgs, playerName: string) => {
  const players = args.state.players;
  const player = players.playersList.find(({name}) => name === playerName);
  return player;
}

const sendToJail = (args: tStateModifierArgs) => {
  const { options, state } = args;
  const playersInState = state.players;
  const playersNamesToPrison = options?.toJail || [];
  playersNamesToPrison.forEach((playerName) => {
    const player = playersInState.playersList.find((playerInState) => playerInState.name === playerName);
    if (player) player.isInPrison = true;
  })
  return state;
}

type tOptionsKeys = keyof tGetGameStateMockOptions;
type tPlayerKeys = keyof iPlayerSnapshot;

const getPlayerPropChanger = (propName: tPlayerKeys, keyInOptions: tOptionsKeys) => (args: tStateModifierArgs) => {
  const { state, options } = args;
  const deltas = options?.[keyInOptions];
  if (deltas === undefined || !(Array.isArray(deltas))) return state;
  deltas?.forEach((delta) => {
    const [value, playerName] = delta as [unknown, string];
    const playerIndex = state.players.playersList.findIndex(({name}) => name === playerName);
    if(playerIndex === -1) { throw new Error(`Player ${playerName} not found`) };
    const player = state.players.playersList[playerIndex]
    state.players.playersList[playerIndex] = {...player, [propName]: value}
  })
  return state;
}

const changeHousesInTurn = getPlayerPropChanger('nrOfHousesPurchasedInTurn', 'housesInTurn');
const movePlayers = getPlayerPropChanger('fieldNr', 'movePlayers');
const lastPlayersField = getPlayerPropChanger('lastFieldNr', 'lastPlayersField');
const shouldPayForStart = getPlayerPropChanger('shouldPayForPassingStart', 'shouldPayForStart');
const setMoney = getPlayerPropChanger('money', 'setMoney');
const setCards = getPlayerPropChanger('specialCards', 'setCards');
const setTurnsToWait = getPlayerPropChanger('nrTurnsToWait', 'playersWait');

const setDoneThisTurn = (args: tStateModifierArgs) => {
  const { options, state } = args;
  if ('addDoneThisTurn' in options!) {
    const doneSoFar = state.game.doneThisTurn;
    state.game.doneThisTurn = [...doneSoFar, ...options.addDoneThisTurn!]
  }
  return state;
}

const setGamePhase = (args: tStateModifierArgs) => {
  const { options, state } = args;
  if ('setGamePhase' in options!) {
    state.game.turnPhase = options.setGamePhase as TurnPhases
  }
  return state
}

const applyStateModifiersToGameState = applyStateModifiers<tGameState, tGetGameStateMockOptions>

export const getMockedGameState = (options?: tGetGameStateMockOptions) => {
    const state = getStateMock();

    // const modifiers: tGameStateModifier[] = [
    const modifiers: tStateModifier<tGameState, tGetGameStateMockOptions>[] = [
      applyEstatesDeltas,
      applyOwners,
      changeHotelsInRound,
      changeHousesInTurn,
      movePlayers,
      setMoney,
      setCards,
      sendToJail,
      setTurnsToWait,
      setCurrentPlayer,
      setGamePhase,
      lastPlayersField,
      shouldPayForStart,
      setDoneThisTurn,
    ]
    const readyState = applyStateModifiersToGameState(
      {state, options} as {state: tGameState, options: tGetGameStateMockOptions, playerName: string},
      modifiers,
    );
    return readyState;
}
