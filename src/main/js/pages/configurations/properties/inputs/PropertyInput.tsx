import React from "react";
import IntegerPropertyInput from "./IntegerPropertyInput";
import {
    ChoiceProperty,
    DecimalProperty,
    DistributionProperty, DistributionType, ExponentialDistribution,
    IntegerProperty,
    Property,
    StringProperty, UniformDistribution
} from "../../../../api/generated";
import StringPropertyInput from "./StringPropertyInput";
import DecimalPropertyInput from "./DecimalPropertyInput";
import ChoicePropertyInput from "./ChoicePropertyInput";
import {PropertyTypes} from "./PropertyTypes";
import DistributionPropertyInput from "./DistributionPropertyInput";
import {csCZ} from "@material-ui/core/locale";
import {Typography} from "@material-ui/core";

export interface PropertyInputProps {
    property: Property;
    onChange: (prop: Property) => void
}

export default function PropertyInput({property, onChange}: PropertyInputProps) {
    const componentMap = new Map<string, any>();
    componentMap.set(PropertyTypes.INTEGER, IntegerPropertyInput);
    componentMap.set(PropertyTypes.DECIMAL, DecimalPropertyInput);
    componentMap.set(PropertyTypes.STRING, StringPropertyInput);
    componentMap.set(PropertyTypes.CHOICE, ChoicePropertyInput);
    componentMap.set(PropertyTypes.DISTRIBUTION, DistributionPropertyInput);

    let Component = componentMap.get(property.propertyType);
    if (!Component) {
        Component = () => <p>Unsupported</p>;
    }
    return <div>
        <Typography variant={"h5"}>{property.name}</Typography>
        <Component property={property} onChange={onChange}/>
    </div>;
}

export function renderProperty(prop: Property) {
    switch (prop.propertyType) {
        case PropertyTypes.INTEGER:
            return (prop as IntegerProperty).value;
        case PropertyTypes.DECIMAL:
            return (prop as DecimalProperty).value;
        case PropertyTypes.STRING:
            return (prop as StringProperty).value;
        case PropertyTypes.CHOICE:
            return (prop as ChoiceProperty).choices.map(choice => choice.label).join(", ");
        case PropertyTypes.DISTRIBUTION:
            return renderDistribution(prop as DistributionProperty);
    }
}

function renderDistribution(prop: DistributionProperty) {
    switch (prop.value.distributionType) {
        case DistributionType.UNIFORM:
            return "[" + (prop.value as UniformDistribution).left + "," + (prop.value as UniformDistribution).right + "]";
        case DistributionType.EXPONENTIAL:
            return (prop.value as ExponentialDistribution).lambda
    }
}

