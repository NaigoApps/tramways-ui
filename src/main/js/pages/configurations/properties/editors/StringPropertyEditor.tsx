import React from "react";
import {StringProperty} from "../../../../api/generated";
import StringPropertyInput from "../inputs/StringPropertyInput";

export interface StringPropertyEditorProps {
    property: StringProperty;
    onChange: (element: StringProperty) => void;
}

export default function StringPropertyEditor({
    property, onChange
}: StringPropertyEditorProps) {
    return <StringPropertyInput property={property} onChange={onChange}/>;
}
