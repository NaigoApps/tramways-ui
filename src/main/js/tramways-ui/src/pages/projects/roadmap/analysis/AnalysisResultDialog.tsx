import {Dialog, DialogContent, IconButton, Toolbar} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";
import AnalysisResultComponent from "./result/AnalysisResultComponent";
import {Analysis} from "@tramways/analysis-service-api";

interface AnalysisResultDialogProps {
    analysis: Analysis;
    onClose: () => void;
}

export default function AnalysisResultDialog(
    {analysis, onClose}: AnalysisResultDialogProps
) {

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
