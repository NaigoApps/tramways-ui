import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@material-ui/core";
import React, {useContext, useState} from "react";
import {User, UserRole} from "../../api/generated";
import ApiContext from "../../ApiContext";
import MultiSelectEditor from "../../inputs/MultiSelectEditor";
import AppContext from "../../AppContext";
import useStyles from "../../utils/useStyles";

type UserEditorProps = {
    user: User;
    onClose: () => void;
    onConfirm: () => void;
};

export default function UserEditor({user, onClose, onConfirm}: UserEditorProps) {
    const {usersApi} = useContext(ApiContext);
    const {notifyError} = useContext(AppContext);

    const [username, setUsername] = useState(user.username);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [userRoles, setUserRoles] = useState(user.roles);

    const classes = useStyles();

    function updateUser() {
        if (user.uuid) {
            usersApi.editRoles(user.uuid, userRoles)
                .then(onConfirm)
                .catch(err => {
                    notifyError(err.response.data);
                });
        } else if (password === confirmPassword) {
            usersApi.createUser({
                username: username,
                password: password,
                roles: userRoles
            }).then(onConfirm)
                .catch(err => notifyError(err.response.data));
        }
    }

    return <Dialog
        maxWidth={"sm"}
        fullWidth={true}
        onClose={onClose}
        open={!!user}>
        <DialogTitle>{user?.uuid ? `Edit user ${user?.username}` : "Create user"}</DialogTitle>
        <DialogContent>
            <div className={"flex-column"}>
                {!user?.uuid && (
                    <>
                        <TextField
                            className={classes.formControl}
                            variant="outlined"
                            label="Username"
                            value={username}
                            onChange={evt => setUsername(evt.target.value)}
                        />
                        <TextField
                            className={classes.formControl}
                            variant="outlined"
                            value={password}
                            label="Password"
                            onChange={evt => setPassword(evt.target.value)}
                            type="password"
                        />
                        <TextField
                            className={classes.formControl}
                            variant="outlined"
                            value={confirmPassword}
                            label="Confirm password"
                            onChange={evt => setConfirmPassword(evt.target.value)}
                            error={confirmPassword !== password}
                            helperText={
                                confirmPassword !== password && "Not matching passwords"
                            }
                            type="password"
                        />
                    </>
                )}
                <MultiSelectEditor<UserRole>
                    className={classes.formControl}
                    label="Roles"
                    options={Object.values(UserRole)}
                    optionId={o => o.toString()}
                    optionLabel={o => o.toString()}
                    value={userRoles}
                    onSelectOption={setUserRoles}
                    multiSelect
                />
            </div>
        </DialogContent>
        <DialogActions>
            <Button variant="contained" color="primary" onClick={updateUser}>
                Confirm
            </Button>
        </DialogActions>
    </Dialog>;
}
