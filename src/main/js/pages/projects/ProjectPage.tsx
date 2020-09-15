import React, {useCallback, useContext, useEffect, useState} from "react";
import Page from "../Page";
import RoadMapItem from "./RoadMapItem";
import {Fab, Grid} from "@material-ui/core";
import {RouteComponentProps} from "@reach/router";
import {Project, RoadMap} from "../../api/generated";
import ApiContext from "../../ApiContext";
import AddIcon from "@material-ui/icons/Add";
import useStyles from "../../utils/useStyles";
import RoadMapEditor from "./roadmap/RoadMapEditor";

interface ProjectPageProps extends RouteComponentProps {
    projectId?: string;
}

export default function ProjectPage({navigate, projectId}: ProjectPageProps) {

    const classes = useStyles();
    const {projectsApi} = useContext(ApiContext);

    const [project, setProject] = useState<Project>(null);

    const [selectedMap, setSelectedMap] = useState<RoadMap>(null);

    const loadProject = useCallback(() => {
        projectsApi.getProject(projectId).then(response => setProject(response.data));
    }, [projectId, projectsApi]);

    useEffect(() => {
        loadProject();
    }, [loadProject]);

    return (
        <Page title={`Project ${project?.name}`}>
            <Fab
                className={classes.fab}
                color="primary"
                onClick={() => setSelectedMap({
                    name: "",
                    content: {
                        lanes: [],
                        points: []
                    }
                })}>
                <AddIcon/>
            </Fab>
            <Grid container spacing={1}>
                {project?.roadMaps
                    .map(map => (
                        <Grid key={map.uuid} item xs={4}>
                            <RoadMapItem
                                project={project}
                                map={map}
                                refresh={loadProject}
                                navigate={navigate}
                            />
                        </Grid>
                    ))}
            </Grid>
            {selectedMap && (
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
