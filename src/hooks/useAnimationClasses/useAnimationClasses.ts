import { useEffect, useRef, useState } from "react";
import { useSwitchableClock } from "../useClock";
import { tUseAnimationClassesArgs } from "./types";
import { didAnimationClassesChange, getClassesRelatedToAnimationNames, getReturnValue, GRADE, isDone } from "./utils";


export const useAnimationClasses = ({
    animationDefinition, classes, runAfterDone, classesNotToBeChanged = []
}: tUseAnimationClassesArgs) => {
    const [isAnimating, setIsAnimating] = useState<boolean>(false);
    const [classesString, setClassesString] = useState<string>('');
    const lastAnimationFrame = useRef<string[]>();
    const {time, setOn} = useSwitchableClock(GRADE)
    useEffect(() => { 
        lastAnimationFrame.current = classesNotToBeChanged;
        const currentClasses = getClassesRelatedToAnimationNames(animationDefinition, time)
        const newClassesReturnValue = getReturnValue([...currentClasses, ...classesNotToBeChanged], classes);
        setClassesString(newClassesReturnValue);
    },
    [])

    useEffect(() => {
        if (isAnimating) {
            
            const currentClasses = getClassesRelatedToAnimationNames(animationDefinition, time)
            const previousClasses = lastAnimationFrame.current;
            const didChange = didAnimationClassesChange(currentClasses, previousClasses as string[]);
            if (didChange) {
                lastAnimationFrame.current = currentClasses;
                const newClassesReturnValue = getReturnValue([...currentClasses, ...classesNotToBeChanged], classes)
                setClassesString(newClassesReturnValue);
            }
            if (isDone(animationDefinition, time)) {runAfterDone()}
        }
    }, [time, animationDefinition, classes, classesNotToBeChanged, isAnimating, runAfterDone])

    return {
        classesString,
        animate: () => {
            setOn();
            setIsAnimating(true);
        },
        time
    }
}
