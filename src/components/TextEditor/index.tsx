import { useEffect, useRef, useState } from 'react';
import MDEditor from '@uiw/react-md-editor';

import './TextEditor.css';

const TextEditor = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [input, setInput] = useState('');

  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        event.target &&
        event.target instanceof Element &&
        editorRef.current &&
        !editorRef.current.contains(event.target)
      ) {
        setIsEditing(false);
      }
    };
    document.addEventListener('mousedown', listener, { capture: true });

    return () => {
      document.removeEventListener('mousedown', listener, { capture: true });
    };
  }, []);

  const handleChange = (value: string | undefined) => {
    setInput(value || '');
  };

  if (isEditing) {
    return (
      <div ref={editorRef} data-color-mode="dark">
        <div className="wmde-markdown-var" />
        <MDEditor
          value={input}
          onChange={handleChange}
          maxHeight={window.innerHeight * 0.9}
          minHeight={window.innerHeight * 0.1}
        />
      </div>
    );
  }

  const handleClick = () => {
    setIsEditing(true);
  };

  return (
    <div className="card" onClick={handleClick} data-color-mode="dark">
      <div className="card-content">
        <div className="wmde-markdown-var" />
        <MDEditor.Markdown source={input} />
      </div>
    </div>
  );
};

export default TextEditor;
