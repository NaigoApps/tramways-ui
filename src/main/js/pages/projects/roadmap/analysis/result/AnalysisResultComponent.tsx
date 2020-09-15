import React from "react";
import {AnalysisResult, AnalysisResultType} from "../../../../../api/generated";
import StringAnalysisResultComponent from "./StringAnalysisResultComponent";
import XYAnalysisResultComponent from "./XYAnalysisResultComponent";

export interface AnalysisResultComponentProps {
    name: string;
    result: AnalysisResult;
}

export default function AnalysisResultComponent({name, result}: AnalysisResultComponentProps) {
    const componentMap = new Map<string, any>();
    componentMap.set(AnalysisResultType.STRING, StringAnalysisResultComponent);
    componentMap.set(AnalysisResultType.XY, XYAnalysisResultComponent);

    if (!result) {
        return null;
    }

    let Component = componentMap.get(result.resultType);
    if (!Component) {
        Component = () => <p>Unsupported</p>;
    }

    return <Component name={name} result={result}/>;
}
