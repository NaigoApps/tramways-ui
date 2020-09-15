import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@material-ui/core";
import React, {FunctionComponent} from "react";

export type OkCancelDialogProps = {
    title?: string;
    valid?: boolean
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    visible: boolean;
    onCancel: () => void;
    onOk: () => void;
    cancelText?: string;
    okText?: string;
}

export const OkCancelDialog: FunctionComponent<OkCancelDialogProps> = (
    {
        title,
        valid = true,
        children,
        size,
        visible,
        onCancel,
        onOk,
        cancelText = "Cancel",
        okText = "Ok"
    }) => {

    return (
        <Dialog open={visible} onClose={onCancel} maxWidth={size} fullWidth={!!size}>
            {title && <DialogTitle>{title}</DialogTitle>}
            <DialogContent dividers={true}>{children}</DialogContent>
            <DialogActions>
                <Button color="primary" onClick={onCancel}>
                    {cancelText}
                </Button>
                <Button variant="contained" color="primary" onClick={onOk} disabled={!valid}>
                    {okText}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
