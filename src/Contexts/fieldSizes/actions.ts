import { DimanetionsOperations, tDimensionAction, tFieldSizesUpdatePayload, tUseRefOnDiv } from "./types"

export const updateAction = (name: string, payload: tFieldSizesUpdatePayload) => ({type: DimanetionsOperations.update, payload})
