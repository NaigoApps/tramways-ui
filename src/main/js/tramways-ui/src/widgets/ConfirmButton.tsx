import React, {Fragment, FunctionComponent, useState} from 'react';
import {Button, ButtonProps} from '@material-ui/core';
import {OkCancelDialog} from "./OkCancelDialog";

type ConfirmButtonProps = ButtonProps & {
    confirmMessage: string,
    onClick: () => void
}

const ConfirmButton: FunctionComponent<ConfirmButtonProps> = ({
    confirmMessage,
    onClick,
    ...others
}) => {
    const [dialogVisible, setDialogVisible] = useState(false);

    return (
        <Fragment>
            <Button
                {...others}
                onClick={() => setDialogVisible(true)}
            />
            {confirmMessage && (
                <OkCancelDialog
                    onOk={() => {
                        setDialogVisible(false);
                        onClick();
                    }}
                    onCancel={() => setDialogVisible(false)}
                    visible={dialogVisible}
                >
                    <p>{confirmMessage}</p>
                </OkCancelDialog>
            )}
        </Fragment>
    );
};

export default ConfirmButton;
