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

## Player stands on CityEstate
0. Interrupts
1. If other player is owner and estate is not plegded
    * Action: pay
    * payload: calculate ammount
2. If other player is owner but estate is plegded
    * Interrupts or end of turn
3. If Bank is an owner and player has cash
    * interrupts
    * buy
    * auction
4. If bank is an owner and player has not enough cash
    * interrupts
    * auction
5. If ower stands on his estate and house balance allows to build a house and has cash for house
    * Action: build house
    * Action: interrupts
    * action: next turn
5. If owner stands on his estate and house balance allows to build a hotel and has cash for hotel
    * Action: build hotel,
    * Action: interrupts
    * Action: end turn
6. If owner stands on his estate but has not enough cash for house / hotel or house balance disallowes to build a hotel,
    * Action: interrupts
    * Action: end turn

## Player stands on nonCityEstate
0. Interrupts
1. If other player owns estate and estate is not plegded
    * Action: pay
    * Action Interrupts
2. If other player owns estate but it is plegded:
    * Action: interrupts
    * Action: next turn
3. If bank owns estate and player has enough cash for it
    * Action: buy
    * Action: auction
    * Interrupts
4. If bank wons estate but player has not enough cash for it
    * Action: auction
    * Interrupts

## displayAfterMove
1. If player had 2 debets
    * Action: put to jail
2. If `previousField` > `nextField` /* passed start */
    * Action: gain $400
    * Gain: $400
3. If on doNothingField:
    * Action: goNotihgn
4. if on justPayField:
    * Action: pay
    * paylod: ammount of field
5. ChanceFields:
    ...
    ...
6. NonCityEstates:

7. CityEstates:
    


# Journalist
### BeforeMove
1. 