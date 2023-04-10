import { useEffect, useRef } from 'react';

import previewInitialHtmlCode from './previewInitialHtmlCode';

type PreviewProps = {
  code: string;
  codeError: string;
};

const Preview = ({ code, codeError }: PreviewProps) => {
  const iframeRef = useRef<any>();

  useEffect(() => {
    iframeRef.current.srcdoc = previewInitialHtmlCode;

    setTimeout(() => {
      iframeRef.current.contentWindow.postMessage(code, '*');
    }, 50);
  }, [code]);

  return (
    <div
      style={{
        position: 'relative',
        height: '100%',
      }}
    >
      <iframe
        ref={iframeRef}
        srcDoc={previewInitialHtmlCode}
        sandbox="allow-scripts"
        title="preview"
        style={{ height: '100%', width: '100%' }}
      />
      <div
        className="preview-error"
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          color: 'red',
        }}
      >
        {codeError}
      </div>
    </div>
  );
};

export default Preview;
