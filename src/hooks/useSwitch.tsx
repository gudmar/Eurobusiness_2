import { useCallback, useState } from "react";
import { Checkbox } from "../Components/Interactors/Checkbox/Checkbox";

export const useSwitch = (label: string, isInitiallyChecked: boolean) => {
    const [isChecked, setIsChecked] = useState<boolean>(isInitiallyChecked);
    const setSelection = () => setIsChecked(true);
    const clearSelection = () => setIsChecked(false);
    const Switch = useCallback(() => {
        return (
            <Checkbox
                label={label}
                onChange={() => setIsChecked(!isChecked)}
                checked={isChecked}
            />
        )
    }, [isChecked])
    return {isChecked, Switch, setSelection, clearSelection}
}
