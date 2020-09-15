import React from "react";
import {DecimalProperty} from "../../../../api/generated";
import DecimalPropertyInput from "../inputs/DecimalPropertyInput";

export interface DecimalPropertyEditorProps {
    property: DecimalProperty;
    onChange: (element: DecimalProperty) => void;
}

export default function DecimalPropertyEditor({
    property, onChange
}: DecimalPropertyEditorProps) {

    return <DecimalPropertyInput property={property} onChange={onChange}/>;
}
