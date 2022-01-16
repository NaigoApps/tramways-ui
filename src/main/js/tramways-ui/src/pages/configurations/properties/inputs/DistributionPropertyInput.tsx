import React from "react";
import UniformDistributionInput from "./distributions/UniformDistributionInput";
import ExponentialDistributionInput from "./distributions/ExponentialDistributionInput";
import {Distribution, DistributionProperty} from "@tramways/projects-service-api";

export interface DistributionPropertyInputProps {
    property: DistributionProperty;
    onChange: (prop: DistributionProperty) => void
}

export default function DistributionPropertyInput(
    {
        property,
        onChange
    }: DistributionPropertyInputProps
) {
    const componentMap = new Map<string, any>();
    componentMap.set("UniformDistribution", UniformDistributionInput);
    componentMap.set("ExponentialDistribution", ExponentialDistributionInput);

    let Component = property?.value?.distributionType && componentMap.get(property.value.distributionType);
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
