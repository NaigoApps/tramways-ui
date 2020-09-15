import {Avatar, Button, Dialog, DialogActions, DialogContent, ListItemAvatar, ListItemText} from "@material-ui/core";
import React, {useState} from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import {Add} from "@material-ui/icons";
import {Lane, RelevantPoint, RoadMap} from "../../../api/generated";
import NewNodeDialog from "./NewNodeDialog";
import NewLaneDialog from "./NewLaneDialog";
import {createDecimal} from "../../configurations/properties/properties-utils";

export interface RoadMapMenuProps {
    roadMap: RoadMap;
    visible: boolean;
    onClose: () => void;
    onCreateNode: (n: RelevantPoint) => void;
    onCreateLane: (l: Lane) => void;
    x: number;
    y: number;
}

export default function RoadMapMenu({
    roadMap,
    onClose,
    onCreateNode,
    onCreateLane,
    x, y,
    visible
}: RoadMapMenuProps) {

    const [showNewNodeDialog, setShowNewNodeDialog] = useState(false);
    const [showNewLaneDialog, setShowNewLaneDialog] = useState(false);

    return (
        <Dialog onClose={onClose} open={visible}>
            <DialogContent>
                <List>
                    <ListItem
                        button
                        onClick={() => setShowNewNodeDialog(true)}>
                        <ListItemAvatar>
                            <Avatar><Add/></Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Nuovo nodo"/>
                    </ListItem>
                    <ListItem
                        button
                        onClick={() => setShowNewLaneDialog(true)}>
                        <ListItemAvatar>
                            <Avatar><Add/></Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Nuovo collegamento"/>
                    </ListItem>
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => onClose()}>
                    Close
                </Button>
            </DialogActions>
            {showNewNodeDialog && (
                <NewNodeDialog
                    visible={showNewNodeDialog}
                    onCancel={() => setShowNewNodeDialog(false)}
                    onConfirm={node =>
                        onCreateNode({
                            ...node,
                            props: [
                                ...node.props,
                                createDecimal("x", x),
                                createDecimal("y", y),
                            ]
                        })
                    }/>
            )}
            {showNewLaneDialog && (
                <NewLaneDialog
                    roadMap={roadMap}
                    visible={showNewLaneDialog}
                    onCancel={() => setShowNewLaneDialog(false)}
                    onConfirm={lane => onCreateLane(lane)}/>
            )}
        </Dialog>
    );

}
