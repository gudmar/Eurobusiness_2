import { getSellingPermits } from "../../Journalist/utils/getSellingPermits"

// 4h_1H__LXh - Left many houses
// 4h_1H__L0h - Left 0 houses
// Downgrade is exchanging a hotel to any left in the bank nr of houses


describe('Selling buildings test (getSellingPermits)', () => {
    describe('Houses', () => {
        it('Should return a reason when received a country with buildings', () => {
            // getSellingPermits()
        })
        it('Should return a permit for one house when received a 2 estates country with only a single house build 0h_1h', () => {

        })
        it('Should return a permit for 1 and 2 houses when recewived a 3 estates country with 2 houses on it 1h_1h_0h', () => {

        })
        it('Should return a permit to sell up to 1, 2, 3, 4, 5 houses in a balanced way, when received a country with 2 cities and 5 houses in 2 estate country 2h_3h', () => {

        })
        it('Should return a permit to sell up to 7 houses in a balanced way when received a 3 estates country with 7 houses 3h_2h_2h', () => {

        })
        it('Should return a permit to sell up to 8 houses in a balanced way when received a country with 2 citeis and 8 houses 4h_4h', () => {

        })
        it('Should return a permit to sell up to 12 houses in a balanced way when received a country with 3 cities and 12 houses 4h_4h_4h', () => {

        })
    });
    describe('Hotels', () => {
        it('Should allow to downgrade when 1H_1H__LXh', () => {

        })
        it('Should allow to downgrade when 1H_1H__LXh', () => {

        })
        it('Should allow to downgrade with 1H_4h_LXh', () => {

        })
        it('Should allow to downgrade when 4h_1H_4h__LXh', () => {

        })
        it('Should allow to downgradw when 4h_1H__L3h', () => {

        })
        it('Should allow to downgrade when 4h_4h_1H__L5h', () => {

        })
        it('Should allow to downgrade when 4h_1H__L0h', () => {

        })
        it('Should allow to downgrade when 1H_4h_1H__L0h', () => {
            
        })
        // it('Should return a possiblity to downgrade a hotel when received a country with 2 cities, one having 4 houses and second having 1 hotel, when there are enough houses in the bank (4h_1H__LX)', () => {

        // })
        // it('Should return a possibility to sell everything on an estate when received a country with 2 cities, one having 4 houes, second having 1 hotel, and there are no houses in the bank (4h_1H__L0)', () => {

        // })
        // it('Should return a possibility to exchange 1 hotel to houses or everything when received a country with 3 cities, 2 having 4 houses and one having 1 hotel (4h_4h_1H_0L) and enough houses in the bank', () => {

        // })
        // it('Should offer a possibility to downgrade 2 hotels to any number of houses in case all houess available 1h_1h__LXh', () => {
            
        // })
        // it('Should return a possiblity to sell everything in case there are 4h_4h_1H_X (3 cities, 2 having 4 houses and 1 having a hotel, and no houses left in the bank)', () => {

        // })
        // it('Should return a possiblity to exchange 1 hotel or everything when received a country with 4h_1H_1H_x -> country with 3 citeis, 2 of them having 1 hotel, one having 4 houses, 2 houses left in the bank', () => {

        // })
        // it('Should offer a possiblity to exchange a hotel and sell a house when 4h_1h__L3h', () => {

        // })
        // it('Should offer a possibility to exchange a hotel for up to 2 houses and sell 1 house when 1H_4h__L2h', () => {

        // })
    })
})
