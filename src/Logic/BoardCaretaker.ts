import { MAX_NR_HOTELS_IN_CITY, MAX_NR_HOUSES_IN_CITY, NR_OF_HOTELS, NR_OF_HOUSES } from "../Constants/constants";
import { boardInOrder, descriptors } from "../Data/boardFields";
import { CHANCE_BLUE, CHANCE_RED, CITIES, CITY, FREE_PARK, GO_TO_JAIL, GUARDED_PARKING, JAIL, PLANT, POWER_STATION, RAILWAY, START, TAX } from "../Data/const";
import { iCityField, iNamedChance, iNamedCityField, iNamedNonCityEstates, iNamedOtherField, iNonCityEstates, iOtherFieldTypes, tBoard, tBoardField, tChanceTypes, tColors, tCountries, tEstate, tNamedBoardField, } from "../Data/types";
import { iBoardCaretaker, tEstateField, tField } from "./boardTypes";
import { ChanceField, CityField, NonCityEstatesField, NullishField, OtherFieldTypesField } from "./FieldCreators";
import { NrOfHotels } from "./Journalist/utils/getBuildingPermits";
import { createBoardDescriptor } from "./Utils/createBoardDescriptor";

type tNrOfBuildings =  typeof NR_OF_HOUSES  | typeof NR_OF_HOTELS;

abstract class FieldCreator {
    supportedTypes?: string[] = [];
    public tryProducing(fieldDescriptor: tBoardField, fieldIndex: number): any | undefined {
        if (this.checkIfTypeSupported(fieldDescriptor.type)) {
            return this.construct(fieldDescriptor, fieldIndex)
        }
        return;
    }
    protected checkIfTypeSupported (fieldType: string) {
        return this.supportedTypes?.some((t) => t === fieldType)
    }
    protected construct (filedDescriptor: tBoardField, index: number): any {
        return new NullishField(filedDescriptor);
    }
}

class CityCreator extends FieldCreator {
    supportedTypes = [CITY];
    protected construct(fieldDescriptor: tBoardField, index: number){
        return new CityField(fieldDescriptor as iNamedCityField, index)
    }
}

class NonCityEstatesCreator extends FieldCreator {
    supportedTypes = [RAILWAY, PLANT, POWER_STATION];
    protected construct(fieldDescriptor: iNonCityEstates, index: number) {
        return new NonCityEstatesField(fieldDescriptor as iNamedNonCityEstates, index);
    }
}

class OtherFieldTypesCreator extends FieldCreator {
    supportedTypes = [START, JAIL, FREE_PARK, GO_TO_JAIL, TAX, GUARDED_PARKING];
    protected construct(fieldDescriptor: iNamedOtherField, index: number) {
        return new OtherFieldTypesField(fieldDescriptor, index);
    }
}

class ChanceFieldCreator extends FieldCreator {
    supportedTypes = [CHANCE_BLUE, CHANCE_RED];
    protected construct(fieldDescriptor: iNamedChance, index: number){
        return new ChanceField(fieldDescriptor, index)
    }
}

class FieldFactory extends FieldCreator {
    creators?: any[];
    constructor(listOfCreators: any[]) {
        super();
        this.creators = listOfCreators.map(creatorClass => new creatorClass())
    }

    create(field: tBoardField, index: number) {
        const attempts = this.creators?.map((creator) => creator.tryProducing(field, index));
        const instance = attempts?.find((i) => !!i);
        if (!instance) throw new Error('Something is wrong. Field cannot be produced. Unknown field type.')
        return instance;
    }
}

const LIST_OF_FIELD_PRODUCERS = [
    CityCreator, NonCityEstatesCreator, OtherFieldTypesCreator,
    ChanceFieldCreator, 
]

export class BoardCaretaker extends FieldCreator implements iBoardCaretaker {
    static fieldInstances: tField[] = [];

    registerField(fieldInstance: any) {
        BoardCaretaker.fieldInstances.push(fieldInstance)
    }

    static get fieldNames() {
        const names = BoardCaretaker.fieldInstances.map((instance:tField) => instance.name)
        return names;
    }

