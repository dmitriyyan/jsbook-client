import { useEffect, useRef } from 'react';

type PreviewProps = {
  code: string;
};

const html = `
    <html>
      <head></head>
      <body>
        <div id="root"></div>
        <script>
          window.addEventListener('message', (event) => {
            try {
              eval(event.data);
            } catch (err) {
              const root = document.querySelector('#root');
              root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
              console.error(err);
            }
          });
        </script>
      </body>
    </html>
  `;

const Preview = ({ code }: PreviewProps) => {
  const iframeRef = useRef<any>();

  useEffect(() => {
    iframeRef.current.srcdoc = html;

    iframeRef.current.contentWindow.postMessage(code, '*');
  }, [code]);

  return (
    <iframe
      ref={iframeRef}
      srcDoc={html}
      sandbox="allow-scripts"
      title="preview"
    />
  );
};

export default Preview;
