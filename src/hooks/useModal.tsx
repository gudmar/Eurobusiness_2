import { FC } from "react"
import { Modal } from "../Components/Modal/Modal";
import { useOpenClose } from "./useOpenClose"

export interface iUseModal {
    children: FC
}

export const useModal = (Children: FC) => {
    const {isOpen, setIsOpen, setOpen, setClose} = useOpenClose(false);
    const Component =
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
            <Children/>
        </Modal>
    return {
        setOpen, setClose, setIsOpen, isOpen, Component
    }
}
