**Class that knows about all 4 players, draws randomly order they play, may access next, current player,knows what player is current and next, may give a report of player belongings**

1. As a player I would like to be informed what options do I have at some moment of the game (judge)
2. As a player I would like to know what options are mandatory
3. As a player I need a decision helper (strategy)
4. As a player I need to know the state of the game to form proper questions to strategy and judge
5. As a player I will hold part of the state: my position, money, specialCards, nrOfTurnsToWait, if I am in jail


1. I act as a Broker between player classes and exterhal word
2. I hold reference to each player and may access players state via getters and setters

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


