import { DEFAULT_LANGUAGE, SupportedLanguages } from "../../Constants/constants";
import { iChanceCardActions, iChanceCardData, iChanceCardMetadata, iDescriptionsInLanguages } from "../../Data/types";


export interface iChanceCard {
    
}

const getLanguageShort = (longName: string): tLanguageKeysShort => {
    const entries = Object.entries(SupportedLanguages);
    const result = entries.find(([key, value]) => value === longName);
    if (!result) throw new Error(`Language ${longName} is not supported`);
    return result[0] as tLanguageKeysShort
}

type tLanguageKeysShort = 'en' | 'pl'

export class ChanceCard {
    private _descriptions: iDescriptionsInLanguages;
    // private _currentLanguage: SupportedLanguages;
    private _actions: iChanceCardActions[];
    private _metadata?: iChanceCardMetadata
    private _isBorrowedToPlayer: boolean

    constructor({descriptions, actions, metadata}: iChanceCardData) {
        this._descriptions = descriptions;
        // this._currentLanguage = DEFAULT_LANGUAGE;
        this._actions = actions;
        this._isBorrowedToPlayer = false;
        this._metadata  = metadata;
    }

    get description() {
        const languageShort: tLanguageKeysShort = getLanguageShort(this._currentLanguage) as tLanguageKeysShort;
        const result = this._descriptions[languageShort];
        return result;
    }

    // set language (value: any) {
    //     throw new Error('Implement ChanceCard.language')
    // }
    set isBorrowedToPlayer(value: boolean) {this._isBorrowedToPlayer = value}
    get isBorrowedToPlayer() {return this._isBorrowedToPlayer}

    get actions() {return this._actions}

    get isCollectable() {return !!this._metadata?.collectable}
}
