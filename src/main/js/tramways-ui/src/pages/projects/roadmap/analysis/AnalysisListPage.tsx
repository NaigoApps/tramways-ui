import React, {useCallback, useContext, useEffect, useState} from "react";
import AnalysisComponent from "./AnalysisComponent";
import Page from "../../../Page";
import {Grid} from "@material-ui/core";
import {RouteComponentProps} from "@reach/router";
import ApiContext from "../../../../ApiContext";
import {RoadMap} from "@tramways/projects-service-api";
import {AnalysisDescription} from "@tramways/analysis-service-api";

export interface AnalysisListPageProps extends RouteComponentProps {
    projectId?: string;
    mapId?: string;
}

export default function AnalysisListPage({navigate, projectId, mapId}: AnalysisListPageProps) {

    const {projectsApi, analysisApi} = useContext(ApiContext);

    const [map, setMap] = useState<RoadMap | null>(null);

    const [mapAnalysis, setMapAnalysis] = useState<AnalysisDescription[]>([]);

    const loadAnalysis = useCallback(() => {
        if (projectId && mapId) {
            analysisApi.getMapAnalysis(projectId, mapId).then(response => {
                setMapAnalysis(response.data);
            })
            projectsApi.getMap(projectId, mapId).then(response => {
                setMap(response.data);
            })
        }
    }, [projectId, mapId, projectsApi, analysisApi]);

    function deleteAnalysis(a: AnalysisDescription) {
        if (projectId && mapId && a.uuid) {
            analysisApi.deleteAnalysis(a.uuid).then(() => loadAnalysis());
        }
    }

    useEffect(() => loadAnalysis(), [loadAnalysis]);

    function setSelectedAnalysis(analysis: AnalysisDescription) {
        if (navigate && analysis.uuid) {
            navigate(analysis.uuid);
        }
    }

    return (
        <Page title={`Analysis of ${map?.name}`}>
            <Grid container spacing={1}>
                {mapAnalysis.map(a => (
                    <Grid key={a.uuid} item xs={4}>
                        <AnalysisComponent
                            analysis={a}
                            onSelectAnalysis={() => setSelectedAnalysis(a)}
                            onDeleteAnalysis={() => deleteAnalysis(a)}
                        />
                    </Grid>
                ))}
            </Grid>
        </Page>
    );
}
