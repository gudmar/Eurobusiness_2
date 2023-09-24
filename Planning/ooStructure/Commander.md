*This class knows **how** to do things. Every command suggested by judge is executed by Commander. Every new chance card has to be added to chanceCards and Commander. Commander has to have a reference to Board, Players, Dice and Bank. BunkruptcyTrustee has reference to Commander, so it may pass a queue of changes*

*To decuple know-how from commander, and make it follow **OCP** and **LSP** commands may be functions implemented in some other module, each function would accept: `Players`, `Board`, `Bank`, `Dice` and each of these commands would change the state of application for `Commander`. Each command would have 2 methods: `do` and `undo`*

**Only provides state to commands

# API

1) `do(command, payload)`
2) `undo(command, payload)`
3) `doAll(commands, payload)`
4) `undoAll(commands, payload)`
