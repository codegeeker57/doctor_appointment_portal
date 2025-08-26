import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CodeTribe - Real-time Collaborative Code Editor',
  description: 'Professional collaborative coding environment for teams',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <script dangerouslySetInnerHTML={{
          __html: `
            if (typeof window !== 'undefined') {
              window.MonacoEnvironment = {
                getWorkerUrl: function (moduleId, label) {
                  if (label === 'typescript' || label === 'javascript') {
                    return '/monaco-editor-workers/ts.worker.js';
                  }
                  if (label === 'html' || label === 'handlebars' || label === 'razor') {
                    return '/monaco-editor-workers/html.worker.js';
                  }
                  if (label === 'css' || label === 'scss' || label === 'less') {
                    return '/monaco-editor-workers/css.worker.js';
                  }
                  if (label === 'json') {
                    return '/monaco-editor-workers/json.worker.js';
                  }
                  return '/monaco-editor-workers/editor.worker.js';
                }
              };
            }
          `
        }} />
      </body>
    </html>
  );
}