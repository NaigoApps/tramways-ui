import React from "react";
import {Distribution, DistributionProperty, DistributionType} from "../../../../api/generated";
import UniformDistributionInput from "./distributions/UniformDistributionInput";
import ExponentialDistributionInput from "./distributions/ExponentialDistributionInput";

export interface DistributionPropertyInputProps {
    property: DistributionProperty;
    onChange: (prop: DistributionProperty) => void
}

export default function DistributionPropertyInput({property, onChange}: DistributionPropertyInputProps) {
    const componentMap = new Map<string, any>();
    componentMap.set(DistributionType.UNIFORM, UniformDistributionInput);
    componentMap.set(DistributionType.EXPONENTIAL, ExponentialDistributionInput);

    let Component = componentMap.get(property.value.distributionType);
    if (!Component) {
        Component = () => <p>Unsupported</p>;
    }

    function onChangeDistribution(d: Distribution) {
        onChange({
            ...property,
            value: d
        })
    }

    return <Component distribution={property.value} onChange={onChangeDistribution}/>;
}
