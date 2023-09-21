**Keeps track over chance cards**
* Downloads from data
* Shufles - automaticaly when created, and when cards end !
* Keeps order
* Reshufles if no cards left
* Gives some cards to the plaeyr (jail) *suspends cards*
* Gets cards from player *unsuspends*
* Keeps both: blue and red chances
* May use subclasses

# API

1. `giveCardToPlayer(card, player)` suspend card in background
2. `drawCard()` point to next card, if end, shufle in background, return card to requiering object,
3. `getCardFromPlayer(card)` unsuspendCard on stack

