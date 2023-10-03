import { iGoToFieldOption, iPayForEachBuildingOption, iPaymentMultipleToBankOption, iPaymentOption, iPaymentToOption } from "../Messages/types"

export type tOption = 
    iPaymentToOption | 
    iPaymentMultipleToBankOption |
    iGoToFieldOption |
    iPayForEachBuildingOption |
    iPaymentOption

export type tOptions = tOption[]
