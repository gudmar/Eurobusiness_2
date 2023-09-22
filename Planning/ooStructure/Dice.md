**Knows how to throw, when to thow again, returns nr of dots that were thrown alltogether**

**Note:** ***setting pawn to field one by one is job of react layer***
# Use cases
1. I throw dices and return results
2. I don't know only throwing dice rules, I know nothing about prison, game structure
3. I just receive a request and reply to requester in provided replyFunction
4. I reply with drawnNumber, and nrOfDublets

# Messages
throwForMove: (replyFunction) => {result, nrOfDublets}
chanceCardAThrow: (replyFunction) => {result, nrOfDublets}
chanceCardBThrow: (replyFunction) => {result, nrOfDublets}
..
getOutOfPrisonThrow: (replyFunction) => {result, nrOfDublets}

# API

1. `throw()=>{result, dubletsNr}`
2. `throwPaymentProcedure(type: electricPlant, waterPlant, chanceCard?) => {result, dubletsNr}`
3. `throwForGetOutOfPrison() => {result, dubletsNr}` if player is in prison he may pay $100 and thow a dublet to get out

