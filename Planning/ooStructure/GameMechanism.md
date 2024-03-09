## Game Mechanism

*There is a change. Judge will be removed, and instead*

### Interrupt actions:
* Sell houses / hotels
* Plegde estates,
* Auction estates,
* Sell chance card

### Mandatory actions:
    * Pay for staying at some estate
    * Draw chance card
    * Effect triggered by chance card



1. Turn divided into phases:
    A. Before move
        * Interrupt actions
        * Buy a house / hotel
        * Move
    B. After move
        * Start from mandatory actions
        * Possibity to trigger interrupts while resolving mandatory actions
        * Interrupt actions (after mandatory)
        * End turn

### Game class
Like main
1. Asks Journalist for possibiliteis

Jou

### Scenarios:
#### Game flow
1. `Game` asks `Journalist` for options
2. `Journalist` gets the state of the game, and analizes, replies with options. Options are: action, payload, description for user.
3. `Tutor` takes the action/payload list made by the `Journalist` and maps it to callbacks using `Commander` that change game state,
4. The `Tutor` output is passed to the `OptionsPresenter` that gives subscribers access to possibilities and callbacks
5. `GUI` dislplays possiblities, user selects one of them, and launches callback
6. If in auto mode, `OptionsPresenter` displayes info that auto player decides, and passes possibilities (with wrapped callbacks) with game state to the `Strategy` class
7. Wrapped callback is callback changing game state with info to GUI. It is assync, so that displayed info lasts some time

