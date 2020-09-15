import React, {useCallback, useContext, useEffect, useState} from "react";
import AnalysisComponent from "./AnalysisComponent";
import Page from "../../../Page";
import {Grid} from "@material-ui/core";
import {RouteComponentProps} from "@reach/router";
import ApiContext from "../../../../ApiContext";
import {AnalysisDescription, RoadMap} from "../../../../api/generated";
import AnalysisResultDialog from "./AnalysisResultDialog";

export interface AnalysisListPageProps extends RouteComponentProps {
  projectId?: string;
  mapId?: string;
}

export default function AnalysisListPage({navigate, projectId, mapId}: AnalysisListPageProps) {

  const {projectsApi} = useContext(ApiContext);

  const [map, setMap] = useState<RoadMap>(null);

  const loadAnalysis = useCallback(() => {
    projectsApi.getMap(projectId, mapId).then(response => {
      setMap(response.data);
    })
  }, [projectId, mapId, projectsApi]);

  function deleteAnalysis(a: AnalysisDescription) {
    projectsApi.deleteAnalysis(projectId, mapId, a.uuid).then(() => loadAnalysis());
  }

  useEffect(() => loadAnalysis(), [loadAnalysis]);

  const [selectedAnalysis, setSelectedAnalysis] = useState<AnalysisDescription>(null);

  return (
      <Page title={`Analysis of ${map?.name}`}>
        <Grid container spacing={1}>
          {map?.analysis.map(a => (
              <Grid key={a.uuid} item xs={4}>
                <AnalysisComponent
                    analysis={a}
                    onSelectAnalysis={() => setSelectedAnalysis(a)}
                    onDeleteAnalysis={() => deleteAnalysis(a)}
                />
              </Grid>
          ))}
        </Grid>
        {selectedAnalysis && (
            <AnalysisResultDialog
                projectId={projectId}
                mapId={mapId}
                analysisId={selectedAnalysis.uuid}
                onClose={() => setSelectedAnalysis(null)}
            />
        )}
      </Page>
  );
}
