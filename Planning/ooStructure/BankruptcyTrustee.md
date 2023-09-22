* Raport delivered with each Judge options
* Manual player may wish to launch this with GUI button
* Deliveres possible options 
* Can make state copy to run a symulation on it in SYMULATION MANAGER
* Can somehow apply plan to the real state

# Use cases
1. As BT I will make simulations allowing players to see optinos they would have when they mortgaged or sold some estaes,
2. Simulations may be undone or restarted
3. Simulations are not run on real state, but on copy instead
4. When simulation is ongoing real game state should not change,
5. Simulation may be later applied if player choses to
6. When player choses to apply a simulation I will reply to him with simulation report, and he has to find a way to apply changes to the state,
7. I just run simulations, I don't apply changes on my own
8. No simulations take into account selling estates, as this meens asking real players about prices,
so to sell estate in auction simulation so far has to be rejected or applied
9. I don't exist when I am not needed


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