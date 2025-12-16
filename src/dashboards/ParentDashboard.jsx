import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { UserCircle, Heart, TrendingUp, Calendar, BookOpen, Activity, User, FileText, MessageSquare, Settings as SettingsIcon } from 'lucide-react'
import CameraView from '../components/CameraView'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'

function ParentDashboardHome({ userName }) {
  const [currentEmotion, setCurrentEmotion] = useState(null)
  const [dailyLog, setDailyLog] = useState([])

  const handleEmotionUpdate = (emotion) => {
    setCurrentEmotion(emotion)
  }

  const weeklyData = [
    { day: 'Mon', wellbeing: 75, stress: 25 },
    { day: 'Tue', wellbeing: 80, stress: 20 },
    { day: 'Wed', wellbeing: 70, stress: 30 },
    { day: 'Thu', wellbeing: 85, stress: 15 },
    { day: 'Fri', wellbeing: 90, stress: 10 },
    { day: 'Sat', wellbeing: 95, stress: 5 },
    { day: 'Sun', wellbeing: 92, stress: 8 }
  ]

  const academicPerformance = [
    { subject: 'Mathematics', score: 85, emotion: 'Calm' },
    { subject: 'Science', score: 78, emotion: 'Neutral' },
    { subject: 'English', score: 92, emotion: 'Happy' },
    { subject: 'History', score: 88, emotion: 'Content' }
  ]

  const recentActivities = [
    { time: '09:00 AM', activity: 'Morning Class', emotion: 'Calm', status: 'positive' },
    { time: '11:30 AM', activity: 'Group Study', emotion: 'Happy', status: 'positive' },
    { time: '02:00 PM', activity: 'Exam', emotion: 'Stressed', status: 'negative' },
    { time: '04:00 PM', activity: 'Sports', emotion: 'Excited', status: 'positive' }
  ]

  return (
    <div className="min-h-screen p-8">
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <UserCircle className="w-8 h-8 text-white" />
              <div>
                <h1 className="text-3xl font-bold text-white">Parent Dashboard</h1>
                <p className="text-white/70">Your child's wellbeing summary</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-white/70 text-sm">Developed by Hansraj</p>
              <p className="text-white text-sm">{new Date().toLocaleDateString()}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-effect rounded-2xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Heart className="w-6 h-6 text-red-400" />
                <h3 className="text-white font-semibold">Overall Wellbeing</h3>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-white mb-2">82</div>
                <p className="text-white/70 text-sm">out of 100</p>
                <div className="mt-4 w-full bg-white/20 rounded-full h-3">
                  <div className="bg-green-400 h-3 rounded-full" style={{ width: '82%' }} />
                </div>
                <p className="text-green-400 text-sm mt-2">Good overall state</p>
              </div>
            </div>

            <div className="glass-effect rounded-2xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <TrendingUp className="w-6 h-6 text-blue-400" />
                <h3 className="text-white font-semibold">Academic Mood</h3>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-white mb-2">86</div>
                <p className="text-white/70 text-sm">Performance Score</p>
                <div className="mt-4 w-full bg-white/20 rounded-full h-3">
                  <div className="bg-blue-400 h-3 rounded-full" style={{ width: '86%' }} />
                </div>
                <p className="text-blue-400 text-sm mt-2">Strong performance</p>
              </div>
            </div>

            <div className="glass-effect rounded-2xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Activity className="w-6 h-6 text-purple-400" />
                <h3 className="text-white font-semibold">Stress Level</h3>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-white mb-2">18</div>
                <p className="text-white/70 text-sm">Average Stress</p>
                <div className="mt-4 w-full bg-white/20 rounded-full h-3">
                  <div className="bg-yellow-400 h-3 rounded-full" style={{ width: '18%' }} />
                </div>
                <p className="text-green-400 text-sm mt-2">Low stress level</p>
              </div>
            </div>
          </div>

          <CameraView onEmotionUpdate={handleEmotionUpdate} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="glass-effect rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>Weekly Wellbeing Trend</span>
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="day" stroke="#fff" tick={{ fill: '#fff' }} />
                  <YAxis stroke="#fff" tick={{ fill: '#fff' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px' }}
                  />
                  <Area type="monotone" dataKey="wellbeing" stroke="#22c55e" fill="#22c55e" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="stress" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="glass-effect rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
                <BookOpen className="w-5 h-5" />
                <span>Academic Performance</span>
              </h3>
              <div className="space-y-4">
                {academicPerformance.map((subject, index) => (
                  <div key={index} className="bg-white/10 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-semibold">{subject.subject}</span>
                      <span className="text-white font-bold">{subject.score}%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="w-full bg-white/20 rounded-full h-2 mr-3">
                        <div 
                          className="bg-blue-400 h-2 rounded-full transition-all"
                          style={{ width: `${subject.score}%` }}
                        />
                      </div>
                      <span className="text-white/70 text-xs whitespace-nowrap">{subject.emotion}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="glass-effect rounded-2xl p-6">
            <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Today's Activity Log</span>
            </h3>
            <div className="space-y-3">
              {recentActivities.map((activity, index) => (
                <div key={index} className="bg-white/10 rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="text-white font-semibold text-sm">{activity.time}</p>
                    </div>
                    <div className="h-10 w-px bg-white/30" />
                    <div>
                      <p className="text-white font-semibold">{activity.activity}</p>
                      <p className="text-white/70 text-sm">Emotion: {activity.emotion}</p>
                    </div>
                  </div>
                  <div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      activity.status === 'positive' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {activity.status === 'positive' ? 'Positive' : 'Monitor'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-effect rounded-2xl p-6">
            <h3 className="text-white font-semibold mb-4">Recommendations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <h4 className="text-green-400 font-semibold mb-2">Strengths</h4>
                <ul className="text-white/80 text-sm space-y-1">
                  <li>• Maintains good focus during morning classes</li>
                  <li>• Shows positive engagement in group activities</li>
                  <li>• Strong performance in English</li>
                </ul>
              </div>
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                <h4 className="text-yellow-400 font-semibold mb-2">Areas to Support</h4>
                <ul className="text-white/80 text-sm space-y-1">
                  <li>• Consider stress management before exams</li>
                  <li>• Encourage more breaks during study time</li>
                  <li>• Support in Science subject</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

    </div>
  )
}

function ParentDashboard({ userName }) {
  return (
    <Routes>
      <Route index element={<ParentDashboardHome userName={userName} />} />
      <Route path="child" element={<div className="p-8"><div className="glass-effect rounded-3xl p-8 border border-white/20"><p className="text-white text-center">My Child page coming soon...</p></div></div>} />
      <Route path="reports" element={<div className="p-8"><div className="glass-effect rounded-3xl p-8 border border-white/20"><p className="text-white text-center">Reports coming soon...</p></div></div>} />
      <Route path="calendar" element={<div className="p-8"><div className="glass-effect rounded-3xl p-8 border border-white/20"><p className="text-white text-center">Calendar coming soon...</p></div></div>} />
      <Route path="messages" element={<div className="p-8"><div className="glass-effect rounded-3xl p-8 border border-white/20"><p className="text-white text-center">Messages coming soon...</p></div></div>} />
      <Route path="settings" element={<div className="p-8"><div className="glass-effect rounded-3xl p-8 border border-white/20"><p className="text-white text-center">Settings coming soon...</p></div></div>} />
    </Routes>
  )
}

export default ParentDashboard
