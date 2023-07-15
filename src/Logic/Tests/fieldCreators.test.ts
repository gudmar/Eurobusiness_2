import { descriptors } from "../../Data/boardFields"
import { ATENY, CITY, GREECE, INSBRUK, LONDON, NEAPOL, SALONIKI } from "../../Data/const"
import { CityField } from "../FieldCreators"

const atenyCity = { ...descriptors[ATENY], name: ATENY };
const salonikiCity = { ...descriptors[SALONIKI], name: SALONIKI };
const neapolCity = { ...descriptors[NEAPOL], name: NEAPOL }
const insbruckCity = { ...descriptors[INSBRUK], name: INSBRUK }
const londonCity = { ...descriptors[LONDON], name: LONDON }

const allCities = [atenyCity, salonikiCity, neapolCity, insbruckCity];

describe('Testing field creators, based on CityFied', () => {
    beforeEach(() => {
        CityField.instances = {}
    })
    it('Should create Ateny, Saloniki, Neapol, Insbruck instances, and keep them as a static value', () => {
        allCities.forEach((city) => new CityField(city))
        const addedCities = Object.keys(CityField.instances);
        expect(addedCities).toContain(ATENY)
        expect(addedCities).toContain(NEAPOL)
        expect(addedCities).toContain(INSBRUK)
        expect(addedCities).toContain(SALONIKI)
        expect(addedCities).not.toContain(LONDON);
    })
    it('Should create only a single instance of Ateny if instructed to create Ateny twice', () => {
        const ateny1 = new CityField(atenyCity);
        const ateny2 = new CityField(atenyCity);
        const ateny3 = new CityField(atenyCity);
        const london = new CityField(londonCity);
        ateny1.nrOfHouses = 4;
        expect(ateny2.nrOfHouses).toBe(4)
        expect(ateny3.nrOfHouses).toBe(4);
        expect(london.nrOfHouses).toBe(0);
    })
    it('Should not be able to set housePrice, type, contry, price, mortage, visit', () => {
        const notAllowedDict = {
            housePrice: 0,
            type: CITY,
            country: GREECE,
            price: 0,
            mortage: 2,
            visit: [3]
        }
        const ateny: any = new CityField(atenyCity);
        Object.entries(notAllowedDict).forEach(([key, val]) => {
            const throwingFunction = () => {
                ateny[key] = val
            }
            expect(throwingFunction).toThrow(`Cannot set property ${key} of #<CityField> which has only a getter`);
        })
    })
})