import { FC } from "react"
import { Modal } from "../Components/Modal/Modal";
import { useOpenClose } from "./useOpenClose"

export interface iUseModal {
    children: FC
}

export const useModal = (children: FC) => {
    const {isOpen, setIsOpen, setOpen, setClose} = useOpenClose(false);
    const modal =
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
            {children}
        </Modal>
    return {
        setOpen, setClose, setIsOpen, isOpen, component: modal
    }
}
