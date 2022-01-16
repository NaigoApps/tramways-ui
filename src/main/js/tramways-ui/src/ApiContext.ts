import React from "react";
import {ProjectsApi} from "@tramways/projects-service-api";
import {UsersApi} from "@tramways/users-service-api";
import {AnalysisApi} from "@tramways/analysis-service-api";

type ApiContextType = {
    usersApi: UsersApi;
    projectsApi: ProjectsApi;
    // configurationsApi: ConfigurationsApi;
    analysisApi: AnalysisApi;

    updateToken: (token: string | undefined) => void
}

const ApiContext = React.createContext({} as ApiContextType);

export default ApiContext;
