**Gets game state and informs players with options**

# Use cases
1. As Judge I will know all game ruels
2. As Judge I need access to game state
3. As judge I will reply to advice requests delivered to me
4. As judge I will not hold any game state (perhaps a static class?)

# API

1. `getOptionsForPlayer({ playerState, boardState, bankState, decisionChainHistory})` - returns options *Decision chain history known by main is a list of decisions that were taken, as this function is RESTfull*

# Options format

## options:

**Only one mandatory option should appear at the time, no more**
**If mandatory, no other options allowed? Prio is order in which mandatories shoul appear, lower first**

1. endTurn optional
2. move optional *// throws dice, moves player, does not end turn, before MOVE should build houses  / hotels*
3. pay mandatory prio 20 {ammount, recipiant: bank, player} *Main should know how to distribute money to player or flush if payed to bank*
4. buy optional {estate, ammountToPay, allPlayersState, boardState, bankState} *Should analyse this data to see if transastion is feasible, should look into players belongings, how much money he may get from mortgages, selling houses etc*
5. buildHouses optional *up to 3 at the time*
6. buildHotel *up to 3 per board round*
7. acceptMoney mandatory prio 10 {ammount}
8. drawChance mandatory prio 19 {color}
9. keepChanceCard mandatory prio 11 {card}
10. throwDicesForPayProcedure mandatory prio 15
11. stayForTurns mandatory nrOfTurns prio 30
12. goToField mandatory fieldNr isMoneyForStart prio 5
13. getBankruptcyTrusteeReport optional, possible even before most prio actions
14. launchAuctioneer mandatory prio 13 (only when estate not bought)

STACKING ORDER: chance card before jail must



interface iOption {
    type: ,
    payload
}

type tOptions = iOption[]


# API
1. `ask(gameState, optionsReceiver, replyFunction): gameOptions`