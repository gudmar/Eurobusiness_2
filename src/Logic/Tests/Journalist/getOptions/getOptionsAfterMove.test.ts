describe('Options after player move', () => {
    // * End turn actions on start, not guarded parking, visit jail are added authomaticaly
    // * Should allow to sell houses, sell estates plegde estates as normal
    // * AUctions are not tested here at least YET
    describe('Should not cases', () => {
        it('Should not allow to build anything when in after move phase', () => {

        })
        it('Should not allow to end turn when there is a pending mandatory action', () => {

        })
    })
    describe('Should cases', () => {
        it('Should allow to sell houses when player has some and in after move phase', () => {

        })
        it('Should allow to plegde an estate when player has an estate that may be plegede in after move phase', () => {

        })
        it('Should return a mandatory option of getting 400$ after passing start', () => {

        })
        it('Should return a mandatory option of paying for a guarded parking when player just stepped on one', () => {

        })
        it('Should return a mandatory draw a chance card when player stepped on a chance field', () => {

        })
        it('Should allow to end turn when there are no pending mandatory actions,', () => {

        })
        it('Should add a mandatory option to go to jail when player has no get out of jail card and steps on the go to jail field', () => {

        })
        it('Should add a mandatory option to go to jail or use get out of jail card when player stepps on the go to jail field', () => {

        })
        it('Should add a mandatory action to pay the tax, when player stepps on the tax field', () => {

        })
        it('Should add a mandatory action to auction estate when player just stepped on it but has not money to purchase it', () => {
            // Mandatory is ok, because it locks ONLY next turn, and player may sell / plegde as normal, so
            // player may sell something, state gets recalculated, and perhaps this mandatory action will change to 
            // auction or purchase action
        })
        it('Should add a mandatory action to auction or buy an estate when player just stepped on not owned estate and has money for it', () => {

        })
        it('Should add a mandatory action to pay for a visit at other players estate, when player just stepped on one', () => {
            
        })
    })
})