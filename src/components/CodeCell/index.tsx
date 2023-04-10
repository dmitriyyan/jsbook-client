import { useEffect, useState } from 'react';

import CodeEditor from '../CodeEditor';
import Preview from '../Preview';
import useBundler from '../../hooks/useBundler';
import Resizable from '../Resizable';

const CodeCell = () => {
  const [isResizing, setIsResizing] = useState(false);
  const [input, setInput] = useState('');

  const { code, handleBundle } = useBundler();

  useEffect(() => {
    const timer = setTimeout(async () => {
      handleBundle(input);
    }, 1000);

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [input]);

  const handleChange = (value: string | undefined) => {
    setInput(value || '');
  };

  const handleResizeStart = () => {
    setIsResizing(true);
  };

  const handleResizeStop = () => {
    setIsResizing(false);
  };

  return (
    <Resizable
      direction="vertical"
      onResizeStart={handleResizeStart}
      onResizeStop={handleResizeStop}
    >
      <div style={{ height: '100%', display: 'flex' }}>
        <Resizable
          direction="horizontal"
          onResizeStart={handleResizeStart}
          onResizeStop={handleResizeStop}
        >
          <CodeEditor input={input} onChange={handleChange} />
        </Resizable>
        <div style={{ pointerEvents: isResizing ? 'none' : 'all', flex: 1 }}>
          <Preview code={code} />
        </div>
      </div>
    </Resizable>
  );
};

export default CodeCell;
