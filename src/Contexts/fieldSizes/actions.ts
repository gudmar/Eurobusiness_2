import { DimanetionsOperations, tDimensionAction, tFieldSizesUpdatePayload, tUseRefOnDiv } from "./types"

export const updateAction = (name: string, reference: tUseRefOnDiv) => (
    {
        type: DimanetionsOperations.update,
        payload: {fieldName: name, reference }
    }
);
