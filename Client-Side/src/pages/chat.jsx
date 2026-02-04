import React, { useState, useEffect, useRef } from 'react';
import { Bot, Clock, Paperclip, Send, User, History } from 'lucide-react';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { sendChatMessage, getChatHistory } from '../services/api';
import { useAuth } from '../context/AuthContext';
import "../assets/css/chat.css";

const ChatAssistant = () => {
  const { user, isAuthenticated } = useAuth();
  const [init, setInit] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! I'm NEOS AI Assistant. I can help you with course information, schedules, assignments, grades, and more. How can I assist you today?",
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [historyLoaded, setHistoryLoaded] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const particleOptions = {
    fpsLimit: 120,
    particles: {
      color: { value: "#37b6ff" },
      number: { value: 100, density: { enable: true, area: 900 } },
      opacity: {
        value: { min: 0.1, max: 0.7 },
        animation: { enable: true, speed: 1, sync: false }
      },
      shape: { type: "circle" },
      size: { value: { min: 3, max: 5 } },
      links: { enable: false },
      move: {
        enable: true,
        speed: 1.5,
        direction: "none",
        random: true,
        straight: false,
        outModes: { default: "out" },
      },
    },
    interactivity: {
      events: { onHover: { enable: true, mode: "repulse" } },
      modes: { repulse: { distance: 100, duration: 0.4 } },
    },
    detectRetina: true,
  };

  const handleLoadHistory = async () => {
    if (!isAuthenticated || historyLoaded || loadingHistory) return;

    setLoadingHistory(true);
    try {
      const response = await getChatHistory();

      if (response.success && response.messages.length > 0) {
        // Format messages from database
        const formattedMessages = response.messages.map(msg => ({
          role: msg.role,
          content: msg.content,
          timestamp: new Date(msg.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        }));

        // Replace current messages with history
        setMessages(formattedMessages);
        setHistoryLoaded(true);
      }
    } catch (error) {
      console.error('Error loading chat history:', error);
      // Show error message in chat
      const errorMessage = {
        role: "assistant",
        content: "Sorry, I couldn't load your chat history. Please try again.",
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoadingHistory(false);
    }
  };

  const handleSendMessage = async (messageText = input) => {
    if (!messageText.trim() || loading) return;

    const userMessage = {
      role: "user",
      content: messageText.trim(),
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };

    // Add user message to chat
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      
      const apiMessages = [...messages, userMessage].map(({ role, content }) => ({
        role,
        content
      }));

      
      const response = await sendChatMessage(apiMessages);

      if (response.success) {
        const assistantMessage = {
          role: "assistant",
          content: response.reply,
          timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        throw new Error("Failed to get response");
      }
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage = {
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again later.",
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    handleSendMessage(suggestion);
  };

  return (
    <div className="chat-container-wrapper">
      {init && (
        <Particles
          id="tsparticles"
          options={particleOptions}
          className="particles-canvas"
        />
      )}

      <div className="chat-container">
        {/* Show History Button */}
        {isAuthenticated && !historyLoaded && (
          <div style={{ padding: '10px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <button
              onClick={handleLoadHistory}
              disabled={loadingHistory}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '8px',
                cursor: loadingHistory ? 'not-allowed' : 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                margin: '0 auto',
                opacity: loadingHistory ? 0.7 : 1,
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                if (!loadingHistory) {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.4)';
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              <History size={18} />
              {loadingHistory ? 'Loading History...' : 'Show Chat History'}
            </button>
          </div>
        )}

        {/* Message Area */}
        <div className="chat-window">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message-row ${message.role === 'assistant' ? 'bot-message' : 'user-message'}`}
            >
              <div className={message.role === 'assistant' ? 'bot-avatar' : 'user-avatar'}>
                {message.role === 'assistant' ? (
                  <Bot size={20} className="text-white" />
                ) : (
                  <User size={20} className="text-white" />
                )}
              </div>
              <div className="message-content-wrapper">
                <div className="message-bubble">
                  <p>{message.content}</p>
                </div>
                <span className="message-time">
                  <Clock size={12} /> {message.timestamp}
                </span>
              </div>
            </div>
          ))}

          {loading && (
            <div className="message-row bot-message">
              <div className="bot-avatar">
                <Bot size={20} className="text-white" />
              </div>
              <div className="message-content-wrapper">
                <div className="message-bubble">
                  <p className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </p>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="chat-input-section">
          <div className="input-row">
            <button className="icon-action-btn" title="Attach file">
              <Paperclip size={20} />
            </button>

            <div className="input-wrapper">
              <input
                type="text"
                placeholder="Ask me anything about courses, schedules, grades..."
                className="text-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={loading}
              />
            </div>

            <button
              className="send-btn"
              onClick={() => handleSendMessage()}
              disabled={!input.trim() || loading}
            >
              <Send size={20} />
            </button>
          </div>

          {/* Quick Suggestions */}
          <div className="suggestions-row">
            <button
              className="suggestion-chip"
              onClick={() => handleSuggestionClick("What are my grades?")}
              disabled={loading}
            >
              What are my grades?
            </button>
            <button
              className="suggestion-chip"
              onClick={() => handleSuggestionClick("Show schedule")}
              disabled={loading}
            >
              Show schedule
            </button>
            <button
              className="suggestion-chip"
              onClick={() => handleSuggestionClick("Pending assignments")}
              disabled={loading}
            >
              Pending assignments
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatAssistant;