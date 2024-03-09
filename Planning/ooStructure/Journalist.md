## doNothingFields:
1. Start
2. Jail
3. Free park

## justPayFields:
1. Guarded parking,
2. Tax

## chanceFields

## nonCityEstates

## cityEstates

## hasMoney
User has cash. Estates, houses etc are not taken into accunt

## userPassesStart
User enters 2 field. Staying on start does not trigger this effect

## displayInterrupts:
1. If player has not plagded estates without houses / hotels
    * Action: plegdeEstate
    * payload: list of estates to be plagded
    * callback
2. If player has hotels and there are at least 4 houses in the bank:
    * Action: exchange hotels to houses
    * payload: list of estates having a hotel
3. If player has hotels and there are less then 4 houses in the bank:
    * Action: sell buildings in the country
    * payload: list of countries with hotels
    * Remember about balancing
4. If player has houses:
    * Action: sell houses
    * payload: list of estates meeting a condition:
        if nr of houses is >= houses in other cities of country
    * Sell one at the time
5. If player has plagded estates and enough cash, player
    * Action: buy out from plagded
    * payload: each estate meetign condition: price of plagde * 1.1 <= cash

## Journalist
### BeforeMove
1. 