**Api for operations on board fields, like purchasing, mortgage, buy out from mortgage**

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


