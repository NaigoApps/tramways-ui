import {Button, Card, CardActions, CardContent, Fab, Grid, Typography} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import React, {useCallback, useContext, useEffect, useState} from "react";
import useStyles from "../../utils/useStyles";
import Page from "../Page";
import ApiContext from "../../ApiContext";
import UserEditor from "./UserEditor";
import {User, UserRole} from "../../api/generated";
import {RouteComponentProps} from "@reach/router";
import AppContext from "../../AppContext";

export default function UsersPage(props: RouteComponentProps) {
    const {usersApi} = useContext(ApiContext);
    const {notifyError} = useContext(AppContext);
    const classes = useStyles();

    const [users, setUsers] = useState<User[]>([]);

    const loadUsers = useCallback(() => {
        usersApi.getUsers().then(response => setUsers(response.data));
    }, [usersApi]);

    useEffect(() => {
        loadUsers();
    }, [loadUsers]);

    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    function createUser() {
        setSelectedUser({
            username: "",
            roles: [UserRole.CLIENT]
        });
    }

    function deleteUser(id: string | undefined) {
        if (id) {
            usersApi.deleteUser(id)
                .then(() => loadUsers())
                .catch(err => notifyError(err.response.data));
        }
    }

    return (
        <Page title="Users">
            <Fab
                color="primary"
                aria-label="add"
                className={classes.fab}
                onClick={createUser}>
                <AddIcon/>
            </Fab>
            <Grid container spacing={1}>
                {users && users.map(user => (
                    <Grid
                        key={user.uuid}
                        item xs={4}>
                        <Card className={classes.card}>
                            <CardContent>
                                <Typography variant="h5">{user.username}</Typography>
                                <Typography variant="h6">
                                    {`Roles: ${user && user.roles && user.roles.join(", ")}`}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={() => setSelectedUser(user)}>
                                    Edit
                                </Button>
                                <Button color="primary" onClick={() => deleteUser(user.uuid)}>
                                    Delete
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            {selectedUser && <UserEditor
                user={selectedUser}
                onClose={() => setSelectedUser(null)}
                onConfirm={() => {
                    setSelectedUser(null);
                    loadUsers();
                }}/>
            }
        </Page>
    );
}
