When player does anything he will be presented with options, what may be done.
First component is the list of options (buttons) that may be enabled or disabled.
Hovering ove a disable button shows in a displaye section reason for locking,\
Clicking an enable button directs player to a component handling this case

1. buyBuildings: `reason` or an object:
* Greece: Saloniki, Atheny => reason or action
* Railway: SouthRailway, WestRailway ....
* Italy: Neapol, Rome, Mediolan
Here redirection to a component listing all given countries and estates needed

2. endTurn: Reason, or just end turn button. Perhaps with ensure button
3. getMoney: Reason or action
4. plagdeEstates: Object:
* Greece: Saloniki..
.. 
Just like in (1)
5. sellBuidings: reason or object
Some bug, because object has empty possibilities, fix this

6. sellEstates: reason or object
7. specialCards (sell special cards). Reason or action. 2 cards may be selected,
price should be named
8. unplegdeEstates: reason or object

