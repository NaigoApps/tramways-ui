import React from "react";
import StringPropertyInput from "../inputs/StringPropertyInput";
import {StringProperty} from "@tramways/projects-service-api";

export interface StringPropertyEditorProps {
  property: StringProperty;
  onChange: (element: StringProperty) => void;
}

export default function StringPropertyEditor(
    {
      property, onChange
    }: StringPropertyEditorProps
) {
  return <StringPropertyInput property={property} onChange={onChange}/>;
}
