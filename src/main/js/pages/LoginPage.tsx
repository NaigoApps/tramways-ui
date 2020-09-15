import {Button, FormControl, TextField} from "@material-ui/core";
import React, {useContext, useState} from "react";
import SessionContext from "../SessionContext";
import Page from "./Page";
import useStyles from "../utils/useStyles";
import CheckIcon from "@material-ui/icons/Check";
import {RouteComponentProps} from "@reach/router";
import ApiContext from "../ApiContext";
import AppContext from "../AppContext";

export default function LoginPage({navigate}: RouteComponentProps) {
    const {defaultApi, updateToken} = useContext(ApiContext);
    const {notifyError} = useContext(AppContext);

    const classes = useStyles();

    const {refreshUser} = useContext(SessionContext);

    const [username, setUser] = useState("");
    const [password, setPassword] = useState("");

    async function login() {
        defaultApi.login({
            username, password
        }).then(response => {
            updateToken(response.headers.authorization.substring(6));
            navigate("/profile");
        }).catch(err => notifyError(err.response.data));
    }

    return (
        <Page title="Login">
            <div className={classes.centerContent}>
                <div>
                    <TextField
                        className={classes.formControl}
                        variant="outlined"
                        label="Username"
                        value={username}
                        onChange={evt => setUser(evt.target.value)}
                    />
                </div>
                <div>
                    <TextField
                        variant="outlined"
                        className={classes.formControl}
                        value={password}
                        label="Password"
                        onChange={evt => setPassword(evt.target.value)}
                        type="password"
                    />
                </div>
                <div>
                    <FormControl className={classes.formControl}>
                        <Button
                            startIcon={<CheckIcon/>}
                            variant="contained"
                            color="primary"
                            onClick={login}>
                            Submit
                        </Button>
                    </FormControl>
                </div>
            </div>
        </Page>
    );
}
