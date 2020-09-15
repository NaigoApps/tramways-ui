import {
    Button,
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    FormControl,
    TextField,
    Typography
} from "@material-ui/core";
import {ExpandMore} from "@material-ui/icons";
import React, {useContext, useState} from "react";
import AppContext from "../AppContext";
import {RouteComponentProps} from "@reach/router";
import SessionContext from "../SessionContext";
import ApiContext from "../ApiContext";
import Page from "./Page";

export default function ProfilePage({navigate}: RouteComponentProps) {

    const {usersApi} = useContext(ApiContext);
    const {notifyMessage, notifyError} = useContext(AppContext);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const {user} = useContext(SessionContext);

    async function changePassword() {
        if (newPassword === confirmPassword) {
            usersApi.editPassword(user.uuid, {oldPassword: oldPassword, newPassword: newPassword})
                .then(() => notifyMessage("Password changed successfully"))
                .catch(err => notifyError(err.response.data));
        }
    }

    return (
        <Page title={user.username + " profile"}>
            <Typography variant={"h2"}>Your profile</Typography>
            <ExpansionPanel>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMore/>}>
                    <Typography variant={"h6"}>Password change</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div className={"flex-column"}>
                        <div className={"spaced-top-10"}>
                            <TextField
                                type={"password"}
                                label="Old password"
                                variant={"outlined"}
                                onChange={evt => setOldPassword(evt.target.value)}
                                value={oldPassword}
                            />
                        </div>
                        <div className={"spaced-top-10"}>
                            <TextField
                                type={"password"}
                                label="New password"
                                variant={"outlined"}
                                onChange={evt => setNewPassword(evt.target.value)}
                                value={newPassword}
                            />
                        </div>
                        <div className={"spaced-top-10"}>
                            <TextField
                                type={"password"}
                                label="Confirm new password"
                                variant={"outlined"}
                                onChange={evt => setConfirmPassword(evt.target.value)}
                                value={confirmPassword}
                                error={newPassword !== confirmPassword}
                                helperText={newPassword !== confirmPassword && "Not matching passwords"}
                            />
                        </div>
                        <div className={"spaced-top-10"}>
                            <Button variant="contained" color="primary" onClick={changePassword}>
                                Change password
                            </Button>
                        </div>
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </Page>
    );
}
