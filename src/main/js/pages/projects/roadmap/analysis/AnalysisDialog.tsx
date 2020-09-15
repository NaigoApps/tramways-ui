import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography
} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import React, {useCallback, useContext, useEffect, useState} from "react";
import PropertyInput from "../../../configurations/properties/inputs/PropertyInput";
import {AnalysisType, Property} from "../../../../api/generated";
import ApiContext from "../../../../ApiContext";

export interface AnalysisDialogProps {
  visible: boolean;
  onClose: () => void;
  analysis: AnalysisType;
  projectId: string;
  mapId: string;
}

export default function AnalysisDialog({
                                         visible,
                                         onClose,
                                         analysis,
                                         projectId,
                                         mapId
                                       }: AnalysisDialogProps) {

  const {analysisApi} = useContext(ApiContext);

  const [parameters, setParameters] = useState<Array<Property>>([]);
  const [warnings, setWarnings] = useState([]);

  const launchAnalysis = useCallback((params) => {
    analysisApi.launchAnalysis({
      analysisTypeId: analysis.id,
      projectId: projectId,
      mapId: mapId,
      parameters: params
    }).then(response => {
      setParameters(response.data.parameters);
      setWarnings(response.data.warnings);
      if (response.data.ok) {
        onClose();
      }
    });
  }, [projectId, mapId, analysis.id, analysisApi, onClose]);

  useEffect(() => launchAnalysis([]), [launchAnalysis]);

  function updateParameter(prop: Property) {
    setParameters(oldParameters => {
      const index = oldParameters.findIndex(p => p.name === prop.name);
      return []
      .concat(oldParameters.slice(0, index))
      .concat([prop])
      .concat(oldParameters.slice(index + 1, oldParameters.length));
    });
  }

  return (
      <Dialog onClose={onClose} open={visible}>
        <DialogTitle>Provide following parameters</DialogTitle>
        <DialogContent>
          {warnings.map(warning => (
              <Typography key={warning} color={"error"}>{warning}</Typography>
          ))}
          {parameters?.filter(property => !property.valid)
          .map(parameter => (
              <div key={parameter.name}>
                <PropertyInput
                    property={parameter}
                    onChange={(prop) => {
                      updateParameter(prop);
                    }}
                />
              </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button
              variant="contained"
              color="primary"
              startIcon={<CheckIcon/>}
              onClick={() => launchAnalysis(parameters)}>
            Launch analysis
          </Button>
        </DialogActions>
      </Dialog>
  );
}
