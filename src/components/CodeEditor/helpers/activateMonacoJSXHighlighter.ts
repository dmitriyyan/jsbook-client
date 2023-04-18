import { OnMount } from '@monaco-editor/react';

import MonacoJSXHighlighter from './jsx-highlighter';

const activateMonacoJSXHighlighter = async (
  monacoEditor: Parameters<OnMount>[0],
  monaco: Parameters<OnMount>[1]
) => {
  const { default: traverse } = await import('@babel/traverse');
  const { parse } = await import('@babel/parser');

  const monacoJSXHighlighter = new MonacoJSXHighlighter(
    monaco,
    parse,
    traverse,
    monacoEditor
  );

  monacoJSXHighlighter.highlightOnDidChangeModelContent();
  monacoJSXHighlighter.addJSXCommentCommand();

  return {
    monacoJSXHighlighter,
  };
};

export default activateMonacoJSXHighlighter;
