import {Button, Card, CardActions, CardContent, Fab, Grid, Typography} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import React, {useCallback, useContext, useEffect, useState} from "react";
import useStyles from "../../utils/useStyles";
import Page from "../Page";
import {RouteComponentProps} from "@reach/router";
import ApiContext from "../../ApiContext";
import ProjectEditor from "./ProjectEditor";
import {Project, ProjectDescription} from "@tramways/projects-service-api";

export default function ProjectsPage({navigate}: RouteComponentProps) {
  const classes = useStyles();

  const {projectsApi} = useContext(ApiContext);

  const [projects, setProjects] = useState<ProjectDescription[]>([]);

  const loadProjects = useCallback(() => {
    projectsApi.getProjects().then(response => setProjects(response.data));
  }, [projectsApi]);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const [selectedProject, setSelectedProject] = useState<ProjectDescription | null>(null);

  function openProject(project: Project) {
    if (navigate && project.uuid) {
      navigate(project.uuid);
    }
  }

  function editProject(project: Project) {
    setSelectedProject(project);
  }

  function deleteProject(project: Project) {
    if (project.uuid) {
      projectsApi.deleteProject(project.uuid).then(() => loadProjects());
    }
  }

  if (!projects) {
    return null;
  }

  const renderRoadMaps = (project: Project) => {
    if (project.roadMaps) {
      project.roadMaps.map(map => (
          <Typography variant="h6">{map.name}</Typography>
      ));
    }
    return [];
  }

  return (
      <Page title="Projects">
        <Fab
            className={classes.fab}
            color="primary"
            onClick={() => setSelectedProject({name: ""})}>
          <AddIcon/>
        </Fab>
        <Grid container spacing={1}>
          {projects.map(project => (
              <Grid key={project?.uuid} item xs={4}>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography variant="h5">{project.name}</Typography>
                    {renderRoadMaps(project)}
                  </CardContent>
                  <CardActions>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => openProject(project)}>
                      Open
                    </Button>
                    <Button color="primary" onClick={() => editProject(project)}>
                      Edit
                    </Button>
                    <Button onClick={() => deleteProject(project)}>Delete</Button>
                  </CardActions>
                </Card>
              </Grid>
          ))}
        </Grid>
        {selectedProject && (
            <ProjectEditor
                project={selectedProject}
                onConfirm={() => {
                  setSelectedProject(null);
                  loadProjects();
                }}
                onAbort={() => setSelectedProject(null)}
            />
        )}
      </Page>
  );
}
