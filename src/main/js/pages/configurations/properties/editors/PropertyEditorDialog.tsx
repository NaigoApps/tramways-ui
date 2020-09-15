import React, {useState} from "react";
import {OkCancelDialog} from "../../../../widgets/OkCancelDialog";
import {Property} from "../../../../api/generated";
import {newStringProperty} from "../properties-utils";
import PropertyEditor from "./PropertyEditor";

export type PropertyEditorDialogProps = {
    suggestions?: Array<Property>;
    onOk: (value: Property) => void;
    onCancel: () => void;
    valid?: boolean
    large?: boolean;
    visible: boolean;
    cancelText?: string;
    okText?: string;
};

export default function PropertyEditorDialog({
    suggestions = [],
    visible,
    onCancel,
    onOk
}: PropertyEditorDialogProps) {

    const [value, setValue] = useState<Property>(newStringProperty());

    return (
        <OkCancelDialog
            title={"Property creation"}
            visible={visible}
            onCancel={onCancel}
            onOk={() => {
                onOk(value);
                setValue(newStringProperty());
            }}>
            <PropertyEditor property={value} onChange={v => setValue(v)} suggestions={suggestions}/>
        </OkCancelDialog>
    );
};
