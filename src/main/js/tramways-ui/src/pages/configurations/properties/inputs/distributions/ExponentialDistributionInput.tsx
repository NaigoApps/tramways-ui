import React from "react";
import TextField from "@material-ui/core/TextField";
import useStyles from "../../../../../utils/useStyles";
import {ExponentialDistribution} from "../../../../../api/generated/projects";

export interface ExponentialDistributionPropertyInputProps {
    distribution: ExponentialDistribution;
    onChange: (value: ExponentialDistribution) => void
}

export default function ExponentialDistributionInput({distribution, onChange}: ExponentialDistributionPropertyInputProps) {
    const classes = useStyles();
    return (
        <TextField
            type={"number"}
            className={classes.formControl}
            label={"Lambda"}
            variant="outlined"
            value={distribution?.lambda || 0}
            onChange={evt => onChange({
                ...distribution,
                lambda: parseFloat(evt.target.value)
            })}
        />
    );
}
