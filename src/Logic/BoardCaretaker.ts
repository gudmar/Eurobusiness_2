import { toBeChecked } from "@testing-library/jest-dom/matchers";
import { CHANCE_BLUE, CHANCE_RED, CITY, FREE_PARK, GO_TO_JAIL, GUARDED_PARKING, JAIL, PLANT, POWER_STATION, RAILWAY, START, TAX } from "../Data/const";
import { tBoardField, tCityField, tNonCityEstates, tOtherFieldTypes } from "../Data/types";
import { CityField, NullishField } from "./FieldCreators";

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
        return new CityField(fieldDescriptor as tCityField)
    }
}

class NonCityEstatesCreator {
    supportedTypes = [RAILWAY, PLANT, POWER_STATION];
    protected constructor(fieldDescriptor: tNonCityEstates) {
        return new NonCityEstatesCreator(fieldDescriptor);
    }
}

class OtherFieldTypesCreator {
    supportedTypes = [START, JAIL, FREE_PARK, GO_TO_JAIL, TAX, GUARDED_PARKING];
    protected constructor(fieldDescriptor: tOtherFieldTypes) {
        return new OtherFieldTypesCreator(fieldDescriptor);
    }
}

class ChanceFieldCreator {
    supportedTypes = [CHANCE_BLUE, CHANCE_RED];
}

class FieldFactory {
    creators?: any[];
    constructor(listOfCreators: any[]) {
        this.creators = listOfCreators.map(creatorClass => new creatorClass())
    }

    create(field: tBoardField) {
        const instance = this.creators?.find((creator) => creator.tryProducing(field));
        if (!instance) throw new Error('Something is wrong. Field cannot be produced. Unknown field type.')
        return instance;
    }
}

class BoardCaretaker {
    boardDescriptor: tBoardField[] | undefined;
    static fieldInstances: any;
    constructor(boardDescriptor: tBoardField[]) {
        this.boardDescriptor = boardDescriptor;
    }

    registerField(fieldInstance: any) {
        const name: string = fieldInstance.getName();
        BoardCaretaker.fieldInstances[name] = fieldInstance;
    }

    newField(fieldDescriptor: tBoardField) {

    }

}