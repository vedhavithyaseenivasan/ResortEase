"use client"

import { useState, useEffect, useRef } from "react"
import axios from "axios"
import "./ResortAssistant.css"
import { motion, AnimatePresence } from "framer-motion"

const ResortAssistant = () => {
  const [input, setInput] = useState("")
  const [chatLog, setChatLog] = useState([])
  const [loading, setLoading] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [typing, setTyping] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const [isHovering, setIsHovering] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)

  const cohereApiKey = "otHH8vB2RU6UgC8A6zmfnhpow1cpMMH6j7eKk3Ke"

  const handleInputChange = (e) => {
    setInput(e.target.value)
  }

  const chatWindowRef = useRef(null)
  const inputRef = useRef(null)

  const toggleChatbot = () => {
    setExpanded(!expanded)
    if (!expanded && inputRef.current) {
      setTimeout(() => {
        inputRef.current.focus()
      }, 500)
    }
    if (expanded === false) {
      setUnreadCount(0)
    }
  }

  const suggestions = [
    "Tell me about your rooms and rates",
    "What amenities do you offer?",
    "How can I book a spa appointment?",
    "What activities are available for kids?",
  ]

  // Default answers for common questions
  const getDefaultAnswer = (question) => {
    const lowerQuestion = question.toLowerCase()
    
    if (lowerQuestion.includes("rooms") || lowerQuestion.includes("rates")) {
      return `We offer a variety of luxurious accommodations to suit your needs:

1. Couple Room AC - Starting at ₹ 2,594/night
   • Double Bed
   • 110 sq.ft of elegant space

2. Couple Room AC - Starting at ₹ 2,594/night
   • Double Bed
   • 110 sq.ft of elegant space

3. Couple Room AC - Starting at ₹ 2,594/night
   • Double Bed
   • 110 sq.ft of elegant space

4. Couple Room AC - Starting at ₹ 2,594/night
   • Double Bed
   • 110 sq.ft of elegant space

5. Couple Room AC - Starting at ₹ 2,594/night
   • Double Bed
   • 110 sq.ft of elegant space

6. Couple Room AC - Starting at ₹ 2,594/night
   • Double Bed
   • 110 sq.ft of elegant space

All rooms include complimentary Wi-Fi, luxury toiletries. Would you like more details about a specific accommodation?`
    }
    
    if (lowerQuestion.includes("amenities")) {
      return `Our resort offers world-class amenities for an unforgettable stay:

• Three swimming pools (infinity, family, and adults-only)
• Full-service spa with 12 treatment rooms
• State-of-the-art fitness center with daily classes
• 18-hole championship golf course
• Tennis and pickleball courts
• Five distinctive restaurants and three bars
• Private beach access with water sports
• Kids club and teen lounge
• Complimentary high-speed Wi-Fi throughout the property
• 24-hour room service and LuxeGuide

Is there a specific amenity you'd like to know more about?`
    }
    
    if (lowerQuestion.includes("spa")) {
      return `Booking a spa appointment is easy and convenient:

1. Call our spa directly at 555-123-4567
2. Email us at spa@royalresort.com
3. Use our mobile app to view available times and book instantly
4. Visit the spa reception desk during your stay (open 8am-8pm)

I recommend booking at least 24 hours in advance to secure your preferred time. Our most popular treatments include the Royal Signature Massage (90 min), Rejuvenating Facial (60 min), and Detox Body Wrap (75 min).

Would you like me to assist with a specific booking?`
    }
    
    if (lowerQuestion.includes("kids") || lowerQuestion.includes("activities")) {
      return `We have numerous activities for children of all ages:

• Kids Club (ages 4-12): Daily supervised activities including arts & crafts, nature walks, and pool games
• Teen Zone (ages 13-17): Video games, table tennis, organized sports, and social events
• Family Adventures: Guided hiking, snorkeling tours, and wildlife spotting
• Pool activities: Water slides, splash pad, and scheduled pool games
• Mini golf course and playground
• Movie nights under the stars
• Cooking classes for young chefs
• Treasure hunts around the resort

All kids' activities are supervised by our trained staff. The Kids Club is open daily from 9am-5pm, with evening sessions available on request.

Would you like information about a specific activity?`
    }
    
    return null // Return null if no default answer matches
  }

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion)
    setShowSuggestions(false)
    handleSendMessage(suggestion, true)
  }

  const handleSendMessage = async (message, isPreset = false) => {
    const userMessage = message || input
    if (!userMessage) return

    const newChatLog = [...chatLog, { sender: "user", message: userMessage, time: new Date() }]
    setChatLog(newChatLog)
    setInput("")
    setLoading(true)
    setTyping(true)
    setShowSuggestions(false)

    // Check if we have a default answer for this question
    const defaultAnswer = getDefaultAnswer(userMessage)
    
    if (defaultAnswer && isPreset) {
      // Use default answer with a realistic typing delay
      const typingDelay = Math.min(2000, Math.max(1000, defaultAnswer.length * 5))
      
      setTimeout(() => {
        setChatLog([...newChatLog, { sender: "bot", message: defaultAnswer, time: new Date() }])
        setTyping(false)
        setLoading(false)
      }, typingDelay)
      return
    }

    try {
      const response = await axios.post(
        "https://api.cohere.ai/v1/chat",
        {
          model: "command-xlarge-nightly",
          message: userMessage,
          chat_history: [],
          temperature: 0.7,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cohereApiKey}`,
          },
        },
      )
      const botMessage = response.data.text.trim()

      const typingDelay = Math.min(1000, Math.max(500, botMessage.length * 10))

      setTimeout(() => {
        setChatLog([...newChatLog, { sender: "bot", message: botMessage, time: new Date() }])
        setTyping(false)
        setLoading(false)
        if (!expanded) {
          setUnreadCount(prev => prev + 1)
        }
      }, typingDelay)
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message)
      setTimeout(() => {
        setChatLog([
          ...newChatLog,
          {
            sender: "bot",
            message:
              "I apologize, but I'm having trouble connecting to our system. Please try again or contact our front desk at +91 98765 43210.",
            time: new Date(),
          },
        ])
        setTyping(false)
        setLoading(false)
        if (!expanded) {
          setUnreadCount(prev => prev + 1)
        }
      }, 1000)
    }
  }

  const handleSend = () => {
    handleSendMessage()
  }

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight
    }
  }, [chatLog, typing])

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && input && !loading) {
      handleSend()
    }
  }

  useEffect(() => {
    if (expanded && chatLog.length === 0) {
      setChatLog([
        {
          sender: "bot",
          message: "Welcome to Royal Castle Resort! I'm your personal LuxeGuide. How may I assist you with your stay today?",
          time: new Date(),
        },
      ])
    }
  }, [expanded, chatLog.length])

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const formatDate = (date) => {
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    
    if (date.toDateString() === today.toDateString()) {
      return "Today"
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday"
    } else {
      return date.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })
    }
  }

  return (
    <div className={`resort-assistant-container ${expanded ? "expanded" : ""}`}>
      <AnimatePresence mode="wait">
        {expanded ? (
          <motion.div
            className="resort-assistant-expanded"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.19, 1.0, 0.22, 1.0] }}
          >
            <div className="resort-assistant-header">
              <div className="resort-assistant-branding">
                <div className="resort-title">
                  <h2>Royal LuxeGuide</h2>
                  <p>Your Personal Assistant</p>
                </div>
              </div>
              <div className="resort-assistant-actions">
                <button className="resort-action-button" aria-label="Minimize" onClick={toggleChatbot}>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M18 15L12 9L6 15"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="resort-chat-window" ref={chatWindowRef}>
              <div className="resort-chat-date-divider">
                <span>{formatDate(new Date())}</span>
              </div>

              {chatLog.map((entry, index) => (
                <motion.div
                  key={index}
                  className={`resort-chat-message ${entry.sender}`}
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  {entry.sender === "bot" && (
                    <div className="resort-message-avatar">
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9 9H9.01"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M15 9H15.01"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                  <div className="resort-message-content">
                    <div className="resort-message-bubble">
                      <div className="resort-message-text">{entry.message}</div>
                    </div>
                    <div className="resort-message-meta">
                      <span className="resort-message-time">{formatTime(entry.time)}</span>
                      {entry.sender === "user" && (
                        <span className="resort-message-status">
                          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M20 6L9 17L4 12"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}

              {typing && (
                <motion.div
                  className="resort-chat-message bot"
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="resort-message-avatar">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9 9H9.01"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M15 9H15.01"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="resort-message-content">
                    <div className="resort-message-bubble">
                      <div className="resort-typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {showSuggestions && chatLog.length === 1 && (
                <div className="resort-suggestions">
                  <p>Quick questions you can ask:</p>
                  <div className="resort-suggestion-chips">
                    {suggestions.map((suggestion, index) => (
                      <motion.button
                        key={index}
                        className="resort-suggestion-chip"
                        onClick={() => handleSuggestionClick(suggestion)}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        whileHover={{ scale: 1.03, backgroundColor: "#f0f7ff" }}
                        whileTap={{ scale: 0.97 }}
                      >
                        {suggestion}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="resort-input-container">
              <div className="resort-input-wrapper">
                <input
                  type="text"
                  className="resort-chat-input"
                  value={input}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  disabled={loading}
                  ref={inputRef}
                />
                <motion.button
                  className={`resort-send-button ${!input || loading ? "disabled" : ""}`}
                  onClick={handleSend}
                  disabled={!input || loading}
                  whileHover={input && !loading ? { scale: 1.05 } : {}}
                  whileTap={input && !loading ? { scale: 0.95 } : {}}
                >
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M22 2L11 13"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M22 2L15 22L11 13L2 9L22 2Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.button>
              </div>
              <div className="resort-assistant-footer">
                <p>Royal Castle Resort • Available 24/7</p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            className="resort-floating-bubble-container"
            onHoverStart={() => setIsHovering(true)}
            onHoverEnd={() => setIsHovering(false)}
            onClick={toggleChatbot}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <motion.div
              className="resort-floating-bubble"
              animate={{
                rotate: isHovering ? [0, 10, -10, 10, -10, 0] : 0,
                scale: isHovering ? 1.1 : 1,
              }}
              transition={{
                rotate: { duration: 0.6 },
                scale: { duration: 0.2 }
              }}
            >
              <div className="resort-bubble-inner">
                <div className="resort-bubble-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                {unreadCount > 0 && (
                  <motion.div 
                    className="resort-unread-badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  >
                    {unreadCount}
                  </motion.div>
                )}
              </div>
            </motion.div>
            <motion.div
              className="resort-bubble-label"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: isHovering ? 1 : 0, x: isHovering ? 0 : 20 }}
              transition={{ duration: 0.3 }}
            >
              Need assistance?
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ResortAssistant