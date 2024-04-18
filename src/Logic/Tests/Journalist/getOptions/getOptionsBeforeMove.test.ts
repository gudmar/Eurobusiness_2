import { getTestableOptions } from "../../../Journalist/getOptions"

describe('Testing getOptions', () => {
    xit('Should allow to move player in each of below cases, when player is not in prison', () => {
        // const options = getTestableOptions()
    })
    describe('Before move', () => {
        describe('Buildings', () => {
            describe('Should not buy cases', () => {
                xit('Should return a reason for no permit to buy houses, when player cannot purchase them', () => {

                })
                it('Should not add a possiblity to buy buildings when player still did not move for the first time', () => {

                })
                it('Should not add possibility to buy houses when player does not control every city in some conutry', () => {

                });
                it('Should not add possiblity to buy houses when player already bought 3 houses in the round and has where to build houses', () => {
    
                });
                it('Should not add possiblity to buy hotels when player already bought 3 of them in a round, but has where to build them', () => {
    
                })
                it('Should not add possiblity to buy buildings when player owns a country, but a city in it is mortgaged', () => {
    
                })
                it('Should not add a possiblity to buy buildings when player is in prison and has turns to wait, but has where to build buildings', () => {
    
                })
                it('Should not add a possiblity to buy buildings when player has a country, but no more room for buildings', () => {
                    // 1 full countrym, 2/3 of other country
                })
                describe('Collapse reasons', () => {
                    it('Should return a single reason when player has no full countries', () => {
                        // May controll all railways
                    })
                    it('Should return a single reason when player has no money to buy a house on any estate he owns', () => {

                    })
                    it('Should return a single reason when player is still in jail', () => {

                    })
                    it('Should return a single reason when player already bought 3 houses in this turn and cannot afford a hotel yet', () => {
                        // Includes cases when not owns some grounds    
                    })
                    it('Should return a single reason when player already bought 3 hotels in round and has no place to build a house', () => {

                    })
                })
            });
            describe('Should buy cases', () => {
                it('Should add a possiblity to buy houses when player has a not plegged country with space', () => {

                })
            });
            describe('Should not sell buildings cases with reason', () => {
                it('Should not allow to sell buildings when player has no buildings but has a country', () => {

                })
                it('Should not allow to sell buildings when player is in jail', () => {

                })
            })
            describe('Should sell buildings cases', () => {
                it('Should allow to sell buildings when player has buildings and is not in prison', () => {

                })
            })
        })
        describe('Estates', () => {
            describe( 'No options case with explanation', () => {
                it('Should not add any entry to options in case player has no estates', () => {

                })
                it('Should not allow to plegde any estate when player has all estates plegded', () => {

                })
                it('Should not add entry when player is still in prison', () => {

                })
                it('Should not add any entries when player has buildings on each estate', () => {

                })  
                it('Should not allow to sell an estate when there are no houses on it, but there are still houses on other cities in the same country', () => {
                    // Though plegding this estate may be possible
                })
                it('Should not allow to unpleged an estate when player has not plegede estates', () => {

                })
                it('Should NOT allow to unplegde an estate when player has a plegded estate, and has NO MONEY to unplegde it', () => {
                    
                })
                it('Should not allow to sell estates when there are buildings on it', () => {

                })
                it ('Should not allow to sell estate when it is plegded, and thre are buildings in other cities of this country', () => {

                })
                it ('Should not allow to buy an estate when it has no owner, when this is a before move phase', () => {

                })
                describe('Collapse options', () => {
                    it('Should return a single plegde option when no unplegded estates owned', () => {

                    })
                    it('Should return a single unplegde option when no plegded estates owned', () => {

                    })
                    it('Should return a single not sell option when no estates owned', () => {

                    })
                    it('Should return a single not sell option when only COUNTRIES with buildings owned', () => {

                    })
                })
            })
            describe('Add options', () => {
                it('Should allow to plegde an estate when player has no houses on it but has houses on other estates from this country', () => {

                })
                it('Should allow to unplegde an estate when player has plegede estates and enought money to perform this operation', () => {

                })
                it('Should allow to sell an estate that has no buildings on it as long as there are not buildings in other citeis of the some country', () => {

                })
                it('Should allow to sell a plegded estate when there are no buildings in other cities of this country', () => {

                })
            })
        });
        describe('Get out of prison cards', () => {
            it('Should not allow to sell a get out of prison card when player has no such a card', () => {

            })
            it('Should not allow to sell a get out of prison card when player is still in jail', () => {

            })
            it('Should allow to sell a get out of prison card when player has one', () => {

            })
        })
        describe('Fields: chance, tax, guarded parking, first field after start, start field', () => {
            it('Should not charge for a tax field when it is beforeMove phase, as player was already charged for it', () =>{

            })
            it('Should not charge for a guarded parking when it is beforeMove phase, as player was already charged for it', () => {

            })
            it('Should not give money for start when there is beforeMove phase', () => {

            })
            it('Should not allow to draw a chance card when it is before move phase', () => {

            })
            it('Should not put player to jail when it is before move phase', () => {

            })
            it('Should force player to wait a turn when he is still in prison', () => {
                // Includes not ability to move
            })
        })
    })
})