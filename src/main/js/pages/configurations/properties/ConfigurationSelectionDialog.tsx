import React, {useState} from "react";
import {ItemConfiguration} from "../../../api/generated";
import {OkCancelDialog} from "../../../widgets/OkCancelDialog";
import {FormControlLabel, Radio, RadioGroup} from "@material-ui/core";

export interface ConfigurationSelectionDialogProps {
    configurations: ItemConfiguration[];
    onCancel: () => void;
    onOk: (c: ItemConfiguration) => void;
}

export default function ConfigurationSelectionDialog({configurations, onOk, onCancel}: ConfigurationSelectionDialogProps) {

    const [selectedConfiguration, setSelectedConfiguration] = useState<string>(null);

    function findSelectedConfiguration() {
        const conf = configurations.find(c => c.uuid === selectedConfiguration);
        onOk(conf);
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
