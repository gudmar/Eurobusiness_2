import { useCallback, useEffect, useState } from "react";
import { tUseRefOnDiv } from "../Contexts/fieldSizes/types";
import { useFieldSize } from "../Contexts/fieldSizes/useFieldSizes";
import { tBoardFieldNames } from "../Data/types";

const useOnWindowResize = (callback: (props: any) => void) => {
    // THINK what it has to do
    const getVh = useCallback(() => {
        return Math.max(
          document.documentElement.clientHeight || 0,
          window.innerHeight || 0
        );
     }, []);
     const getVw = useCallback(() => {
        return Math.max(
          document.documentElement.clientWidth || 0,
          window.innerWidth || 0
        );
     }, []);
     const [clientHeight, setVh] = useState<number>(getVh());
     const [clientWidth, setVw] = useState<number>(getVw());
     useEffect(() => {
        const handleResize = () => {
          setVh(getVh());
          setVw(getVw());
        }
        window.addEventListener('resize', handleResize);
        return () => {
          window.removeEventListener('resize', handleResize);
        };
     }, [getVh, getVw]);
     
})

export const useRegisterNodeReference = (name: tBoardFieldNames, reference: tUseRefOnDiv) => {
    const {updateFieldSize, state} = useFieldSize();
    const thisFieldSizes = state[name];
    const [thisField, updateThisField] = useState(state[name]);
    useEffect(() => {
        updateThisField(thisFieldSizes)
    }, [thisFieldSizes])

    return ({
        sizes: thisField,
        updateSizes: updateFieldSize(name, reference),
    })
}