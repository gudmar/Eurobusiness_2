1. Display board:
    a) Shape with empty fields
    b) Each field has descriptions and icons
2. Dice randomly selects numbers according to specification:
    * 2 dices thrown at the same time,
    * the same number on each dice - throw once more, until different numbers on each dice. Summ all points thrown this way
3. Pawn component walk (move) nr of dice throws
4. When in 'view' mode, and some field clicked, displayes modal with clicked field description (raw data)
5. When in 'tutorial' mode, and some field clicked, displayes modal with short description, what can be done with some field
    a) City:
        * If owned by bank, may be bought by player that stands on it,
        * May be mortaged by owner,
        * If not mortaged, owned by player that is not in preason, other player that stands on it should play owner an ammount of money stated in description,
        * If palyer owns whole country, that player may build a house, hotel
        * May be sold
        * May be auctioned
    b) Railway:
        * If owned by bank, may be bought by player that stands on it,
        * May be mortaged by owner,
        * If not mortaged, owned by player that is not in preason, other player that stands on it should play owner an ammount of money stated in description,
        * May be sold
        * May be auctioned
    c) Electric plant
    d) Waterworks
    e) Question mark
        * Passer by draws a chance card
    f) Start field
        * Passer by gets $400
    g) Prison
        * Passer by pays a visit, stays one turn
    h) Free car park
        * Passer by stays one turn
    i) Guarded parking
        * Passer by pays fee and stays turn
    j) Go to jail 
        * Passer by goes back to prison, and loses 2 turns, des not receive money for this visit
    k) Pay tax field
        * Passer by pays $200
6. Drawing red chance cards
    a) On game init all cards are shufled in random order
    b) When on draw field, random chace card is displayed in modal
    c) When cards are used, they are shufled one more time
    d) Drawn cards affect state (bigger issue, 16 different cards)
7. Drawing blue chance card
    * The same as red cards
8. Payments
    a. Simple payment: player has enough money, it is taken from his account,
    b. Player has not enough money: player chooses what he should do
    * If palyer has no belongings he may mortage, sell, he loses the game
    * If player has a house, he should sell it to the bank for 1/2 of its price
    * If player has a hotel, he should sell it to tha bank for 1/2 of its value + 1/2 of value of 4 houses. No possibility to exchange a hotel back for 4 houses
    * Player may mortage belongings for price stated on them, under condition there are no houses or hotels on it
    * Player may sell belongings to other player for negotiated price
    if there are no houses on that belonging
    * If player owes tax or some fee, and cannot pay, that player may decide to sell belongings to other players, and if not possible, bank takes them over, player looses the game, belongings are auctioned
9. Initial money distribution
    Money shoud be payed this way:
        INITIAL_WALLET = {
            '1000': 1,
            '500' : 2,
            '100' : 6,
            '50'  : 4,
            '20'  : 5,
            '10'  : 8,
            '5'   : 4,
        }
    Assumpt, that money owned by the bank are infinite
10. Change turn when player is done
11. Get list of possiblities when player enters a field
    a. Start field: nothing
    b. City:
        * Has money & owned by bank? may buy. WARNING - auction for 1/2 price to start with
        * Owns whole country? May buy houses
        * Owned by other player? Has to play contribution to that player
    c. Chance field? Has to draw a card, card has effect
    d. Guarded car park / Tax field? Has to contribute
    e. Railway / electric plant / water plant?
        * Has money & owned by bank ? may buy. WARNING - auction for 1/2 price to start with
        * Owned by other player? Has to pay contribution
    f. Visit prison? Nothing | wait 1 turn
    g. Free car park? Nothing | wait 1 turn
    f. Go to jail? Player has to stay / go back to jail? and stay 2 turns. He loses all rights (no auction participation, gets no contriutions)
12. GUI menu after player enters a feild (related with 11)
13. When player passes 'Start' he should get $400
14. Calculation function for contributions when player stays on city
15. Auction rules:
    * Players in jail do not participate
    * Start with 1/2 price
    * Upper boundry established by player or certain game algorithm
    * Step ? Read rules
16. House building rules:
    * Player may purchase up to 3 houses divided evenly among all citeis in country. If there are 2 citeis in country, player may buy 2 houses.
    * To purchase a house player has to own each city in country
    * No more than 4 houses on city allowed
    * If 4 cities then player may purchase a hotel
    * No more than 1 hotel per city allowed
    * Player may purchase up to 3 hotels in one turn
    * Player has to visit a city of certain country to build in this country
    * Nr of houses and hotels is limited. If no left in bank, then no
    possibility to build
17. Selling estates to another player
    * Player decides the price
    * Certain algorithm decides the price
18. Automation algorithm (predefined)
    * Buy every possible estate I stay in when I have up to ....
    * Auction every estate up to .... when I have up to .... 
    * Auction every leave prison card up to ... if I have ....
    * Build a house if I have ....
    * Build a hotel if I have. ...

