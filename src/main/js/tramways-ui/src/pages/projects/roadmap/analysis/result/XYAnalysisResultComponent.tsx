import React, {useCallback, useEffect} from 'react';
import {Chart} from "chart.js";
import {XYAnalysisResult} from "@tramways/analysis-service-api";

interface XYAnalysisResultComponentProps {
    name: string;
    result: XYAnalysisResult;
}

export default function XYAnalysisResultComponent({name, result}: XYAnalysisResultComponentProps) {

    const updateChart = useCallback(() => {
        if (!result) {
            return;
        }
        const canvas = document.getElementById('resultChart') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        const scatterChart = new Chart(ctx, {
            type: 'scatter',
            data: {
                datasets: [{
                    label: name,
                    data: result.points,
                    showLine: true
                }]
            },
            options: {
                scales: {
                    xAxes: {
                        type: 'linear',
                        position: 'bottom'
                    }
                }
            }
        });
    }, [name, result]);

    useEffect(() => updateChart(), [updateChart]);

    return <div className="chart-container">
        <canvas id="resultChart"/>
    </div>;
}
