import React from "react";
import DecimalPropertyInput from "../inputs/DecimalPropertyInput";
import {DecimalProperty} from "@tramways/projects-service-api";

export interface DecimalPropertyEditorProps {
    property: DecimalProperty;
    onChange: (element: DecimalProperty) => void;
}

export default function DecimalPropertyEditor({
    property, onChange
}: DecimalPropertyEditorProps) {

    return <DecimalPropertyInput property={property} onChange={onChange}/>;
}
