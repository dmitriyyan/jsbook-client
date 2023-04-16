import { useCallback, useEffect, useState } from 'react';
import esbuild from 'esbuild-wasm';

import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';
import useInitBundler from './useInitBundler';

const useBundler = (input: string) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isBundling, setIsBundling] = useState(false);

  const { isReady, initError } = useInitBundler();

  const handleBundle = useCallback(
    async (input: string) => {
      try {
        if (error) {
          setError('');
        }

        setIsBundling(true);
        const result = await esbuild.build({
          entryPoints: ['index.js'],
          bundle: true,
          write: false,
          plugins: [unpkgPathPlugin(), fetchPlugin(input)],
          minify: true,
          target: 'esnext',
        });

        setCode(result.outputFiles[0].text);
      } catch (error) {
        console.error(error);

        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setIsBundling(false);
      }
    },
    [error]
  );

  useEffect(() => {
    let timer: number | undefined;
    if (isReady) {
      if (input === '') {
        void handleBundle(input);
      } else {
        timer = setTimeout(() => {
          void handleBundle(input);
        }, 1000);
      }
    }

    return () => {
      clearTimeout(timer);
    };
  }, [handleBundle, input, isReady]);

  return { code, error: initError || error, isBundling } as const;
};

export default useBundler;
