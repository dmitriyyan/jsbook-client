import { useEffect, useState } from 'react';
import esbuild from 'esbuild-wasm';

import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';

const useBundler = () => {
  const [code, setCode] = useState('');

  useEffect(() => {
    esbuild.initialize({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm/esbuild.wasm',
    });
  }, []);

  const handleBundle = async (input: string) => {
    const result = await esbuild.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      minify: true,
    });

    setCode(result.outputFiles[0].text);
  };

  return { code, handleBundle };
};

export default useBundler;
