'use client';

import { useState } from 'react';
import { Users, Circle, UserPlus, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface User {
  id: string;
  username: string;
  color: string;
  cursor?: { line: number; column: number };
}

interface UserPanelProps {
  users: User[];
  currentUser: User | null;
}

export default function UserPanel({ users, currentUser }: UserPanelProps) {
  const [copied, setCopied] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  
  const sessionId = typeof window !== 'undefined' ? 
    window.location.pathname.split('/').pop() : '';
  
  const inviteUrl = typeof window !== 'undefined' ? 
    `${window.location.origin}/editor/${sessionId}` : '';
  
  const copyInviteLink = async () => {
    if (inviteUrl) {
      try {
        await navigator.clipboard.writeText(inviteUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        // Fallback for browsers where clipboard API is not available
        const textArea = document.createElement('textarea');
        textArea.value = inviteUrl;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
          document.execCommand('copy');
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch (err) {
          console.error('Failed to copy: ', err);
          alert('Failed to copy invite link. Please copy it manually.');
        } finally {
          document.body.removeChild(textArea);
        }
      }
    }
  };

  return (
    <div className="p-3 border-b border-gray-200 bg-gray-50">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Users className="w-4 h-4 text-gray-600" />
          <h3 className="font-medium text-sm">Active Users ({users.length})</h3>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-7 px-2" 
          onClick={() => setShowInvite(!showInvite)}
        >
          <UserPlus className="w-4 h-4" />
        </Button>
      </div>
      
      {showInvite && (
        <div className="mb-3 p-2 bg-blue-50 rounded-md border border-blue-100">
          <p className="text-xs text-blue-700 mb-2">Invite others to collaborate:</p>
          <div className="flex space-x-1">
            <Input 
              value={inviteUrl} 
              readOnly 
              className="h-7 text-xs flex-1" 
            />
            <Button 
              size="sm" 
              variant="outline" 
              className="h-7 px-2" 
              onClick={copyInviteLink}
            >
              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
            </Button>
          </div>
        </div>
      )}
      
      <div className="space-y-2">
        {users.map((user) => (
          <div key={user.id} className="flex items-center space-x-2">
            <Circle 
              className="w-3 h-3 fill-current" 
              style={{ color: user.color }}
            />
            <span className="text-sm text-gray-900">
              {user.username}
              {user.id === currentUser?.id && ' (You)'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}