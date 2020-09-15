import React, {useContext, useEffect, useState} from "react";
import {Avatar, Dialog, DialogTitle, List, ListItem, ListItemAvatar, ListItemText} from "@material-ui/core";
import BarChartIcon from "@material-ui/icons/BarChart";
import ApiContext from "../../../../ApiContext";
import {AnalysisType} from "../../../../api/generated";

export interface AvailableAnalysisDialogProps {
    visible: boolean;
    onClose: () => void;
    onChooseAnalysis: (id: AnalysisType) => void;
    projectId: string;
    mapId: string;
}

export default function AvailableAnalysisDialog({
    visible,
    onClose,
    onChooseAnalysis,
    projectId,
    mapId
}: AvailableAnalysisDialogProps) {
    const {analysisApi} = useContext(ApiContext);

    const [availableAnalysis, setAvailableAnalysis] = useState<AnalysisType[]>([]);

    useEffect(() => {
        if (projectId && mapId) {
            analysisApi.getAvailableAnalysis(projectId, mapId).then(response => {
                setAvailableAnalysis(response.data);
            });
        }
    }, [analysisApi, projectId, mapId]);

    return (
        <Dialog onClose={onClose} open={visible}>
            <DialogTitle>Choose analysis type</DialogTitle>
            <List>
                {availableAnalysis.map(type => (
                    <ListItem
                        key={type.id}
                        button
                        onClick={() => onChooseAnalysis(type)}>
                        <ListItemAvatar>
                            <Avatar>
                                <BarChartIcon/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={type.name}/>
                    </ListItem>
                ))}
            </List>
        </Dialog>
    );
}
