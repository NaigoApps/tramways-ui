import {Dialog, DialogContent, IconButton, Toolbar} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React, {useCallback, useContext, useEffect, useState} from "react";
import ApiContext from "../../../../ApiContext";
import AnalysisResultComponent from "./result/AnalysisResultComponent";
import {Analysis} from "@tramways/analysis-service-api";

interface AnalysisResultDialogProps {
    projectId: string;
    mapId: string;
    analysisId: string;
    onClose: () => void;
}

export default function AnalysisResultDialog(
    {projectId, mapId, analysisId, onClose}: AnalysisResultDialogProps
) {

    const {projectsApi, analysisApi} = useContext(ApiContext);

    const [analysis, setAnalysis] = useState<Analysis | null>(null);

    const loadAnalysis = useCallback(() => {
        analysisApi.getAnalysis(projectId, mapId, analysisId).then(response => {
            setAnalysis(response.data);
        });
    }, [projectId, mapId, analysisId, projectsApi]);

    useEffect(() => loadAnalysis(), [loadAnalysis])

    return (
        <Dialog onClose={onClose} open={true} fullScreen>
            <Toolbar>
                <IconButton edge="start" onClick={onClose}>
                    <CloseIcon/>
                </IconButton>
            </Toolbar>
            <DialogContent>
                <AnalysisResultComponent analysis={analysis}/>
            </DialogContent>
        </Dialog>
    );
}
