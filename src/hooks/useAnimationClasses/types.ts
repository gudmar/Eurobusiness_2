export type tAnimationDescriptor = {
    start: number, end: number
}
export type tClasses = {[key: string]: string};
export type tAnimationClasses = {[key: string]: tAnimationDescriptor}

export type tUseAnimationClassesArgs = {
    animationDefinition: tAnimationClasses,
    classes: tClasses,
    runAfterDone: () => void,
    classesNotToBeChanged: string[],
}
