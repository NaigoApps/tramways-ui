import {FormControl, FormControlProps, InputLabel, MenuItem, Select} from "@material-ui/core";
import React, {useEffect, useRef} from "react";
import useStyles from "../utils/useStyles";

type SelectEditorProps<T> = {
    optionId?: (option: T) => string;
    optionLabel?: (option: T) => string;
    options: T[];
    value: T;
    label: string;
    multiSelect?: boolean;
    onSelectOption: (option: T) => void;
} & FormControlProps;

export default function SelectEditor<T>({
    optionId = o => o as unknown as string,
    optionLabel = o => o as unknown as string,
    options,
    value,
    className,
    label,
    multiSelect = false,
    onSelectOption,
}: SelectEditorProps<T>) {

    const {formControl} = useStyles();

    const inputLabel = useRef<HTMLLabelElement>(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    useEffect(() => {
        setLabelWidth(inputLabel.current ? (inputLabel.current as HTMLLabelElement).offsetWidth : 0);
    }, []);

    const formClass = className ? `${formControl} ${className}` : formControl ;

    return (
        <FormControl variant="outlined" className={formClass}>
            <InputLabel ref={inputLabel}>{label}</InputLabel>
            <Select
                MenuProps={{
                    anchorOrigin: {
                        horizontal: "left",
                        vertical: "bottom"
                    },
                    transformOrigin: {
                        horizontal: "left",
                        vertical: "top"
                    },
                    getContentAnchorEl: null
                }}
                multiple={multiSelect}
                onChange={evt => onSelectOption(evt.target.value ? evt.target.value as T : null)}
                value={value || ""}
                labelWidth={labelWidth}>
                {options.map(option => (
                    <MenuItem key={optionId(option)} value={option as any}>
                        {optionLabel(option)}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};
