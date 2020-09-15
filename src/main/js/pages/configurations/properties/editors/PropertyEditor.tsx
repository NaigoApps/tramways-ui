import React, {useState} from "react";
import {Property} from "../../../../api/generated";
import {IconButton, InputAdornment, TextField} from "@material-ui/core";
import useStyles from "../../../../utils/useStyles";
import {Search, Settings} from "@material-ui/icons";
import PropertySelectionDialog from "../PropertySelectionDialog";
import Alert from "../../../../widgets/Alert";
import {PropertyTypes} from "../inputs/PropertyTypes";
import SelectEditor from "../../../../inputs/SelectEditor";
import {
    newChoiceProperty,
    newDecimalProperty,
    newIntegerProperty,
    newStringProperty,
    newUniformDistributionProperty
} from "../properties-utils";
import ChoicePropertyContentEditor from "./ChoicePropertyEditor";
import DistributionPropertyEditor from "./DistributionPropertyEditor";
import IntegerPropertyEditor from "./IntegerPropertyEditor";
import DecimalPropertyEditor from "./DecimalPropertyEditor";
import StringPropertyEditor from "./StringPropertyEditor";

export interface PropertyEditorProps {
    property: Property;
    onChange: (prop: Property) => void,
    suggestions?: Property[]
}

const editorsMap = new Map<string, any>();
editorsMap.set(PropertyTypes.INTEGER, IntegerPropertyEditor);
editorsMap.set(PropertyTypes.DECIMAL, DecimalPropertyEditor);
editorsMap.set(PropertyTypes.STRING, StringPropertyEditor);
editorsMap.set(PropertyTypes.CHOICE, ChoicePropertyContentEditor);
editorsMap.set(PropertyTypes.DISTRIBUTION, DistributionPropertyEditor);

export default function PropertyEditor({property, onChange, suggestions = []}: PropertyEditorProps) {

    const [editValue, setEditValue] = useState(false);

    const {formControl} = useStyles();

    const [showSuggestions, setShowSuggestions] = useState(false);

    function selectSuggestion(prop: Property) {
        if (prop) {
            setShowSuggestions(false);
            onChange({
                ...prop
            });
        }
    }

    function changePropertyType(type: string) {
        switch (type) {
            case PropertyTypes.INTEGER:
                onChange(newIntegerProperty());
                break;
            case PropertyTypes.DECIMAL:
                onChange(newDecimalProperty());
                break;
            case PropertyTypes.CHOICE:
                onChange(newChoiceProperty());
                break;
            case PropertyTypes.DISTRIBUTION:
                onChange(newUniformDistributionProperty());
                break;
            case PropertyTypes.STRING:
            default:
                onChange(newStringProperty());
                break;
        }
    }

    let SpecificEditor = editorsMap.get(property.propertyType);
    if (!SpecificEditor) {
        SpecificEditor = () => <p>Unsupported</p>;
    }

    return <div className={"flex-row flex-grow justify-space-between"}>
        <SelectEditor<string>
            className={"flex-grow"}
            options={Object.values(PropertyTypes)}
            value={property && property.propertyType}
            label={"Property type"}
            onSelectOption={(type) => changePropertyType(type)}
        />
        <TextField
            className={formControl}
            label={"Name"}
            variant="outlined"
            value={property?.name || ''}
            onChange={evt => onChange({
                ...property,
                name: evt.target.value
            })}
            InputProps={{
                endAdornment: <InputAdornment position="end">
                    <IconButton onClick={() => setShowSuggestions(true)}>
                        <Search/>
                    </IconButton>
                </InputAdornment>
            }}
        />
        <IconButton onClick={() => setEditValue(true)}>
            <Settings/>
        </IconButton>
        <Alert
            title={property?.name + " content editing"}
            visible={editValue}
            onClose={() => setEditValue(false)}
            buttonColor={"default"}>
            <SpecificEditor property={property} onChange={onChange}/>
        </Alert>
        {showSuggestions && (
            <PropertySelectionDialog
                properties={suggestions}
                onOk={selectSuggestion}
                onCancel={() => setShowSuggestions(false)}
            />
        )}
    </div>;
}


