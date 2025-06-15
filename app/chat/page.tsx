"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  X,
  FileText,
  Monitor,
  Eye,
  Code,
} from 'lucide-react';
import Sidebar from '@/components/SideBar';
import { InputBar } from '@/components/InputBar';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  status?: 'creating' | 'executing' | 'completed';
  fileCreated?: string;
}

interface ChatSession {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
}

// InputBar component (uncontrolled, memoized)

const LLMChatApp: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([
    {
      id: '1',
      title: 'Hello Chat',
      lastMessage: 'Welcome message',
      timestamp: new Date(),
    },
  ]);

  const [showFilePanel, setShowFilePanel] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleSendMessage = useCallback(async (value: string) => {
    if (!value.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: value,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "I'll help you with your test prompt. Let me create a simple todo list to organize our approach:",
        isUser: false,
        timestamp: new Date(),
        status: 'creating',
        fileCreated: 'todo.md',
      };

      setMessages((prev) => [...prev, aiMessage]);
      setShowFilePanel(true);
      setIsLoading(false);
      scrollToBottom();
    }, 1000);
  }, [scrollToBottom]);



  const EmptyState = () => (
    <div className="flex-1 flex flex-col items-center justify-center px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-light text-gray-300 mb-3">
          Welcome to <span className="font-normal text-white">DownStocks AI</span>
        </h1>
        <p className="text-stone-500 text-xl">What would you like to do today?</p>
      </div>

      <div className="w-full max-w-3xl mb-12">
        <InputBar handleSendMessage={handleSendMessage} />
      </div>


    </div>
  );

  const ChatMessages = () => (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 overflow-y-auto p-8">
        {messages.map((message) => (
          <div key={message.id} className={`mb-8 ${message.isUser ? 'flex justify-end' : ''}`}>
            <div className={`max-w-4xl ${message.isUser ? 'bg-stone-800 text-white rounded-2xl px-6 py-4' : ''}`}>
              {!message.isUser && (
                <div className="text-stone-500 text-sm mb-3 font-medium">DownStocks</div>
              )}
              <div className="text-stone-200 whitespace-pre-wrap leading-relaxed">{message.content}</div>

              {message.status === 'creating' && message.fileCreated && (
                <div className="mt-6">
                  <div className="flex items-center gap-3 bg-stone-800 rounded-lg px-4 py-3 w-fit mb-6">
                    <div className="w-4 h-4 bg-stone-600 rounded flex items-center justify-center">
                      <FileText size={12} className="text-stone-400" />
                    </div>
                    <span className="text-sm text-stone-300">Creating File</span>
                    <span className="text-xs text-stone-500">{message.fileCreated}</span>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-white font-medium text-lg mb-3">Progress Update</h3>
                      <p className="text-stone-400 leading-relaxed">I've successfully created the todo.md file with our test plan. Let's proceed with the next steps.</p>
                    </div>

                    <div>
                      <h3 className="text-white font-medium text-lg mb-3">Creating a Test File</h3>
                      <p className="text-stone-400 leading-relaxed mb-4">I'll create a simple test file with some sample content:</p>

                      <div className="flex items-center gap-3 bg-stone-800 rounded-lg px-4 py-3 w-fit mb-4">
                        <div className="w-4 h-4 bg-stone-600 rounded flex items-center justify-center">
                          <FileText size={12} className="text-stone-400" />
                        </div>
                        <span className="text-sm text-stone-300">Creating File</span>
                        <span className="text-xs text-stone-500">test_file.txt</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-white font-medium text-lg mb-3">Progress Update</h3>
                      <p className="text-stone-400 leading-relaxed">The test file has been created successfully. Let's verify its contents and update our todo list.</p>
                    </div>

                    <div>
                      <h3 className="text-white font-medium text-lg mb-3">Verifying File Creation</h3>
                      <p className="text-stone-400 leading-relaxed mb-4">First, let's check the file contents:</p>

                      <div className="flex items-center gap-3 bg-stone-700 rounded-lg px-4 py-3 w-fit">
                        <div className="w-4 h-4 bg-stone-600 rounded flex items-center justify-center">
                          <Code size={12} className="text-stone-400" />
                        </div>
                        <span className="text-sm text-stone-300">Executing Command</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="mb-8">
            <div className="text-stone-500 text-sm mb-3 font-medium">DownStocks</div>
            <div className="flex items-center gap-3 text-stone-500">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-stone-500"></div>
              <span className="text-sm">DownStocks is working...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="px-8 pb-8 pt-4">
        <InputBar handleSendMessage={handleSendMessage} />
      </div>
    </div>
  );

  const FilePanel = () => (
    <div className="w-96 bg-black border-l border-stone-800 flex flex-col">
      <div className="px-4 py-3 border-b border-stone-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Monitor size={14} className="text-stone-500" />
          <span className="text-white text-sm font-medium">DownStocks's Computer</span>
        </div>
        <button
          onClick={() => setShowFilePanel(false)}
          className="text-stone-500 hover:text-stone-400 transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      <div className="px-4 py-3 flex items-center justify-between border-b border-stone-800">
        <div className="flex items-center gap-2">
          <FileText size={14} className="text-emerald-400" />
          <span className="text-white text-sm">Create File</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 text-xs text-stone-400 hover:text-stone-300 transition-colors flex items-center gap-1">
            <Code size={10} />
            Source
          </button>
          <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded text-xs text-white transition-colors flex items-center gap-1">
            <Eye size={10} />
            Preview
          </button>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        <div className="bg-stone-900 rounded-lg p-4 font-mono text-sm border border-stone-800">
          <div className="text-stone-400 leading-relaxed">
            This is a test file created for demonstration purposes.
            <br />
            It contains sample text to verify file operations.
          </div>
        </div>
      </div>

      <div className="px-4 py-3 border-t border-stone-800">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-stone-600 rounded"></div>
            <span className="text-xs text-stone-500">TXT</span>
          </div>
          <span className="text-xs text-stone-500">6/15/2025, 12:51:01 PM</span>
        </div>
        <div className="text-xs text-stone-500 mb-2">2/2</div>
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-stone-800 rounded-full h-1">
            <div className="bg-emerald-400 h-1 rounded-full w-full"></div>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
            <span className="text-xs text-emerald-400">Live Updates</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar */}
      <Sidebar setMessages={setMessages} setShowFilePanel={setShowFilePanel} />

      {/* Main Content */}
      <div className="flex-1 flex">
        {messages.length === 0 ? <EmptyState /> : <ChatMessages />}
        {showFilePanel && <FilePanel />}
      </div>
    </div>
  );
};

export default LLMChatApp;