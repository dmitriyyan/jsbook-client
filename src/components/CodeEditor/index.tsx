import { useCallback } from 'react';
import { Editor, OnMount } from '@monaco-editor/react';

import formatCode from './helpers/formatCode';
import activateMonacoJSXHighlighter from './helpers/activateMonacoJSXHighlighter';
import editorOptions from './helpers/editorOptions';

type CodeEditorProps = {
  input: string;
  onChange: (value: string | undefined) => void;
};

const CodeEditor = ({ input, onChange }: CodeEditorProps) => {
  const onFormatClick = () => {
    onChange(formatCode(input));
  };

  const onMount = useCallback<OnMount>((editor, monaco) => {
    activateMonacoJSXHighlighter(editor, monaco);
  }, []);

  return (
    <div className="is-relative">
      <button
        className="button button-format is-primary is-small"
        style={{
          position: 'absolute',
          right: 10,
          top: 10,
          zIndex: 20,
        }}
        onClick={onFormatClick}
      >
        Format
      </button>
      <Editor
        value={input}
        onChange={onChange}
        height="500px"
        defaultLanguage="javascript"
        theme="vs-dark"
        options={editorOptions}
        onMount={onMount}
      />
    </div>
  );
};

export default CodeEditor;
