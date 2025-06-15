import { memo, useState, useCallback, useRef } from "react";
import {
  Paperclip,
  Mic,
  ArrowUp,
  AlertTriangle,
  MoreHorizontal,
  ChevronDown,
} from 'lucide-react';

export const InputBar = memo(({ handleSendMessage }: { handleSendMessage: (value: string) => void }) => {

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

  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <input
        ref={inputRef}
        type="text"
        placeholder="trade AAPL shares..."
        onKeyDown={handleKeyDown}
        className="w-full bg-stone-900 border border-stone-800 rounded-2xl px-6 py-5 sm:pr-20 md:pr-80 text-white placeholder-stone-600 focus:outline-none focus:border-stone-700 text-base"
      />
      <div className="absolute right-3 top-3 flex items-center gap-3">
        {/* Buttons visible at md and above, hidden at sm */}
        <div className="hidden md:flex items-center gap-3">
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
        </div>
        {/* More menu button visible at sm, hidden at md and above */}
        <div className="md:hidden relative">
          <button
            onClick={() => setIsMoreMenuOpen((prev) => !prev)}
            className="p-2 text-stone-500 hover:text-stone-400 transition-colors"
            title="More options"
          >
            <MoreHorizontal size={18} />
          </button>
          {isMoreMenuOpen && (
            <div className="absolute top-8 right-0 z-10 bg-stone-800 border border-stone-700 rounded-lg shadow-lg w-40">
              <button
                className="w-full px-4 py-2 text-sm text-left text-stone-300 hover:bg-stone-700 transition-colors flex items-center gap-2"
              >
                <Paperclip size={18} />
                Attach File
              </button>
              <button
                className="w-full px-4 py-2 text-sm text-left text-stone-300 hover:bg-stone-700 transition-colors flex items-center gap-2"
              >
                <Mic size={18} />
                Voice Input
              </button>
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                  className="w-full px-4 py-2 text-sm text-left text-stone-300 hover:bg-stone-700 transition-colors flex items-center gap-2"
                >
                  <AlertTriangle size={16} />
                  <span>{selectedModel}</span>
                  <ChevronDown size={14} className={`${isDropdownOpen ? 'rotate-180' : ''} transition-transform`} />
                </button>
                {isDropdownOpen && (
                  <div className="absolute top-8 right-0 z-20 bg-stone-800 border border-stone-700 rounded-lg shadow-lg w-40">
                    {['Model 1', 'Model 2'].map((model) => (
                      <button
                        key={model}
                        onClick={() => {
                          handleModelSelect(model);
                          setIsDropdownOpen(false);
                          setIsMoreMenuOpen(false);
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
            </div>
          )}
        </div>
        {/* Send button, always visible */}
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
