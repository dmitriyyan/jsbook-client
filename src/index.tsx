import ReactDOM from 'react-dom/client';
import { useEffect, useRef, useState } from 'react';
import esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';

const App = () => {
  const [input, setInput] = useState('');

  const iframeRef = useRef<any>();

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

  useEffect(() => {
    iframeRef.current.srcdoc = html;

    void esbuild.initialize({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm/esbuild.wasm'
    })
  }, [])

  const handleClick = async () => {
    const result = await esbuild.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      minify: true,
    })

    iframeRef.current.contentWindow.postMessage(result.outputFiles[0].text, '*');
  }

  return <div>
    <textarea
      value={input}
      onChange={(e) => setInput(e.target.value)}
    >
    </textarea>
    <div><button onClick={handleClick}>Submit</button></div>
    <iframe ref={iframeRef} srcDoc={html} sandbox="allow-scripts" title="preview" />
  </div>
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLDivElement);
root.render(<App />);
