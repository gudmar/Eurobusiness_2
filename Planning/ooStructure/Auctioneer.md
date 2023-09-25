* When player stands on some estate that he does not want to buy, that estate is auctioned
* Auction starts with 1/2 the price 
* What is the step? (up to me, rules don't say)
* When no one wants to auction price seatled
* User agent is most difficult to handle as it takes into account whole state/calculations

# Use cases:
1. As auctioner I will held auctions when asked to
2. As auctioner I will know all auction rules
3. As auctioner I need a list of players
4. As auctioner I want players to be honest, they cannot cheet laying about their ability to take part in auction or money they can offer, I will not check them
5. As auctioneer I will ask every player delivered to me if he wants to participate in auction
6. Every auction turn I will ask each participant about hes price, or resignation
7. If player resigns in middle of auction, he will be treated like player not taking part in this auction
8. When there is only one player left in acution, I will reply to auction orderer with auction result
9. I will create an auction for player who wants to sell some estate. In this case current owner points 
minimum price and others reply with prices they can efford. Estate is sold for MAX price higher then MINIMUM pointed by owner


# What does this class do
1. Know rules of auction and applies them
2. Create a local state, used for a certan auction,
3. Keeps players taking part in this aucion informed, and asks them for their next price
4. Passes information that estate is purchased to ??? Main?
5. After auction finished I will die, there is not point for me to exist between auctions

# Messages:
```
bankAuctionFinished {
    winner, estate, finalPrice
}
```

```
playerAuctionFinished {
    reachedMinimum, winner, pastOwner, price
}
```

---
startBankAuction {
    players, estate
}
startPlayerAuction {
    minPrice, players, estate, currentOwner
}

# API
Messages seem a perfect API
