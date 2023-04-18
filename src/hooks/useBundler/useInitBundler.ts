import { useEffect, useState } from 'react';
import esbuild from 'esbuild-wasm';

type CustomWindow = Window & {
  isEsbuildInitilized?: boolean;
};

declare const window: CustomWindow;

const useInitBundler = () => {
  const [error, setError] = useState('');
  const [isReady, setIsReady] = useState<boolean>(
    window.isEsbuildInitilized || false
  );

  useEffect(() => {
    const init = async () => {
      try {
        window.isEsbuildInitilized = true;

        await esbuild.initialize({
          worker: true,
          wasmURL: 'https://unpkg.com/esbuild-wasm@0.17.15/esbuild.wasm',
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
      void init();
    }
  }, []);

  return { isReady, initError: error } as const;
};

export default useInitBundler;
