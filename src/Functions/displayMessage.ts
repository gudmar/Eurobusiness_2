import { Informator } from "../Components/Information/Infromator";
import { Severity } from "../Components/Information/types";
import { iMessage } from "../Types/types";

const getDisplayMessage = (severity: Severity) => (args: iMessage) => {
    const informator = new Informator();
    const mapping = {
        [Severity.error]: informator.displayError,
        [Severity.information]: informator.displayInfo,
        [Severity.warning]: informator.displayWarning,
    };
    const method = mapping[severity];
    return method.call(informator, args)
}

export const displayInfo = ({ title, message }: iMessage) =>
    getDisplayMessage(Severity.information)({title, message})

export const displayWarning = ({ title, message }: iMessage) =>
    getDisplayMessage(Severity.warning)({title, message})

export const displayError = ({ title, message }: iMessage) =>
    getDisplayMessage(Severity.error)({title, message})
