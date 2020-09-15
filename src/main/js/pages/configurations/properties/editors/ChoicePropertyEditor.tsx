import React, {useState} from "react";
import {IconButton, TextField, Typography} from "@material-ui/core";
import {Add, Delete} from "@material-ui/icons"
import {ChoiceElement, ChoiceProperty} from "../../../../api/generated";
import useStyles from "../../../../utils/useStyles";
import ChoicePropertyInput from "../inputs/ChoicePropertyInput";

export interface ChoicePropertyEditorProps {
    property: ChoiceProperty;
    onChange: (element: ChoiceProperty) => void;
}

export default function ChoicePropertyEditor({
    property, onChange
}: ChoicePropertyEditorProps) {

    const classes = useStyles();

    const [newItem, setNewItem] = useState<ChoiceElement>({id: "", label: ""});

    function addNewItem() {
        onChange({
            ...property,
            choices: property.choices.concat([newItem])
        });
        setNewItem({id: "", label: ""});
    }

    function updateItem(index: number, item: ChoiceElement) {
        onChange({
            ...property,
            choices: []
                .concat(property.choices.slice(0, index))
                .concat([item])
                .concat(property.choices.slice(index + 1, property.choices.length))
        });
    }

    function deleteItem(index: number) {
        onChange({
            ...property,
            choices: []
                .concat(property.choices.slice(0, index))
                .concat(property.choices.slice(index + 1, property.choices.length))
        });
    }

    return <div>
        <Typography variant={"h6"}>New item</Typography>
        <div className={"flex-row justify-space-between"}>
            <TextField
                className={classes.formControl}
                label={"ID"}
                variant="outlined"
                value={newItem.id}
                onChange={evt => setNewItem({
                    ...newItem,
                    id: evt.target.value
                })}
            />
            <TextField
                className={classes.formControl}
                label={"Label"}
                variant="outlined"
                value={newItem.label}
                onChange={evt => setNewItem({
                    ...newItem,
                    label: evt.target.value
                })}
            />
            <IconButton color={"primary"} onClick={addNewItem}>
                <Add/>
            </IconButton>
        </div>
        <Typography variant={"h6"}>Existing choices</Typography>
        {property.choices.map((choice, index) => (
            <div key={choice.id + index} className={"flex-row justify-space-between"}>
                <TextField
                    className={classes.formControl}
                    label={"ID"}
                    variant="outlined"
                    value={choice.id}
                    onChange={evt => updateItem(index, {
                        ...choice,
                        id: evt.target.value
                    })}
                />
                <TextField
                    className={classes.formControl}
                    label={"Label"}
                    variant="outlined"
                    value={choice.label}
                    onChange={evt => updateItem(index, {
                        ...choice,
                        label: evt.target.value
                    })}
                />
                <IconButton color={"primary"} onClick={() => deleteItem(index)}>
                    <Delete/>
                </IconButton>
            </div>
        ))}

        <ChoicePropertyInput property={property} onChange={onChange}/>
    </div>
}
