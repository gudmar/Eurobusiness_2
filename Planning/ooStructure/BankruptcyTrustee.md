* Raport delivered with each Judge options
* Manual player may wish to launch this with GUI button
* Deliveres possible options 
* Can make state copy to run a symulation on it in SYMULATION MANAGER
* Can somehow apply plan to the real state

## Messages:
1. sellHotel  0.5 initialPrice  if hotel available
2. sellHouse  0.5 initialPrice  if hotel available
3. mortgageEstate  if no house or hotel
4. sellEstateToPlayer  should ask each player how much he would like for an estate, but cannot be overused towards real player! Concidered ONLY if no other possiblity and TOWARDS serious propositions. This is for player agents, as this module does not make such decisions

## API
1. launchSimulation(): creates a Simulator instance with copy of application state.
2. resetSimulation(): creates new Simulator instance and switches it with existing
3. sellHouseInSimulator(estate): makes simulation on copied state
4. sellHotelInSimulator(estate): makes simulation on copied state
5. mortgageInSimulator(estate): makes simulation
6. buyOutFromMortgageInSimulator(estate): simulation
7. *sellEstateToPlayer(estate): async, should ask each player how much he would give
8. *sellGoOutOfPreasonCard: async, should ask each player how much it is worth, USE RARE
9. undo
10. apply (this applies simulation to a real state)