* Knows what object to ask, what messages to exchange,
* Initiates all objects
* Communicates between react and logic

# API

## React

1. `subscribeToBoardField(fieldName, callback, subscribtionId)` Board field instance will launch `callback(state)` every time state changes, this method is only to pass to original function
2. `unsubscribeFromBoardField(fieldName, callback, subscribtionId)`
3. `subscribeToPlayer(playerName, callback, subscribtionId)`
4. `unsubscribeFromPlayer(playerName, callback, subscribtionId)`

