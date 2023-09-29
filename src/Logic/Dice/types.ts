export enum TestModes {
    none = 'none',
    chanceFields = 'chanceFields',
    cityFields = 'cityFields',
    plants = 'plants',
    railways = 'railways',
    goToJailField = 'goToJailField',
    dubletTwice = 'dubletTwice',
    taxField = 'taxField',
    getGetAwayFromJailPass = 'getAwayFromJailPass',
    getGetAwayFromJailFail = 'getAwayFromJailFail',
}

export interface iThrowResult {
    result: number,
    doublets: number,
}

export enum iJailTestOutcome {
    pass = 'pass', fail = 'fail'
}
