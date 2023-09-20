**Class that knows about all 4 players, draws randomly order they play, may access next, current player,knows what player is current and next, may give a report of player belongings**

# API

1. `getPlayerState(player: 'player_1' | 'player_2' | 'player_3' | 'player4' | 'current' | 'next')`
2. `getCurrentPlayerName()`
3. `getNextPlayerName()`,
4. `getQueue()` order in which players play
5. `nextPlayer()` switches current to next, next to next + 1
6. `pay(player, ammount)`
7. `earn(player, ammount)`
8. `setSpecialCard(player, cardToken)`
9. `lost(player)`
10. `win(player)`
11. `allExpectPlayerPay(player, ammount)`
12. `allExpectPlayerEarn(player, ammount)`
13. `subscribeToPlayerState(player)`
14. `unsubscribeFromPlayersState(player)`


