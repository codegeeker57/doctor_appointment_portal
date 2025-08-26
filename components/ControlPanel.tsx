'use client';

import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface ControlPanelProps {
  language: string;
  onLanguageChange: (language: string) => void;
  executionResult: string;
}

const SUPPORTED_LANGUAGES = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' },
  { value: 'json', label: 'JSON' },
  { value: 'markdown', label: 'Markdown' },
  { value: 'sql', label: 'SQL' },
  { value: 'java', label: 'Java' },
  { value: 'cpp', label: 'C++' },
  { value: 'c', label: 'C' },
  { value: 'csharp', label: 'C#' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
  { value: 'php', label: 'PHP' },
  { value: 'ruby', label: 'Ruby' },
];

export default function ControlPanel({ language, onLanguageChange, executionResult }: ControlPanelProps) {
  const [theme, setTheme] = useState('light');
  const [autoSave, setAutoSave] = useState(true);
  const [fontSize, setFontSize] = useState('medium');
  return (
    <div className="flex-1 p-3 space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Language</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <Select value={language} onValueChange={onLanguageChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              {SUPPORTED_LANGUAGES.map((lang) => (
                <SelectItem key={lang.value} value={lang.value}>
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {executionResult && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Execution Result</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <ScrollArea className="h-32 w-full">
              <pre className="text-xs bg-gray-50 p-2 rounded whitespace-pre-wrap">
                {executionResult}
              </pre>
            </ScrollArea>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Preferences</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 text-xs text-gray-600">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>Language:</span>
              <span className="font-medium">{SUPPORTED_LANGUAGES.find(l => l.value === language)?.label}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Theme:</span>
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger className="w-24 h-7 text-xs">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-between items-center">
              <span>Auto-save:</span>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="auto-save" 
                  checked={autoSave} 
                  onCheckedChange={setAutoSave} 
                  className="data-[state=checked]:bg-blue-500"
                />
                <Label htmlFor="auto-save" className="text-xs">
                  {autoSave ? 'On' : 'Off'}
                </Label>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span>Font Size:</span>
              <Select value={fontSize} onValueChange={setFontSize}>
                <SelectTrigger className="w-24 h-7 text-xs">
                  <SelectValue placeholder="Font Size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}