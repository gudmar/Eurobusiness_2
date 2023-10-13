import { useEffect, useState } from "react"

export const useOpenClose = (initialOpen: boolean) => {
    const [isOpen, setIsOpen] = useState<boolean>(initialOpen);
    useEffect(() => {
        setIsOpen(initialOpen)
    }, [initialOpen])
    const setOpen = () => setIsOpen(true);
    const setClose = () => setIsOpen(false);
    return ({
        isOpen, setIsOpen, setOpen, setClose
    })
}