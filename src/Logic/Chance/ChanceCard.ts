import { reverseLanguageMapping } from "../../Contexts/CurrentLanguage/const";
import { tLanguage, tSupportedLanguagesKeys } from "../../Contexts/CurrentLanguage/types";
import { iChanceCardActions, iChanceCardData, iChanceCardMetadata, iDescriptionsInLanguages } from "../../Data/types";
import { runCallbackWithLanguage } from "../../Functions/runCallbackWithLanguage";
import { tAction } from "../../Types/types";
import { iChanceCard, tSingleChanceCardState } from "./types";


export class ChanceCard implements iChanceCard {
    private _descriptions: iDescriptionsInLanguages;
    private _actions: tAction[];
    private _metadata?: iChanceCardMetadata
    private _isBorrowedToPlayer: boolean

    constructor({descriptions, actions, metadata, isBorrowedToPlayer}: iChanceCardData) {
        this._descriptions = descriptions;
        this._actions = actions;
        this._isBorrowedToPlayer = !!isBorrowedToPlayer;
        this._metadata  = metadata;
    }

    get state(): tSingleChanceCardState {
        return {
            descriptions: this._descriptions,
            actions: this._actions,
            metadata: this._metadata,
            isBorrowedToPlayer: this._isBorrowedToPlayer,
        }
    }

    getDescription(language: tLanguage) {
        const result = runCallbackWithLanguage<string>({
                language,
                shortNameCallback: () => (this._descriptions[language as tSupportedLanguagesKeys]),
                longNameCallback: () => (this._descriptions[reverseLanguageMapping[language]]),
        })
        return result
    }

    borrow() {
        if (this.isCollectable && !this.isBorrowedToPlayer) {
            this.isBorrowedToPlayer = true;
            return true
        }
        return false;
    }

    return() {
        if (this.isCollectable && this.isBorrowedToPlayer) {
            this.isBorrowedToPlayer = false;
            return true;
        }
        return false
    }

    set isBorrowedToPlayer(value: boolean) {this._isBorrowedToPlayer = value}
    get isBorrowedToPlayer() {return this._isBorrowedToPlayer}

    get actions() {return this._actions}
    get descriptions() {return this._descriptions}

    get isCollectable() {return !!this._metadata?.isCollctable}
}
