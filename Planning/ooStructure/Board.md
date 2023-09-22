**Api for operations on board fields, like purchasing, mortgage, buy out from mortgage**

# Use cases
1. I act as a broker between estates and rest of the game
2. I create estates when game is started,
3. I ma the only broker, and no other borker exists,
4. I hold references to each estate, and I can access their state (by getters and setters)
5. I prepare reports: all estates owned by some player ...
6. I have to be informed if estate:
    * Changes owner
    * Is mortgaged,
    * Has houses build
    * Has houses sold
    * Has hotels build
    * Has hotels sold
7. I don't know game rules, I want honest requests, accepted by judge
8. I held subscription requests to fields, GUI may need to be informed by every field about state changes

# API

1. `subscribeToField(fieldName, id, cb)`
2. `unsubscribeFromField(fieldName, id, cb)`
3. `getAllFieldNamesOwnedBy(player)`
4. `getAllFieldStatesOwnedByPlayer(player)`
5. `getAllFieldsNotOwnedByAnyone()`
6. `getFieldState(fieldName | filedNr)`
7. `mortgageFiled(fieldName | filedNr)`
8. `buyOutFromMortgage(fieldName | filedNr)`
9. `buyField(player, fieldName | filedNr)`
10. `sellFieldToBank(filedName | filedNr)`
11. `buildHouse(fieldName | fieldNr)`
12. `demolishHouse(fieldName)`
13. `buildHotel(fielsName)` Knows that 4 houses have to be deleted and hotel set
14. `demolishHotel(filedName)` Knows that 'probably' 4 houses are going to be build and hotel taken away
15. `getAmmountForStay(fieldName)` Takes into account nr of houses/hotel and returns fee


