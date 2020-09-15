import {CrossingLink, RelevantPoint, RoadMap} from "../../../api/generated";
import React, {useState} from "react";
import {IconButton, Typography} from "@material-ui/core";
import {Add, Delete} from "@material-ui/icons"
import SelectEditor from "../../../inputs/SelectEditor";
import TextField from "@material-ui/core/TextField";
import useStyles from "../../../utils/useStyles";
import CrossingLinkEditor from "./CrossingLinkEditor";

export interface RelevantPointLinksEditorProps {
    roadMap: RoadMap,
    element: RelevantPoint;
    onChange: (element: RelevantPoint) => void;
}

export default function RelevantPointLinksEditor({
    roadMap,
    element, onChange
}: RelevantPointLinksEditorProps) {

    const {formControl} = useStyles();

    const [newLink, setNewLink] = useState<CrossingLink>(createLink());

    const sources = roadMap.content.lanes
        .filter(lane => lane.destinationId === element.id)
        .map(lane => lane.id);

    const destinations = roadMap.content.lanes
        .filter(lane => lane.sourceId === element.id)
        .map(lane => lane.id);

    function addNewLink() {
        onChange({
            ...element,
            links: [
                ...element.links,
                newLink
            ]
        });
        setNewLink(createLink());
    }

    function updateLink(link: CrossingLink, index: number) {
        onChange({
            ...element,
            links: []
                .concat(element.links.slice(0, index))
                .concat([link])
                .concat(element.links.slice(index + 1, element.links.length))
        });
    }

    function deleteLink(index: number) {
        onChange({
            ...element,
            links: element.links.slice(0, index).concat(element.links.slice(index + 1, element.links.length))
        });
    }

    function isNewLinkValid() {
        return (newLink.destinationId || newLink.sourceId) && newLink.id && newLink.destinationId !== newLink.sourceId;
    }

    return <div>
        <Typography variant={"h6"}>New link</Typography>
        <div className={"flex-row justify-space-between"}>
            <TextField
                className={formControl}
                label={"ID"}
                variant="outlined"
                value={newLink.id || ''}
                onChange={evt => setNewLink({
                    ...newLink,
                    id: evt.target.value
                })}
            />
            <SelectEditor<string>
                options={sources}
                value={newLink.sourceId}
                label={"Source"}
                onSelectOption={v => setNewLink({
                    ...newLink,
                    sourceId: v
                })}>
            </SelectEditor>
            <SelectEditor<string>
                options={destinations}
                value={newLink.destinationId}
                label={"Destination"}
                onSelectOption={v => setNewLink({
                    ...newLink,
                    destinationId: v
                })}>
            </SelectEditor>
            <IconButton color={"primary"} onClick={addNewLink} disabled={!isNewLinkValid()}>
                <Add/>
            </IconButton>
        </div>
        <Typography variant={"h6"}>Existing links</Typography>
        {element.links.map((link, index) => (
            <div key={link.id + index} className={"flex-row justify-space-between"}>
                <CrossingLinkEditor
                    roadMap={roadMap}
                    onDelete={() => deleteLink(index)}
                    crossingLink={link}
                    relevantPoint={element}
                    onChange={link => updateLink(link, index)}
                />
            </div>
        ))}
    </div>
}

function createLink(): CrossingLink {
    return {
        id: null,
        configurableType: "CrossingLink",
        category: "CrossingLink",
        sourceId: null,
        destinationId: null,
        props: [],
    };
}
