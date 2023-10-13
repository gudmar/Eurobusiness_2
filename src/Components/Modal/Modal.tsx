import { createPortal } from "react-dom"
import { useClasses } from "./styles"

export const Modal = ({children, isOpen, setIsOpen}: any) => {
    const classes = useClasses();
    if (!isOpen) {
        return <></>
    }
    return (
        <div className={classes.tv}>
            <div className={classes.contentWrapper}>
                <div className={classes.closeButton} onClick={() => setIsOpen(false)}>
                    &times;
                </div>
                {createPortal(
                    children,
                    document.body,
                )}
            </div>
        </div>
    )
}
