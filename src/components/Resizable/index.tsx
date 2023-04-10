import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { ResizableBox, ResizableProps } from 'react-resizable';

import './Resizable.css';

type Props = PropsWithChildren & {
  direction: 'horizontal' | 'vertical';
  onResizeStart?: () => void;
  onResizeStop?: () => void;
};

const Resizable = ({
  direction,
  children,
  onResizeStart,
  onResizeStop,
}: Props) => {
  const [windowHeight, setHeight] = useState(window.innerHeight);
  const [windowWidth, setWidth] = useState(window.innerWidth);
  const [editorWidth, setEditorWidth] = useState(window.innerWidth * 0.8);

  useEffect(() => {
    let timer: number | null = null;
    const handleResize = () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        setHeight(window.innerHeight);
        setWidth(window.innerWidth);

        if (window.innerWidth * 0.8 < editorWidth) {
          setEditorWidth(window.innerWidth * 0.8);
        }
      }, 100);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [editorWidth]);

  const handleOnResizeStop: ResizableProps['onResizeStop'] = (event, data) => {
    console.log(data.size.width);
    setEditorWidth(data.size.width);

    if (onResizeStop) {
      onResizeStop();
    }
  };

  if (direction === 'horizontal') {
    return (
      <ResizableBox
        height={Infinity}
        width={editorWidth}
        resizeHandles={['e']}
        minConstraints={[windowWidth * 0.2, Infinity]}
        maxConstraints={[windowWidth * 0.8, Infinity]}
        onResizeStart={onResizeStart}
        onResizeStop={handleOnResizeStop}
        style={{ display: 'flex' }}
      >
        {children}
      </ResizableBox>
    );
  }

  return (
    <ResizableBox
      height={300}
      width={Infinity}
      resizeHandles={['s']}
      minConstraints={[Infinity, windowHeight * 0.1]}
      maxConstraints={[Infinity, windowHeight * 0.9]}
      onResizeStart={onResizeStart}
      onResizeStop={onResizeStop}
    >
      {children}
    </ResizableBox>
  );
};

export default Resizable;
