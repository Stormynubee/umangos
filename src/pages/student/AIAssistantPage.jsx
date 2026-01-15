import React, { useState, useRef, useEffect } from 'react'
import { Brain, Send, Lightbulb, BookOpen, Calculator, Beaker, Globe, MessageCircle, Sparkles } from 'lucide-react'

function AIAssistantPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      content: 'Hello! I\'m your AI Study Assistant. I can help you with homework, explain concepts, generate practice questions, and provide study tips. What would you like help with today?',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const quickActions = [
    { icon: Calculator, label: 'Math Help', query: 'Help me solve a math problem' },
    { icon: Beaker, label: 'Science Concepts', query: 'Explain a science concept' },
    { icon: BookOpen, label: 'Study Tips', query: 'Give me study tips' },
    { icon: Globe, label: 'History Facts', query: 'Tell me about a historical event' }
  ]

  const subjects = [
    { name: 'Mathematics', icon: <Calculator className="w-5 h-5" />, color: 'blue' },
    { name: 'Science', icon: <Beaker className="w-5 h-5" />, color: 'green' },
    { name: 'English', icon: <BookOpen className="w-5 h-5" />, color: 'purple' },
    { name: 'History', icon: <Globe className="w-5 h-5" />, color: 'orange' },
    { name: 'Geography', icon: <Globe className="w-5 h-5" />, color: 'teal' }
  ]

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const generateAIResponse = (userQuery) => {
    // Simulated AI responses based on keywords
    const query = userQuery.toLowerCase()

    // Greetings
    if (query.match(/^(hi|hello|hey|greetings)/)) {
      return "Hello there! 👋 I'm ready to help you study. What subject are we tackling today?"
    }

    if (query.includes('math') || query.includes('solve') || query.includes('calculate') || query.match(/\d+\s*[\+\-\*\/]\s*\d+/)) {
      return "I see a math problem! 🧮 \n\nTo solve this:\n1. Identify the operator\n2. Break it down step-by-step\n3. Check your work\n\n(Example: For 5x + 3 = 18, subtract 3 first, then divide by 5 to get x = 3). \n\nShare the specific numbers and I'll help you solve it!"
    }

    if (query.includes('science') || query.includes('physics') || query.includes('chemistry') || query.includes('biology')) {
      return "Science time! 🧪 \nWhether it's Newton's laws, chemical bonds, or cell structure, I can help. \n\nTry asking: 'Explain photosynthesis' or 'What is Newton's first law?'"
    }

    if (query.includes('history') || query.includes('war') || query.includes('empire') || query.includes('king') || query.includes('queen')) {
      return "Travel back in time! 🕰️ \nI can help with dates, causes, and effects of major historical events. \n\nExample: 'Why did WWI start?' or 'Who was Ashoka?'"
    }

    if (query.includes('study') || query.includes('tips') || query.includes('focus') || query.includes('tired')) {
      return "Here are some proven study boost tips: 🚀\n\n1. **Pomodoro:** Study 25m, Break 5m.\n2. **Active Recall:**  Test yourself instead of just re-reading.\n3. **Feynman Technique:** Explain the concept simply as if to a child.\n4. **Hydrate:** Drink water to keep your brain sharp!"
    }

    if (query.includes('essay') || query.includes('write') || query.includes('grammar')) {
      return "Writing Assistant mode: ✍️\n\n- **Thesis:** Make a clear claim.\n- **Body:** Support with evidence.\n- **Conclusion:** Summarize and reflect.\n\nNeed help with a specific topic? Just paste your draft!"
    }

    if (query.length < 5) {
      return "Could you elaborate a bit? I'm listening! 👂"
    }

    // Dynamic Default response
    const defaults = [
      "That's an interesting topic! 🧐 Could you tell me more so I can give the best answer?",
      "I'm not 100% sure about that specifically, but I can help you research it! 📚 What are the key terms?",
      "Great question. To give you the best help, could you clarify which subject this falls under? (Math, Science, History, etc.)"
    ]
    return defaults[Math.floor(Math.random() * defaults.length)]
  }

  const handleSendMessage = (text = inputMessage) => {
    if (text.trim()) {
      // Add user message
      const userMessage = {
        id: Date.now(),
        type: 'user',
        content: text,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, userMessage])
      setInputMessage('')
      setIsTyping(true)

      // Simulate AI thinking time
      setTimeout(() => {
        const aiResponse = {
          id: Date.now() + 1,
          type: 'assistant',
          content: generateAIResponse(text),
          timestamp: new Date()
        }

        setMessages(prev => [...prev, aiResponse])
        setIsTyping(false)
      }, 1000 + Math.random() * 1000)
    }
  }

  const handleQuickAction = (query) => {
    handleSendMessage(query)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-xl">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">AI Study Assistant</h1>
              <p className="text-white/70 text-lg">Your personal learning companion</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-white/70 text-sm">Developed by Hansraj</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="space-y-4">
            {/* Quick Actions */}
            <div className="glass-effect rounded-2xl p-6 border border-white/10">
              <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                <span>Quick Help</span>
              </h3>
              <div className="space-y-2">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickAction(action.query)}
                    className="w-full bg-white/5 hover:bg-white/10 text-white px-4 py-3 rounded-lg transition-all flex items-center space-x-3 text-left"
                  >
                    <action.icon className="w-5 h-5 text-purple-400" />
                    <span className="text-sm font-medium">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Subjects */}
            <div className="glass-effect rounded-2xl p-6 border border-white/10">
              <h3 className="text-white font-semibold mb-4">Subjects</h3>
              <div className="space-y-2">
                {subjects.map((subject, index) => (
                  <button
                    key={index}
                    className={`w-full bg-${subject.color}-500/20 hover:bg-${subject.color}-500/30 text-white px-4 py-2 rounded-lg transition-all flex items-center space-x-2`}
                  >
                    <span className="text-xl">{subject.icon}</span>
                    <span className="text-sm font-medium">{subject.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tips */}
            <div className="glass-effect rounded-2xl p-6 border border-yellow-500/30 bg-yellow-500/5">
              <div className="flex items-start space-x-3">
                <Lightbulb className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-yellow-400 font-semibold mb-2">Pro Tip</h4>
                  <p className="text-white/80 text-sm">
                    Be specific with your questions! The more details you provide, the better I can help you understand the concept.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3 glass-effect rounded-2xl border border-white/10 flex flex-col" style={{ height: 'calc(100vh - 250px)' }}>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-4 ${message.type === 'user'
                      ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white'
                      : 'bg-white/10 text-white'
                      }`}
                  >
                    {message.type === 'assistant' && (
                      <div className="flex items-center space-x-2 mb-2">
                        <Brain className="w-5 h-5 text-purple-400" />
                        <span className="text-sm font-semibold text-purple-400">AI Assistant</span>
                      </div>
                    )}
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    <p className="text-xs opacity-70 mt-2">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/10 rounded-2xl p-4">
                    <div className="flex items-center space-x-2">
                      <Brain className="w-5 h-5 text-purple-400" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-6 border-t border-white/10">
              <div className="flex items-end space-x-3">
                <div className="flex-1">
                  <textarea
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about your studies..."
                    className="w-full bg-white/10 text-white px-4 py-3 rounded-xl border border-white/20 focus:outline-none focus:border-purple-400 resize-none"
                    rows="2"
                  />
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed text-white p-4 rounded-xl transition-all"
                >
                  <Send className="w-6 h-6" />
                </button>
              </div>
              <p className="text-white/50 text-xs mt-2 text-center">
                Press Enter to send ? Shift+Enter for new line
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AIAssistantPage
