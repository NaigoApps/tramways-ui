import React, {useState} from "react";
import {OkCancelDialog} from "../../../widgets/OkCancelDialog";
import {FormControlLabel, Radio, RadioGroup} from "@material-ui/core";
import {Property} from "@tramways/projects-service-api";

export interface PropertySelectionDialogProps {
  properties: Property[];
  onCancel: () => void;
  onOk: (p: Property | null) => void;
}

export default function PropertySelectionDialog(
    {
      properties,
      onOk,
      onCancel
    }: PropertySelectionDialogProps
) {

  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);

  function findSelectedProperty() {
    const prop = properties.find(p => p.name === selectedProperty) || null;
    onOk(prop);
  }

  return <OkCancelDialog visible={true} onCancel={onCancel} onOk={findSelectedProperty}>
    <RadioGroup
        value={selectedProperty}
        onChange={evt => setSelectedProperty(evt.target.value)}>
      {properties.map((p, index) => (
          <FormControlLabel
              key={p.name + "" + index}
              control={
                <Radio value={p.name}/>
              }
              label={p.name}
          />
      ))}
    </RadioGroup>
  </OkCancelDialog>
}
