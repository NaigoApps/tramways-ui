import React from 'react';
import {StringAnalysisResult} from "../../../../../api/generated";

interface StringAnalysisResultComponentProps {
  result: StringAnalysisResult;
}

export default function StringAnalysisResultComponent({result}: StringAnalysisResultComponentProps) {
  return <p>{result.message}</p>;
}
