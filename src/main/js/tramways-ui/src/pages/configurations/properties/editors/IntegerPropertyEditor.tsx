import React from "react";
import IntegerPropertyInput from "../inputs/IntegerPropertyInput";
import {IntegerProperty} from "@tramways/projects-service-api";

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
