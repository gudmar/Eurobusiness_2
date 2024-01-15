import { useEffect, useRef, useState } from "react";
import { INFORMATION_TIMEOUT } from "../../Constants/constants";
import { useThemesAPI } from "../../Contexts/ThemeContext";
import { getUuid } from "../../Functions/getUuid";
import { haveArraysSameElements } from "../../Functions/haveArraysSameElements";
import { useIsTimeout } from "../../hooks/useIsTimeout";
import { Informator } from "./Infromator";
import { useStyles } from "./style";
import { iInformationData, iInformationWithCloseArgs, INFORMATION_MESSAGE, Severity } from "./types";

type tAnimationDescriptor = {
    start: number, end: number
}
type tClasses = {[key: string]: string};
type tAnimationClasses = {[key: string]: tAnimationDescriptor}
// type tUseAnimationClassesReturn = {
//     classesString: string,
//     animate: () => void,
// }
// type tRunAfterDone = () => void;
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
    console.log(animationDefinition, resultClasses, clockValue)
    return resultClasses;
}

const getReturnValue = (currentAnimationClasses: string[], classesFromUseStyles: tClasses) => {
    const returnValue = currentAnimationClasses.reduce((acc, item) => {
        console.log(item)
        const newAcc: string = `${acc} ${item}`
        // console.log(newAcc)
        return newAcc;
    }, '')
    // console.log(currentAnimationClasses)
    // console.log(returnValue)
    return returnValue;
}

const didAnimationClassesChange = (previousClasses: string[], currentClasses: string[]) => haveArraysSameElements(previousClasses, currentClasses);

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
    // useEffect(() => console.log('Classes', classes), [classes]);
    useEffect(() => { lastAnimationFrame.current = [] }, [])
    useEffect(()=> console.log('AS string ', classesString), [classesString])

    useEffect(() => {
        if (isAnimating) {
            // console.log('In is animating', time)
            const currentClasses = getClassesRelatedToAnimationNames(animationDefinition, time)
            // console.log(currentClasses)
            const previousClasses = lastAnimationFrame.current;
            const didChange = didAnimationClassesChange(currentClasses, previousClasses as string[]);
            if (didChange) {
                lastAnimationFrame.current = currentClasses;
                const newClassesReturnValue = getReturnValue([...currentClasses, ...classesNotToBeChanged], classes)
                setClassesString(newClassesReturnValue);
            }    
        }
    }, [time, animationDefinition, classes, classesNotToBeChanged, isAnimating])

    return {
        classesString,
        animate: () => {
            // console.log('Animation started')
            setOn();
            setIsAnimating(true);
        },
        time
    }
}

const informationCloseAnimation = {
        fadeToBlack: {
            start: 0,
            // end: 500,
            end: 20000,
        },
        shrink: {
            start: 500,
            // end: 1000,
            end: 40000,
        }
}

const Information = ({title, message, close, severity}: iInformationWithCloseArgs) => {
    const { theme } = useThemesAPI();
    const classes: {[key:string]: string} = useStyles(theme as any);
    const isTimeout = useIsTimeout(INFORMATION_TIMEOUT);
    const {classesString, animate, time} = useAnimationClasses({
        animationDefinition: informationCloseAnimation,
        classes,
        classesNotToBeChanged: [`${classes.dialog}`, `${classes[severity]}`],
        runAfterDone: close,
    })

    useEffect(() => {
        console.log(classesString)
    }, [classesString])

    useEffect(()=>{
        if (isTimeout) {animate()}
    }, [isTimeout, animate])

    // const { time } = useClock(GRADE);
    return (
        // <div className={`${classes.dialog} ${classes[severity]}`}>
        <div className={classesString}>
            <div className={classes.closeBar}>
                <h3 className={classes.title}>{title}</h3>
                <button className={`${classes.closeButton} ${classes[severity]}`} onClick={close}>
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
