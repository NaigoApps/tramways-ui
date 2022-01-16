import React from "react";
import SelectEditor from "../../../../inputs/SelectEditor";
import DistributionPropertyInput from "../inputs/DistributionPropertyInput";
import {newExponentialDistribution, newUniformDistribution} from "../inputs/distributions/distribution-utils";
import {DistributionProperty} from "@tramways/projects-service-api";

export interface DistributionPropertyEditorProps {
    property: DistributionProperty;
    onChange: (element: DistributionProperty) => void;
}

export default function DistributionPropertyEditor(
    {
        property, onChange
    }: DistributionPropertyEditorProps
) {

    function chooseDistributionType(type: string | null) {
        let distribution;
        switch (type) {
            case "ExponentialDistribution":
                distribution = newExponentialDistribution();
                break;
            case "UniformDistribution":
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
        <SelectEditor<string | null>
            options={["UniformDistribution", "ExponentialDistribution"]}
            value={property?.value?.distributionType || null}
            label={"Type"}
            onSelectOption={chooseDistributionType}/>
        {property?.value && <DistributionPropertyInput property={property} onChange={onChange}/>}
    </div>
}
