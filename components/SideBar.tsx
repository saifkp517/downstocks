import { useState, useCallback } from "react";
import {
    Plus,
    MoreHorizontal,
    Menu,
    ChevronDown,
    Maximize2,
    Minimize2,
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

interface SidebarProps {
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
    setShowFilePanel: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar({ setMessages, setShowFilePanel }: SidebarProps) {
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

    const [chatSessions, setChatSessions] = useState<ChatSession[]>([
        {
            id: '1',
            title: 'Hello Chat',
            lastMessage: 'Welcome message',
            timestamp: new Date(),
        },
    ]);
    const [activeSessionId, setActiveSessionId] = useState('1');
    const [isOverlayOpen, setOverlayOpen] = useState(false);
    const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);
    const toggleSidebar = useCallback(() => setIsSidebarMinimized((prev) => !prev), []);

    return (
        <>
            <div
                className={`bg-black border-r border-stone-800 flex flex-col transition-all duration-300 ${isSidebarMinimized ? `${isOverlayOpen ? '' : 'w-0'}` : 'w-64'}`}
            >
                <div className="p-4 flex items-center justify-between">
                    {!isSidebarMinimized && (
                        <button
                            onClick={handleNewChat}
                            className="w-full flex items-center gap-2 px-3 py-2 text-stone-400 hover:text-stone-300 hover:bg-stone-900 rounded-lg transition-colors text-sm"
                        >
                            <Plus size={16} />
                            New Chat
                        </button>
                    )}
                    <button
                        onClick={toggleSidebar}
                        className="p-1 text-stone-500 hover:text-stone-400 hover:bg-stone-900 rounded transition-colors z-10"
                        title={isSidebarMinimized ? 'Maximize sidebar' : 'Minimize sidebar'}
                    >
                        {isSidebarMinimized ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
                    </button>
                </div>

                {/* Mobile hamburger and overlay */}
                <button
                    className="md:hidden fixed top-4 left-4 z-50 bg-stone-900 text-white p-2 rounded-md"
                    onClick={() => {
                        console.log("clicked")
                        setOverlayOpen(!isOverlayOpen)
                    }}
                >
                    <Menu size={20} />
                </button>
                {isOverlayOpen && (
                    <div
                        className={`fixed inset-0 z-40 bg-black/50 md:hidden transition-opacity duration-300 ease-in-out ${isOverlayOpen ? 'opacity-100' : 'opacity-0'
                            }`}
                        onClick={() => setOverlayOpen(false)}
                    >
                        <div
                            className={`bg-black w-64 h-full p-2 border-r border-stone-800 transform transition-transform duration-300 ease-in-out ${isOverlayOpen ? 'translate-x-0' : '-translate-x-full'
                                }`}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header with New Chat and Close buttons */}
                            <div className="p-4 flex items-center justify-between">
                                <button
                                    onClick={() => {
                                        handleNewChat();
                                        setOverlayOpen(false); // Close overlay after creating new chat
                                    }}
                                    className="w-full flex items-center gap-2 px-3 py-2 text-stone-400 hover:text-stone-300 hover:bg-stone-900 rounded-lg transition-colors text-sm"
                                >
                                    <Plus size={16} />
                                    New Chat
                                </button>
                            </div>

                            {/* Tasks and chat sessions */}
                            <div className="text-xs text-stone-600 px-3 py-2 font-medium">Tasks</div>
                            {chatSessions.map((session) => (
                                <button
                                    key={session.id}
                                    onClick={() => {
                                        setActiveSessionId(session.id);
                                        setOverlayOpen(false);
                                    }}
                                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors group text-sm ${activeSessionId === session.id
                                        ? "bg-stone-900 text-white"
                                        : "text-stone-400 hover:text-stone-300 hover:bg-stone-900"
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
                )}

                {/* Desktop sidebar content */}
                {!isSidebarMinimized && (
                    <div className="flex-1 overflow-y-auto hidden md:block">
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
                )}

                {!isSidebarMinimized && (
                    <div className="p-4 border-t border-stone-800">
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
                )}
            </div>
        </>
    );
}