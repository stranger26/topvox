import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Mic, 
  MicOff, 
  Send, 
  Bot, 
  User, 
  Volume2, 
  VolumeX,
  RotateCcw
} from 'lucide-react'
import { useUserStore } from '../store/userStore'

interface Message {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: Date
  isTyping?: boolean
}

interface AITrainerProps {
  onExperienceGain?: (points: number) => void
  onAchievementUnlock?: (achievement: string) => void
}

const AITrainer: React.FC<AITrainerProps> = ({ onExperienceGain, onAchievementUnlock }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hi! I'm your AI Communication Trainer. I'm here to help you develop your speaking skills. What would you like to work on today?",
      timestamp: new Date()
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { user, updateExperience, addAchievement } = useUserStore()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const trainerPersonalities = {
    encouraging: {
      name: "Coach Sarah",
      avatar: "👩‍🏫",
      style: "encouraging and supportive",
      responses: [
        "That's a great start! Let's build on that foundation.",
        "I can see you're making progress. Keep going!",
        "Excellent point! You're really getting the hang of this.",
        "Don't worry about perfection - focus on improvement.",
        "You're doing better than you think. Trust yourself!"
      ]
    },
    analytical: {
      name: "Dr. Marcus",
      avatar: "👨‍💼",
      style: "analytical and data-driven",
      responses: [
        "Let's analyze your speaking patterns and identify areas for improvement.",
        "Based on your performance, I recommend focusing on these key areas.",
        "Your pace is good, but let's work on your vocal variety.",
        "I've noticed some filler words. Here's how to reduce them.",
        "Your structure is solid. Now let's enhance your delivery."
      ]
    },
    creative: {
      name: "Alex",
      avatar: "🎭",
      style: "creative and innovative",
      responses: [
        "Let's try a different approach to make your message more engaging.",
        "How about we add some storytelling elements to your presentation?",
        "I have a creative exercise that will help you connect with your audience.",
        "Let's experiment with different speaking styles to find your voice.",
        "Here's a unique technique that will make you stand out."
      ]
    }
  }

  const [currentPersonality, setCurrentPersonality] = useState<keyof typeof trainerPersonalities>('encouraging')

  const generateAIResponse = (userMessage: string): string => {
    const personality = trainerPersonalities[currentPersonality]
    const responses = personality.responses
    const randomResponse = responses[Math.floor(Math.random() * responses.length)]
    
    // Add some context-aware responses
    if (userMessage.toLowerCase().includes('nervous') || userMessage.toLowerCase().includes('anxious')) {
      return "I understand that feeling nervous is completely normal. Let's work on some breathing techniques and confidence-building exercises. Remember, even the most experienced speakers feel nervous sometimes. The key is to channel that energy into enthusiasm!"
    }
    
    if (userMessage.toLowerCase().includes('practice') || userMessage.toLowerCase().includes('exercise')) {
      return "Great! Practice is the key to improvement. Let's start with a simple exercise. Try speaking about your favorite topic for 2 minutes. I'll give you feedback on your pace, clarity, and engagement. Ready to begin?"
    }
    
    if (userMessage.toLowerCase().includes('feedback') || userMessage.toLowerCase().includes('how am i')) {
      return "Based on what I've observed, you're showing good potential! Your enthusiasm comes through clearly. Let's work on pacing - try slowing down slightly and adding more pauses for emphasis. Would you like to try a specific exercise?"
    }
    
    return randomResponse
  }

  const handleSendMessage = async () => {
    if (!inputText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputText,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsTyping(true)

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputText)
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, aiMessage])
      setIsTyping(false)
      
      // Award experience points
      const points = Math.floor(Math.random() * 20) + 10
      updateExperience(points)
      onExperienceGain?.(points)

      // Check for achievements
      if (messages.length >= 5 && !user?.achievements.includes('Chatterbox')) {
        addAchievement('Chatterbox')
        onAchievementUnlock?.('Chatterbox')
      }
    }, 1000 + Math.random() * 2000)
  }

  const handleVoiceInput = () => {
    if (!isListening) {
      // Start voice recognition
      setIsListening(true)
      // Simulate voice input
      setTimeout(() => {
        setInputText("I'd like to practice my presentation skills")
        setIsListening(false)
      }, 2000)
    } else {
      setIsListening(false)
    }
  }

  const handleVoiceOutput = () => {
    if (!isSpeaking) {
      setIsSpeaking(true)
      // Simulate text-to-speech
      setTimeout(() => {
        setIsSpeaking(false)
      }, 3000)
    } else {
      setIsSpeaking(false)
    }
  }

  const resetConversation = () => {
    setMessages([{
      id: '1',
      type: 'ai',
      content: "Hi! I'm your AI Communication Trainer. I'm here to help you develop your speaking skills. What would you like to work on today?",
      timestamp: new Date()
    }])
  }

  return (
    <div className="flex flex-col h-full">
      {/* Trainer Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white rounded-t-xl">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
            <span className="text-2xl">{trainerPersonalities[currentPersonality].avatar}</span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{trainerPersonalities[currentPersonality].name}</h3>
            <p className="text-sm text-gray-600">AI Communication Trainer</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={resetConversation}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            title="Reset conversation"
          >
            <RotateCcw className="h-5 w-5" />
          </button>
          <div className="flex items-center space-x-1">
            {Object.keys(trainerPersonalities).map((personality) => (
              <button
                key={personality}
                onClick={() => setCurrentPersonality(personality as keyof typeof trainerPersonalities)}
                className={`px-3 py-1 text-xs rounded-full transition-colors ${
                  currentPersonality === personality
                    ? 'bg-primary-100 text-primary-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {personality}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${
                message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.type === 'user' 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-white border border-gray-200'
                }`}>
                  {message.type === 'user' ? (
                    <User className="h-4 w-4" />
                  ) : (
                    <Bot className="h-4 w-4 text-primary-600" />
                  )}
                </div>
                <div className={`px-4 py-2 rounded-lg ${
                  message.type === 'user'
                    ? 'bg-primary-600 text-white'
                    : 'bg-white border border-gray-200'
                }`}>
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.type === 'user' ? 'text-primary-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center">
                <Bot className="h-4 w-4 text-primary-600" />
              </div>
              <div className="bg-white border border-gray-200 px-4 py-2 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-200 bg-white rounded-b-xl">
        <div className="flex items-center space-x-2">
          <div className="flex-1 flex items-center space-x-2">
            <button
              onClick={handleVoiceInput}
              className={`p-2 rounded-lg transition-colors ${
                isListening 
                  ? 'bg-red-100 text-red-600' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              title="Voice input"
            >
              {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </button>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message or use voice input..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <button
              onClick={handleVoiceOutput}
              className={`p-2 rounded-lg transition-colors ${
                isSpeaking 
                  ? 'bg-green-100 text-green-600' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              title="Voice output"
            >
              {isSpeaking ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </button>
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim()}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
        
        {/* Quick Actions */}
        <div className="mt-3 flex flex-wrap gap-2">
          {[
            "I want to practice public speaking",
            "Help me with presentation skills",
            "I'm feeling nervous about speaking",
            "Give me feedback on my delivery"
          ].map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => setInputText(suggestion)}
              className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AITrainer
