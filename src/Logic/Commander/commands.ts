export enum Commands {
    // Chance cards
    PayEachHouse = 'Pay for each house',
    PayEachHotel = 'Pay for each hotel',
    GoToField = 'Go to field',
    Pay = 'Pay',
    GoBack = 'Go back x fields',
    GetMoney = 'Gain ammount of money',
    GoToFieldConditionalyPassStart = 'Go to field conditionaly pass start',
    GetFreeFromJailCard = 'Get free from jail card effect',
    GetMoneyFromEachPlayer = 'Get money from each player,',
    PayOrDrawFromRed = 'Pay or draw a chance card from red pile',
}

export type tCommandPayloadTypes = number | string | boolean
