import {RelevantPoint, RoadMap} from "../../../api/generated";
import React, {useState} from "react";
import {OkCancelDialog} from "../../../widgets/OkCancelDialog";
import ConfigurableEditor from "./ConfigurableEditor";
import {ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, IconButton, Typography} from "@material-ui/core";
import {Delete, ExpandMore, Settings} from "@material-ui/icons";
import RelevantPointLinksEditor from "./RelevantPointLinksEditor";
import ConfigurableEditorDialog from "./ConfigurableEditorDialog";

export interface RelevantPointEditorDialogProps {
    roadMap: RoadMap;
    element: RelevantPoint;
    onOk: (element: RelevantPoint) => void;
    onDelete: () => void;
    onCancel: () => void;
}

export default function RelevantPointEditorDialog({
    roadMap,
    element: initialElement, onOk, onDelete, onCancel
}: RelevantPointEditorDialogProps) {

    const [editingConfiguration, setEditingConfiguration] = useState(false);

    const [element, setElement] = useState<RelevantPoint>(initialElement);

    return <OkCancelDialog onOk={() => onOk(element)} onCancel={onCancel} visible>
        <div className={"flex-row align-center"}>
            <Typography variant={"h5"}>Node {element.id}</Typography>
            <IconButton color={"primary"} onClick={() => setEditingConfiguration(true)}>
                <Settings/>
            </IconButton>
            <IconButton color={"primary"} onClick={() => onDelete()}>
                <Delete/>
            </IconButton>
        </div>
        <RelevantPointLinksEditor
            roadMap={roadMap}
            element={element}
            onChange={e => setElement(e)}/>
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
