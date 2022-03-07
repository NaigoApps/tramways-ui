import Page from "../../../Page";
import AnalysisResultDialog from "./AnalysisResultDialog";
import React, {useContext, useEffect, useState} from "react";
import ApiContext from "../../../../ApiContext";
import {RouteComponentProps} from "@reach/router";
import {Analysis} from "@tramways/analysis-service-api";
import {Button} from "@material-ui/core";
import PropertyEditor from "../../../configurations/properties/editors/PropertyEditor";
import {Property} from "@tramways/projects-service-api";

export interface AnalysisPageProps extends RouteComponentProps {
    analysisId?: string
}

export default function AnalysisPage({navigate, analysisId}: AnalysisPageProps) {

    const {analysisApi} = useContext(ApiContext);

    const [showResult, setShowResult] = useState(false);
    const [analysis, setAnalysis] = useState<Analysis | null>(null);

    useEffect(() => {
        if (analysisId) {
            analysisApi.getAnalysis(analysisId).then(response => {
                setAnalysis(response.data);
            });
        }
    }, [analysisId, analysisApi]);

    function updateAnalysisParameter(index: number, value: Property) {
        setAnalysis(old => {
            const params = analysis?.parameters || [];
            return {
                ...old,
                parameters: params.slice(0, index).concat([value]).concat(params.slice(index + 1, params.length))
            }
        });
    }

    return <Page title={"Analysis"}>
        {analysis && (
            <>
                <h1>{analysis.name}</h1>
                <p>Status: {analysis.status}</p>
                <p>Type: {analysis.analysisType}</p>
                {
                    analysis.parameters?.map((parameter, index) => (
                        <PropertyEditor property={parameter} onChange={value => updateAnalysisParameter(index, value)}/>
                    ))
                }
                <Button variant={"contained"} color={"primary"} onClick={() => setShowResult(true)}>Show result</Button>
            </>
        )}
        {analysis && showResult && (
            <AnalysisResultDialog
                analysis={analysis}
                onClose={() => setShowResult(false)}
            />
        )}
    </Page>
}
