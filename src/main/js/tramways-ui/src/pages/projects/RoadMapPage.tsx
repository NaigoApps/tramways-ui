import React, {useCallback, useContext, useEffect, useState} from "react";
import Page from "../Page";
import {RouteComponentProps} from "@reach/router";
import ApiContext from "../../ApiContext";
import {RoadMap} from "@tramways/projects-service-api";
import RoadMapComponent from "./RoadMapComponent";

interface RoadMapPageProps extends RouteComponentProps {
  projectId?: string;
  mapId?: string;
}

export default function RoadMapPage({navigate, projectId, mapId}: RoadMapPageProps) {

  const {projectsApi} = useContext(ApiContext);

  const [map, setMap] = useState<RoadMap | null>(null);

  const loadMap = useCallback(() => {
    if (projectId && mapId) {
      projectsApi.getMap(projectId, mapId).then(response => setMap(response.data));
    }
  }, [projectsApi, mapId, projectId]);

  useEffect(() => {
    loadMap();
  }, [loadMap]);

  if (!projectId || !map) {
    return <div/>;
  }

  return (
      <Page title={`Map ${map?.name}`}>
        <RoadMapComponent
            refresh={loadMap}
            projectId={projectId}
            roadMap={map}
            navigate={navigate}
        />
      </Page>
  );
}
