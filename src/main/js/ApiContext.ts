import React from "react";
import {AnalysisApi, ConfigurationsApi, DefaultApi, ProjectsApi, UsersApi} from "./api/generated";

type ApiContext = {
    defaultApi: DefaultApi;
    usersApi: UsersApi;
    projectsApi: ProjectsApi;
    configurationsApi: ConfigurationsApi;
    analysisApi: AnalysisApi;

    updateToken: (token: string) => void
}

const ApiContext = React.createContext({} as ApiContext);

export default ApiContext;
