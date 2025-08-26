'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Code, Share2, Play } from 'lucide-react';

export default function Home() {
  const [sessionId, setSessionId] = useState('');
  const [username, setUsername] = useState('');
  const router = useRouter();

  const generateSessionId = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const createSession = () => {
    if (!username.trim()) {
      alert('Please enter your username');
      return;
    }
    const newSessionId = generateSessionId();
    localStorage.setItem('codetribe_username', username);
    router.push(`/editor/${newSessionId}`);
  };

  const joinSession = () => {
    if (!username.trim()) {
      alert('Please enter your username');
      return;
    }
    if (!sessionId.trim()) {
      alert('Please enter a session ID');
      return;
    }
    localStorage.setItem('codetribe_username', username);
    router.push(`/editor/${sessionId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Code className="w-10 h-10 text-blue-600 mr-2" />
            <h1 className="text-3xl font-bold text-gray-900">CodeTribe</h1>
          </div>
          <p className="text-gray-600">Real-time Collaborative Code Editor</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">Join a Coding Session</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full"
              />
            </div>

            <div className="space-y-3">
              <Button onClick={createSession} className="w-full" size="lg">
                <Users className="w-4 h-4 mr-2" />
                Create New Session
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">Or</span>
                </div>
              </div>

              <Input
                type="text"
                placeholder="Enter Session ID"
                value={sessionId}
                onChange={(e) => setSessionId(e.target.value.toUpperCase())}
                className="w-full"
              />

              <Button onClick={joinSession} variant="outline" className="w-full" size="lg">
                <Share2 className="w-4 h-4 mr-2" />
                Join Existing Session
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-gray-500">
          <p>Features: Multi-language support, Live preview, Real-time collaboration</p>
        </div>
      </div>
    </div>
  );
}