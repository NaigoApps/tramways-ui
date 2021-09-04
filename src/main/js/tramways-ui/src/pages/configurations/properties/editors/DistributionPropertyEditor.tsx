import React from "react";
import SelectEditor from "../../../../inputs/SelectEditor";
import DistributionPropertyInput from "../inputs/DistributionPropertyInput";
import {DistributionProperty} from "../../../../api/generated/projects";
import {
  newExponentialDistribution,
  newUniformDistribution
} from "../inputs/distributions/distribution-utils";
import {DistributionType} from "../../../../api/generated/analysis";

export interface DistributionPropertyEditorProps {
  property: DistributionProperty;
  onChange: (element: DistributionProperty) => void;
}

function distributionType(distributionType: string | undefined): DistributionType | null {
  let match = Object.values(DistributionType).filter(value => value === distributionType);
  return match.length > 0 ? match[0] : null;
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
        value={distributionType(property?.value?.distributionType)}
        label={"Type"}
        onSelectOption={chooseDistributionType}/>
    {property?.value && <DistributionPropertyInput property={property} onChange={onChange}/>}
  </div>
}
