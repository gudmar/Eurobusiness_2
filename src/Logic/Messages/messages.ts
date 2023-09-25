import { BANK } from "../../Data/const";
import { GAIN, PAY } from "./commands";
import { PRIORITY_NOT_IMPORTANT } from "./constants";
import { iPayment } from "./types";

export const getPayMessage = ({source, ammount, isMandatory = false, mandatoryPriority = PRIORITY_NOT_IMPORTANT}: iPayment) => ({
    operation: PAY,
    source, 
    ammount,
    target: BANK,
    isMandatory,
    mandatoryPriority,
})

export const getGainMessage = ({ammount, isMandatory = false, mandatoryPriority = PRIORITY_NOT_IMPORTANT}: iPayment) => ({
    operation: GAIN,
    source: BANK,
    ammount,
    isMandatory,
    mandatoryPriority,
}) 

export const getPayForEachHotel = ({boardInstance, hotelOwner})
