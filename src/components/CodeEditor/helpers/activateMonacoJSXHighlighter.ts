import traverse from '@babel/traverse';
import { parse } from '@babel/parser';
import MonacoJSXHighlighter from 'monaco-jsx-highlighter';
import { OnMount } from '@monaco-editor/react';

const activateMonacoJSXHighlighter: OnMount = (monacoEditor, monaco) => {
  const monacoJSXHighlighter = new MonacoJSXHighlighter(
    monaco,
    parse,
    traverse,
    monacoEditor
  );

  monacoJSXHighlighter.highlightOnDidChangeModelContent();
  monacoJSXHighlighter.addJSXCommentCommand();
};

export default activateMonacoJSXHighlighter;
