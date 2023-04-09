/// <reference types="vite/client" />

declare module 'monaco-jsx-highlighter' {
  import * as monaco_editor from 'monaco-editor';
  import traverse from '@babel/traverse';
  import { parse } from '@babel/parser';

  type Parse = typeof parse;
  type Traverse = typeof traverse;
  type Monaco = typeof monaco_editor;

  interface MonacoJSXHighlighterOptions {
    jsxCommenter?: any;
    monacoEditorManager?: any;
    decoratorMapper?: any;
  }

  class MonacoJSXHighlighter {
    constructor(
      monaco: Monaco,
      parse: Parse,
      traverse: Traverse,
      monacoEditor: monaco.editor.IStandaloneCodeEditor,
      options?: MonacoJSXHighlighterOptions
    );
    options: MonacoJSXHighlighterOptions;
    babelParse: (code: string) => any;
    jsxCommenter: any;
    monacoEditorManager: any;
    parseJSXExpressionsPromise: Promise<any>;
    getAstPromise: Promise<any>;
    loc2Range: (loc: any) => monaco.Range;
    range2Loc: (range: monaco.Range) => any;
    addJSXCommentCommand: () => void;
    decoratorMapper: any;
    decoratorMapperReset: () => void;
    highlight: (ast: any, collectJSXExpressions?: any) => Promise<any>;
    highlightCode: (
      afterHighlight?: (ast: any) => any,
      onHighlightError?: (error: any) => any,
      getAstPromise?: Promise<any>,
      onGetAstError?: (error: any) => any
    ) => Promise<any>;
    isHighlightBoundToModelContentChanges: () => boolean;
    highlightOnDidChangeModelContent: (
      debounceTime?: number,
      afterHighlight?: (ast: any) => any,
      onHighlightError?: (error: any) => any,
      getAstPromise?: Promise<any>,
      onParseAstError?: (error: any) => any
    ) => () => void;
    highLightOnDidChangeModelContent: () => void;
  }

  export default MonacoJSXHighlighter;
}
