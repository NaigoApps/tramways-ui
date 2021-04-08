import React, {useState} from "react";
import {ButtonGroup, IconButton} from "@material-ui/core";
import {Add, Delete, Search} from "@material-ui/icons"
import ConfigurationSelectionDialog
  from "../../configurations/properties/ConfigurationSelectionDialog";
import Button from "@material-ui/core/Button";
import PropertyInput from "../../configurations/properties/inputs/PropertyInput";
import PropertyEditorDialog from "../../configurations/properties/editors/PropertyEditorDialog";
import {Configurable, ItemConfiguration, Property} from "../../../api/generated/projects";
import {configurableProps} from "./roadmap-utils";

export interface ConfigurableEditorProps<C extends Configurable> {
  element: C;
  onChange: (element: C) => void;
}

export default function ConfigurableEditor<C extends Configurable>({
                                                                     element, onChange
                                                                   }: ConfigurableEditorProps<C>) {

  // const {configurationsApi} = useContext(ApiContext);

  const [presets, setPresets] = useState<Array<ItemConfiguration>>([]);

  const [showConfigurations, setShowConfigurations] = useState(false);
  const [creatingProp, setCreatingProp] = useState(false);

  // useEffect(() => {
  //     if (element?.category) {
  //         configurationsApi.getConfigurations(element.category)
  //             .then(response => setPresets(response.data));
  //     }
  // }, [configurationsApi, element]);

  let suggestedProps = presets.flatMap(conf => conf.props || []);

  suggestedProps = suggestedProps
  .filter((prop, i) => suggestedProps.findIndex(p => p?.name === prop?.name) === i);

  function addNewProp(prop: Property) {
    onChange({
      ...element,
      props: configurableProps(element).concat([prop])
    });
    setCreatingProp(false);
  }

  function updateProp(index: number, prop: Property) {
    const oldProps = configurableProps(element);
    onChange({
      ...element,
      props: oldProps.slice(0, index).concat([prop]).concat(oldProps.slice(index + 1, oldProps.length))
    });
  }

  function deleteProp(index: number) {
    const oldProps = configurableProps(element);
    onChange({
      ...element,
      props: oldProps.slice(0, index).concat(oldProps.slice(index + 1, oldProps.length))
    });
  }

  function applyConfiguration(conf: ItemConfiguration | null) {
    setShowConfigurations(false);

    let newProps = [...configurableProps(element)];
    const confProps = conf?.props || [];
    confProps.forEach(prop => {
      const index = newProps.findIndex(p => p.name === prop.name);
      if (index >= 0) {
        newProps = newProps.slice(0, index).concat([prop]).concat(newProps.slice(index + 1, newProps.length));
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
    {configurableProps(element).map((prop, index) => (
        <div key={prop.name || "" + index} className={"flex-row justify-space-between"}>
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
            suggestions={suggestedProps || []}
            onOk={addNewProp}
            onCancel={() => setCreatingProp(false)}
            visible={creatingProp}/>
    )}
  </div>
}
