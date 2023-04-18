import { useCallback } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import {
  MonacoJsxSyntaxHighlight,
  getWorker,
} from 'monaco-jsx-syntax-highlight';

import formatCode from './helpers/formatCode';
import editorOptions from './helpers/editorOptions';
import './CodeEditor.css';

type CodeEditorProps = {
  input: string;
  onChange: (value: string | undefined) => void;
};

const CodeEditor = ({ input, onChange }: CodeEditorProps) => {
  const onMount = useCallback<OnMount>((editor, monaco) => {
    const monacoJsxSyntaxHighlight = new MonacoJsxSyntaxHighlight(
      getWorker(),
      monaco
    );

    const { highlighter, dispose } =
      monacoJsxSyntaxHighlight.highlighterBuilder({
        editor: editor,
      });
    highlighter();

    editor.onDidChangeModelContent(() => {
      highlighter();
    });

    return dispose;
  }, []);

  const onFormatClick = () => {
    onChange(formatCode(input));
  };

  return (
    <div
      className="is-relative"
      style={{ width: 'calc(100% - 10px)', height: '100%' }}
    >
      <button
        className="button button-format is-primary is-small"
        style={{
          position: 'absolute',
          right: 15,
          top: 7,
          zIndex: 1,
        }}
        onClick={onFormatClick}
      >
        Format
      </button>
      <Editor
        value={input}
        onChange={onChange}
        height="100%"
        defaultLanguage="javascript"
        path="file:///index.jsx"
        theme="vs-dark"
        options={editorOptions}
        onMount={onMount}
      />
    </div>
  );
};

export default CodeEditor;
