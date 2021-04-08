import {Button, FormControl, TextField} from "@material-ui/core";
import React, {useContext, useState} from "react";
import Page from "./Page";
import useStyles from "../utils/useStyles";
import CheckIcon from "@material-ui/icons/Check";
import {RouteComponentProps} from "@reach/router";
import ApiContext from "../ApiContext";

export default function LoginPage({navigate}: RouteComponentProps) {
  const {usersApi, updateToken} = useContext(ApiContext);
  const classes = useStyles();
  const [username, setUser] = useState("");
  const [password, setPassword] = useState("");

  async function login() {
    usersApi.login({
      username, password
    }).then(response => {
      updateToken(response.data.value);
      if (navigate) {
        navigate("/tramways/profile");
      }
    });
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
