import { haveArraysSameElements } from "../../Functions/haveArraysSameElements";
import { tAnimationClasses, tClasses } from "./types";

export const isDone = (animationDescriptor: tAnimationClasses, time: number) => {
    const endValues = Object.values(animationDescriptor).map(({end}) => end);
    const maxEndValue = Math.max(...endValues);
    return maxEndValue <= time
}

export const getClassesRelatedToAnimationNames = (animationDefinition: tAnimationClasses, clockValue: number) => {
    const allAnimationClassNames = Object.keys(animationDefinition);
    const resultClasses = allAnimationClassNames.filter((className: string) => {

        const isEnded = animationDefinition[className].end <= clockValue;
        const isStarted = animationDefinition[className].start <= clockValue;
        const result = !isEnded && isStarted;
        return result;
    })
    return resultClasses;
}

export const getReturnValue = (currentAnimationClasses: string[], classesFromUseStyles: tClasses) => {
    const returnValue = currentAnimationClasses.reduce((acc, item) => {
        const element = classesFromUseStyles[item] || item;
        const newAcc: string = `${acc} ${element}`
        return newAcc;
    }, '')
    return returnValue;
}

export const didAnimationClassesChange = (previousClasses: string[], currentClasses: string[]) => !haveArraysSameElements(previousClasses, currentClasses);

export const GRADE = 10;