import React from "react";
import {DistributionProperty, DistributionType} from "../../../../api/generated";
import {newExponentialDistribution, newUniformDistribution} from "../inputs/distributions/DistributionUtils";
import SelectEditor from "../../../../inputs/SelectEditor";
import DistributionPropertyInput from "../inputs/DistributionPropertyInput";
import IntegerPropertyInput from "../inputs/IntegerPropertyInput";

export interface DistributionPropertyEditorProps {
    property: DistributionProperty;
    onChange: (element: DistributionProperty) => void;
}

export default function DistributionPropertyEditor({
    property, onChange
}: DistributionPropertyEditorProps) {

    function chooseDistributionType(type: DistributionType) {
        let distribution;
        switch (type) {
            case DistributionType.EXPONENTIAL:
                distribution = newExponentialDistribution();
                break;
            case DistributionType.UNIFORM:
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
        <SelectEditor<DistributionType>
            options={Object.values(DistributionType)}
            value={property?.value?.distributionType}
            label={"Type"}
            onSelectOption={chooseDistributionType}/>
        {property?.value &&  <DistributionPropertyInput property={property} onChange={onChange}/>}
    </div>
}
