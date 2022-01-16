import {
    AppBar,
    Button,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography
} from "@material-ui/core";
import GroupIcon from "@material-ui/icons/Group";
import MenuIcon from "@material-ui/icons/Menu";
import SettingsIcon from "@material-ui/icons/Settings";
import TramIcon from "@material-ui/icons/Tram";
import {navigate, Router} from "@reach/router";
import React, {useContext, useEffect, useState} from "react";
import AppContext from "./AppContext";
import LoginPage from "./pages/LoginPage";
import UsersPage from "./pages/users/UsersPage";
import SessionContext from "./SessionContext";
import Alert from "./widgets/Alert";
import ApiContext from "./ApiContext";
import useStyles from "./utils/useStyles";
import {AccountCircle} from "@material-ui/icons";
import ProfilePage from "./pages/ProfilePage";
import ProjectsPage from "./pages/projects/ProjectsPage";
import ProjectPage from "./pages/projects/ProjectPage";
import RoadMapPage from "./pages/projects/RoadMapPage";
import {User, UserRole} from "@tramways/users-service-api";
import AnalysisListPage from "./pages/projects/roadmap/analysis/AnalysisListPage";

const Root = () => {
    const {
        error,
        clearError,
        message,
        clearMessage,
        loading,
        appBarTitle
    } = useContext(AppContext);

    const {updateToken} = useContext(ApiContext);
    const {user} = useContext(SessionContext);

    const classes = useStyles();

    const [showDrawer, setShowDrawer] = useState(false);

    function logout() {
        updateToken("");
    }

    useEffect(() => {
        if (message) {
            setTimeout(clearMessage, 2000);
        }
    }, [message, clearMessage])

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={() => setShowDrawer(true)}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.appBarTitle}>
                        {appBarTitle}
                    </Typography>
                    {!user && (
                        <Button color="inherit" onClick={() => navigate("/tramways/login")}>
                            Login
                        </Button>
                    )}
                    {user && (
                        <>
                            <IconButton
                                onClick={() => navigate("/tramways/profile")}
                                color="inherit">
                                <AccountCircle/>
                            </IconButton>
                            < Button color="inherit" onClick={logout}>
                                Logout
                            </Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>
            <Drawer open={showDrawer} onClose={() => setShowDrawer(false)}>
                <div
                    onClick={() => setShowDrawer(false)}
                    onKeyDown={() => setShowDrawer(false)}>
                    {navContent(user)}
                </div>
            </Drawer>
            {!user && !loading && (
                <Router basepath={"/tramways"}>
                    <LoginPage default/>
                </Router>
            )}
            {user && (
                <Router basepath={"/tramways"}>
                    <ProfilePage path="/profile" default/>
                    <ProjectsPage path="/projects"/>
                    <ProjectPage path="/projects/:projectId"/>
                    <RoadMapPage path="/projects/:projectId/:mapId"/>
                    <AnalysisListPage path="projects/:projectId/:mapId/analysis"/>

                    {/*<ConfigurationsPage path="/configurations"/>*/}
                    {/*<NewConfigurationPage path="configurations/new" />*/}
                    {/*<ConfigurationPage path="configurations/:confId" />*/}

                    <UsersPage path="/users"/>
                </Router>
            )}

            <Alert visible={!!error} onClose={clearError}>
                <Typography color="error">{error}</Typography>
            </Alert>

            <Alert visible={!!message}>
                <Typography>{message}</Typography>
            </Alert>
            {/* <header className="App-header">
        <XYChart id="test" data={[{ x: 0, y: 0 }, { x: 1, y: 1 }]} />
      </header> */}
        </div>
    );
};

function navContent(loggedUser: User | null) {

    const items = [];

    if (loggedUser && loggedUser.roles) {
        if (loggedUser.roles.find(r => r === UserRole.Client)) {
            items.push((
                <ListItem key={"projects"} button onClick={() => navigate("/tramways/projects")}>
                    <ListItemIcon>
                        <TramIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Projects"/>
                </ListItem>
            ));
        }
        if (loggedUser.roles.find(r => r === UserRole.Expert)) {
            items.push((
                <ListItem key={"configurations"} button onClick={() => navigate("/tramways/configurations")}>
                    <ListItemIcon>
                        <SettingsIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Configurations"/>
                </ListItem>
            ));
        }
        if (loggedUser.roles.find(r => r === UserRole.Admin)) {
            items.push((
                <ListItem key={"users"} button onClick={() => navigate("/tramways/users")}>
                    <ListItemIcon>
                        <GroupIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Users"/>
                </ListItem>
            ));
        }
    }
    return <List>
        {items}
    </List>
}


export default Root;
