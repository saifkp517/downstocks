"use client";

import React, { useState, useRef, useEffect, memo, useCallback } from 'react';
import {
  Plus,
  X,
  Paperclip,
  Mic,
  ArrowUp,
  MoreHorizontal,
  BarChart3,
  Rocket,
  Camera,
  RefreshCw,
  FileText,
  Monitor,
  Eye,
  Code,
  AlertTriangle,
  ChevronDown,
  Maximize2,
  Minimize2
} from 'lucide-react';

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
const InputBar = memo(({ handleSendMessage }: { handleSendMessage: (value: string) => void }) => {

  const [selectedModel, setSelectedModel] = useState('Model 1');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleModelSelect = useCallback((model: string) => {
    setSelectedModel(model);
    // Add logic to update the AI model if needed
  }, []);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.repeat && inputRef.current?.value.trim()) {
      e.preventDefault();
      handleSendMessage(inputRef.current.value);
      inputRef.current.value = '';
      inputRef.current.focus();
    }
  };

  const handleButtonClick = () => {
    if (inputRef.current?.value.trim()) {
      handleSendMessage(inputRef.current.value);
      inputRef.current.value = '';
      inputRef.current.focus();
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <input
        ref={inputRef}
        type="text"
        placeholder="trade AAPL shares..."
        onKeyDown={handleKeyDown}
        className="w-full bg-stone-900 border border-stone-800 rounded-2xl px-6 py-5 pr-80 text-white placeholder-stone-600 focus:outline-none focus:border-stone-700 text-base"
      />
      <div className="absolute right-3 top-3 flex items-center gap-3">
        <button className="p-2 text-stone-500 hover:text-stone-400 transition-colors">
          <Paperclip size={18} />
        </button>
        <button className="p-2 text-stone-500 hover:text-stone-400 transition-colors">
          <Mic size={18} />
        </button>
        <div className="relative flex items-center gap-2 text-stone-500">
          <AlertTriangle size={16} />
          <span className="text-sm">{selectedModel}</span>
          <button
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="p-1 text-stone-500 hover:text-stone-400 transition-colors"
            title="Select model"
          >
            <ChevronDown size={14} className={`${isDropdownOpen ? 'rotate-180' : ''} transition-transform`} />
          </button>
          {isDropdownOpen && (
            <div className="absolute top-8 right-0 z-10 bg-stone-800 border border-stone-700 rounded-lg shadow-lg w-40">
              {['Model 1', 'Model 2'].map((model) => (
                <button
                  key={model}
                  onClick={() => {
                    handleModelSelect(model);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full px-4 py-2 text-sm text-left text-stone-300 hover:bg-stone-700 transition-colors ${selectedModel === model ? 'bg-stone-900 font-medium' : ''
                    }`}
                >
                  {model}
                </button>
              ))}
            </div>
          )}
        </div>
        <button
          onClick={handleButtonClick}
          className="p-2.5 bg-stone-700 hover:bg-stone-600 rounded-lg transition-colors"
        >
          <ArrowUp size={18} className="text-white" />
        </button>
      </div>
    </div>
  );
});

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
  const [activeSessionId, setActiveSessionId] = useState('1');
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);
  const toggleSidebar = useCallback(() => setIsSidebarMinimized((prev) => !prev), []);
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

  const handleNewChat = useCallback(() => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: 'New Chat',
      lastMessage: '',
      timestamp: new Date(),
    };
    setChatSessions((prev) => [...prev, newSession]);
    setActiveSessionId(newSession.id);
    setMessages([]);
    setShowFilePanel(false);
  }, []);


  const EmptyState = () => (
    <div className="flex-1 flex flex-col items-center justify-center px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-light text-white mb-3 drop-shadow-[0_2px_16px_rgba(186,0,255,0.7)]">
          Welcome to <span className="font-normal text-purple-600 drop-shadow-[0_2px_16px_rgba(255,0,247,0.8)]">DownStocks AI</span>
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
      <div
        className={`bg-black border-r border-stone-800 flex flex-col transition-all duration-300 ${isSidebarMinimized ? 'w-16' : 'w-64'
          }`}
      >
        <div className="p-4 flex items-center justify-between">
          <button
            onClick={handleNewChat}
            className={`w-full flex items-center gap-2 px-3 py-2 text-stone-400 hover:text-stone-300 hover:bg-stone-900 rounded-lg transition-colors text-sm ${isSidebarMinimized ? 'hidden' : ''
              }`}
          >
            <Plus size={16} />
          </button>
          <button
            onClick={toggleSidebar}
            className="p-1 text-stone-500 hover:text-stone-400 transition-colors"
            title={isSidebarMinimized ? 'Maximize sidebar' : 'Minimize sidebar'}
          >
            {isSidebarMinimized ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
          </button>
        </div>

        <div className={`flex-1 overflow-y-auto ${isSidebarMinimized ? 'hidden' : ''}`}>
          <div className="px-2 flex flex-col h-full">
            <div className="text-xs text-stone-600 px-3 py-2 font-medium">Tasks</div>
            {chatSessions.map((session) => (
              <button
                key={session.id}
                onClick={() => setActiveSessionId(session.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors group text-sm ${activeSessionId === session.id
                  ? 'bg-stone-900 text-white'
                  : 'text-stone-400 hover:text-stone-300 hover:bg-stone-900'
                  }`}
              >
                <span className="text-left truncate">{session.title}</span>
                <MoreHorizontal
                  size={14}
                  className="text-stone-600 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                />
              </button>
            ))}
          </div>
        </div>

        <div className={`p-4 border-t border-stone-800 ${isSidebarMinimized ? 'hidden' : ''}`}>
          <div className="bg-blue-950 border border-blue-900 rounded-lg p-4 mb-4">
            <div className="text-sm font-medium text-white mb-1">Enterprise Demo</div>
            <div className="text-xs text-blue-300 mb-3">AI employees for your company</div>
            <button className="w-full bg-white text-black text-xs py-2 px-3 rounded-md font-medium hover:bg-stone-100 transition-colors">
              Learn More
            </button>
            <div className="flex items-center gap-1 mt-3 text-xs text-blue-400">
              <span>🔗</span>
              <span>Join Our Team!</span>
              <span>🚀</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-stone-900 transition-colors cursor-pointer">
            <div className="w-7 h-7 bg-orange-600 rounded-full flex items-center justify-center text-xs font-medium text-white">
              S
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm text-white">Saif Khan</div>
              <div className="text-xs text-stone-500 truncate">saifkhan50172@gmail.com</div>
            </div>
            <ChevronDown size={14} className="text-stone-600" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {messages.length === 0 ? <EmptyState /> : <ChatMessages />}
        {showFilePanel && <FilePanel />}
      </div>
    </div>
  );
};

export default LLMChatApp;