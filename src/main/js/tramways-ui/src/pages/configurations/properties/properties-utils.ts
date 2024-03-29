import {PropertyTypes} from "./inputs/PropertyTypes";
import {
  newExponentialDistribution,
  newUniformDistribution
} from "./inputs/distributions/distribution-utils";
import {
  ChoiceProperty,
  DecimalProperty, DistributionProperty,
  IntegerProperty,
  StringProperty
} from "../../../api/generated/projects";

export function newStringProperty(): StringProperty {
  return {
    name: "",
    value: "",
    propertyType: PropertyTypes.STRING
  };
}

export function newIntegerProperty(): IntegerProperty {
  return {
    name: "",
    value: 0,
    propertyType: PropertyTypes.INTEGER
  };
}

export function newDecimalProperty(): DecimalProperty {
  return {
    name: "",
    value: 0,
    propertyType: PropertyTypes.DECIMAL
  };
}

export function newChoiceProperty(): ChoiceProperty {
  return {
    name: "",
    value: undefined,
    choices: [],
    propertyType: PropertyTypes.CHOICE
  };
}

export function newUniformDistributionProperty(): DistributionProperty {
  return {
    name: "",
    value: newUniformDistribution(),
    propertyType: PropertyTypes.DISTRIBUTION
  };
}

export function newExponentialDistributionProperty(): DistributionProperty {
  return {
    name: "",
    value: newExponentialDistribution(),
    propertyType: PropertyTypes.DISTRIBUTION
  };
}


export function createDecimal(name: string, value: number): DecimalProperty {
  return {
    propertyType: "DecimalProperty",
    name: name,
    value: value
  } as DecimalProperty;
}