    getFieldByName(name:string):tField | undefined {
        const field = BoardCaretaker.fieldInstances.find((instance: tField) => instance.name === name);
        return field;
    }

    static getFieldByIndex(index: number):tField | undefined {
        const field = BoardCaretaker.fieldInstances.find((instance: tField) => instance.index === index);
        return field;
    }

    getFieldByIndex(index: number): tField | undefined {
        return BoardCaretaker.getFieldByIndex(index);
    }

    static getFieldsByCountry(countryName: tCountries) {
        const fields = BoardCaretaker.fieldInstances.filter((field) => {
            if (!('country' in field)) return false;
            return countryName === field.country;
        })
        return fields;
    }

    getPlayersEstates(playerColor: tColors) {
        const ownedEstates = BoardCaretaker.fieldInstances.filter((instance: tField) => {
            if ( [CITY, RAILWAY, PLANT].includes(instance.type)) {
                return (instance as tEstateField).owner === playerColor
            }
            return false;
        });
        return ownedEstates as tEstateField[];
    }

    get estates() {
        const result = BoardCaretaker.fieldInstances.filter((instance: tField) => {
            const result = ([CITY, RAILWAY, PLANT]).includes(instance.type)
            return result;
        });
        return result;
    }

    getNrPlayerHouses(playerColor: tColors) {
        const nrOfHouses = BoardCaretaker.fieldInstances.reduce((nr: number, instance: tField) => {
            if (instance.type === CITY) {
                if (instance.owner === playerColor) {
                    nr += (instance as CityField).nrOfHouses
                }
            }
            return nr;
        }, 0)
        return nrOfHouses;
    }

    private getNrOfBuildings(playerColor: tColors, buildingProp: tNrOfBuildings ) {
        const nrOfBuildings: number = BoardCaretaker.fieldInstances.reduce((nr: number, instance: tField) => {
            if (instance.type === CITY) {
                if (instance.owner === playerColor) {
                    nr += (instance as CityField)[buildingProp]
                }
            }
            return nr;
        }, 0)
        return nrOfBuildings;

    }

    getNrPlayerHotels(playerColor: tColors) {
        const nrOfHouses = BoardCaretaker.fieldInstances.reduce((nr: number, instance: tField) => {
            if (instance.type === CITY) {
                if (instance.owner === playerColor) {
                    nr += (instance as CityField).nrOfHotels
                }
            }
            return nr;
        }, 0)
        return nrOfHouses;
    }

}

export const getBoard = () => {
    const result = new BoardCreator(boardInOrder, descriptors);
    return result;
}

export const getEstate = (name: string)  => {
    const estatesInstance = getBoard().estates.find(({name: value}) => value === name);
    if (!estatesInstance) return null;
    return estatesInstance;
}

export class BoardCreator {
    factory: FieldFactory = new FieldFactory(LIST_OF_FIELD_PRODUCERS);
    caretaker!: BoardCaretaker;
    _fields: tBoardField[] = [];
    static instance: BoardCreator;

    constructor(fieldNamesInOrder: string[], fieldDescriptors: tBoard){
        if (BoardCreator.instance) {
            return BoardCreator.instance;
        }
        this.caretaker = new BoardCaretaker()
        const boardDescriptor = createBoardDescriptor(fieldNamesInOrder, fieldDescriptors);
        boardDescriptor.forEach((fieldDescirptor: tNamedBoardField, index: number) => {
            const field = this.factory.create(fieldDescirptor, index);
            this.caretaker.registerField(field);
            this._fields.push(field);
        })
        BoardCreator.instance = this;
        return this;
    }
    get estates() {return this.caretaker.estates}
    get fields() {return this._fields}

    private _getFieldByName(name: string) {
        const cityFieldResult = this._fields.find((pr: tBoardField) => {
            if ('name' in pr ) {
                const nameFromFields = (pr as tEstateField).name;
                return nameFromFields === name
            }
        })
        const result = cityFieldResult ?? null;
        return result;
    }

