import React from "react";
import IntegerPropertyInput from "../inputs/IntegerPropertyInput";
import {IntegerProperty} from "../../../../api/generated/projects";

export interface IntegerPropertyEditorProps {
  property: IntegerProperty;
  onChange: (element: IntegerProperty) => void;
}

export default function IntegerPropertyEditor(
    {
      property, onChange
    }: IntegerPropertyEditorProps
) {

  return <IntegerPropertyInput property={property} onChange={onChange}/>;
}
