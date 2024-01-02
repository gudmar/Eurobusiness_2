## Template
1. Description:
* Trigger:
* Expected behaviour
* Actual behaviour
2. Possible causes:

## State editor
### Player editors
#### Selection of a special card
1. Description:
* Trigger: in player state editor, When on any other player then yellow, select a special card (click once)
* Expected behaviour: Checkbox indicating the card should go from not checked to checked state
* Actual bahaviour: Checkbox is not checked, but background state in Logic/Player:specialCards is checked
* When yellow player selected, then everything seems to work as expected
* Yellow **seems** significant becaue it is the first, default player

2. Where the problem appears:
* `useMultiselectFromLogic.ts -> decoratedToggle function`. When run on player other then yellow `MultiSelectFromLotic` component rerenders a few times. When run on yellow player this rerender does not happen. Discovered by adding `useEffect` with `[defaultSelected]` in useMultiSelectFromLogic
**However** `yellow` seems not to be any sort of default color (discoverd in `useEditPlayer` with `useEffect` on every rerender)

2. Possible causes:
* Probably the problem appears because the state is repeated: once in the `Logic` classes and then in `MultiSelectFromLogic` component
* `/home/witold/Pulpit/Notatki/Refactoring/Eurobusiness_2/eurobusiness_2/src/hooks/useEditPlayer/useEditPlayer.ts` Here state was not initialized properly.
Some constant was the state when player was 'yellow' by defalult. When player was swtiched to other then yellow, then state was taken from the real 'Logic' class
Now state is taken from 'Logic' in every case, and setting special cards does not work in all cases in the same way. This is already a progress

3. Actual cause
* State is managed in 2 places at the same time: Logic classes and `useMultiSelectFromLogic`. MultiSelect component first got its props, and then state was handled on new props
* Removing toggle function in decorated toggle in useMultiSelectFromLogic fixes the problem, but
MultiSelct component should not be changed as it is a library like component
* Think how to fix this


