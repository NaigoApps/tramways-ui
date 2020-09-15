import React from "react";
import {Button, Card, CardActions, CardContent} from "@material-ui/core";
import {AnalysisDescription} from "../../../../api/generated";

interface AnalysisComponentProps {
  analysis: AnalysisDescription;
  onSelectAnalysis: () => void;
  onDeleteAnalysis: () => void;
}

export default function AnalysisComponent(
    {
      analysis,
      onSelectAnalysis,
      onDeleteAnalysis
    }: AnalysisComponentProps
) {
  return (
      <Card>
        <CardContent>
          <p>{analysis?.name}</p>
          <p>{analysis?.status}</p>
        </CardContent>
        <CardActions>
          <Button
              variant="contained"
              color="primary"
              onClick={onSelectAnalysis}>
            Open
          </Button>
          <Button onClick={onDeleteAnalysis}>Delete</Button>
        </CardActions>
      </Card>
  );
}
