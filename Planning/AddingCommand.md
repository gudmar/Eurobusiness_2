# With subscription
*src/hooks/useEditPlayer/useEditPlayer.ts*
    1. *Add `SubscribtionsHandler`*
    2. *`SubscribtionsHandler`* needs `SubscriptionMessageType` that is an union of strings, and *StateType* that is an interface *data* that will be the payload
    3. Object thats interested in receiving information should have *subscribe*
    * callback ((tState:any) => void)
    * id: string
    * messageType that is the argument of `iSubscription` type (TYPO here)

# Hooking to Logic class
    * Done with a custom hook
    * Hook has to subscribe to Logic class fields change,
    * Hooking has to be done via subscribtion, in `useEffect` with `[]` deps
    * Good to writhe a reducer for custom hook:

## Writhing a reducer for the custom hook
*/home/witold/Pulpit/Notatki/Refactoring/Eurobusiness_2/eurobusiness_2/src/Components/Interactors/MultiSelectFromList/useMultiSelectFromLotic.ts*
* Create type for `initial-state`
* Create `initial-state`
* Create actions
* Create a state-change-getter, that takes `dispatch` as an arg, and returns a function that will manipulate the state,
* Create `type` enum
* Create `tPayload` indicating the type of the payload,
* Create `tAction` with `payload` and `type` fields
* Write state handlers,
* Write `REDUCER` dictionary mapping types enum to state handlers,
* Get reducer from the `getReducer<typesEnum, type, payload>` function
* Write the hook, use `useReducer`


