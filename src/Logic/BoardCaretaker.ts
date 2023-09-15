import { CHANCE_BLUE, CHANCE_RED, CITY, FREE_PARK, GO_TO_JAIL, GUARDED_PARKING, JAIL, PLANT, POWER_STATION, RAILWAY, START, TAX } from "../Data/const";
import { iChance, iCityField, iNamedChance, iNamedCityField, iNamedNonCityEstates, iNamedOtherField, iNonCityEstates, iOtherFieldTypes, tBoard, tBoardField, tChanceTypes, tNamedBoardField, } from "../Data/types";
import { ChanceField, CityField, NonCityEstatesField, NullishField, OtherFieldTypesField } from "./FieldCreators";
import { createBoardDescriptor } from "./Utils/createBoardDescriptor";

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

export class BoardCaretaker extends FieldCreator {
    static fieldInstances: any = [];

    registerField(fieldInstance: any) {
        BoardCaretaker.fieldInstances.push(fieldInstance)
    }

    static get fieldNames() {
        const names = BoardCaretaker.fieldInstances.map((instance:tNamedBoardField) => instance.name)
        return names;
    }

    getFieldByName(name:string) {
        const field = BoardCaretaker.fieldInstances.find((instance: tNamedBoardField) => instance.name === name);
        return field;
    }
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
    get fields() {return this._fields}

    provideCaretaker() { return this.caretaker}
}
