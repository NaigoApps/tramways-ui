import {Dialog, DialogContent, IconButton, Toolbar} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React, {useCallback, useContext, useEffect, useState} from "react";
import ApiContext from "../../../../ApiContext";
import {Analysis} from "../../../../api/generated";
import AnalysisResultComponent from "./result/AnalysisResultComponent";

interface AnalysisResultDialogProps {
  projectId: string;
  mapId: string;
  analysisId: string;
  onClose: () => void;
}

export default function AnalysisResultDialog(
    {projectId, mapId, analysisId, onClose}: AnalysisResultDialogProps
) {

  const {projectsApi} = useContext(ApiContext);

  const [analysis, setAnalysis] = useState<Analysis>(null);

  const loadAnalysis = useCallback(() => {
    projectsApi.getAnalysis(projectId, mapId, analysisId).then(response => {
      setAnalysis(response.data);
    })
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
          <AnalysisResultComponent name={analysis?.name} result={analysis?.result}/>
        </DialogContent>
      </Dialog>
  );
}
