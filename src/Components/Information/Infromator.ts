import { SubscribtionsHandler } from "../../Logic/SubscrbtionsHandler";
import { iInformationArgs, iInformationData, INFORMATION_MESSAGE, Severity, tInformationMessage } from "./types";

export class Informator extends SubscribtionsHandler<tInformationMessage, iInformationData> {
    private static _instance: Informator;

    constructor() {
        super();
        if (Informator._instance) {
            return Informator._instance
        } else {
            Informator._instance = this;
            return this
        }
    }

    displayError({title, message}: iInformationArgs) {
        this.runAllSubscriptions(INFORMATION_MESSAGE, { severity: Severity.error, title, message })
    }
    displayWarning({title, message}: iInformationArgs) {
        this.runAllSubscriptions(INFORMATION_MESSAGE, {severity: Severity.warning, title, message})
    }
    displayInfo({title, message}: iInformationArgs) {
        this.runAllSubscriptions(INFORMATION_MESSAGE, {severity: Severity.information, title, message})
    }
    log() {this.logSubscribtions()}
}
