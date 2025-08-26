'use client';

import { useRef, useEffect, useState } from 'react';
// Dynamic import for Monaco Editor to avoid SSR issues
import dynamic from 'next/dynamic';

interface User {
  id: string;
  username: string;
  color: string;
  cursor?: { line: number; column: number };
}

interface CodeEditorProps {
  code: string;
  language: string;
  onChange: (code: string) => void;
  users: User[];
}

export default function CodeEditor({ code, language, onChange, users }: CodeEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [monaco, setMonaco] = useState<any>(null);
  const editorInstance = useRef<any>(null);

  // Dynamically import Monaco Editor on client side only
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('monaco-editor').then(monacoModule => {
        setMonaco(monacoModule);
      });
    }
  }, []);

  useEffect(() => {
    if (editorRef.current && monaco && !editorInstance.current) {
      // Initialize Monaco Editor
      editorInstance.current = monaco.editor.create(editorRef.current, {
        value: code,
        language: language,
        theme: 'vs',
        minimap: { enabled: true },
        scrollBeyondLastLine: false,
        automaticLayout: true,
        fontSize: 14,
        lineNumbers: 'on',
        wordWrap: 'on',
        folding: true,
        renderLineHighlight: 'all',
        cursorBlinking: 'smooth',
      });

      // Listen for content changes
      editorInstance.current.onDidChangeModelContent(() => {
        const value = editorInstance.current?.getValue() || '';
        onChange(value);
      });
    }

    return () => {
      if (editorInstance.current) {
        editorInstance.current.dispose();
        editorInstance.current = null;
      }
    };
  }, [monaco]);

  useEffect(() => {
    if (editorInstance.current) {
      const currentValue = editorInstance.current.getValue();
      if (currentValue !== code) {
        editorInstance.current.setValue(code);
      }
    }
  }, [code]);

  useEffect(() => {
    if (editorInstance.current && monaco) {
      const model = editorInstance.current.getModel();
      if (model) {
        monaco.editor.setModelLanguage(model, language);
      }
    }
  }, [language, monaco]);

  return (
    <div className="h-full relative">
      <div ref={editorRef} className="h-full w-full" />
      
      {/* Simulated collaborative cursors */}
      {users.slice(1).map((user) => (
        <div
          key={user.id}
          className="absolute pointer-events-none z-10"
          style={{
            top: Math.random() * 200 + 100,
            left: Math.random() * 300 + 100,
            backgroundColor: user.color,
            width: '2px',
            height: '20px'
          }}
        >
          <span 
            className="absolute top-0 left-2 text-xs px-1 py-0.5 rounded text-white whitespace-nowrap"
            style={{ backgroundColor: user.color }}
          >
            {user.username}
          </span>
        </div>
      ))}
    </div>
  );
}