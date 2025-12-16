import React, { useState, useEffect, useRef } from 'react'
import { Play, Pause, RotateCcw, Clock, TrendingUp, Award, Flame, Settings } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'

function PomodoroPage() {
  const [timeLeft, setTimeLeft] = useState(25 * 60) // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false)
  const [sessionType, setSessionType] = useState('work') // work, shortBreak, longBreak
  const [sessions, setSessions] = useState(0)
  const [todayStats, setTodayStats] = useState({
    completedSessions: 5,
    totalMinutes: 125,
    currentStreak: 3
  })

  const [settings, setSettings] = useState({
    workDuration: 25,
    shortBreakDuration: 5,
    longBreakDuration: 15,
    sessionsUntilLongBreak: 4,
    autoStartBreaks: false,
    autoStartWork: false,
    sound: true
  })

  const [showSettings, setShowSettings] = useState(false)
  const intervalRef = useRef(null)

  // Session history data
  const weeklyData = [
    { day: 'Mon', sessions: 8, minutes: 200 },
    { day: 'Tue', sessions: 6, minutes: 150 },
    { day: 'Wed', sessions: 10, minutes: 250 },
    { day: 'Thu', sessions: 7, minutes: 175 },
    { day: 'Fri', sessions: 9, minutes: 225 },
    { day: 'Sat', sessions: 5, minutes: 125 },
    { day: 'Sun', sessions: todayStats.completedSessions, minutes: todayStats.totalMinutes }
  ]

  const subjectSessions = [
    { subject: 'Mathematics', sessions: 12, minutes: 300 },
    { subject: 'Science', sessions: 10, minutes: 250 },
    { subject: 'English', sessions: 8, minutes: 200 },
    { subject: 'History', sessions: 6, minutes: 150 }
  ]

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      handleSessionComplete()
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning, timeLeft])

  const handleSessionComplete = () => {
    setIsRunning(false)
    
    if (sessionType === 'work') {
      setSessions(prev => prev + 1)
      setTodayStats(prev => ({
        ...prev,
        completedSessions: prev.completedSessions + 1,
        totalMinutes: prev.totalMinutes + settings.workDuration
      }))
      
      // Play completion sound
      if (settings.sound) {
        playSound()
      }
      
      // Determine next break type
      const nextBreak = (sessions + 1) % settings.sessionsUntilLongBreak === 0 ? 'longBreak' : 'shortBreak'
      setSessionType(nextBreak)
      setTimeLeft(nextBreak === 'longBreak' ? settings.longBreakDuration * 60 : settings.shortBreakDuration * 60)
      
      if (settings.autoStartBreaks) {
        setIsRunning(true)
      }
    } else {
      // Break completed
      setSessionType('work')
      setTimeLeft(settings.workDuration * 60)
      
      if (settings.autoStartWork) {
        setIsRunning(true)
      }
    }
  }

  const playSound = () => {
    // Simple beep sound using Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    oscillator.frequency.value = 800
    oscillator.type = 'sine'
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)
    
    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.5)
  }

  const handleStartPause = () => {
    setIsRunning(!isRunning)
  }

  const handleReset = () => {
    setIsRunning(false)
    setTimeLeft(settings.workDuration * 60)
    setSessionType('work')
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const getProgress = () => {
    const totalTime = sessionType === 'work' 
      ? settings.workDuration * 60 
      : sessionType === 'shortBreak'
      ? settings.shortBreakDuration * 60
      : settings.longBreakDuration * 60
    return ((totalTime - timeLeft) / totalTime) * 100
  }

  const getSessionColor = () => {
    switch(sessionType) {
      case 'work': return '#ef4444'
      case 'shortBreak': return '#22c55e'
      case 'longBreak': return '#3b82f6'
      default: return '#6b7280'
    }
  }

  const getSessionLabel = () => {
    switch(sessionType) {
      case 'work': return 'Focus Time'
      case 'shortBreak': return 'Short Break'
      case 'longBreak': return 'Long Break'
      default: return 'Session'
    }
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-red-500/20 p-3 rounded-xl">
              <Clock className="w-8 h-8 text-red-400" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">Pomodoro Timer</h1>
              <p className="text-white/70 text-lg">Boost your productivity with focused sessions</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="glass-effect p-3 rounded-xl border border-white/10 hover:border-white/30 transition-all"
            >
              <Settings className="w-6 h-6 text-white" />
            </button>
            <div className="text-right">
              <p className="text-white/70 text-sm">Developed by Hansraj</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="glass-effect rounded-xl p-4 border border-red-500/30">
            <div className="flex items-center justify-between mb-2">
              <p className="text-white/70 text-sm">Today's Sessions</p>
              <Clock className="w-5 h-5 text-red-400" />
            </div>
            <p className="text-3xl font-bold text-red-400">{todayStats.completedSessions}</p>
          </div>

          <div className="glass-effect rounded-xl p-4 border border-blue-500/30">
            <div className="flex items-center justify-between mb-2">
              <p className="text-white/70 text-sm">Focus Minutes</p>
              <TrendingUp className="w-5 h-5 text-blue-400" />
            </div>
            <p className="text-3xl font-bold text-blue-400">{todayStats.totalMinutes}</p>
          </div>

          <div className="glass-effect rounded-xl p-4 border border-orange-500/30">
            <div className="flex items-center justify-between mb-2">
              <p className="text-white/70 text-sm">Current Streak</p>
              <Flame className="w-5 h-5 text-orange-400" />
            </div>
            <p className="text-3xl font-bold text-orange-400">{todayStats.currentStreak}</p>
          </div>

          <div className="glass-effect rounded-xl p-4 border border-purple-500/30">
            <div className="flex items-center justify-between mb-2">
              <p className="text-white/70 text-sm">This Session</p>
              <Award className="w-5 h-5 text-purple-400" />
            </div>
            <p className="text-3xl font-bold text-purple-400">{sessions}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Timer Section */}
          <div className="lg:col-span-2 glass-effect rounded-2xl p-8 border border-white/10">
            <div className="text-center space-y-8">
              {/* Session Type Indicator */}
              <div className="inline-flex items-center space-x-2 px-6 py-3 rounded-full" style={{ backgroundColor: `${getSessionColor()}20`, border: `2px solid ${getSessionColor()}` }}>
                <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: getSessionColor() }} />
                <span className="font-bold text-xl" style={{ color: getSessionColor() }}>
                  {getSessionLabel()}
                </span>
              </div>

              {/* Timer Display */}
              <div className="relative">
                <svg className="w-full max-w-md mx-auto" viewBox="0 0 200 200">
                  {/* Background Circle */}
                  <circle
                    cx="100"
                    cy="100"
                    r="90"
                    fill="none"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="12"
                  />
                  {/* Progress Circle */}
                  <circle
                    cx="100"
                    cy="100"
                    r="90"
                    fill="none"
                    stroke={getSessionColor()}
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 90}`}
                    strokeDashoffset={`${2 * Math.PI * 90 * (1 - getProgress() / 100)}`}
                    transform="rotate(-90 100 100)"
                    style={{ transition: 'stroke-dashoffset 1s linear' }}
                  />
                </svg>
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-7xl font-bold text-white mb-2">{formatTime(timeLeft)}</p>
                    <p className="text-white/60 text-lg">
                      {isRunning ? 'Focus Mode Active' : 'Ready to Start'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={handleStartPause}
                  className={`px-12 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 ${
                    isRunning
                      ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                      : 'bg-green-500 hover:bg-green-600 text-white'
                  }`}
                >
                  {isRunning ? (
                    <span className="flex items-center space-x-2">
                      <Pause className="w-6 h-6" />
                      <span>Pause</span>
                    </span>
                  ) : (
                    <span className="flex items-center space-x-2">
                      <Play className="w-6 h-6" />
                      <span>Start</span>
                    </span>
                  )}
                </button>

                <button
                  onClick={handleReset}
                  className="px-8 py-4 rounded-xl font-bold text-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/50 transition-all"
                >
                  <RotateCcw className="w-6 h-6" />
                </button>
              </div>

              {/* Session Progress */}
              <div className="flex items-center justify-center space-x-2">
                {[...Array(settings.sessionsUntilLongBreak)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-4 h-4 rounded-full transition-all ${
                      i < sessions % settings.sessionsUntilLongBreak
                        ? 'bg-green-500'
                        : 'bg-white/20'
                    }`}
                  />
                ))}
              </div>
              <p className="text-white/60 text-sm">
                {sessions % settings.sessionsUntilLongBreak} of {settings.sessionsUntilLongBreak} sessions until long break
              </p>
            </div>
          </div>

          {/* Quick Actions & Settings */}
          <div className="space-y-4">
            {/* Quick Session Buttons */}
            <div className="glass-effect rounded-2xl p-6 border border-white/10">
              <h3 className="text-white font-semibold mb-4">Quick Start</h3>
              <div className="space-y-2">
                <button
                  onClick={() => {
                    setSessionType('work')
                    setTimeLeft(settings.workDuration * 60)
                    setIsRunning(false)
                  }}
                  className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/50 px-4 py-3 rounded-lg font-semibold transition-all"
                >
                  Work Session ({settings.workDuration}m)
                </button>
                <button
                  onClick={() => {
                    setSessionType('shortBreak')
                    setTimeLeft(settings.shortBreakDuration * 60)
                    setIsRunning(false)
                  }}
                  className="w-full bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/50 px-4 py-3 rounded-lg font-semibold transition-all"
                >
                  Short Break ({settings.shortBreakDuration}m)
                </button>
                <button
                  onClick={() => {
                    setSessionType('longBreak')
                    setTimeLeft(settings.longBreakDuration * 60)
                    setIsRunning(false)
                  }}
                  className="w-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/50 px-4 py-3 rounded-lg font-semibold transition-all"
                >
                  Long Break ({settings.longBreakDuration}m)
                </button>
              </div>
            </div>

            {/* Settings Panel */}
            {showSettings && (
              <div className="glass-effect rounded-2xl p-6 border border-white/10">
                <h3 className="text-white font-semibold mb-4">Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-white/70 text-sm block mb-2">Work Duration (minutes)</label>
                    <input
                      type="number"
                      value={settings.workDuration}
                      onChange={(e) => setSettings({...settings, workDuration: parseInt(e.target.value)})}
                      className="w-full bg-white/10 text-white px-4 py-2 rounded-lg border border-white/20 focus:outline-none focus:border-red-400"
                    />
                  </div>
                  <div>
                    <label className="text-white/70 text-sm block mb-2">Short Break (minutes)</label>
                    <input
                      type="number"
                      value={settings.shortBreakDuration}
                      onChange={(e) => setSettings({...settings, shortBreakDuration: parseInt(e.target.value)})}
                      className="w-full bg-white/10 text-white px-4 py-2 rounded-lg border border-white/20 focus:outline-none focus:border-green-400"
                    />
                  </div>
                  <div>
                    <label className="text-white/70 text-sm block mb-2">Long Break (minutes)</label>
                    <input
                      type="number"
                      value={settings.longBreakDuration}
                      onChange={(e) => setSettings({...settings, longBreakDuration: parseInt(e.target.value)})}
                      className="w-full bg-white/10 text-white px-4 py-2 rounded-lg border border-white/20 focus:outline-none focus:border-blue-400"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/70 text-sm">Sound Notifications</span>
                    <button
                      onClick={() => setSettings({...settings, sound: !settings.sound})}
                      className={`w-12 h-6 rounded-full transition-all ${
                        settings.sound ? 'bg-green-500' : 'bg-white/20'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition-all ${
                        settings.sound ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Sessions */}
          <div className="glass-effect rounded-2xl p-6 border border-white/10">
            <h3 className="text-white font-semibold mb-4">Weekly Progress</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="day" stroke="#fff" tick={{ fill: '#fff' }} />
                <YAxis stroke="#fff" tick={{ fill: '#fff' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px' }}
                />
                <Bar dataKey="sessions" fill="#ef4444" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Subject Distribution */}
          <div className="glass-effect rounded-2xl p-6 border border-white/10">
            <h3 className="text-white font-semibold mb-4">Subject-wise Focus Time</h3>
            <div className="space-y-4">
              {subjectSessions.map((item, index) => (
                <div key={index} className="bg-white/5 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-semibold">{item.subject}</span>
                    <span className="text-white/70 text-sm">{item.sessions} sessions ? {item.minutes} min</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div 
                      className="bg-red-500 h-2 rounded-full transition-all"
                      style={{ width: `${(item.minutes / 300) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PomodoroPage
