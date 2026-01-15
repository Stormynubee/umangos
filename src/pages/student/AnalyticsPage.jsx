import React, { useState } from 'react'
import { TrendingUp, Award, Clock, Calendar, BookOpen, Activity, Target, Brain } from 'lucide-react'
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, PieChart, Pie, Cell } from 'recharts'

function AnalyticsPage() {
    const [timeRange, setTimeRange] = useState('semester')

    // Sample Data
    const performanceData = [
        { month: 'Aug', gpa: 3.2, attendance: 95, focus: 88 },
        { month: 'Sep', gpa: 3.4, attendance: 92, focus: 85 },
        { month: 'Oct', gpa: 3.5, attendance: 96, focus: 90 },
        { month: 'Nov', gpa: 3.8, attendance: 98, focus: 92 },
        { month: 'Dec', gpa: 3.9, attendance: 94, focus: 89 },
        { month: 'Jan', gpa: 3.9, attendance: 97, focus: 94 }
    ]

    const subjectData = [
        { subject: 'Math', A: 120, B: 110, fullMark: 150 },
        { subject: 'Science', A: 98, B: 130, fullMark: 150 },
        { subject: 'English', A: 86, B: 130, fullMark: 150 },
        { subject: 'History', A: 99, B: 100, fullMark: 150 },
        { subject: 'Geography', A: 85, B: 90, fullMark: 150 },
        { subject: 'Physics', A: 65, B: 85, fullMark: 150 }
    ]

    const studyHoursData = [
        { name: 'Mon', hours: 4 },
        { name: 'Tue', hours: 5.5 },
        { name: 'Wed', hours: 3 },
        { name: 'Thu', hours: 6 },
        { name: 'Fri', hours: 4.5 },
        { name: 'Sat', hours: 7 },
        { name: 'Sun', hours: 2 }
    ]

    const focusDistribution = [
        { name: 'High Focus', value: 45, color: '#22c55e' },
        { name: 'Medium Focus', value: 35, color: '#eab308' },
        { name: 'Low Focus', value: 20, color: '#ef4444' }
    ]

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="bg-blue-500/20 p-3 rounded-xl border border-blue-500/30">
                            <TrendingUp className="w-8 h-8 text-blue-400" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold text-white">Analytics Dashboard</h1>
                            <p className="text-white/70 text-lg">Comprehensive performance insights</p>
                        </div>
                    </div>

                    <div className="glass-effect rounded-lg p-1 border border-white/10 flex">
                        {['month', 'semester', 'year'].map(range => (
                            <button
                                key={range}
                                onClick={() => setTimeRange(range)}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${timeRange === range ? 'bg-blue-500 text-white shadow-lg' : 'text-white/60 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {range.charAt(0).toUpperCase() + range.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="glass-effect rounded-2xl p-6 border border-white/10 relative overflow-hidden group">
                        <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Award className="w-24 h-24 text-yellow-400" />
                        </div>
                        <div className="relative z-10">
                            <div className="flex items-center space-x-2 text-yellow-400 mb-2">
                                <Award className="w-5 h-5" />
                                <span className="font-semibold">Current GPA</span>
                            </div>
                            <p className="text-4xl font-bold text-white">3.9</p>
                            <p className="text-green-400 text-sm mt-1 flex items-center">
                                <TrendingUp className="w-3 h-3 mr-1" /> +0.2 this semester
                            </p>
                        </div>
                    </div>

                    <div className="glass-effect rounded-2xl p-6 border border-white/10 relative overflow-hidden group">
                        <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Calendar className="w-24 h-24 text-blue-400" />
                        </div>
                        <div className="relative z-10">
                            <div className="flex items-center space-x-2 text-blue-400 mb-2">
                                <Calendar className="w-5 h-5" />
                                <span className="font-semibold">Attendance</span>
                            </div>
                            <p className="text-4xl font-bold text-white">96%</p>
                            <p className="text-white/60 text-sm mt-1">Excellent record</p>
                        </div>
                    </div>

                    <div className="glass-effect rounded-2xl p-6 border border-white/10 relative overflow-hidden group">
                        <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Clock className="w-24 h-24 text-purple-400" />
                        </div>
                        <div className="relative z-10">
                            <div className="flex items-center space-x-2 text-purple-400 mb-2">
                                <Clock className="w-5 h-5" />
                                <span className="font-semibold">Study Hours</span>
                            </div>
                            <p className="text-4xl font-bold text-white">32h</p>
                            <p className="text-green-400 text-sm mt-1 flex items-center">
                                <TrendingUp className="w-3 h-3 mr-1" /> +4h this week
                            </p>
                        </div>
                    </div>

                    <div className="glass-effect rounded-2xl p-6 border border-white/10 relative overflow-hidden group">
                        <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Target className="w-24 h-24 text-green-400" />
                        </div>
                        <div className="relative z-10">
                            <div className="flex items-center space-x-2 text-green-400 mb-2">
                                <Target className="w-5 h-5" />
                                <span className="font-semibold">Goals Met</span>
                            </div>
                            <p className="text-4xl font-bold text-white">12/15</p>
                            <p className="text-white/60 text-sm mt-1">80% completion rate</p>
                        </div>
                    </div>
                </div>

                {/* Charts Section 1: Performance Trend & Subject Radar */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 glass-effect rounded-2xl p-6 border border-white/10">
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
                            <Activity className="w-5 h-5 text-blue-400" />
                            <span>Academic Performance Trend</span>
                        </h3>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={performanceData}>
                                    <defs>
                                        <linearGradient id="colorGpa" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                    <XAxis dataKey="month" stroke="#fff" />
                                    <YAxis stroke="#fff" domain={[0, 4]} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                                    />
                                    <Area type="monotone" dataKey="gpa" stroke="#3b82f6" fillOpacity={1} fill="url(#colorGpa)" strokeWidth={3} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="glass-effect rounded-2xl p-6 border border-white/10">
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
                            <Brain className="w-5 h-5 text-purple-400" />
                            <span>Subject Strengths</span>
                        </h3>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={subjectData}>
                                    <PolarGrid stroke="rgba(255,255,255,0.2)" />
                                    <PolarAngleAxis dataKey="subject" tick={{ fill: 'white', fontSize: 12 }} />
                                    <PolarRadiusAxis angle={30} domain={[0, 150]} stroke="rgba(255,255,255,0.2)" />
                                    <Radar name="My Score" dataKey="A" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.5} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                                    />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Charts Section 2: Study Habits & Focus */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="glass-effect rounded-2xl p-6 border border-white/10">
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
                            <Clock className="w-5 h-5 text-green-400" />
                            <span>Weekly Study Hours</span>
                        </h3>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={studyHoursData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                    <XAxis dataKey="name" stroke="#fff" />
                                    <YAxis stroke="#fff" />
                                    <Tooltip
                                        cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                        contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                                    />
                                    <Bar dataKey="hours" fill="#22c55e" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="glass-effect rounded-2xl p-6 border border-white/10 flex flex-col">
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
                            <Activity className="w-5 h-5 text-orange-400" />
                            <span>Focus Quality Distribution</span>
                        </h3>
                        <div className="flex-1 flex items-center justify-center">
                            <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                    <Pie
                                        data={focusDistribution}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {focusDistribution.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="space-y-4 ml-8">
                                {focusDistribution.map((item, index) => (
                                    <div key={index} className="flex items-center space-x-2">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                                        <span className="text-white/80">{item.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AnalyticsPage
