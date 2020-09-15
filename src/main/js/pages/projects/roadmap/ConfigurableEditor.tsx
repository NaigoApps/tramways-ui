import {Configurable, ItemConfiguration, Property} from "../../../api/generated";
import React, {useContext, useEffect, useState} from "react";
import {ButtonGroup, IconButton, Typography} from "@material-ui/core";
import PropertyEditor from "../../configurations/properties/editors/PropertyEditor";
import {Add, Delete, Search} from "@material-ui/icons"
import ApiContext from "../../../ApiContext";
import ConfigurationSelectionDialog from "../../configurations/properties/ConfigurationSelectionDialog";
import Button from "@material-ui/core/Button";
import PropertyInput from "../../configurations/properties/inputs/PropertyInput";
import {newStringProperty} from "../../configurations/properties/properties-utils";
import PropertyEditorDialog from "../../configurations/properties/editors/PropertyEditorDialog";

export interface ConfigurableEditorProps<C extends Configurable> {
    element: C;
    onChange: (element: C) => void;
}

export default function ConfigurableEditor<C extends Configurable>({
    element, onChange
}: ConfigurableEditorProps<C>) {

    const {configurationsApi} = useContext(ApiContext);

    const [presets, setPresets] = useState<Array<ItemConfiguration>>([]);

    const [showConfigurations, setShowConfigurations] = useState(false);
    const [creatingProp, setCreatingProp] = useState(false);

    useEffect(() => {
        if (element?.category) {
            configurationsApi.getConfigurations(element.category)
                .then(response => setPresets(response.data));
        }
    }, [configurationsApi, element]);

    let suggestedProps = presets
        .flatMap(conf => conf.props);

    suggestedProps = suggestedProps
        .filter((prop, i) => suggestedProps.findIndex(p => p.name === prop.name) === i);

    function addNewProp(prop: Property) {
        onChange({
            ...element,
            props: element.props.concat([prop])
        });
        setCreatingProp(false);
    }

    function updateProp(index: number, prop: Property) {
        onChange({
            ...element,
            props: []
                .concat(element.props.slice(0, index))
                .concat([prop])
                .concat(element.props.slice(index + 1, element.props.length))
        });
    }

    function deleteProp(index: number) {
        onChange({
            ...element,
            props: []
                .concat(element.props.slice(0, index))
                .concat(element.props.slice(index + 1, element.props.length))
        });
    }

    function applyConfiguration(conf: ItemConfiguration) {
        setShowConfigurations(false);

        let newProps = [...element.props];
        conf.props.forEach(prop => {
            const index = newProps.findIndex(p => p.name === prop.name);
            if (index >= 0) {
                newProps = []
                    .concat(newProps.slice(0, index))
                    .concat([prop])
                    .concat(newProps.slice(index + 1, newProps.length));
            } else {
                newProps = newProps.concat([prop]);
            }
        });

        onChange({
            ...element,
            props: newProps
        });
    }

    return <div>
        <div className={"flex-row justify-space-between"}>
            <ButtonGroup>
                <Button
                    color={"primary"}
                    variant={"outlined"}
                    onClick={() => setCreatingProp(true)}
                    endIcon={<Add/>}>
                    Add
                </Button>
                <Button
                    color={"primary"}
                    variant={"outlined"}
                    onClick={() => setShowConfigurations(true)}
                    endIcon={<Search/>}>
                    Add from preset
                </Button>
            </ButtonGroup>
        </div>
        {element.props.map((prop, index) => (
            <div key={prop.name + index} className={"flex-row justify-space-between"}>
                <PropertyInput property={prop} onChange={prop => updateProp(index, prop)}/>
                <IconButton color={"primary"} onClick={() => deleteProp(index)}>
                    <Delete/>
                </IconButton>
            </div>
        ))}
        {showConfigurations && (
            <ConfigurationSelectionDialog
                configurations={presets}
                onCancel={() => setShowConfigurations(false)}
                onOk={conf => applyConfiguration(conf)}
            />
        )}
        {creatingProp && (
            <PropertyEditorDialog
                suggestions={suggestedProps}
                onOk={addNewProp}
                onCancel={() => setCreatingProp(false)}
                visible={creatingProp}/>
        )}
    </div>
}
