import React, {useCallback, useEffect, useState} from 'react';
import Root from "./Root";
import AppContext from "./AppContext";
import ApiContext from "./ApiContext";
import {Configuration, User, UsersApi} from "./api/generated/users";
import Cookies from "js-cookie";
import SessionContext from "./SessionContext";
import registerInterceptors from "./utils/errors-interceptor";
import {ProjectsApi} from "./api/generated/projects";
import {AnalysisApi} from "./api/generated/analysis";

export default function App() {

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(0);
  const [appBarTitle, setAppBarTitle] = useState("");

  const clearError = useCallback(() => setError(""), []);
  const notifyError = useCallback(err => setError(err), []);
  const notifyMessage = useCallback(msg => setMessage(msg), []);
  const clearMessage = useCallback(() => setMessage(""), []);
  const stopLoading = useCallback(() => setLoading(nLoading => nLoading - 1), []);
  const startLoading = useCallback(() => setLoading(nLoading => nLoading + 1), []);

  const [token, setToken] = useState(Cookies.get('authorization'));
  const [loggedUser, setLoggedUser] = useState<User | null>(null);

  registerInterceptors(notifyError, notifyMessage);

  const config = {
    accessToken: token,
    basePath: 'http://localhost:8762/tramways/rest'
  };
  const [usersApi, setUsersApi] = useState(new UsersApi(new Configuration(config)));
  const [projectsApi, setProjectsApi] = useState(new ProjectsApi(new Configuration(config)));
  // const [configurationsApi, setConfigurationApi] = useState(new ConfigurationsApi(new Configuration(config)));
  const [analysisApi, setAnalysisApi] = useState(new AnalysisApi(new Configuration(config)));

  const [loaded, setLoaded] = useState(false);

  const refreshLoggedUser = useCallback(() => {
    usersApi.logged()
    .then(response => setLoggedUser(response.data))
    .catch(() => setLoggedUser(null))
    .then(() => setLoaded(true));
  }, [usersApi]);

  const updateToken = useCallback((newToken) => {
    setToken(newToken);
    Cookies.set("authorization", newToken);

    const newConfig = {
      accessToken: newToken,
      basePath: 'http://localhost:8762/tramways/rest'
    };
    setUsersApi(new UsersApi(new Configuration(newConfig)));
    setProjectsApi(new ProjectsApi(new Configuration(newConfig)));
    // setConfigurationApi(new ConfigurationsApi(new Configuration(newConfig)));
    setAnalysisApi(new AnalysisApi(new Configuration(newConfig)));
  }, []);

  useEffect(() => {
    refreshLoggedUser();
  }, [refreshLoggedUser]);

  if (!loaded) {
    return <div/>;
  }

  return <AppContext.Provider value={{
    error,
    notifyError,
    clearError,
    message,
    notifyMessage,
    clearMessage,
    loading,
    startLoading,
    stopLoading,
    appBarTitle,
    setAppBarTitle
  }}>
    <ApiContext.Provider value={{
      usersApi,
      projectsApi,
      // configurationsApi,
      analysisApi,
      updateToken,
    }}>
      <SessionContext.Provider value={{
        user: loggedUser,
        refreshUser: refreshLoggedUser
      }}>
        <Root/>
      </SessionContext.Provider>
    </ApiContext.Provider>
  </AppContext.Provider>
}
