import React from "react";
import TextField from "@material-ui/core/TextField";
import useStyles from "../../../../utils/useStyles";
import {DecimalProperty} from "../../../../api/generated";

export interface DecimalPropertyInputProps {
    property: DecimalProperty;
    onChange: (value: DecimalProperty) => void
}

export default function DecimalPropertyInput({property, onChange}: DecimalPropertyInputProps) {
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
                value: parseFloat(evt.target.value)
            })}
        />
    );
}
