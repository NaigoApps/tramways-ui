import {TextField} from "@material-ui/core";
import React, {useState} from "react";
import {OkCancelDialog} from "../../../widgets/OkCancelDialog";
import SelectEditor from "../../../inputs/SelectEditor";
import useStyles from "../../../utils/useStyles";
import {Lane, RelevantPoint, RoadMap} from "../../../api/generated/projects";
import {roadMapPoints} from "./roadmap-utils";

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

  const [source, setSource] = useState<string | null>(null);
  const [destination, setDestination] = useState<string | null>(null);

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
        <SelectEditor<string | null>
            options={roadMapPoints(roadMap).map(point => point.id || null)}
            value={source}
            label={"Source"}
            onSelectOption={v => setSource(v)}>
        </SelectEditor>
        <SelectEditor<string | null>
            options={roadMapPoints(roadMap).map(point => point.id || null)}
            value={destination}
            label={"Destination"}
            onSelectOption={v => setDestination(v)}>
        </SelectEditor>
      </OkCancelDialog>
  );
}
