import { useEffect, useRef, useState } from "react";
import { useThemesAPI } from "../../Contexts/ThemeContext";
import { getUuid } from "../../Functions/getUuid";
import { haveArraysSameElements } from "../../Functions/haveArraysSameElements";
import { Informator } from "./Infromator";
import { useStyles } from "./style";
import { iInformationData, iInformationWithCloseArgs, INFORMATION_MESSAGE, Severity } from "./types";

type tAnimationDescriptor = {
    start: number, end: number
}
type tClasses = {[key: string]: string};
type tAnimationClasses = {[key: string]: tAnimationDescriptor}


const informationCloseAnimation = {
    fadeToBlack: {
        start: 1,
        end: 1000,
    },
    shrink: {
        start: 1,
        end: 1000,
    }
}

const isDone = (animationDescriptor: tAnimationClasses, time: number) => {
    const endValues = Object.values(animationDescriptor).map(({end}) => end);
    const maxEndValue = Math.max(...endValues);
    return maxEndValue <= time
}

type tUseAnimationClassesArgs = {
    animationDefinition: tAnimationClasses,
    classes: tClasses,
    runAfterDone: () => void,
    classesNotToBeChanged: string[],
}

const getClassesRelatedToAnimationNames = (animationDefinition: tAnimationClasses, clockValue: number) => {
    const allAnimationClassNames = Object.keys(animationDefinition);
    const resultClasses = allAnimationClassNames.filter((className: string) => {

        const isEnded = animationDefinition[className].end <= clockValue;
        const isStarted = animationDefinition[className].start <= clockValue;
        const result = !isEnded && isStarted;
        return result;
    })
    return resultClasses;
}

const getReturnValue = (currentAnimationClasses: string[], classesFromUseStyles: tClasses) => {
    const returnValue = currentAnimationClasses.reduce((acc, item) => {
        const element = classesFromUseStyles[item] || item;
        const newAcc: string = `${acc} ${element}`
        return newAcc;
    }, '')
    return returnValue;
}

const didAnimationClassesChange = (previousClasses: string[], currentClasses: string[]) => !haveArraysSameElements(previousClasses, currentClasses);

const GRADE = 10;

const useClock = (interval: number) => {
    const [time, setTime] = useState<number>(0);
    useEffect(() => {
        const i = setInterval(() => {
            const t = time > Number.MAX_SAFE_INTEGER ? 0 : time;
            setTime(t + interval);
        }, interval)
        return () => clearInterval(i);
    }, [time, setTime, interval])

    return { time, reset: () => setTime(0) }
}

const useSwitchableClock = (interval: number) => {
    const [grade, setGrade] = useState<number>(0);
    const [isOn, setOn] = useState<boolean>(false);
    useEffect(() => { if (isOn) setGrade(interval); }, [isOn, setGrade, interval])
    const {time} = useClock(grade);
    return {time, setOn: () => setOn(true)}
}

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
    }, [time, animationDefinition, classes, classesNotToBeChanged, isAnimating])

    return {
        classesString,
        animate: () => {
            setOn();
            setIsAnimating(true);
        },
        time
    }
}


const Information = ({title, message, close, severity}: iInformationWithCloseArgs) => {
    const { theme } = useThemesAPI();
    const classes: {[key:string]: string} = useStyles(theme as any);
    const {classesString, animate, time} = useAnimationClasses({
        animationDefinition: informationCloseAnimation,
        classes,
        classesNotToBeChanged: [`${classes.dialog}`, `${classes[severity]}`],
        runAfterDone: close,
    })

    return (
        <div className={classesString}>
            <div className={classes.closeBar}>
                <h3 className={classes.title}>{title}</h3>
                <button className={`${classes.closeButton} ${classes[severity]}`} onClick={animate}>
                    &times;
                </button>
            </div>
            
            <p>{message}</p>
            <p>{time}</p>
        </div>
    )
}

const INFORMATION_ID = 'information id for subscribtion'

interface iMessage { message: string, title: string, id: string, severity: Severity }

const useInformationStack = () => {
    
    const [messages, setMessages] = useState<iMessage[]>([])


    const getMessagesAfterClose = (idToDelete: string) => {
        const index = messages.findIndex(({id}) => {return (id === idToDelete)});
        const newMessages = [...messages];
        newMessages.splice(index, 1);
        return newMessages;
    }
    const closeMessage = (id: string) => {
        const messages = getMessagesAfterClose(id);
        setMessages( messages )
    }

    useEffect(() => {
        const getMessagesAfterAdd = ({title, message, severity}: iInformationData) => {
            const uuid = getUuid();
            const newMessage = { message, title, id: uuid, severity }
            const newMessages = messages.map((i: any)=>i);
            newMessages.push(newMessage);
            return newMessages
        }
    
        const addMessage = (args: iMessage) => {
            const messages = getMessagesAfterAdd(args);
            setMessages( messages )
        }    
    
        const informatorInstance = new Informator();
        informatorInstance.subscribe({
            callback: addMessage,
            id: INFORMATION_ID,
            messageType: INFORMATION_MESSAGE,
        })
        return () => informatorInstance.unsubscribe(INFORMATION_MESSAGE, INFORMATION_ID )

    }, [messages])
    return {
        messages, closeMessage
    }
}

export const InformationStack = () => {
    const { theme } = useThemesAPI();
    const classes: {[key:string]: string} = useStyles(theme as any);
    const { messages, closeMessage } = useInformationStack();
    return (
        <aside className={classes.informationStack}>
            {
                messages.map(({title, message, id, severity }) => (
                    <Information
                        key={id}
                        title={title}
                        message={message}
                        id={id}
                        severity={severity}
                        close={() => closeMessage(id)}
                    />
                ))
            }
        </aside>
    )
}
