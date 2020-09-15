import {TextField} from "@material-ui/core";
import React, {useState} from "react";
import {RelevantPoint} from "../../../api/generated";
import {OkCancelDialog} from "../../../widgets/OkCancelDialog";

export type NewNodeDialogProps = {
    visible: boolean;
    onCancel: () => void;
    onConfirm: (n : RelevantPoint) => void;
};

export default function NewNodeDialog({visible, onCancel, onConfirm}: NewNodeDialogProps) {

    const [nodeId, setNodeId] = useState("");

    function confirm() {
        const newNode = {
            id: nodeId,
            category: "RelevantPoint",
            configurableType: "RelevantPoint",
            props: [],
            links: []
        } as RelevantPoint;
        onConfirm(newNode);
    }

    return (
        <OkCancelDialog onOk={confirm} onCancel={onCancel} visible={visible}>
            <TextField
                variant={"outlined"}
                label="ID"
                onChange={evt => setNodeId(evt.target.value)}
                value={nodeId}
            />
        </OkCancelDialog>
    );
}
