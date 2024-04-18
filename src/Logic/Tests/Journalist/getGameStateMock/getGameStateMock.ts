import { tOwner } from "../../../../Data/types";
import { tGameState } from "../../../../Functions/PersistRetrieveGameState/types";
import { tEstateField } from "../../../boardTypes";
import { getStateMock } from "./getStateTemplate";
import { tChangeInEstate, tGetGameStateMockOptions, tStateModifierArgs } from "./types";

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
  

// const applyEstatesDeltas = ({state, options}: tStateModifierArgs) => {
//     const result = 
// }

// export const getMockedGameState = (options?: tGetGameStateMockOptions) => {
//     const state = getStateMock();
//     const args = {state, options};
//     const stateWithAppliedEstateDeltas = 
// }
