import React, {useEffect, useState} from "react";
import {OkCancelDialog} from "../../../widgets/OkCancelDialog";
import ConfigurableEditor from "./ConfigurableEditor";
import {Configurable} from "@tramways/projects-service-api";

export interface ConfigurableEditorDialogProps<C extends Configurable> {
  visible: boolean;
  element: C;
  onOk: (element: C) => void;
  onCancel: () => void;
}

export default function ConfigurableEditorDialog<C extends Configurable>(
    {
      visible,
      element,
      onOk,
      onCancel
    }: ConfigurableEditorDialogProps<C>
) {

  const [currentElement, setCurrentElement] = useState(element);

  useEffect(() => setCurrentElement(element), [element]);

  return <OkCancelDialog
      title={element.id + ' configuration'}
      size={"md"}
      visible={visible}
      onOk={() => onOk(currentElement)}
      onCancel={() => onCancel()}>
    <ConfigurableEditor element={currentElement} onChange={e => setCurrentElement(e)}/>
  </OkCancelDialog>
}
