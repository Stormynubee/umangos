import React from 'react'
import { BarChart3, TrendingUp, Users, Brain } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts'

function TeacherAnalyticsPage() {
    const classPerformance = [
        { subject: 'Math', avg: 85, attendance: 92 },
        { subject: 'Science', avg: 78, attendance: 88 },
        { subject: 'English', avg: 82, attendance: 95 },
        { subject: 'History', avg: 74, attendance: 85 },
        { subject: 'Geography', avg: 88, attendance: 90 }
    ]

    const weeklyEngagement = [
        { day: 'Mon', engagement: 65, mood: 70 },
        { day: 'Tue', engagement: 75, mood: 72 },
        { day: 'Wed', engagement: 55, mood: 60 },
        { day: 'Thu', engagement: 80, mood: 85 },
        { day: 'Fri', engagement: 70, mood: 75 }
    ]

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="flex items-center space-x-3">
                    <div className="bg-pink-500/20 p-3 rounded-xl border border-pink-500/30">
                        <BarChart3 className="w-8 h-8 text-pink-400" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold text-white">Class Analytics</h1>
                        <p className="text-white/70 text-lg">Performance and engagement insights</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="glass-effect rounded-2xl p-6 border border-white/10">
                        <h3 className="text-white font-semibold mb-2">Avg Class Score</h3>
                        <p className="text-4xl font-bold text-white">81.4%</p>
                        <span className="text-green-400 text-sm flex items-center mt-1"><TrendingUp className="w-4 h-4 mr-1" /> +2.5%</span>
                    </div>
                    <div className="glass-effect rounded-2xl p-6 border border-white/10">
                        <h3 className="text-white font-semibold mb-2">Avg Attendance</h3>
                        <p className="text-4xl font-bold text-white">90%</p>
                        <span className="text-green-400 text-sm flex items-center mt-1"><Users className="w-4 h-4 mr-1" /> +1.2%</span>
                    </div>
                    <div className="glass-effect rounded-2xl p-6 border border-white/10">
                        <h3 className="text-white font-semibold mb-2">Engagement Score</h3>
                        <p className="text-4xl font-bold text-white">72%</p>
                        <span className="text-yellow-400 text-sm flex items-center mt-1"><Brain className="w-4 h-4 mr-1" /> Stable</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="glass-effect rounded-2xl p-6 border border-white/10">
                        <h3 className="text-xl font-bold text-white mb-6">Subject Performance</h3>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={classPerformance}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                    <XAxis dataKey="subject" stroke="#fff" />
                                    <YAxis stroke="#fff" />
                                    <Tooltip contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: 'none', color: '#fff' }} />
                                    <Bar dataKey="avg" fill="#ec4899" radius={[4, 4, 0, 0]} name="Average Score" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="glass-effect rounded-2xl p-6 border border-white/10">
                        <h3 className="text-xl font-bold text-white mb-6">Weekly Trends</h3>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={weeklyEngagement}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                    <XAxis dataKey="day" stroke="#fff" />
                                    <YAxis stroke="#fff" />
                                    <Tooltip contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: 'none', color: '#fff' }} />
                                    <Legend />
                                    <Line type="monotone" dataKey="engagement" stroke="#3b82f6" strokeWidth={2} />
                                    <Line type="monotone" dataKey="mood" stroke="#22c55e" strokeWidth={2} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeacherAnalyticsPage
