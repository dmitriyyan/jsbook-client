import { useState } from 'react';

import CodeEditor from '../../CodeEditor';
import Preview from '../../Preview';
import useBundler from '../../../hooks/useBundler';
import Resizable from '../../Resizable';

type CodeCellProps = {
  initialInput: string;
};

const CodeCell = ({ initialInput }: CodeCellProps) => {
  const [isResizing, setIsResizing] = useState(false);
  const [input, setInput] = useState(initialInput);

  const { code, error } = useBundler(input);

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
      <div style={{ height: 'calc(100% - 10px)', display: 'flex' }}>
        <Resizable
          direction="horizontal"
          onResizeStart={handleResizeStart}
          onResizeStop={handleResizeStop}
        >
          <CodeEditor input={input} onChange={handleChange} />
        </Resizable>
        <div
          style={{
            pointerEvents: isResizing ? 'none' : 'all',
          }}
        >
          <Preview code={code} codeError={error} />
        </div>
      </div>
    </Resizable>
  );
};

export default CodeCell;