    getCityByName(name: string) {
        const city = this._getFieldByName(name) as tEstateField | null;
        if (!city) {
            throw new Error(`${name} is not a city`)
        }
        if (!('name' in city! )) throw new Error(`${name} is not a city`)
        if (CITIES.includes(city!.name)) {
            return city
        }
        throw new Error(`${name} is not a city`)
    }

    getNrOfBuildingsOnCityByName(name: string) {
        const city = this.getCityByName(name);
        return {
            nrOfHotels: (city as iCityField).nrOfHotels, nrOfHouses: (city as iCityField).nrOfHouses,
        }
    }

    getEstateByName(name: string) {
        const notEstateTypes = [START, JAIL, FREE_PARK, GO_TO_JAIL, TAX, GUARDED_PARKING, '']
        const estate = this._getFieldByName(name) as tEstateField;
        if (notEstateTypes.includes(estate?.type || '') ) {
            throw new Error(`${name} is not an estate`)
        }
        return estate
    }

    changeEstateOwner(estateName: tEstate, newOwnerColor: tColors) {
        const estate = this.getEstateByName(estateName) as tEstateField || null;
        if (!estate) throw new Error(`${estateName} is not an estate`)
        estate.owner = newOwnerColor;
    }

    increaseNrOfHouses(nrOfHousesToAdd: number, cityName: string) {
        const city = this.getCityByName(cityName);
        if (!city) return;
        (city as iCityField).nrOfHouses = nrOfHousesToAdd + (city as iCityField).nrOfHouses;
    }
    increaseNrOfHotels(cityName: string) {
        const city = this.getCityByName(cityName);
        if (!city) return;
        (city as iCityField).nrOfHotels = (city as iCityField).nrOfHotels + 1;
    }
    decreaseNrOfHouses(cityName: string, nr: number) {
        const city = this.getCityByName(cityName);
        if (!city) return;
        if ((city as iCityField).nrOfHouses < nr) {
            throw new Error(`Cannot return ${nr} from ${cityName} as there are only ${(city as iCityField).nrOfHouses} houses there`);
        }
        (city as iCityField).nrOfHouses = (city as iCityField).nrOfHouses - nr;
    }
    setNrOfHotels(cityName: string, nr: number) {
        const city = this.getCityByName(cityName);
        if (!city) return;
        if ((city as iCityField).nrOfHotels < 0 || (city as iCityField).nrOfHotels > MAX_NR_HOTELS_IN_CITY) {
            throw new Error(`Cannot set ${NrOfHotels} to ${cityName}. There may be only 0 or 1 hotels in the city`)
        }
        (city as iCityField).nrOfHotels = nr;
    }
    setNrOfHouses(cityName: string, nr: number) {
        const city = this.getCityByName(cityName);
        if (!city) return;
        if ((city as iCityField).nrOfHouses < 0 || (city as iCityField).nrOfHouses > MAX_NR_HOUSES_IN_CITY) {
            throw new Error(`Cannot set ${nr} houses to ${cityName}. Min nr of houses is 0, max is ${MAX_NR_HOUSES_IN_CITY}`);
        }
        (city as iCityField).nrOfHouses =  nr;
    }

    addNrOfHouses(cityName: string, nr: number) {
        const city = this.getCityByName(cityName);
        if (!city) return;
        const presentNrHouses = (city as iCityField).nrOfHouses
        if (presentNrHouses + nr > MAX_NR_HOUSES_IN_CITY) {
            throw new Error(`Cannot build ${nr} houses in ${cityName} as there are already ${(city as iCityField).nrOfHouses} houses there, and city cannot be larger then ${MAX_NR_HOUSES_IN_CITY}. Considere building a hotel instead`);
        }
        (city as iCityField).nrOfHouses = (city as iCityField).nrOfHouses + nr;
    }

    fieldIndexToName(index: number) {
        if (index < 0 || index > this._fields.length - 1) throw new Error(`Not enough fields on the board`)
        const field = this._fields[index];
        if ('name' in field) {
            return (field as iNamedCityField).name
        }
        return field.type
    }

    provideCaretaker() { return this.caretaker}
}
