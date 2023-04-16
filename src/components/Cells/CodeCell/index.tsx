import { useEffect, useState } from 'react';

import CodeEditor from '../../CodeEditor';
import Preview from '../../Preview';
import useBundler from '../../../hooks/useBundler';
import Resizable from '../../Resizable';
import { Cell, selectCodeCellContentBeforeCell } from '../cellsSlice';
import useCellsActions from '../../../hooks/useCellsActions';
import { useAppSelector } from '../../../app/hooks';

type CodeCellProps = {
  data: Cell;
};

const CodeCell = ({ data }: CodeCellProps) => {
  const [isResizing, setIsResizing] = useState(false);

  const contentCellsBefore = useAppSelector((state) =>
    selectCodeCellContentBeforeCell(state, data.id)
  );

  const [input, setInput] = useState(data.content);
  const inputToBundle = [contentCellsBefore, input].join('\n');

  const { code, error, isBundling } = useBundler(inputToBundle);

  const { updateCell } = useCellsActions();

  useEffect(() => {
    const timer = setTimeout(
      () => updateCell({ id: data.id, content: input }),
      1000
    );

    return () => {
      clearTimeout(timer);
    };
  }, [updateCell, data.id, input]);

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
