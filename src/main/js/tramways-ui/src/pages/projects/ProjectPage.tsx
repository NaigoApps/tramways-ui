import React, {useCallback, useContext, useEffect, useState} from "react";
import Page from "../Page";
import RoadMapItem from "./RoadMapItem";
import {Fab, Grid} from "@material-ui/core";
import {RouteComponentProps} from "@reach/router";
import ApiContext from "../../ApiContext";
import AddIcon from "@material-ui/icons/Add";
import useStyles from "../../utils/useStyles";
import RoadMapEditor from "./roadmap/RoadMapEditor";
import {Project, RoadMap} from "@tramways/projects-service-api";

interface ProjectPageProps extends RouteComponentProps {
  projectId?: string;
}

export default function ProjectPage({navigate, projectId}: ProjectPageProps) {

  const classes = useStyles();
  const {projectsApi} = useContext(ApiContext);

  const [project, setProject] = useState<Project | null>(null);

  const [selectedMap, setSelectedMap] = useState<RoadMap | null>(null);

  const loadProject = useCallback(() => {
    if (projectId) {
      projectsApi.getProject(projectId).then(response => setProject(response.data));
    }
  }, [projectId, projectsApi]);

  useEffect(() => {
    loadProject();
  }, [loadProject]);

  const roadmaps: JSX.Element[] = [];
  if (project && project.roadMaps) {
    project.roadMaps.forEach(roadMap => roadmaps.push(
        (
            <Grid key={roadMap.uuid} item xs={12} sm={6} md={4} lg={3} xl={3}>
              <RoadMapItem
                  project={project}
                  map={roadMap}
                  refresh={loadProject}
                  navigate={navigate}
              />
            </Grid>
        )
    ))
  }

  return (
      <Page title={`Project ${project?.name}`}>
        <Fab
            className={classes.fab}
            color="primary"
            onClick={() => setSelectedMap({
              name: "",
              lanes: [],
              points: []
            })}>
          <AddIcon/>
        </Fab>
        <Grid container spacing={1}>
          {roadmaps}
        </Grid>
        {projectId && selectedMap && (
            <RoadMapEditor
                projectId={projectId}
                map={selectedMap}
                onConfirm={() => {
                  setSelectedMap(null);
                  loadProject();
                }}
                onAbort={() => setSelectedMap(null)}
            />
        )}
      </Page>
  );
}
