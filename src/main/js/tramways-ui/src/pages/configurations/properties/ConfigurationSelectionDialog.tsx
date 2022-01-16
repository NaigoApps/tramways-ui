import React, {useState} from "react";
import {OkCancelDialog} from "../../../widgets/OkCancelDialog";
import {FormControlLabel, Radio, RadioGroup} from "@material-ui/core";
import {ItemConfiguration} from "@tramways/projects-service-api";

export interface ConfigurationSelectionDialogProps {
  configurations: ItemConfiguration[];
  onCancel: () => void;
  onOk: (c: ItemConfiguration | null) => void;
}

export default function ConfigurationSelectionDialog(
    {
      configurations,
      onOk,
      onCancel
    }: ConfigurationSelectionDialogProps
) {

  const [selectedConfiguration, setSelectedConfiguration] = useState<string | null>(null);

  function findSelectedConfiguration() {
    const conf = configurations.find(c => c.uuid === selectedConfiguration);
    onOk(conf || null);
  }

  return <OkCancelDialog visible={true} onCancel={onCancel} onOk={findSelectedConfiguration}>
    <RadioGroup
        value={selectedConfiguration}
        onChange={evt => setSelectedConfiguration(evt.target.value)}>
      {configurations.map((c, index) => (
          <FormControlLabel
              key={c.uuid}
              control={
                <Radio value={c.uuid}/>
              }
              label={c.name}
          />
      ))}
    </RadioGroup>
  </OkCancelDialog>
}
