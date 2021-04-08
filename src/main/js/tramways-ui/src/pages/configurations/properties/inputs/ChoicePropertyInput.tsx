import React from "react";
import SelectEditor from "../../../../inputs/SelectEditor";
import {ChoiceElement, ChoiceProperty} from "../../../../api/generated/projects";

export interface ChoicePropertyInputProps {
  property: ChoiceProperty;
  onChange: (value: ChoiceProperty) => void
}

export default function ChoicePropertyInput({property, onChange}: ChoicePropertyInputProps) {

  function findValue() {
    return property?.choices?.find(prop => prop.id === property.value) || null;
  }

  return (
      <SelectEditor<ChoiceElement | null>
          optionId={option => option?.id || ""}
          optionLabel={option => option?.label || ""}
          options={property?.choices || []}
          value={findValue()}
          disabled={false}
          label={property?.description || ""}
          multiSelect={false}
          onSelectOption={v => onChange({
            ...property,
            value: v?.id
          })}>
      </SelectEditor>
  );
}
