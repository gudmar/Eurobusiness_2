

import { DimanetionsOperations, tDimensionAction, tFieldSizesUpdatePayload, tUseRefOnDiv } from "./types"

export const updateAction = ({fieldNameForDebugging, reference, fieldIndex}: tFieldSizesUpdatePayload) => (
    {
        type: DimanetionsOperations.update,
        payload: {fieldName: fieldNameForDebugging, reference, fieldIndex}
    }
);
