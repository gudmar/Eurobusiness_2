import { tPlayerName } from "../Components/Pawns/types";
import { NR_OF_HOTELS, NR_OF_HOUSES } from "../Constants/constants";
import { boardInOrder, descriptors } from "../Data/boardFields";
import { CHANCE_BLUE, CHANCE_RED, CITY, FREE_PARK, GO_TO_JAIL, GUARDED_PARKING, JAIL, PLANT, POWER_STATION, RAILWAY, START, TAX } from "../Data/const";
import { iNamedChance, iNamedCityField, iNamedNonCityEstates, iNamedOtherField, iNonCityEstates, iOtherFieldTypes, tBoard, tBoardField, tChanceTypes, tColors, tNamedBoardField, } from "../Data/types";
import { iBoardCaretaker, tEstateField, tField } from "./boardTypes";
import { ChanceField, CityField, NonCityEstatesField, NullishField, OtherFieldTypesField } from "./FieldCreators";
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

    provideCaretaker() { return this.caretaker}
}
