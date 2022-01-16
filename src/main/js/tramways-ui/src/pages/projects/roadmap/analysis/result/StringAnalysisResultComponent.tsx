import React from 'react';
import {StringAnalysisResult} from "@tramways/analysis-service-api";

interface StringAnalysisResultComponentProps {
  result: StringAnalysisResult;
}

export default function StringAnalysisResultComponent({result}: StringAnalysisResultComponentProps) {
  return <p>{result.message}</p>;
}
