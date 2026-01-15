import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Shield, Users, TrendingUp, AlertTriangle, Database, Settings, BarChart2, Activity, FileText } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend } from 'recharts'
import AdminAnalyticsPage from '../pages/admin/AdminAnalyticsPage'
import AdminUserManagementPage from '../pages/admin/AdminUserManagementPage'
import AdminReportsPage from '../pages/admin/AdminReportsPage'
import AdminAlertsPage from '../pages/admin/AdminAlertsPage'
import AdminSettingsPage from '../pages/admin/AdminSettingsPage'

function AdminDashboardHome({ userName }) {
  const systemStats = {
    totalUsers: 1247,
    activeNow: 342,
    totalSessions: 5823,
    avgWellbeing: 78
  }

  const institutionData = [
    { name: 'Class 10A', students: 35, avgWellbeing: 82, alerts: 2 },
    { name: 'Class 10B', students: 38, avgWellbeing: 75, alerts: 5 },
    { name: 'Class 11A', students: 32, avgWellbeing: 88, alerts: 1 },
    { name: 'Class 11B', students: 36, avgWellbeing: 71, alerts: 7 },
    { name: 'Class 12A', students: 30, avgWellbeing: 85, alerts: 3 },
    { name: 'Class 12B', students: 33, avgWellbeing: 79, alerts: 4 }
  ]

  const monthlyTrends = [
    { month: 'Jan', wellbeing: 75, engagement: 70, stress: 30 },
    { month: 'Feb', wellbeing: 78, engagement: 75, stress: 28 },
    { month: 'Mar', wellbeing: 72, engagement: 68, stress: 35 },
    { month: 'Apr', wellbeing: 80, engagement: 78, stress: 25 },
    { month: 'May', wellbeing: 76, engagement: 72, stress: 32 },
    { month: 'Jun', wellbeing: 82, engagement: 80, stress: 22 }
  ]

  const emotionDistribution = [
    { name: 'Happy', value: 35, color: '#22c55e' },
    { name: 'Calm', value: 25, color: '#10b981' },
    { name: 'Neutral', value: 20, color: '#6b7280' },
    { name: 'Stressed', value: 12, color: '#f59e0b' },
    { name: 'Anxious', value: 8, color: '#ef4444' }
  ]

  const systemHealth = [
    { metric: 'Uptime', value: '99.9%', status: 'excellent', color: 'green' },
    { metric: 'Response Time', value: '45ms', status: 'good', color: 'green' },
    { metric: 'Model Accuracy', value: '94%', status: 'excellent', color: 'green' },
    { metric: 'Data Privacy', value: '100%', status: 'secured', color: 'green' }
  ]

  const alerts = [
    { id: 1, type: 'high', class: 'Class 10B', message: '5 students showing high stress levels', time: '10 mins ago' },
    { id: 2, type: 'medium', class: 'Class 11B', message: '7 students with declining wellbeing', time: '25 mins ago' },
    { id: 3, type: 'low', class: 'Class 12A', message: '3 students need attention', time: '1 hour ago' }
  ]

  return (
    <div className="min-h-screen p-8">

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8 text-white" />
              <div>
                <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
                <p className="text-white/70">System overview and management</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-white/90 text-sm font-medium">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="glass-effect rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-500/20 p-3 rounded-lg">
                  <Users className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-white/70 text-sm">Total Users</p>
                  <p className="text-2xl font-bold text-white">{systemStats.totalUsers}</p>
                </div>
              </div>
            </div>

            <div className="glass-effect rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-green-500/20 p-3 rounded-lg">
                  <Activity className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <p className="text-white/70 text-sm">Active Now</p>
                  <p className="text-2xl font-bold text-white">{systemStats.activeNow}</p>
                </div>
              </div>
            </div>

            <div className="glass-effect rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-purple-500/20 p-3 rounded-lg">
                  <Database className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-white/70 text-sm">Total Sessions</p>
                  <p className="text-2xl font-bold text-white">{systemStats.totalSessions}</p>
                </div>
              </div>
            </div>

            <div className="glass-effect rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-pink-500/20 p-3 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-pink-400" />
                </div>
                <div>
                  <p className="text-white/70 text-sm">Avg Wellbeing</p>
                  <p className="text-2xl font-bold text-white">{systemStats.avgWellbeing}%</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 glass-effect rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>Institution Trends (6 Months)</span>
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="month" stroke="#fff" tick={{ fill: '#fff' }} />
                  <YAxis stroke="#fff" tick={{ fill: '#fff' }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px' }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="wellbeing" stroke="#22c55e" strokeWidth={2} name="Wellbeing" />
                  <Line type="monotone" dataKey="engagement" stroke="#3b82f6" strokeWidth={2} name="Engagement" />
                  <Line type="monotone" dataKey="stress" stroke="#ef4444" strokeWidth={2} name="Stress" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="glass-effect rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
                <BarChart2 className="w-5 h-5" />
                <span>Emotion Distribution</span>
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={emotionDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {emotionDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass-effect rounded-2xl p-6">
            <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Class-wise Overview</span>
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left text-white/70 font-semibold py-3 px-4">Class</th>
                    <th className="text-left text-white/70 font-semibold py-3 px-4">Students</th>
                    <th className="text-left text-white/70 font-semibold py-3 px-4">Avg Wellbeing</th>
                    <th className="text-left text-white/70 font-semibold py-3 px-4">Alerts</th>
                    <th className="text-left text-white/70 font-semibold py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {institutionData.map((classData, index) => (
                    <tr key={index} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                      <td className="text-white py-3 px-4 font-semibold">{classData.name}</td>
                      <td className="text-white/80 py-3 px-4">{classData.students}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-white/20 rounded-full h-2">
                            <div
                              className="h-2 rounded-full transition-all"
                              style={{
                                width: `${classData.avgWellbeing}%`,
                                backgroundColor: classData.avgWellbeing > 80 ? '#22c55e' : classData.avgWellbeing > 70 ? '#f59e0b' : '#ef4444'
                              }}
                            />
                          </div>
                          <span className="text-white font-semibold">{classData.avgWellbeing}%</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${classData.alerts > 5
                          ? 'bg-red-500/20 text-red-400'
                          : classData.alerts > 2
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-green-500/20 text-green-400'
                          }`}>
                          {classData.alerts} alerts
                        </span>
                      </td>
                      <td className="text-white/80 py-3 px-4">
                        {classData.avgWellbeing > 80 ? '✓ Good' : classData.avgWellbeing > 70 ? '⚠ Monitor' : '✗ Attention'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="glass-effect rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-yellow-400" />
                <span>Recent Alerts</span>
              </h3>
              <div className="space-y-3">
                {alerts.map((alert) => (
                  <div key={alert.id} className={`rounded-lg p-4 border ${alert.type === 'high'
                    ? 'bg-red-500/10 border-red-500/30'
                    : alert.type === 'medium'
                      ? 'bg-yellow-500/10 border-yellow-500/30'
                      : 'bg-blue-500/10 border-blue-500/30'
                    }`}>
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-white font-semibold">{alert.class}</p>
                        <p className="text-white/80 text-sm mt-1">{alert.message}</p>
                        <p className="text-white/60 text-xs mt-2">{alert.time}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-semibold uppercase ${alert.type === 'high'
                        ? 'text-red-400'
                        : alert.type === 'medium'
                          ? 'text-yellow-400'
                          : 'text-blue-400'
                        }`}>
                        {alert.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-effect rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
                <Settings className="w-5 h-5" />
                <span>System Health</span>
              </h3>
              <div className="space-y-4">
                {systemHealth.map((item, index) => (
                  <div key={index} className="bg-white/10 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-semibold">{item.metric}</span>
                      <span className="text-white font-bold">{item.value}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex-1 bg-white/20 rounded-full h-2 mr-3">
                        <div className="bg-green-400 h-2 rounded-full" style={{ width: '95%' }} />
                      </div>
                      <span className="text-green-400 text-xs font-semibold uppercase">{item.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="glass-effect rounded-2xl p-6">
            <h3 className="text-white font-semibold mb-4">System Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white/10 rounded-lg p-4">
                <p className="text-white/70 text-sm mb-1">Privacy Status</p>
                <p className="text-xl font-bold text-green-400">100% Secure</p>
                <p className="text-white/60 text-xs mt-1">All data processed locally</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <p className="text-white/70 text-sm mb-1">Model Version</p>
                <p className="text-xl font-bold text-blue-400">v1.7.12</p>
                <p className="text-white/60 text-xs mt-1">Face-api.js</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <p className="text-white/70 text-sm mb-1">Browser Support</p>
                <p className="text-xl font-bold text-purple-400">100%</p>
                <p className="text-white/60 text-xs mt-1">No backend required</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <p className="text-white/70 text-sm mb-1">Developed By</p>
                <p className="text-xl font-bold text-pink-400">Hansraj</p>
                <p className="text-white/60 text-xs mt-1">UmangOS System</p>
              </div>
            </div>
          </div>
        </div>
      </main>

    </div>
  )
}

function AdminDashboard({ userName }) {
  return (
    <Routes>
      <Route index element={<AdminDashboardHome userName={userName} />} />
      <Route path="users" element={<AdminUserManagementPage />} />
      <Route path="analytics" element={<AdminAnalyticsPage />} />
      <Route path="reports" element={<AdminReportsPage />} />
      <Route path="alerts" element={<AdminAlertsPage />} />
      <Route path="settings" element={<AdminSettingsPage />} />
    </Routes>
  )
}

export default AdminDashboard
