import React from "react";
import SelectEditor from "../../../../inputs/SelectEditor";
import DistributionPropertyInput from "../inputs/DistributionPropertyInput";
import {DistributionProperty, DistributionType} from "../../../../api/generated/projects";
import {
  newExponentialDistribution,
  newUniformDistribution
} from "../inputs/distributions/distribution-utils";

export interface DistributionPropertyEditorProps {
  property: DistributionProperty;
  onChange: (element: DistributionProperty) => void;
}

export default function DistributionPropertyEditor(
    {
      property, onChange
    }: DistributionPropertyEditorProps
) {

  function chooseDistributionType(type: DistributionType | null) {
    let distribution;
    switch (type) {
      case DistributionType.Exponential:
        distribution = newExponentialDistribution();
        break;
      case DistributionType.Uniform:
      default:
        distribution = newUniformDistribution();
        break;
    }
    onChange({
      ...property,
      value: distribution
    });
  }

  return <div>
    <SelectEditor<DistributionType | null>
        options={Object.values(DistributionType)}
        value={property?.value?.distributionType || null}
        label={"Type"}
        onSelectOption={chooseDistributionType}/>
    {property?.value && <DistributionPropertyInput property={property} onChange={onChange}/>}
  </div>
}
