import {TextField} from "@material-ui/core";
import React, {useContext, useState} from "react";
import {ProjectDescription} from "../../api/generated";
import ApiContext from "../../ApiContext";
import {OkCancelDialog} from "../../widgets/OkCancelDialog";

export type ProjectEditorProps = {
    project: ProjectDescription;
    onAbort: () => void;
    onConfirm: () => void;
};

export default function ProjectEditor({project, onAbort, onConfirm}: ProjectEditorProps) {
    const {projectsApi} = useContext(ApiContext);

    const [newName, setNewName] = useState(project.name);

    function confirm() {
        if (project.uuid) {
            projectsApi.updateProject(project.uuid, {
                name: newName
            }).then(onConfirm);
        } else {
            projectsApi.createProject({
                name: newName
            }).then(onConfirm);
        }
    }

    return (
        <OkCancelDialog onOk={confirm} onCancel={onAbort} visible>
            <TextField
                variant={"outlined"}
                label="Project name"
                onChange={evt => setNewName(evt.target.value)}
                value={newName}
            />
        </OkCancelDialog>
    );
}
