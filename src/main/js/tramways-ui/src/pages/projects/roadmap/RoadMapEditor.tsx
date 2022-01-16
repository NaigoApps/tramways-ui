import {TextField} from "@material-ui/core";
import React, {useContext, useState} from "react";
import ApiContext from "../../../ApiContext";
import {OkCancelDialog} from "../../../widgets/OkCancelDialog";
import {RoadMap} from "@tramways/projects-service-api";

export type RoadMapEditorProps = {
  projectId: string
  map: RoadMap;
  onAbort: () => void;
  onConfirm: () => void;
};

export default function RoadMapEditor({projectId, map, onAbort, onConfirm}: RoadMapEditorProps) {
  const {projectsApi} = useContext(ApiContext);

  const [newName, setNewName] = useState(map.name);

  function confirm() {
    if (map.uuid) {
      projectsApi.updateMap(projectId, map.uuid, {
        map: {
          ...map,
          name: newName
        }
      }).then(onConfirm);
    } else {
      projectsApi.createMap(projectId, {
        map: {
          name: newName,
          points: [],
          lanes: []
        }
      }).then(onConfirm);
    }
  }

  return (
      <OkCancelDialog onOk={confirm} onCancel={onAbort} visible>
        <TextField
            variant={"outlined"}
            label="Map name"
            onChange={evt => setNewName(evt.target.value)}
            value={newName}
        />
      </OkCancelDialog>
  );
}
