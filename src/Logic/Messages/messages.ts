import { BANK } from "../../Data/const";
import { GAIN, PAY, PAY_EACH_HOTEL } from "../../Constants/commands";
import { MOVE, PRIORITY_NOT_IMPORTANT } from "./constants";
import { iGetPayMessage, iPaymentMultipleToBankOption, iPaymentOption, iPaymentToOption } from "./types";

export const getPayMessage = ({source, ammount, isMandatory = false, priority = PRIORITY_NOT_IMPORTANT}: iGetPayMessage): iPaymentToOption => ({
    operation: PAY,
    source, 
    ammount,
    target: BANK,
    isMandatory,
    priority,
})

export const getGainMessage = ({ammount, isMandatory = false, priority = PRIORITY_NOT_IMPORTANT}: iGetPayMessage): iPaymentOption => ({
    operation: GAIN,
    source: BANK,
    ammount,
    isMandatory,
    priority,
}) 

// export const getPayForEachHotel = ({
//     boardInstance, playerName, singlePrice, priority: PRIORITY_CHANCE_PAY_EACH_HOTEL}: iPaymentMultipleToBank ): iPaymentMultipleToBankOption  => {
        
//     const nrOfHotels = boardInstance.getNrPlayerHotels();
//     return {
//         operation: PAY_EACH_HOTEL,
//         source: playerName,
//         nrOfSources: nrOfHotels,
//         ammount,
//         isMandatory,
//         mandatoryPriority,
//         nrOfSources,
//         boardInstance: BoardCaretaker,

//     }
// }
