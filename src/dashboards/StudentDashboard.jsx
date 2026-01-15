import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { User, Heart, Brain, Activity, TrendingUp, Calendar } from 'lucide-react'
import CameraView from '../components/CameraView'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'

// Import new pages
import AttendancePage from '../pages/student/AttendancePage'
import AssignmentsPage from '../pages/student/AssignmentsPage'
import ExamsPage from '../pages/student/ExamsPage'
import TimetablePage from '../pages/student/TimetablePage'
import PomodoroPage from '../pages/student/PomodoroPage'
import PlannerPage from '../pages/student/PlannerPage'
import AIAssistantPage from '../pages/student/AIAssistantPage'
import GamificationPage from '../pages/student/GamificationPage'
import AnalyticsPage from '../pages/student/AnalyticsPage'
import AboutDeveloper from '../pages/student/AboutDeveloper'
import SettingsPage from '../pages/student/SettingsPage'

function StudentDashboardHome({ userName }) {
  const [currentEmotion, setCurrentEmotion] = useState(null)
  const [emotionHistory, setEmotionHistory] = useState([])
  const [wellbeingScore, setWellbeingScore] = useState(75)

  const handleEmotionUpdate = (emotion) => {
    setCurrentEmotion(emotion)

    const timestamp = new Date().toLocaleTimeString()
    setEmotionHistory(prev => {
      const updated = [...prev, {
        time: timestamp,
        score: emotion.confidence,
        emotion: emotion.fusedEmotion
      }]
      return updated.slice(-20)
    })

    const positiveEmotions = ['happy', 'calm', 'content', 'excited', 'delighted']
    const isPositive = positiveEmotions.includes(emotion.fusedEmotion)

    setWellbeingScore(prev => {
      const adjustment = isPositive ? 1 : -0.5
      const newScore = Math.max(0, Math.min(100, prev + adjustment))
      return Math.round(newScore)
    })
  }

  const emotionDistribution = currentEmotion?.breakdown?.face?.allExpressions
    ? Object.entries(currentEmotion.breakdown.face.allExpressions).map(([emotion, value]) => ({
      emotion: emotion.charAt(0).toUpperCase() + emotion.slice(1),
      value
    }))
    : []

  const focusIndicator = currentEmotion
    ? ['neutral', 'calm', 'content'].includes(currentEmotion.fusedEmotion) ? 85 : 60
    : 0

  return (
    <div className="min-h-screen p-8">
      <main className="max-w-7xl w-full mx-auto">
        <div className="space-y-8">
          {/* Enhanced Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-500/20 p-4 rounded-2xl border-2 border-blue-400/30">
                <User className="w-10 h-10 text-blue-400" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white text-shadow-lg mb-1">Welcome back, {userName}!</h1>
                <p className="text-white/80 text-lg font-medium text-shadow-sm">Real-time wellbeing monitoring</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-white/90 text-sm font-medium">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
          </div>

          {/* Enhanced Stats Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Wellbeing Score Card */}
            <div className="card-readable border-2 border-red-400/30 hover:border-red-400/50 transition-all">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold text-lg flex items-center space-x-2">
                  <Heart className="w-6 h-6 text-red-400" />
                  <span>Wellbeing Score</span>
                </h3>
              </div>
              <div className="relative pt-6">
                <div className="text-center">
                  <div className="text-7xl font-extrabold text-white text-shadow-lg mb-3">{wellbeingScore}</div>
                  <div className="text-white/80 text-base font-medium">out of 100</div>
                </div>
                <div className="mt-8 w-full bg-white/20 rounded-full h-4 shadow-inner">
                  <div
                    className="h-4 rounded-full transition-all duration-500 shadow-lg"
                    style={{
                      width: `${wellbeingScore}%`,
                      backgroundColor: wellbeingScore > 70 ? '#22c55e' : wellbeingScore > 40 ? '#f59e0b' : '#ef4444'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Focus Level Card */}
            <div className="card-readable border-2 border-purple-400/30 hover:border-purple-400/50 transition-all">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold text-lg flex items-center space-x-2">
                  <Brain className="w-6 h-6 text-purple-400" />
                  <span>Focus Level</span>
                </h3>
              </div>
              <div className="relative pt-6">
                <div className="text-center">
                  <div className="text-7xl font-extrabold text-white text-shadow-lg mb-3">{focusIndicator}</div>
                  <div className="text-white/80 text-base font-medium">Focus Score</div>
                </div>
                <div className="mt-8 w-full bg-white/20 rounded-full h-4 shadow-inner">
                  <div
                    className="bg-purple-400 h-4 rounded-full transition-all duration-500 shadow-lg"
                    style={{ width: `${focusIndicator}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Current State Card */}
            <div className="card-readable border-2 border-green-400/30 hover:border-green-400/50 transition-all">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold text-lg flex items-center space-x-2">
                  <Activity className="w-6 h-6 text-green-400" />
                  <span>Current State</span>
                </h3>
              </div>
              <div className="relative pt-6">
                <div className="text-center">
                  {currentEmotion ? (
                    <>
                      <div className="text-3xl font-bold text-white text-shadow-lg mb-3 capitalize">
                        {currentEmotion.fusedEmotion.replace('_', ' ')}
                      </div>
                      <div className="text-white/80 text-base font-semibold mb-6">
                        {currentEmotion.confidence}% confidence
                      </div>
                      <div className="space-y-3 text-base text-white/85">
                        <div className="flex justify-between items-center bg-white/10 rounded-lg px-4 py-2">
                          <span className="font-medium">Face:</span>
                          <span className="font-bold">
                            {currentEmotion.breakdown?.face?.emotion || 'N/A'}
                          </span>
                        </div>
                        <div className="flex justify-between items-center bg-white/10 rounded-lg px-4 py-2">
                          <span className="font-medium">Voice:</span>
                          <span className="font-bold">
                            {currentEmotion.breakdown?.voice?.emotion || 'N/A'}
                          </span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-white/70 text-lg font-medium">Detecting emotions...</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Camera View */}
          <CameraView onEmotionUpdate={handleEmotionUpdate} />

          {/* Enhanced Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Emotion Timeline */}
            <div className="card-readable border-2 border-blue-400/30">
              <h3 className="text-white font-bold text-xl mb-6 flex items-center space-x-2">
                <TrendingUp className="w-6 h-6 text-blue-400" />
                <span>Emotion Timeline</span>
              </h3>
              {emotionHistory.length > 0 ? (
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={emotionHistory}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.15)" />
                    <XAxis
                      dataKey="time"
                      stroke="#fff"
                      tick={{ fill: '#fff', fontSize: 13, fontWeight: 500 }}
                    />
                    <YAxis
                      stroke="#fff"
                      tick={{ fill: '#fff', fontSize: 13, fontWeight: 500 }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(0,0,0,0.85)',
                        border: '2px solid rgba(255,255,255,0.3)',
                        borderRadius: '12px',
                        padding: '12px',
                        fontSize: '14px',
                        fontWeight: 600
                      }}
                      labelStyle={{ color: '#fff', fontWeight: 600 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="#8b5cf6"
                      strokeWidth={3}
                      dot={{ fill: '#8b5cf6', r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-64 flex items-center justify-center text-white/70 text-lg font-medium">
                  Emotion data will appear here...
                </div>
              )}
            </div>

            {/* Emotion Distribution */}
            <div className="card-readable border-2 border-pink-400/30">
              <h3 className="text-white font-bold text-xl mb-6 flex items-center space-x-2">
                <Calendar className="w-6 h-6 text-pink-400" />
                <span>Emotion Distribution</span>
              </h3>
              {emotionDistribution.length > 0 ? (
                <ResponsiveContainer width="100%" height={280}>
                  <RadarChart data={emotionDistribution}>
                    <PolarGrid stroke="rgba(255,255,255,0.25)" />
                    <PolarAngleAxis
                      dataKey="emotion"
                      stroke="#fff"
                      tick={{ fill: '#fff', fontSize: 13, fontWeight: 600 }}
                    />
                    <PolarRadiusAxis
                      stroke="#fff"
                      tick={{ fill: '#fff', fontSize: 12, fontWeight: 500 }}
                    />
                    <Radar
                      name="Intensity"
                      dataKey="value"
                      stroke="#ec4899"
                      fill="#ec4899"
                      fillOpacity={0.6}
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-64 flex items-center justify-center text-white/70 text-lg font-medium">
                  Emotion distribution will appear here...
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

// Live Detection Page
function LiveDetection({ userName }) {
  const [currentEmotion, setCurrentEmotion] = useState(null)

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center space-x-4 mb-6">
          <div className="bg-green-500/20 p-4 rounded-2xl border-2 border-green-400/30">
            <Activity className="w-10 h-10 text-green-400" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white text-shadow-lg mb-1">Live Emotion Detection</h1>
            <p className="text-white/80 text-lg font-medium text-shadow-sm">Real-time analysis in progress</p>
          </div>
        </div>

        <CameraView onEmotionUpdate={setCurrentEmotion} />
      </div>
    </div>
  )
}

// Main Dashboard Component with Routes
function StudentDashboard({ userName }) {
  return (
    <Routes>
      <Route index element={<StudentDashboardHome userName={userName} />} />
      <Route path="live" element={<LiveDetection userName={userName} />} />
      <Route path="attendance" element={<AttendancePage />} />
      <Route path="assignments" element={<AssignmentsPage />} />
      <Route path="exams" element={<ExamsPage />} />
      <Route path="timetable" element={<TimetablePage />} />
      <Route path="pomodoro" element={<PomodoroPage />} />
      <Route path="planner" element={<PlannerPage />} />
      <Route path="ai-assistant" element={<AIAssistantPage />} />
      <Route path="gamification" element={<GamificationPage />} />
      <Route path="analytics" element={<AnalyticsPage />} />
      <Route path="journal" element={<div className="p-8"><div className="card-readable border-2 border-purple-400/30"><h2 className="text-white text-center text-3xl font-bold mb-4 text-shadow-lg">Mood Journal</h2><p className="text-white/85 text-center font-medium text-lg">Track your daily thoughts, feelings, and reflections here.</p></div></div>} />
      <Route path="calendar" element={<div className="p-8"><div className="card-readable border-2 border-pink-400/30"><h2 className="text-white text-center text-3xl font-bold mb-4 text-shadow-lg">Academic Calendar</h2><p className="text-white/85 text-center font-medium text-lg">Manage your schedule, events, and deadlines here.</p></div></div>} />
      <Route path="profile" element={<div className="p-8"><div className="card-readable border-2 border-green-400/30"><h2 className="text-white text-center text-3xl font-bold mb-4 text-shadow-lg">My Profile</h2><p className="text-white/85 text-center font-medium text-lg">View and edit your personal information and achievements here.</p></div></div>} />
      <Route path="about" element={<AboutDeveloper />} />
      <Route path="settings" element={<SettingsPage />} />
    </Routes>
  )
}

export default StudentDashboard
