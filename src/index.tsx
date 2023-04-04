import ReactDOM from 'react-dom/client';
import { useEffect, useState } from 'react';
import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';

const App = () => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');



  useEffect(() => {
    void esbuild.initialize({
      worker: true,
      wasmURL: '/esbuild.wasm'
    })
  }, [])

  const handleClick = async () => {
    const result = await esbuild.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin()]
    })

    setCode(result.outputFiles[0].text);
  }

  return <div>
    <textarea
      value={input}
      onChange={(e) => setInput(e.target.value)}
    >
    </textarea>
    <div><button onClick={handleClick}>Submit</button></div>
    <pre>{code}</pre>
  </div>
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLDivElement);
root.render(<App />);
