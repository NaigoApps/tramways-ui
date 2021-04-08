import React from "react";
import StringPropertyInput from "../inputs/StringPropertyInput";
import {StringProperty} from "../../../../api/generated/projects";

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
