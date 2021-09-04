import React from "react";
import UniformDistributionInput from "./distributions/UniformDistributionInput";
import ExponentialDistributionInput from "./distributions/ExponentialDistributionInput";
import {Distribution, DistributionProperty} from "../../../../api/generated/projects";
import {DistributionType} from "../../../../api/generated/analysis";

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
  const componentMap = new Map<DistributionType, any>();
  componentMap.set(DistributionType.Uniform, UniformDistributionInput);
  componentMap.set(DistributionType.Exponential, ExponentialDistributionInput);

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
