import {AnalysisApi, Configuration} from "@tramways/analysis-service-api";

export default function configureAnalysisApi(config) {
    return new AnalysisApi(new Configuration(config));
}
