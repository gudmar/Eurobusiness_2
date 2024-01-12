import { useEffect, useState } from "react";
import { INFORMATION_TIMEOUT } from "../../Constants/constants";
import { useThemesAPI } from "../../Contexts/ThemeContext";
import { getUuid } from "../../Functions/getUuid";
import { Informator } from "./Infromator";
import { useStyles } from "./style";
import { iInformationArgs, iInformationData, iInformationWithCloseArgs, INFORMATION_MESSAGE, Severity } from "./types";

const useDelay = (time: number, callback: () => void) => {
    useEffect(() => {
        const timeout = setTimeout(callback, time);
        return () => clearTimeout(timeout);
    }, [])
}

const Information = ({title, message, close, severity}: iInformationWithCloseArgs) => {
    const { theme } = useThemesAPI();
    const classes: {[key:string]: string} = useStyles(theme as any);
    // useDelay(INFORMATION_TIMEOUT, close)
    return (
        <div className={`${classes.dialog} ${classes[severity]}`}>
            <div className={classes.closeBar}>
                <h3 className={classes.title}>{title}</h3>
                <button className={`${classes.closeButton} ${classes[severity]}`} onClick={close}>
                    &times;
                </button>
            </div>
            
            <p>{message}</p>
        </div>
    )
}

const INFORMATION_ID = 'information id for subscribtion'

const useInformationStack = () => {
    const [messages, setMessages ]: [iInformationWithCloseArgs[], (args: iInformationWithCloseArgs[]) => void] =  useState<iInformationWithCloseArgs[]>([])
    const closeMessageHOF = (idToDelete: string) => () => {
        const index = messages.findIndex(({id}) => {return (id === idToDelete)});
        const newArr = [...messages];
        newArr.splice(index, 1);
        setMessages(newArr)
    }
    const addMessageHOF = ({title, message, severity}: iInformationData) => {
        const uuid = getUuid();
        const newMessage = { message, title, id: uuid, severity, close: closeMessageHOF(uuid) }
        const newMessages = messages.map(i=>i);
        newMessages.push(newMessage);
        console.log(newMessages)
        setMessages(newMessages)
    }
    useEffect(() => {
        const informatorInstance = new Informator();
        informatorInstance.subscribe({
            callback: addMessageHOF,
            id: INFORMATION_ID,
            messageType: INFORMATION_MESSAGE,
        })
        return () => informatorInstance.unsubscribe(INFORMATION_MESSAGE, INFORMATION_ID )

    }, [])
    return messages
}

export const InformationStack = () => {
    const { theme } = useThemesAPI();
    const classes: {[key:string]: string} = useStyles(theme as any);
    const messages = useInformationStack();
    useEffect(() => console.log(messages), [messages])
    return (
        <aside className={classes.informationStack}>
            {
                messages.map(({title, message, id, severity, close}) => (
                    <Information
                        key={id}
                        title={title}
                        message={message}
                        id={id}
                        severity={severity}
                        close={close}
                    />
                ))
            }
        </aside>
    )
}
