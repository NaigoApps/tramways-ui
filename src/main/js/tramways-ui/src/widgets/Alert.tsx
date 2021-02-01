import {Button, Dialog, DialogActions, DialogContent, DialogTitle, PropTypes} from "@material-ui/core";
import React, {ReactNode} from "react";
import Color = PropTypes.Color;

type AlertProps = {
    title?: string;
    visible: boolean;
    onClose: () => void;
    children: ReactNode,
    buttonColor?: Color,
}

export default function Alert({title, visible, onClose, children, buttonColor = "secondary"}: AlertProps) {
    return (
        <Dialog open={visible} onClose={onClose}>
            {title && <DialogTitle>{title}</DialogTitle>}
            <DialogContent>{children}</DialogContent>
            <DialogActions>
                <Button variant="contained" color={buttonColor} onClick={onClose}>
                    Chiudi
                </Button>
            </DialogActions>
        </Dialog>
    );
}
