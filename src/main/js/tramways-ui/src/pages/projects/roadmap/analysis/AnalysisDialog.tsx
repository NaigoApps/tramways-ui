import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import React, {useCallback, useContext, useEffect, useState} from "react";
import ApiContext from "../../../../ApiContext";
import {AnalysisType, Property} from "@tramways/analysis-service-api";
import PropertyInput from "../../../configurations/properties/inputs/PropertyInput";

export interface AnalysisDialogProps {
    visible: boolean;
    onClose: () => void;
    analysis: AnalysisType;
    projectId: string;
    mapId: string;
}

export default function AnalysisDialog(
    {
        visible,
        onClose,
        analysis,
        projectId,
        mapId
    }: AnalysisDialogProps
) {

    const {analysisApi} = useContext(ApiContext);

    const [parameters, setParameters] = useState<Array<Property>>([]);
    const [warnings, setWarnings] = useState<Array<string>>([]);

    const launchAnalysis = useCallback((params) => {
        analysisApi.launchAnalysis({
            analysisTypeId: analysis.id,
            projectId: projectId,
            mapId: mapId,
            parameters: params
        }).then(response => {
            if (response.data.parameters) {
                setParameters(response.data.parameters);
            }
            if (response.data.warnings) {
                setWarnings(response.data.warnings);
            }
            if (response.data.ok) {
                onClose();
            }
        });
    }, [projectId, mapId, analysis.id, analysisApi, onClose]);

    useEffect(() => launchAnalysis([]), [launchAnalysis]);

    function updateParameter(prop: Property) {
        setParameters(oldParameters => {
            const index = oldParameters.findIndex(p => p.name === prop.name);
            return oldParameters.slice(0, index)
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
