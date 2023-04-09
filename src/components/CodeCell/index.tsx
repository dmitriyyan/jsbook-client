import { useState } from 'react';

import CodeEditor from '../CodeEditor';
import Preview from '../Preview';
import useBundler from '../../hooks/useBundler';

const CodeCell = () => {
  const [input, setInput] = useState('');

  const { code, handleBundle } = useBundler();

  const handleChange = (value: string | undefined) => {
    setInput(value || '');
  };

  const handleClick = () => {
    handleBundle(input);
  };

  return (
    <div>
      <CodeEditor input={input} onChange={handleChange} />
      <div>
        <button onClick={handleClick}>Submit</button>
      </div>
      <Preview code={code} />
    </div>
  );
};

export default CodeCell;
