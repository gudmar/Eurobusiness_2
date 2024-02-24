## I. For current player:
1. If `isGameLost` do nothing, pass stearing to another player
2. If Mandatory action: resolve it and go to 1. Mandatory actions (in priority order):
    * Receive money for passing start
    * Chance card payments
    * Chance card money gains
    * Pay player for stay in his property / pay for staying in banks property
    * Buy / auction property player is on if no owner
Before move actions 
    * Before move player may do actions from 3, 4
    * Move
3. Options in player turn:
    * If owns all properties from this country, bank has a house, player stays on one of estates from the country -> may buy a house
    * If owns all properties from this country, bank has 2 houses, player stays on one of estates from the country -> may buy 2 houses so they are distributed evenly among all estates (no more then 1 house difference between each 2 estates)
    * If owns all properties from this country, bank has 3 houses, country has 3 cities, player stayes on one of estates from country -> may buy 3 houses that have to be evenly distributed
    * If player owns a plegded estate that player may re-buy it
    * End turn
4. Options that may be played as an interrupt (other player turn if there is a need to pay something / auction something)
    * If player owns a house and other estates of the same country have the same or smaller number of houses -> player may sell the house for 1/2 of its initial price
    * If player has a hotel, there are hotels on ther estates from the country, or there are at least 4 houses on other estates from the country, there are at least 4 houses in the bank, player may exchange the hotel for 4 houses and 1/2 of its price
    * If player has a hotel, there are no houses in bank left -> player may sell the hotel for 1/2 of hotel price + 2 * house price
    * If player has a hotel, there is a city in target country having no hotel / house -> player may sell the  hotel for 1/2 of hotel price + 2 * house price
    * If player owns an estate that has no houses or hotels on it, he may auction it starting from price he names,
    * If player owns a card 'you get out of prison' that player may auction it for named price

