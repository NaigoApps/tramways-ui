import {Button, IconButton, TextField, Typography} from "@material-ui/core";
import React, {useContext, useEffect, useState} from "react";
import {ItemConfiguration, Property} from "../../api/generated";
import ApiContext from "../../ApiContext";
import {OkCancelDialog} from "../../widgets/OkCancelDialog";
import PropertyEditor from "./properties/editors/PropertyEditor";
import useStyles from "../../utils/useStyles";
import AddIcon from "@material-ui/icons/Add"
import DeleteIcon from "@material-ui/icons/Delete"
import PropertyEditorDialog from "./properties/editors/PropertyEditorDialog";

export type ConfigurationEditorProps = {
    category: string;
    configuration: ItemConfiguration;
    onAbort: () => void;
    onConfirm: () => void;
};

export default function ConfigurationEditor(
    {
        category,
        configuration,
        onAbort,
        onConfirm
    }: ConfigurationEditorProps) {
    const {configurationsApi} = useContext(ApiContext);
    const {formControl} = useStyles();

    const [suggestions, setSuggestions] = useState<Array<Property>>([]);
    useEffect(() => {
        configurationsApi.getPropertiesSuggestions(category).then(result => setSuggestions(result.data));
    }, [configurationsApi, category]);

    const [creatingProp, setCreatingProp] = useState(false);

    const [newName, setNewName] = useState(configuration.name);

    const [newProps, setNewProps] = useState<Array<Property>>(configuration.props);

    function confirm() {
        if (configuration.uuid) {
            configurationsApi.editConfiguration(configuration.uuid, {
                name: newName,
                props: newProps
            }).then(onConfirm);
        } else {
            configurationsApi.addConfiguration(category, {
                name: newName,
                props: newProps
            }).then(onConfirm);
        }
    }

    function addNewProp(value: Property) {
        setNewProps(oldProps => oldProps.concat([value]));
        setCreatingProp(false);
    }

    function updateProp(index: number, prop: Property) {
        setNewProps(oldProps => []
            .concat(oldProps.slice(0, index))
            .concat([prop])
            .concat(oldProps.slice(index + 1, oldProps.length)));
    }

    function deleteProp(index: number) {
        setNewProps(oldProps => []
            .concat(oldProps.slice(0, index))
            .concat(oldProps.slice(index + 1, oldProps.length)));
    }

    return (
        <OkCancelDialog onOk={confirm} onCancel={onAbort}
                        title={configuration?.uuid ? 'Configuration editing' : 'Configuration creation'}
                        visible>
            <div>
                <TextField
                    className={formControl}
                    variant={"outlined"}
                    label="Configuration name"
                    onChange={evt => setNewName(evt.target.value)}
                    value={newName}
                />
            </div>
            <div className={formControl}>
                <Button
                    color={"primary"}
                    variant={"outlined"}
                    endIcon={<AddIcon/>}
                    onClick={() => setCreatingProp(true)}>
                    Add property
                </Button>
            </div>
            {newProps.map((prop, index) => (
                <div key={prop.name + "-" + prop.propertyType} className={"flex-row justify-space-between"}>
                    <PropertyEditor property={prop} onChange={prop => updateProp(index, prop)}
                                    suggestions={suggestions}/>
                    <IconButton color={"primary"} onClick={() => deleteProp(index)}>
                        <DeleteIcon/>
                    </IconButton>
                </div>
            ))}
            <PropertyEditorDialog onOk={value => addNewProp(value)}
                                  onCancel={() => setCreatingProp(false)}
                                  suggestions={suggestions}
                                  visible={creatingProp}/>
        </OkCancelDialog>
    );
}
