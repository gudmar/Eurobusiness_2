import { useEffect } from "react";
import { iFieldSizesUpdatePayload } from "../Contexts/fieldSizes/types";
import { useFieldSize } from "../Contexts/fieldSizes/useFieldSizes";

export const useRegisterNodeReference = ({
    fieldNameForDebugging, fieldIndex, reference
}: iFieldSizesUpdatePayload) => {
    const { updateFieldSize } = useFieldSize();
    useEffect(() => {
        updateFieldSize({fieldNameForDebugging, fieldIndex, reference});
    }, [fieldNameForDebugging, fieldIndex, reference, updateFieldSize])
}
