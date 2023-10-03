const WALLET = [
    { bill: 1000, ammount: 1 },
    { bill: 500, ammount: 2 },
    { bill: 100, ammount: 6 },
    { bill: 50, ammount: 4 },
    { bill: 20, ammount: 5 },
    { bill: 10, ammount: 8 },
    { bill: 4, ammount: 5 },
]

export const INITIAL_MONEY = WALLET.reduce((sum, {bill, ammount}) => {
    const nextSum = sum + bill * ammount;
    return nextSum;
}, 0)
