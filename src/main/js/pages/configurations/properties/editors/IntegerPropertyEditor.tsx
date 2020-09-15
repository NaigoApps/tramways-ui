import React from "react";
import {IntegerProperty} from "../../../../api/generated";
import IntegerPropertyInput from "../inputs/IntegerPropertyInput";

export interface IntegerPropertyEditorProps {
    property: IntegerProperty;
    onChange: (element: IntegerProperty) => void;
}

export default function IntegerPropertyEditor({
    property, onChange
}: IntegerPropertyEditorProps) {

    return <IntegerPropertyInput property={property} onChange={onChange}/>;
}
