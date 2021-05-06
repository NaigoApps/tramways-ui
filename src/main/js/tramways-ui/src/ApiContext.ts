import React from "react";
import {UsersApi} from './api/generated/users';
import {ProjectsApi} from "./api/generated/projects";
import {AnalysisApi} from "./api/generated/analysis";

type ApiContextType = {
    usersApi: UsersApi;
    projectsApi: ProjectsApi;
    // configurationsApi: ConfigurationsApi;
    analysisApi: AnalysisApi;

    updateToken: (token: string | undefined) => void
}

const ApiContext = React.createContext({} as ApiContextType);

export default ApiContext;
