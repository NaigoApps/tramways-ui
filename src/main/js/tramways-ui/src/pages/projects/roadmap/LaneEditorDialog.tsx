import React, {useState} from "react";
import {OkCancelDialog} from "../../../widgets/OkCancelDialog";
import {IconButton, Typography} from "@material-ui/core";
import {Delete, Settings} from "@material-ui/icons";
import SelectEditor from "../../../inputs/SelectEditor";
import ConfigurableEditorDialog from "./ConfigurableEditorDialog";
import {Lane, RoadMap} from "@tramways/projects-service-api";
import {roadMapPoints} from "./roadmap-utils";

export interface LaneEditorDialogProps {
  roadMap: RoadMap,
  element: Lane;
  onOk: (element: Lane) => void;
  onDelete: () => void;
  onCancel: () => void;
}

export default function LaneEditorDialog(
    {
      roadMap,
      element: initialElement,
      onOk,
      onDelete,
      onCancel
    }: LaneEditorDialogProps
) {

  const [editingConfiguration, setEditingConfiguration] = useState(false);

  const [element, setElement] = useState<Lane>(initialElement);

  return <OkCancelDialog onOk={() => onOk(element)} onCancel={onCancel} visible>
    <div className={"flex-row align-center"}>
      <Typography variant={"h5"}>Lane {element.id}</Typography>
      <IconButton color={"primary"} onClick={() => setEditingConfiguration(true)}>
        <Settings/>
      </IconButton>
      <IconButton color={"primary"} onClick={() => onDelete()}>
        <Delete/>
      </IconButton>
    </div>
    <div className={"flex-row"}>
      <SelectEditor<string | undefined>
          options={roadMapPoints(roadMap).map(point => point.id)}
          value={element.sourceId}
          label={"Source"}
          onSelectOption={v => setElement({
            ...element,
            sourceId: v || ""
          })}>
      </SelectEditor>
      <SelectEditor<string | undefined>
          options={roadMapPoints(roadMap).map(point => point.id)}
          value={element.destinationId}
          label={"Destination"}
          onSelectOption={v => setElement({
            ...element,
            destinationId: v || ""
          })}>
      </SelectEditor>
    </div>
    <ConfigurableEditorDialog
        visible={editingConfiguration}
        element={element}
        onOk={(result) => {
          setElement(result);
          setEditingConfiguration(false)
        }}
        onCancel={() => setEditingConfiguration(false)}/>
  </OkCancelDialog>
}
