import { useEffect, useRef } from 'react';

import previewInitialHtmlCode from './previewInitialHtmlCode';

type PreviewProps = {
  code: string;
};

const Preview = ({ code }: PreviewProps) => {
  const iframeRef = useRef<any>();

  useEffect(() => {
    iframeRef.current.srcdoc = previewInitialHtmlCode;

    setTimeout(() => {
      iframeRef.current.contentWindow.postMessage(code, '*');
    }, 50);
  }, [code]);

  return (
    <iframe
      ref={iframeRef}
      srcDoc={previewInitialHtmlCode}
      sandbox="allow-scripts"
      title="preview"
      style={{ height: '100%', width: '100%' }}
    />
  );
};

export default Preview;
