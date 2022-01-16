import React from "react";
import StringAnalysisResultComponent from "./StringAnalysisResultComponent";
import XYAnalysisResultComponent from "./XYAnalysisResultComponent";
import {Analysis} from "@tramways/analysis-service-api";

export interface AnalysisResultComponentProps {
    analysis: Analysis | null
}

export default function AnalysisResultComponent({analysis}: AnalysisResultComponentProps) {
    const componentMap = new Map<string, any>();
    componentMap.set("StringAnalysisResult", StringAnalysisResultComponent);
    componentMap.set("XYAnalysisResult", XYAnalysisResultComponent);

    if (!analysis || !analysis.result?.resultType) {
        return null;
    }

    let Component = componentMap.get(analysis.result.resultType);
    if (!Component) {
        Component = () => <p>Unsupported</p>;
    }

    return <Component name={analysis.name} result={analysis.result}/>;
}
