import {TextField} from "@material-ui/core";
import React from "react";
import useStyles from "../../../../utils/useStyles";
import {StringProperty} from "../../../../api/generated";

export interface StringPropertyInputProps {
    property: StringProperty;
    onChange: (value: StringProperty) => void
}

export default function StringPropertyInput({property, onChange}: StringPropertyInputProps) {
    const classes = useStyles();

    return (
        <TextField
            className={classes.formControl}
            label={property?.description || "Value"}
            variant="outlined"
            value={property?.value || ''}
            onChange={evt => onChange({
                ...property,
                value: evt.target.value
            })}
        />
    );
}
