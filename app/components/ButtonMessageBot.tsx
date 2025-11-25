'use client';

import { useEffect, useState } from 'react';
import ChatBot from './ChatBot';
import { MessageCircle } from 'lucide-react';

function ButtonMessageBot() {
  const [showMessage, setShowMessage] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isChatBotOpen, setIsChatBotOpen] = useState(false);

  useEffect(() => {
    let showTimeout: NodeJS.Timeout;
    let hideTimeout: NodeJS.Timeout;
    let interval: NodeJS.Timeout;

    const startCycle = () => {
      // First add to DOM with opacity 0
      setShowMessage(true);
      setIsVisible(false);
      setIsAnimating(false);
      
      // Force reflow to ensure the element is rendered before animation
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsVisible(true);
          setIsAnimating(true);
        });
      });
      
      // Fade out after 5 seconds
      hideTimeout = setTimeout(() => {
        setIsAnimating(false);
        setIsVisible(false);
        // Remove from DOM after transition
        setTimeout(() => {
          setShowMessage(false);
        }, 700);
      }, 5000);
    };

    // Start immediately
    startCycle();
    interval = setInterval(startCycle, 10000);

    return () => {
      clearTimeout(showTimeout);
      clearTimeout(hideTimeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="flex items-center gap-2">
        {showMessage && (
          <button
            onClick={() => setIsChatBotOpen(true)}
            className={`flex items-center bg-darkBlue/90 backdrop-blur-2xl px-3 py-1.5 rounded-full shadow-lg font-semibold text-light hidden md:flex relative font-neue-roman
              ${isAnimating ? 'animate-slideInBounce' : ''}
              ${isVisible 
                ? 'opacity-100' 
                : 'opacity-0 pointer-events-none'
              }
            `}
          >
            <span className="text-[10px] md:text-xs">
              Chat with us!
            </span>
            {/* Arrow pointing to button */}
            <div className="absolute -right-1.5 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-6 border-l-darkBlue/90 border-t-3 border-t-transparent border-b-3 border-b-transparent"></div>
          </button>
        )}
        <button
          onClick={() => setIsChatBotOpen(true)}
          className={`p-2.5 text-light rounded-full transition-all duration-300 ${isChatBotOpen ? 'hidden' : ''} bg-darkBlue hover:bg-mediumBlue shadow-lg hover:shadow-xl`}
          title="Chatbot"
        >
          <MessageCircle className="size-8 md:size-10" strokeWidth={2} />
        </button>
        <ChatBot isOpen={isChatBotOpen} setIsOpen={setIsChatBotOpen} />
      </div>
    </div>
  );
}

export default ButtonMessageBot;

