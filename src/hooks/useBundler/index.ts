import { useEffect, useState } from 'react';
import esbuild from 'esbuild-wasm';

import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';

type CustomWindow = Window & {
  isEsbuildInitilized?: boolean;
};

declare const window: CustomWindow;

const useBundler = (input: string) => {
  const [isReady, setIsReady] = useState(false);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const init = async () => {
      try {
        window.isEsbuildInitilized = true;

        await esbuild.initialize({
          worker: true,
          wasmURL: './node_modules/esbuild-wasm/esbuild.wasm',
        });

        setIsReady(true);
      } catch (error) {
        console.error(error);
        if (error instanceof Error) {
          setError(error.message);
        }
      }
    };

    if (!window.isEsbuildInitilized) {
      init();
    }
  }, []);

  const handleBundle = async (input: string) => {
    try {
      if (error) {
        setError('');
      }

      const result = await esbuild.build({
        entryPoints: ['index.js'],
        bundle: true,
        write: false,
        plugins: [unpkgPathPlugin(), fetchPlugin(input)],
        minify: true,
      });

      setCode(result.outputFiles[0].text);
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  useEffect(() => {
    let timer: number | null = null;
    if (isReady) {
      timer = setTimeout(async () => {
        handleBundle(input);
      }, 1000);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [input, isReady]);

  return { code, error };
};

export default useBundler;
