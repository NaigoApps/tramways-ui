import {CrossingLink, RelevantPoint, RoadMap} from "../../../api/generated";
import React, {useEffect, useState} from "react";
import {IconButton, Typography} from "@material-ui/core";
import {Delete, Settings} from "@material-ui/icons";
import SelectEditor from "../../../inputs/SelectEditor";
import ConfigurableEditorDialog from "./ConfigurableEditorDialog";

export interface CrossingLinkEditorProps {
    roadMap: RoadMap,
    relevantPoint: RelevantPoint
    crossingLink: CrossingLink;
    onChange: (element: CrossingLink) => void;
    onDelete: () => void;
}

export default function CrossingLinkEditor({
    roadMap,
    relevantPoint,
    onChange,
    crossingLink,
    onDelete,
}: CrossingLinkEditorProps) {

    const [editingLink, setEditingLink] = useState(false);

    const sources = roadMap.content.lanes
        .filter(lane => lane.destinationId === relevantPoint.id)
        .map(lane => lane.id);
    const destinations = roadMap.content.lanes
        .filter(lane => lane.sourceId === relevantPoint.id)
        .map(lane => lane.id);

    return <div className={"flex-row align-center flex-grow justify-space-between"}>
        <Typography className={"flex-grow"} variant={"h6"}>{crossingLink.id}</Typography>
        <SelectEditor<string>
            options={sources}
            value={crossingLink.sourceId}
            label={"Source"}
            onSelectOption={v => onChange({
                ...crossingLink,
                sourceId: v
            })}>
        </SelectEditor>
        <SelectEditor<string>
            options={destinations}
            value={crossingLink.destinationId}
            label={"Destination"}
            onSelectOption={v => onChange({
                ...crossingLink,
                destinationId: v
            })}>
        </SelectEditor>
        <IconButton color={"primary"} onClick={() => setEditingLink(true)}>
            <Settings/>
        </IconButton>
        <IconButton color={"primary"} onClick={() => onDelete()}>
            <Delete/>
        </IconButton>
        <ConfigurableEditorDialog
            visible={editingLink}
            element={crossingLink}
            onOk={link => {
                onChange(link);
                setEditingLink(false);
            }}
            onCancel={() => setEditingLink(false)}/>
    </div>
}
