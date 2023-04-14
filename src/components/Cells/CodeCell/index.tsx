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

  const { code, error, isBundling } = useBundler(input);

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
            flex: 1,
          }}
        >
          <div
            style={{
              height: '100%',
              backgroundColor: '#f5f5f5',
              flexGrow: 1,
            }}
          >
            {!code || isBundling ? (
              <div
                style={{
                  height: '100%',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  paddingLeft: '10%',
                  paddingRight: '10%',
                  animation: 'fadeIn 0.5s',
                }}
              >
                <progress className="progress is-small is-primary" max="100">
                  Loading
                </progress>
              </div>
            ) : (
              <Preview code={code} codeError={error} />
            )}
          </div>
        </div>
      </div>
    </Resizable>
  );
};

export default CodeCell;
