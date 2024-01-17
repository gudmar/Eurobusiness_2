import { useEffect, useState } from "react";
import { INFORMATION_TIMEOUT } from "../../Constants/constants";
import { useThemesAPI } from "../../Contexts/ThemeContext";
import { getUuid } from "../../Functions/getUuid";
import { useAnimationClasses } from "../../hooks/useAnimationClasses/useAnimationClasses";
import { useDoAfterTimeout } from "../../hooks/useIsTimeout";
import { Informator } from "./Infromator";
import { useStyles } from "./style";
import { iInformationData, iInformationWithCloseArgs, INFORMATION_MESSAGE, Severity } from "./types";

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


const Information = ({title, message, close, severity}: iInformationWithCloseArgs) => {
    const { theme } = useThemesAPI();
    const classes: {[key:string]: string} = useStyles(theme as any);
    const {classesString, animate: closeAfterAnimation, time} = useAnimationClasses({
        animationDefinition: informationCloseAnimation,
        classes,
        classesNotToBeChanged: [`${classes.dialog}`, `${classes[severity]}`],
        runAfterDone: close,
    })
    useDoAfterTimeout(INFORMATION_TIMEOUT, closeAfterAnimation)

    return (
        <div className={classesString}>
            <div className={classes.closeBar}>
                <h3 className={classes.title}>{title}</h3>
                <button className={`${classes.closeButton} ${classes[severity]}`} onClick={closeAfterAnimation}>
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
