import {} from '@monaco-editor/react';

const editorOptions = {
  wordWrap: 'on',
  minimap: { enabled: false },
  showUnused: false,
  folding: false,
  lineNumbersMinChars: 3,
  fontSize: 16,
  scrollBeyondLastLine: false,
  automaticLayout: true,
  tabSize: 2,
} as const;

export default editorOptions;
