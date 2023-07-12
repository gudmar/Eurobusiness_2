import { toBeChecked } from "@testing-library/jest-dom/matchers";
import { CHANCE_BLUE, CHANCE_RED, CITY, FREE_PARK, GO_TO_JAIL, GUARDED_PARKING, JAIL, PLANT, POWER_STATION, RAILWAY, START, TAX } from "../Data/const";
import { iChance, iCityField, iNonCityEstates, iOtherFieldTypes, tBoard, tBoardField, tChanceTypes, tNamedBoardField, } from "../Data/types";
import { ChanceField, CityField, NonCityEstatesField, NullishField, OtherFieldTypesField } from "./FieldCreators";
import { createBoardDescriptor } from "./Utils/createBoardDescriptor";

abstract class FieldCreator {
    supportedTypes?: string[] = [];
    public tryProducing(fieldDescriptor: tBoardField): any | undefined {
        if (this.checkIfTypeSupported(fieldDescriptor.type)) {
            return this.construct(fieldDescriptor)
        }
        return;
    }
    protected checkIfTypeSupported (fieldType: string) {
        return this.supportedTypes?.some((t) => t === fieldType)
    }
    protected construct (filedDescriptor: tBoardField): any {
        return new NullishField(filedDescriptor);
    }
}

class CityCreator extends FieldCreator {
    supportedTypes = [CITY];
    protected construct(fieldDescriptor: tBoardField){
        return new CityField(fieldDescriptor as iCityField)
    }
}

class NonCityEstatesCreator extends FieldCreator {
    supportedTypes = [RAILWAY, PLANT, POWER_STATION];
    protected construct(fieldDescriptor: iNonCityEstates) {
        return new NonCityEstatesField(fieldDescriptor as iNonCityEstates);
    }
}

class OtherFieldTypesCreator extends FieldCreator {
    supportedTypes = [START, JAIL, FREE_PARK, GO_TO_JAIL, TAX, GUARDED_PARKING];
    protected construct(fieldDescriptor: iOtherFieldTypes) {
        return new OtherFieldTypesField(fieldDescriptor);
    }
}

class ChanceFieldCreator extends FieldCreator {
    supportedTypes = [CHANCE_BLUE, CHANCE_RED];
    protected construct(fieldDescriptor: iChance){
        return new ChanceField(fieldDescriptor)
    }
}

class FieldFactory extends FieldCreator {
    creators?: any[];
    constructor(listOfCreators: any[]) {
        super();
        this.creators = listOfCreators.map(creatorClass => new creatorClass())
    }

    create(field: tBoardField) {
        const instance = this.creators?.find((creator) => creator.tryProducing(field));
        if (!instance) throw new Error('Something is wrong. Field cannot be produced. Unknown field type.')
        return instance;
    }
}

const LIST_OF_FIELD_PRODUCERS = [
    CityCreator, NonCityEstatesCreator, OtherFieldTypesCreator,
    ChanceFieldCreator, 
]

export class BoardCaretaker extends FieldCreator {
    // boardDescriptor: tBoardField[] | undefined;
    static fieldInstances: any;
    // constructor(boardDescriptor: tBoardField[]) {
    //     super();
    //     this.boardDescriptor = boardDescriptor;
    // }

    registerField(fieldInstance: any) {
        const name: string = fieldInstance.getName();
        BoardCaretaker.fieldInstances[name] = fieldInstance;
    }

    // newField(fieldDescriptor: tBoardField) {
    //     return this.factory.tryProducing(fieldDescriptor);
    // }
}

export class BoardCreator {
    factory: FieldFactory = new FieldFactory(LIST_OF_FIELD_PRODUCERS);
    caretaker: BoardCaretaker;
    constructor(fieldNamesInOrder: string[], fieldDescriptors: tBoard){
        this.caretaker = new BoardCaretaker()
        const boardDescriptor = createBoardDescriptor(fieldNamesInOrder, fieldDescriptors);
        boardDescriptor.forEach((fieldDescirptor: tNamedBoardField) => {
            const field = this.factory.tryProducing(fieldDescirptor);
            this.caretaker.registerField(field);
        })
    }
}
