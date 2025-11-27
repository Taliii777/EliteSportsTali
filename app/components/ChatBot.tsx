'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X, Send, MessageCircle } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
  options?: string[];
}

interface ChatBotProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatBot: React.FC<ChatBotProps> = ({ isOpen, setIsOpen }) => {
  const getInitialMessage = (): Message => ({
    id: Date.now() + Math.random(),
    text: "Hi! I'm here to help you learn about Elite Sports Management. Are you an athlete, a brand/business, a padel club or organization, looking for event support, or something else?",
    isBot: true,
    timestamp: new Date(),
    options: [
      'I\'m an athlete',
      'I\'m a brand/business',
      'I\'m a club/organization',
      'Event support',
      'Something else'
    ],
  });

  const [messages, setMessages] = useState<Message[]>([getInitialMessage()]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const chatRef = useRef<HTMLDivElement | null>(null);

  // Reset messages when chat is opened
  useEffect(() => {
    if (isOpen) {
      setMessages([getInitialMessage()]);
      setInputMessage('');
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Function to render text with clickable links
  const renderTextWithLinks = (text: string) => {
    const parts: (string | React.ReactElement)[] = [];
    let lastIndex = 0;
    
    // Email pattern
    const emailPattern = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/g;
    // Phone pattern (with +1 or similar)
    const phonePattern = /(\+1\s?\(?\d{3}\)?\s?\d{3}[-.]?\d{4})/g;
    // Instagram pattern
    const instagramPattern = /(@[a-zA-Z0-9._-]+)/g;
    
    // Combine all patterns
    const allPatterns = [
      { pattern: emailPattern, type: 'email' },
      { pattern: phonePattern, type: 'phone' },
      { pattern: instagramPattern, type: 'instagram' }
    ];
    
    // Find all matches
    const matches: Array<{ index: number; length: number; text: string; type: string; url: string }> = [];
    
    allPatterns.forEach(({ pattern, type }) => {
      let match;
      while ((match = pattern.exec(text)) !== null) {
        let url = '';
        if (type === 'email') {
          url = `mailto:${match[0]}`;
        } else if (type === 'phone') {
          // Check if this phone number appears after "WhatsApp" or "💬"
          const beforeMatch = text.substring(Math.max(0, match.index - 20), match.index).toLowerCase();
          const isWhatsApp = beforeMatch.includes('whatsapp') || beforeMatch.includes('💬');
          
          const phoneNumber = match[0].replace(/\D/g, '');
          if (isWhatsApp) {
            url = `https://wa.me/${phoneNumber}`;
          } else {
            url = `tel:${phoneNumber}`;
          }
        } else if (type === 'instagram') {
          const username = match[0].substring(1); // Remove @
          url = `https://www.instagram.com/${username}/`;
        }
        matches.push({
          index: match.index,
          length: match[0].length,
          text: match[0],
          type,
          url
        });
      }
    });
    
    // Sort matches by index
    matches.sort((a, b) => a.index - b.index);
    
    // Remove overlapping matches (keep first)
    const nonOverlappingMatches: typeof matches = [];
    let lastEnd = 0;
    matches.forEach(match => {
      if (match.index >= lastEnd) {
        nonOverlappingMatches.push(match);
        lastEnd = match.index + match.length;
      }
    });
    
    // Build parts array
    nonOverlappingMatches.forEach((match, i) => {
      // Add text before match
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      
      // Add link
      const isExternalLink = match.type === 'instagram' || (match.type === 'phone' && match.url.startsWith('https://wa.me'));
      parts.push(
        <a
          key={`link-${i}`}
          href={match.url}
          target={isExternalLink ? '_blank' : undefined}
          rel={isExternalLink ? 'noopener noreferrer' : undefined}
          className="underline hover:opacity-80 font-semibold cursor-pointer"
        >
          {match.text}
        </a>
      );
      
      lastIndex = match.index + match.length;
    });
    
    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }
    
    return parts.length > 0 ? parts : text;
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (chatRef.current && !chatRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  const handleBotResponse = (userInput: string): Message => {
    const input = userInput.toLowerCase().trim();
    let response: Message;
    const messageId = Date.now() + Math.random(); // Unique ID

    // Check specific sub-options FIRST (exact matches have priority)
    // Athlete sub-options
    if (
      input === 'apply for representation'
    ) {
      response = {
        id: messageId,
        text: "To apply for representation, please submit your information via the Athlete Inquiry form on our website. We work with elite athletes, rising talent, and players who align with our performance and brand values. There's no upfront fee - compensation depends on structure, deliverables, and commissions.",
        isBot: true,
        timestamp: new Date(),
        options: ['Contact ESM', 'Back to main menu'],
      };
    } else if (
      input === 'learn about athlete services' ||
      input === 'learn more about services'
    ) {
      response = {
        id: messageId,
        text: "ESM offers athletes:\n• Brand partnerships\n• Sponsorship negotiation\n• Career strategy\n• Content collaboration\n• Event representation\n\nWe actively pitch athletes to aligned brands and negotiate deals on their behalf. We also support brand positioning, partnerships, and long-term visibility strategies.",
        isBot: true,
        timestamp: new Date(),
        options: ['Contact ESM', 'Back to main menu'],
      };
    } else if (
      input === 'sponsorship & partnerships'
    ) {
      response = {
        id: messageId,
        text: "Yes! ESM actively pitches athletes to aligned brands and negotiates deals on their behalf. We can help expand existing partnerships or manage new opportunities. We work with wellness, lifestyle, health tech, sportswear, beverages, hospitality, travel, and consumer brands.",
        isBot: true,
        timestamp: new Date(),
        options: ['Contact ESM', 'Back to main menu'],
      };
    } else if (
      input === 'social media & branding help'
    ) {
      response = {
        id: messageId,
        text: "Absolutely! ESM supports brand positioning, partnerships, and long-term visibility strategies. We help athletes build their personal brand through strategic partnerships and content collaboration.",
        isBot: true,
        timestamp: new Date(),
        options: ['Contact ESM', 'Back to main menu'],
      };
    }
    // Brand sub-options
    else if (
      input === 'sponsor an athlete'
    ) {
      response = {
        id: messageId,
        text: "ESM connects brands with elite athletes for high-impact sponsorships. We identify goals, match brands with athletes, build sponsorship packages, and execute activations. Packages include brand visibility, athlete deliverables, content, hospitality, signage, and product placement.",
        isBot: true,
        timestamp: new Date(),
        options: ['Contact ESM', 'Back to main menu'],
      };
    } else if (
      input === 'sponsor an event'
    ) {
      response = {
        id: messageId,
        text: "ESM creates sponsorship opportunities for tournaments, leagues, influencer activations, exhibitions, corporate experiences, and club events. We create decks, pitch partners, negotiate deals, and manage deliverables. Brands can activate with branded courts, product areas, sampling, signage, and athlete interactions.",
        isBot: true,
        timestamp: new Date(),
        options: ['Contact ESM', 'Back to main menu'],
      };
    } else if (
      input === 'enter the padel market'
    ) {
      response = {
        id: messageId,
        text: "Absolutely! ESM guides brands from strategy to execution in the padel market. We work with wellness, lifestyle, health tech, sportswear, beverages, hospitality, travel, and consumer brands. We can help with custom activation concepts tailored to your brand goals.",
        isBot: true,
        timestamp: new Date(),
        options: ['Contact ESM', 'Back to main menu'],
      };
    } else if (
      input === 'create a custom activation'
    ) {
      response = {
        id: messageId,
        text: "Yes! ESM designs bespoke experiences tailored to brand goals. We handle concept development, deck creation, sponsor pitching, logistics support, and on-site execution. We can also bring top U.S. athletes to events and coordinate appearances, exhibitions, or meet-and-greet moments.",
        isBot: true,
        timestamp: new Date(),
        options: ['Contact ESM', 'Back to main menu'],
      };
    } else if (
      input === 'see partnership examples'
    ) {
      response = {
        id: messageId,
        text: "ESM has worked with various brands across wellness, lifestyle, health tech, sportswear, beverages, hospitality, travel, and consumer sectors. Our partnerships include athlete sponsorships, event activations, custom brand experiences, and long-term collaborations. For specific examples and case studies, please reach out to us directly.",
        isBot: true,
        timestamp: new Date(),
        options: ['Contact ESM', 'Back to main menu'],
      };
    }
    // Club sub-options
    else if (
      input === 'secure sponsorship'
    ) {
      response = {
        id: messageId,
        text: "ESM helps clubs secure sponsorships through deck creation, partner pitching, deal negotiation, and deliverable management. We create professional, branded sponsorship and event decks. We offer both event-based and long-term partnership structures.",
        isBot: true,
        timestamp: new Date(),
        options: ['Contact ESM', 'Back to main menu'],
      };
    } else if (
      input === 'build partnerships'
    ) {
      response = {
        id: messageId,
        text: "Yes! ESM facilitates sustainable corporate partnerships and community-building collaborations. We help clubs form long-term partnerships and manage everything from onboarding to renewals and year-long deliverables.",
        isBot: true,
        timestamp: new Date(),
        options: ['Contact ESM', 'Back to main menu'],
      };
    } else if (
      input === 'host an event'
    ) {
      response = {
        id: messageId,
        text: "ESM supports event production, coordination, and sponsor integration at clubs. We host networking events, influencer activations, exhibition matches, panel discussions, and branded experiences. We can also bring athletes to your club and handle social media content including photography, videography, and influencer distribution.",
        isBot: true,
        timestamp: new Date(),
        options: ['Contact ESM', 'Back to main menu'],
      };
    } else if (
      input === 'bring athletes to the club'
    ) {
      response = {
        id: messageId,
        text: "Yes! ESM works with top U.S. athletes and can coordinate appearances, exhibitions, or meet-and-greet moments at your club. We can also help with hospitality partners including food, beverage, wellness vendors, and brand sampling partners.",
        isBot: true,
        timestamp: new Date(),
        options: ['Contact ESM', 'Back to main menu'],
      };
    }
    // Event sub-options
    else if (
      input === 'what type of event?'
    ) {
      response = {
        id: messageId,
        text: "ESM produces various event types:\n• Athlete events\n• Club activations\n• Influencer experiences\n• Corporate engagements\n• Tournaments and leagues\n• Exhibition matches\n• Networking events\n\nWe handle concept development, logistics, and on-site execution.",
        isBot: true,
        timestamp: new Date(),
        options: ['Contact ESM', 'Back to main menu'],
      };
    } else if (
      input === 'looking for athletes?'
    ) {
      response = {
        id: messageId,
        text: "Yes! ESM works with top U.S. athletes and can coordinate appearances, exhibitions, or meet-and-greet moments at your event. We can also help with content planning, photography, videography, and influencer distribution.",
        isBot: true,
        timestamp: new Date(),
        options: ['Contact ESM', 'Back to main menu'],
      };
    } else if (
      input === 'looking for sponsors?'
    ) {
      response = {
        id: messageId,
        text: "ESM creates sponsorship opportunities and packages for events. We pitch partners, negotiate deals, and manage deliverables. Sponsorship packages are priced based on event type, audience reach, athlete visibility, and deliverables. Brands receive reporting after events including metrics, impressions, content performance, and outcome summaries.",
        isBot: true,
        timestamp: new Date(),
        options: ['Contact ESM', 'Back to main menu'],
      };
    } else if (
      input === 'need a deck or concept?'
    ) {
      response = {
        id: messageId,
        text: "Yes! ESM creates professional, branded sponsorship and event decks. We handle concept development, deck creation, and can manage everything from initial concept to execution. We also provide strategic guidance for brands and clubs looking to activate within the padel space.",
        isBot: true,
        timestamp: new Date(),
        options: ['Contact ESM', 'Back to main menu'],
      };
    }
    // General/About ESM
    else if (
      input === 'what is esm?'
    ) {
      response = {
        id: messageId,
        text: "Elite Sports Management (ESM) is a sports management and brand partnership agency specializing in padel athletes, clubs, and event activations. We blend athlete experience with high-level brand strategy, offering a boutique, performance-first approach to partnerships.",
        isBot: true,
        timestamp: new Date(),
        options: ['Contact ESM', 'Back to main menu'],
      };
    } else if (
      input === 'who founded esm?'
    ) {
      response = {
        id: messageId,
        text: "ESM was founded by Dhanielly Quevedo, a top-ranked U.S. padel athlete and corporate communications professional. This unique combination brings both athlete experience and high-level brand strategy to every partnership.",
        isBot: true,
        timestamp: new Date(),
        options: ['Contact ESM', 'Back to main menu'],
      };
    } else if (
      input === 'what makes esm unique?'
    ) {
      response = {
        id: messageId,
        text: "ESM blends athlete experience with high-level brand strategy, offering a boutique, performance-first approach to partnerships. We're based in South Florida but operate nationwide, with partnerships and activations across the U.S. While padel is our core, we also support lifestyle, wellness, sports, and community-focused projects.",
        isBot: true,
        timestamp: new Date(),
        options: ['Contact ESM', 'Back to main menu'],
      };
    }
    // Contact form option
    else if (
      input === 'contact form' ||
      input.includes('contact form')
    ) {
      response = {
        id: messageId,
        text: "You can find our contact information in the footer, or reach us directly at:\n\n📧 Email: dhany@elitesportsmgt.com\n📱 Phone: +1 (954) 857-6541\n💬 WhatsApp: +1 (954) 857-6541\n📷 Instagram: @elitesportsmanagement__\n\nYou can also use the contact form on our website. Someone from our team will respond typically within a few days after confirming scope.",
        isBot: true,
        timestamp: new Date(),
        options: [
          'Send email',
          'Open WhatsApp',
          'Open Instagram',
          'Back to main menu'
        ],
      };
    }
    // Contact options
    else if (
      input === 'send email' ||
      input === 'email'
    ) {
      window.open('mailto:dhany@elitesportsmgt.com');
      response = {
        id: messageId,
        text: "I've opened your email client. Feel free to reach out to dhany@elitesportsmgt.com with any questions!",
        isBot: true,
        timestamp: new Date(),
        options: ['Contact ESM', 'Back to main menu'],
      };
    } else if (
      input === 'open whatsapp' ||
      input === 'whatsapp'
    ) {
      const message = encodeURIComponent('Hi, I\'d like to learn more about ESM\'s services.');
      window.open(`https://wa.me/19548576541?text=${message}`, '_blank');
      response = {
        id: messageId,
        text: "I've opened WhatsApp for you. You can reach us at +1 (954) 857-6541!",
        isBot: true,
        timestamp: new Date(),
        options: ['Contact ESM', 'Back to main menu'],
      };
    } else if (
      input === 'open instagram' ||
      input === 'instagram'
    ) {
      window.open('https://www.instagram.com/elitesportsmanagement__/', '_blank');
      response = {
        id: messageId,
        text: "I've opened our Instagram page. Follow us @elitesportsmanagement__ for updates!",
        isBot: true,
        timestamp: new Date(),
        options: ['Contact ESM', 'Back to main menu'],
      };
    } else if (
      input === 'contact esm' ||
      input === 'contact'
    ) {
      response = {
        id: messageId,
        text: "You can reach ESM through:\n\n📧 Email: dhany@elitesportsmgt.com\n📱 Phone: +1 (954) 857-6541\n💬 WhatsApp: +1 (954) 857-6541\n📷 Instagram: @elitesportsmanagement__\n\nYou can also use the contact form on our website. Someone from our team will respond typically within a few days after confirming scope.",
        isBot: true,
        timestamp: new Date(),
        options: [
          'Send email',
          'Open WhatsApp',
          'Open Instagram',
          'Back to main menu'
        ],
      };
    }
    // Back to main menu
    else if (
      input === 'back to main menu' ||
      input === 'main menu' ||
      input === 'menu'
    ) {
      response = {
        id: messageId,
        text: "Hi! I'm here to help you learn about Elite Sports Management. Are you an athlete, a brand/business, a padel club or organization, looking for event support, or something else?",
        isBot: true,
        timestamp: new Date(),
        options: [
          'I\'m an athlete',
          'I\'m a brand/business',
          'I\'m a club/organization',
          'Event support',
          'Something else'
        ],
      };
    }
    // Initial identification (general matches - check AFTER specific options)
    else if (
      input === "i'm an athlete" ||
      input === 'athlete' ||
      (input.includes('athlete') && !input.includes('apply') && !input.includes('learn') && !input.includes('sponsorship') && !input.includes('social') && !input.includes('representation') && !input.includes('services') && !input.includes('branding'))
    ) {
      response = {
        id: messageId,
        text: "Great! I'd love to help you learn about athlete representation at ESM. What would you like to know?",
        isBot: true,
        timestamp: new Date(),
        options: [
          'Apply for representation',
          'Learn about athlete services',
          'Sponsorship & partnerships',
          'Social media & branding help',
          'Contact ESM',
          'Back to main menu'
        ],
      };
    } else if (
      input === "i'm a brand/business" ||
      input === 'brand' ||
      input === 'business' ||
      (input.includes('brand') && !input.includes('sponsor') && !input.includes('partnership') && !input.includes('activation')) ||
      (input.includes('business') && !input.includes('sponsor') && !input.includes('partnership') && !input.includes('activation'))
    ) {
      response = {
        id: messageId,
        text: "Perfect! ESM helps brands create impactful partnerships in the padel space. What are you interested in?",
        isBot: true,
        timestamp: new Date(),
        options: [
          'Sponsor an athlete',
          'Sponsor an event',
          'Enter the padel market',
          'Create a custom activation',
          'See partnership examples',
          'Contact ESM',
          'Back to main menu'
        ],
      };
    } else if (
      input === "i'm a club/organization" ||
      input === 'club' ||
      input === 'organization' ||
      (input.includes('club') && !input.includes('sponsorship') && !input.includes('partnership') && !input.includes('event') && !input.includes('athletes')) ||
      (input.includes('organization') && !input.includes('sponsorship') && !input.includes('partnership') && !input.includes('event') && !input.includes('athletes'))
    ) {
      response = {
        id: messageId,
        text: "Excellent! ESM supports padel clubs and organizations with sponsorship, events, and partnerships. What can we help you with?",
        isBot: true,
        timestamp: new Date(),
        options: [
          'Secure sponsorship',
          'Build partnerships',
          'Host an event',
          'Bring athletes to the club',
          'Contact ESM',
          'Back to main menu'
        ],
      };
    } else if (
      input === 'event support' ||
      (input === 'event' && !input.includes('type') && !input.includes('athletes') && !input.includes('sponsors') && !input.includes('deck') && !input.includes('concept')) ||
      (input.includes('event') && !input.includes('type') && !input.includes('athletes') && !input.includes('sponsors') && !input.includes('deck') && !input.includes('concept')) ||
      (input.includes('activation') && !input.includes('custom') && !input.includes('create'))
    ) {
      response = {
        id: messageId,
        text: "ESM produces athlete events, club activations, and corporate engagements. What type of event support do you need?",
        isBot: true,
        timestamp: new Date(),
        options: [
          'What type of event?',
          'Looking for athletes?',
          'Looking for sponsors?',
          'Need a deck or concept?',
          'Contact ESM',
          'Back to main menu'
        ],
      };
    } else if (
      input === 'something else' ||
      input === 'general' ||
      input.includes('help') ||
      input.includes('faq') ||
      input.includes('about')
    ) {
      response = {
        id: messageId,
        text: "I'm here to help! What would you like to know?",
        isBot: true,
        timestamp: new Date(),
        options: [
          'What is ESM?',
          'Who founded ESM?',
          'What makes ESM unique?',
          'Contact form',
          'Back to main menu'
        ],
      };
    }
    // Default response
    else {
      response = {
        id: messageId,
        text: "I'm not sure I understood that. Could you please select one of the options below, or try rephrasing your question?",
        isBot: true,
        timestamp: new Date(),
        options: ['Back to main menu', 'Contact ESM'],
      };
    }

    return response;
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now() + Math.random(), // Use timestamp + random for unique IDs
      text: inputMessage,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const messageText = inputMessage;
    setInputMessage('');

    setTimeout(() => {
      const botResponse = handleBotResponse(messageText);
      setMessages((prev) => {
        // Prevent duplicate bot responses
        const lastBotMessage = prev[prev.length - 1];
        if (lastBotMessage && lastBotMessage.isBot && lastBotMessage.text === botResponse.text) {
          return prev;
        }
        return [...prev, botResponse];
      });
    }, 1000);
  };

  const handleOptionClick = (option: string) => {
    // Prevent duplicate clicks
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && !lastMessage.isBot && lastMessage.text === option) {
      return;
    }

    const userMessage: Message = {
      id: Date.now() + Math.random(), // Use timestamp + random for unique IDs
      text: option,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      const botResponse = handleBotResponse(option);
      setMessages((prev) => {
        // Prevent duplicate bot responses
        const lastBotMessage = prev[prev.length - 1];
        if (lastBotMessage && lastBotMessage.isBot && lastBotMessage.text === botResponse.text) {
          return prev;
        }
        return [...prev, botResponse];
      });
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed bottom-0 right-0 z-50 w-full sm:w-80 h-[450px] bg-light
        shadow-[0_-8px_32px_rgba(0,0,0,0.15),_-5px_0_15px_rgba(0,0,0,0.1),_5px_0_15px_rgba(0,0,0,0.1)]
        transition-transform duration-300 transform 
        sm:rounded-t-2xl
        ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
      ref={chatRef}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3 bg-darkBlue text-light sm:rounded-t-2xl">
        <div className="flex items-center gap-2">
          <MessageCircle className="size-6 md:size-7" strokeWidth={2} />
          <h3 className="font-semibold font-neue-roman text-sm">ESM Assistant</h3>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="p-1 hover:bg-mediumBlue rounded-full transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Messages Container */}
      <div className="flex-1 p-3 h-[calc(450px-6rem)] overflow-y-auto">
        <div className="space-y-3">
          {messages.map((message) => (
            <div key={message.id}>
              <div className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                <div
                  className={`max-w-[85%] p-2 rounded-lg ${
                    message.isBot
                      ? 'bg-lightBlue text-darkBlue'
                      : 'bg-darkBlue text-light'
                  }`}
                >
                  <p className="text-xs whitespace-pre-line font-neue-roman leading-relaxed">
                    {renderTextWithLinks(message.text)}
                  </p>
                  <span className="text-[10px] opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </div>
              {message.isBot && message.options && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {message.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleOptionClick(option)}
                      className="text-[10px] px-2 py-1 bg-mediumBlue text-light 
                        rounded-full hover:bg-darkBlue 
                        transition-colors font-neue-roman"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Form */}
      <form
        onSubmit={handleSendMessage}
        className="absolute bottom-0 left-0 right-0 p-3 bg-light border-t border-darkBlue/20"
      >
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-1.5 text-xs border border-darkBlue/30 rounded-lg bg-light 
              text-darkBlue placeholder-darkBlue/50 font-neue-roman focus:outline-none focus:ring-2 focus:ring-mediumBlue"
          />
          <button
            type="submit"
            className="p-1.5 bg-darkBlue text-light rounded-lg hover:bg-mediumBlue 
              transition-colors"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatBot;

