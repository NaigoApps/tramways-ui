import {TextField} from "@material-ui/core";
import React, {useState} from "react";
import {Lane, RelevantPoint, RoadMap} from "../../../api/generated";
import {OkCancelDialog} from "../../../widgets/OkCancelDialog";
import SelectEditor from "../../../inputs/SelectEditor";
import useStyles from "../../../utils/useStyles";

export type NewLaneDialogProps = {
    roadMap: RoadMap;
    visible: boolean;
    onCancel: () => void;
    onConfirm: (n: RelevantPoint) => void;
};

export default function NewLaneDialog({
    roadMap,
    visible,
    onCancel,
    onConfirm
}: NewLaneDialogProps) {

    const {formControl} = useStyles();

    const [laneId, setLaneId] = useState("");

    const [source, setSource] = useState<string>(null);
    const [destination, setDestination] = useState<string>(null);

    function confirm() {
        const newLane = {
            id: laneId,
            category: "Lane",
            configurableType: "Lane",
            props: [],
            sourceId: source,
            destinationId: destination
        } as Lane;
        onConfirm(newLane);
    }

    return (
        <OkCancelDialog
            onOk={confirm}
            onCancel={onCancel}
            valid={!!(laneId && source && destination && source !== destination)}
            visible={visible}>
            <TextField
                className={formControl}
                variant={"outlined"}
                label="ID"
                onChange={evt => setLaneId(evt.target.value)}
                value={laneId}
            />
            <SelectEditor<string>
                options={roadMap.content.points.map(point => point.id)}
                value={source}
                label={"Source"}
                onSelectOption={v => setSource(v)}>
            </SelectEditor>
            <SelectEditor<string>
                options={roadMap.content.points.map(point => point.id)}
                value={destination}
                label={"Destination"}
                onSelectOption={v => setDestination(v)}>
            </SelectEditor>
        </OkCancelDialog>
    );
}
