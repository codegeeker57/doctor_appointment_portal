'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import CodeEditor from '@/components/CodeEditor';
import ChatPanel from '@/components/ChatPanel';
import UserPanel from '@/components/UserPanel';
import PreviewPanel from '@/components/PreviewPanel';
import ControlPanel from '@/components/ControlPanel';
import { CollaborationService } from '@/lib/collaboration';
import { Button } from '@/components/ui/button';
import { LogOut, Save, Play, GitBranch } from 'lucide-react';

interface User {
  id: string;
  username: string;
  color: string;
  cursor?: { line: number; column: number };
}

export default function EditorPage() {
  const params = useParams();
  const router = useRouter();
  const sessionId = params.sessionId as string;
  
  const [code, setCode] = useState('// Welcome to CodeTribe\nconsole.log("Hello, World!");');
  const [language, setLanguage] = useState('javascript');
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionResult, setExecutionResult] = useState('');

  const collaboration = new CollaborationService(sessionId);

  useEffect(() => {
    const username = localStorage.getItem('codetribe_username');
    if (!username) {
      router.push('/');
      return;
    }

    const user: User = {
      id: Date.now().toString(),
      username,
      color: `#${Math.floor(Math.random()*16777215).toString(16)}`
    };
    setCurrentUser(user);

    // Simulate joining session
    collaboration.joinSession(user);
    
    // Initialize with just the current user
    setUsers([user]);

    // Initialize with empty messages
    setMessages([]);

    return () => {
      collaboration.leaveSession();
    };
  }, [sessionId]);

  const handleCodeChange = useCallback((newCode: string) => {
    setCode(newCode);
    collaboration.broadcastCodeChange(newCode);
  }, []);

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    collaboration.broadcastLanguageChange(newLanguage);
  };

  const executeCode = async () => {
    setIsExecuting(true);
    
    // Simulate code execution
    try {
      let result = '';
      
      if (language === 'javascript') {
        // Simulate JS execution
        result = 'Output:\nHello, World!\nExecution completed successfully.';
      } else if (language === 'python') {
        result = 'Output:\nHello, World!\nExecution completed in 0.045s';
      } else if (language === 'html') {
        result = 'HTML rendered in preview panel';
      } else {
        result = `${language} code execution simulated successfully.`;
      }
      
      setExecutionResult(result);
    } catch (error) {
      setExecutionResult(`Error: ${error}`);
    } finally {
      setIsExecuting(false);
    }
  };

  const saveProject = () => {
    const project = {
      sessionId,
      code,
      language,
      timestamp: Date.now()
    };
    localStorage.setItem(`codetribe_project_${sessionId}`, JSON.stringify(project));
    alert('Project saved successfully!');
  };

  const commitChanges = () => {
    const commit = {
      id: Date.now().toString(),
      message: `Auto-commit: ${language} changes`,
      author: currentUser?.username,
      timestamp: Date.now(),
      code
    };
    
    const commits = JSON.parse(localStorage.getItem(`codetribe_commits_${sessionId}`) || '[]');
    commits.unshift(commit);
    localStorage.setItem(`codetribe_commits_${sessionId}`, JSON.stringify(commits));
    
    alert('Changes committed successfully!');
  };

  const leaveSession = () => {
    if (confirm('Are you sure you want to leave this session?')) {
      collaboration.leaveSession();
      router.push('/');
    }
  };

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold">CodeTribe</h1>
          <span className="text-sm text-gray-500">Session: {sessionId}</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={saveProject}>
            <Save className="w-4 h-4 mr-1" />
            Save
          </Button>
          <Button variant="outline" size="sm" onClick={executeCode} disabled={isExecuting}>
            <Play className="w-4 h-4 mr-1" />
            {isExecuting ? 'Running...' : 'Run'}
          </Button>
          <Button variant="outline" size="sm" onClick={commitChanges}>
            <GitBranch className="w-4 h-4 mr-1" />
            Commit
          </Button>
          <Button variant="outline" size="sm" onClick={leaveSession}>
            <LogOut className="w-4 h-4 mr-1" />
            Leave
          </Button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Users */}
        <div className="w-64 border-r border-gray-200 flex flex-col">
          <UserPanel users={users} currentUser={currentUser} />
          <ControlPanel 
            language={language} 
            onLanguageChange={handleLanguageChange}
            executionResult={executionResult}
          />
        </div>

        {/* Main Editor */}
        <div className="flex-1 flex flex-col">
          <CodeEditor
            code={code}
            language={language}
            onChange={handleCodeChange}
            users={users}
          />
        </div>

        {/* Right Panel - Preview & Chat */}
        <div className="w-96 border-l border-gray-200 flex flex-col">
          <div className="flex-1">
            <PreviewPanel code={code} language={language} />
          </div>
          <div className="h-80 border-t border-gray-200">
            <ChatPanel 
              messages={messages} 
              onSendMessage={(message) => {
                const newMessage = {
                  id: Date.now().toString(),
                  username: currentUser?.username || 'Anonymous',
                  message,
                  timestamp: Date.now()
                };
                setMessages(prev => [...prev, newMessage]);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}