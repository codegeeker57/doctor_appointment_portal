'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, Eye, Code as CodeIcon } from 'lucide-react';

interface PreviewPanelProps {
  code: string;
  language: string;
}

export default function PreviewPanel({ code, language }: PreviewPanelProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [showPreview, setShowPreview] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  const updatePreview = () => {
    if (iframeRef.current && (language === 'html' || language === 'javascript')) {
      let htmlContent = '';
      
      if (language === 'html') {
        htmlContent = code;
      } else if (language === 'javascript') {
        htmlContent = `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: monospace; padding: 20px; background: white; }
              .output { border: 1px solid #ddd; padding: 10px; margin: 10px 0; }
            </style>
          </head>
          <body>
            <div class="output" id="output"></div>
            <script>
              // Override console.log to capture output
              const originalLog = console.log;
              const output = document.getElementById('output');
              console.log = function(...args) {
                originalLog.apply(console, args);
                const div = document.createElement('div');
                div.textContent = args.join(' ');
                output.appendChild(div);
              };
              
              try {
                ${code}
              } catch (error) {
                const div = document.createElement('div');
                div.style.color = 'red';
                div.textContent = 'Error: ' + error.message;
                output.appendChild(div);
              }
            </script>
          </body>
          </html>
        `;
      }
      
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      iframeRef.current.src = url;
      setLastUpdate(Date.now());
    }
  };

  useEffect(() => {
    if (language === 'html' || language === 'javascript') {
      const debounceTimer = setTimeout(updatePreview, 500);
      return () => clearTimeout(debounceTimer);
    }
  }, [code, language]);

  const isPreviewSupported = language === 'html' || language === 'javascript';

  return (
    <div className="flex flex-col h-full">
      <div className="p-3 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
        <h3 className="font-medium text-sm">Live Preview</h3>
        <div className="flex items-center space-x-2">
          {isPreviewSupported && (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPreview(!showPreview)}
              >
                {showPreview ? <CodeIcon className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
              <Button variant="ghost" size="sm" onClick={updatePreview}>
                <RefreshCw className="w-4 h-4" />
              </Button>
            </>
          )}
        </div>
      </div>
      
      <div className="flex-1 overflow-hidden">
        {isPreviewSupported ? (
          showPreview ? (
            <iframe
              ref={iframeRef}
              className="w-full h-full border-0 bg-white"
              title="Code Preview"
              sandbox="allow-scripts"
            />
          ) : (
            <div className="p-4 text-sm font-mono bg-gray-50 h-full overflow-auto whitespace-pre-wrap">
              {code}
            </div>
          )
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <div className="text-center">
              <CodeIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-sm">Preview not available for {language}</p>
              <p className="text-xs mt-1">Supported: HTML, JavaScript</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}