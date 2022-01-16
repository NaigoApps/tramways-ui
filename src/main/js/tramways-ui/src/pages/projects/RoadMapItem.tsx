import {Button, Card, CardActions, CardContent, TextField, Typography} from "@material-ui/core";
import React, {useContext, useEffect, useRef, useState} from "react";
import useStyles from "../../utils/useStyles";
import {RouteComponentProps} from "@reach/router";
import ApiContext from "../../ApiContext";
import {OkCancelDialog} from "../../widgets/OkCancelDialog";
import {Project, RoadMapDescription} from "@tramways/projects-service-api";

interface RoadMapItemProps extends RouteComponentProps {
  project: Project;
  map: RoadMapDescription;
  refresh: () => void;
}

export default function RoadMapItem({project, map, refresh, navigate}: RoadMapItemProps) {
  const {projectsApi} = useContext(ApiContext);
  const classes = useStyles();

  const cloneMapNameInput = useRef<HTMLInputElement>(null);

  function openMap() {
    if (navigate && map.uuid) {
      navigate(map.uuid);
    }
  }

  const [isShowCloneDialog, setShowCloneDialog] = useState(false);
  const [cloneMapName, setCloneMapName] = useState("");

  const showCloneDialog = () => {
    if (map && map.name) {
      setShowCloneDialog(true);
      setCloneMapName(map.name);
    }
  };

  const hideCloneDialog = () => setShowCloneDialog(false);

  useEffect(() => {
    if (isShowCloneDialog) {
      cloneMapNameInput?.current?.focus();
    }
  }, [isShowCloneDialog]);

  async function deleteMap() {
    if (project && project.uuid && map && map.uuid) {
      projectsApi.deleteMap(project.uuid, map.uuid).then(() => refresh());
    }
  }

  async function cloneMap() {
    if (project && project.uuid) {
      projectsApi.createMap(project.uuid, {
        map: {
          ...map,
          name: cloneMapName
        }
      }).then(() => {
        setCloneMapName("");
        hideCloneDialog();
        refresh()
      });
    }
  }

  return (
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5">{map.name}</Typography>
          {/* <Typography variant="body1">{`Entrances: ${map.stats.sources}`}</Typography>
        <Typography variant="body1">{`Crossings: ${map.stats.crossings}`}</Typography>
        <Typography variant="body1">{`Exits: ${map.stats.segments}`}</Typography> */}
        </CardContent>
        <CardActions>
          <Button variant="contained" color="primary" onClick={() => openMap()}>
            Open
          </Button>
          <Button variant="outlined" color="primary" onClick={showCloneDialog}>
            Duplicate
          </Button>
          <Button onClick={() => deleteMap()}>Delete</Button>
        </CardActions>
        <OkCancelDialog
            visible={isShowCloneDialog}
            onCancel={hideCloneDialog}
            onOk={cloneMap}>
          <TextField
              variant="outlined"
              ref={cloneMapNameInput}
              label="New map name"
              value={cloneMapName}
              onChange={evt => setCloneMapName(evt.target.value)}
          />
        </OkCancelDialog>
      </Card>
  );
}
