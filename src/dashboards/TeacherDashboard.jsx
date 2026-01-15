import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Users, TrendingUp, AlertCircle, CheckCircle, Clock, BarChart3, Camera, FileText, Activity, Settings as SettingsIcon } from 'lucide-react'
import CameraView from '../components/CameraView'
import StudentsPage from '../pages/teacher/StudentsPage'
import TeacherAnalyticsPage from '../pages/teacher/TeacherAnalyticsPage'
import TeacherReportsPage from '../pages/teacher/TeacherReportsPage'
import TeacherAlertsPage from '../pages/teacher/TeacherAlertsPage'
import TeacherSettingsPage from '../pages/teacher/TeacherSettingsPage'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'

function TeacherDashboardHome({ userName }) {
  const [currentEmotion, setCurrentEmotion] = useState(null)
  const [sessionData, setSessionData] = useState({
    duration: 0,
    positiveCount: 0,
    negativeCount: 0,
    neutralCount: 0
  })

  const handleEmotionUpdate = (emotion) => {
    setCurrentEmotion(emotion)

    const positiveEmotions = ['happy', 'calm', 'content', 'excited', 'delighted']
    const negativeEmotions = ['sad', 'angry', 'fearful', 'anxious', 'stressed', 'distressed']

    setSessionData(prev => {
      const updated = { ...prev }

      if (positiveEmotions.includes(emotion.fusedEmotion)) {
        updated.positiveCount++
      } else if (negativeEmotions.includes(emotion.fusedEmotion)) {
        updated.negativeCount++
      } else {
        updated.neutralCount++
      }

      updated.duration++

      return updated
    })
  }

  const classEngagementData = [
    { name: 'Engaged', value: 65, color: '#22c55e' },
    { name: 'Neutral', value: 25, color: '#6b7280' },
    { name: 'Disengaged', value: 10, color: '#ef4444' }
  ]

  const emotionTrendsData = [
    { emotion: 'Happy', count: sessionData.positiveCount },
    { emotion: 'Neutral', count: sessionData.neutralCount },
    { emotion: 'Stressed', count: Math.floor(sessionData.negativeCount * 0.6) },
    { emotion: 'Anxious', count: Math.floor(sessionData.negativeCount * 0.4) }
  ]

  const studentsNeedingAttention = [
    { name: 'Student A', status: 'Stressed', confidence: 78 },
    { name: 'Student B', status: 'Disengaged', confidence: 65 },
    { name: 'Student C', status: 'Anxious', confidence: 82 }
  ]

  return (
    <div className="min-h-screen p-8">
      <main className="max-w-7xl w-full mx-auto">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-500/20 p-3 rounded-xl">
                <Users className="w-8 h-8 text-purple-400" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white">Welcome, {userName}!</h1>
                <p className="text-white/70 text-lg">Class wellbeing overview</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-white/90 text-sm font-medium">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="glass-effect rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-green-500/20 p-3 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <p className="text-white/70 text-sm">Positive States</p>
                  <p className="text-2xl font-bold text-white">{sessionData.positiveCount}</p>
                </div>
              </div>
            </div>

            <div className="glass-effect rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-yellow-500/20 p-3 rounded-lg">
                  <AlertCircle className="w-6 h-6 text-yellow-400" />
                </div>
                <div>
                  <p className="text-white/70 text-sm">Needs Attention</p>
                  <p className="text-2xl font-bold text-white">{sessionData.negativeCount}</p>
                </div>
              </div>
            </div>

            <div className="glass-effect rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-500/20 p-3 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-white/70 text-sm">Neutral States</p>
                  <p className="text-2xl font-bold text-white">{sessionData.neutralCount}</p>
                </div>
              </div>
            </div>

            <div className="glass-effect rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-purple-500/20 p-3 rounded-lg">
                  <Clock className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-white/70 text-sm">Session Time</p>
                  <p className="text-2xl font-bold text-white">{Math.floor(sessionData.duration / 60)}m</p>
                </div>
              </div>
            </div>
          </div>

          <CameraView onEmotionUpdate={handleEmotionUpdate} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="glass-effect rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
                <BarChart3 className="w-5 h-5" />
                <span>Emotion Trends</span>
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={emotionTrendsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="emotion" stroke="#fff" tick={{ fill: '#fff' }} />
                  <YAxis stroke="#fff" tick={{ fill: '#fff' }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Bar dataKey="count" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="glass-effect rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Class Engagement</span>
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={classEngagementData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {classEngagementData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px' }}
                  />
                  <Legend
                    wrapperStyle={{ color: '#fff' }}
                    iconType="circle"
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass-effect rounded-2xl p-6">
            <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-yellow-400" />
              <span>Students Needing Attention</span>
            </h3>
            <div className="space-y-3">
              {studentsNeedingAttention.map((student, index) => (
                <div key={index} className="bg-white/10 rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                      {student.name.charAt(student.name.length - 1)}
                    </div>
                    <div>
                      <p className="text-white font-semibold">{student.name}</p>
                      <p className="text-white/70 text-sm">Status: {student.status}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-yellow-400 font-semibold">{student.confidence}%</p>
                    <p className="text-white/60 text-xs">Confidence</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-effect rounded-2xl p-6">
            <h3 className="text-white font-semibold mb-4">Session Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/10 rounded-lg p-4">
                <p className="text-white/70 text-sm mb-2">Overall Mood</p>
                <p className="text-2xl font-bold text-green-400">Positive</p>
                <p className="text-white/60 text-xs mt-1">Based on aggregated emotions</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <p className="text-white/70 text-sm mb-2">Engagement Level</p>
                <p className="text-2xl font-bold text-blue-400">High</p>
                <p className="text-white/60 text-xs mt-1">65% students engaged</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <p className="text-white/70 text-sm mb-2">Attention Required</p>
                <p className="text-2xl font-bold text-yellow-400">3 Students</p>
                <p className="text-white/60 text-xs mt-1">May need support</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function LiveClassMonitor({ userName }) {
  const [currentEmotion, setCurrentEmotion] = useState(null)

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-green-500/20 p-3 rounded-xl">
            <Camera className="w-8 h-8 text-green-400" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white">Live Class Monitor</h1>
            <p className="text-white/70 text-lg">Monitor student emotions in real-time</p>
          </div>
        </div>

        <CameraView onEmotionUpdate={setCurrentEmotion} />
      </div>
    </div>
  )
}


function TeacherDashboard({ userName }) {
  return (
    <Routes>
      <Route index element={<TeacherDashboardHome userName={userName} />} />
      <Route path="live" element={<LiveClassMonitor userName={userName} />} />
      <Route path="students" element={<StudentsPage />} />
      <Route path="analytics" element={<TeacherAnalyticsPage />} />
      <Route path="reports" element={<TeacherReportsPage />} />
      <Route path="alerts" element={<TeacherAlertsPage />} />
      <Route path="settings" element={<TeacherSettingsPage />} />
    </Routes>
  )
}

export default TeacherDashboard
