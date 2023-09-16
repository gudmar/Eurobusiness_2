import { DimanetionsOperations, tDimensionAction, tUseRefOnDiv } from "./types"

export const updateAction = (name: string, payload: tUseRefOnDiv) => ({type: DimanetionsOperations.update, payload})
