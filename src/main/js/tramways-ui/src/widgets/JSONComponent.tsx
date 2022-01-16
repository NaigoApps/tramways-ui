import {Button} from "@material-ui/core";
import JSONEditor, {JSONEditorOptions} from 'jsoneditor';
import React, {FunctionComponent, useCallback, useEffect, useState} from "react";
import Alert from "./Alert";

type JSONComponentProps = {
  initialJSON: any;
  onChange: (json: any) => void;
  onClose: () => void;
  visible: boolean;
}

export const JSONComponent: FunctionComponent<JSONComponentProps> = ({
                                                                       initialJSON,
                                                                       onChange,
                                                                       onClose,
                                                                       visible
                                                                     }) => {
  const [options, ] = useState<JSONEditorOptions>({
    mode: "code",
  });

  const [error, setError] = useState("");

  const [editor, setEditor] = useState<JSONEditor>();

  const containerRef = useCallback(node => {
    if (node !== null) {
      setEditor(new JSONEditor(node, options));
    }
  }, [options]);

  useEffect(() => {
    if (editor) {
      editor.set(initialJSON);
    }
  }, [editor, initialJSON]);

  return (<>
        <div className={"jsoneditor-container"} ref={containerRef}>
        </div>
        {editor && (<Button
            variant="contained"
            color="primary"
            onClick={() => {
              try {
                onChange(editor.get());
              } catch (err) {
                setError("Map not valid");
              }
            }}>
          Save
        </Button>)}
        <Button onClick={onClose}>Close</Button>
        <Alert onClose={() => setError("")} visible={!!error}>
          <p>{error}</p>
        </Alert>
      </>
  );
}
;
