import React from "react";
import TextField from "@material-ui/core/TextField";
import {UniformDistribution} from "../../../../../api/generated";
import useStyles from "../../../../../utils/useStyles";

export interface UniformDistributionPropertyInputProps {
    distribution: UniformDistribution;
    onChange: (value: UniformDistribution) => void
}

export default function UniformDistributionInput({distribution, onChange}: UniformDistributionPropertyInputProps) {
    const classes = useStyles();
    return (
        <div className={"flex-row"}>
            <TextField
                type={"number"}
                className={classes.formControl}
                label={"Min"}
                variant="outlined"
                value={distribution?.left || 0}
                onChange={evt => onChange({
                    ...distribution,
                    left: parseFloat(evt.target.value)
                })}
            />
            <TextField
                type={"number"}
                className={classes.formControl}
                label={"Max"}
                variant="outlined"
                value={distribution?.right || 0}
                onChange={evt => onChange({
                    ...distribution,
                    right: parseFloat(evt.target.value)
                })}
            />
        </div>
    );
}
