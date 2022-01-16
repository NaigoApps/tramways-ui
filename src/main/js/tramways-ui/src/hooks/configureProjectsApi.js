import {Configuration, ProjectsApi} from "@tramways/projects-service-api";

export default function configureProjectsApi(config) {
    return new ProjectsApi(new Configuration(config));
}
