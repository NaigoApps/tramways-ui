import {TextField} from "@material-ui/core";
import React from "react";
import useStyles from "../../../../utils/useStyles";
import {IntegerProperty} from "../../../../api/generated";

export interface IntegerPropertyInputProps {
    property: IntegerProperty;
    onChange: (value: IntegerProperty) => void
}

export default function IntegerPropertyInput({property, onChange}: IntegerPropertyInputProps) {
    const classes = useStyles();
    return (
        <TextField
            type={"number"}
            className={classes.formControl}
            label={property?.description || "Value"}
            variant="outlined"
            value={property?.value || 0}
            onChange={evt => onChange({
                ...property,
                value: parseInt(evt.target.value)
            })}
        />
    );
}
