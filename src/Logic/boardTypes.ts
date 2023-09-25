import { ChanceField, CityField, NonCityEstatesField, OtherFieldTypesField } from "./FieldCreators";

export type tEstateCreateors = CityField | NonCityEstatesField;

export type tField = CityField | NonCityEstatesField | OtherFieldTypesField | ChanceField

export type tEstateField = CityField | NonCityEstatesField
