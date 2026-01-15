import React, { useState } from 'react'
import { BookOpen, Calendar, Clock, Award, TrendingUp, AlertCircle, ChevronRight, FileText } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, LineChart, Line } from 'recharts'

function ExamsPage() {
  const [selectedTab, setSelectedTab] = useState('upcoming')

  // Sample exam data
  const upcomingExams = [
    {
      id: 1,
      subject: 'Mathematics',
      type: 'Mid-Term',
      date: '2025-12-22',
      time: '09:00 AM',
      duration: '3 hours',
      totalMarks: 100,
      syllabus: ['Quadratic Equations', 'Trigonometry', 'Statistics'],
      venue: 'Room 301',
      daysLeft: 6
    },
    {
      id: 2,
      subject: 'Science',
      type: 'Unit Test',
      date: '2025-12-18',
      time: '10:30 AM',
      duration: '2 hours',
      totalMarks: 50,
      syllabus: ['Photosynthesis', 'Respiration', 'Cell Structure'],
      venue: 'Lab A',
      daysLeft: 2
    },
    {
      id: 3,
      subject: 'English',
      type: 'Mid-Term',
      date: '2025-12-25',
      time: '11:00 AM',
      duration: '3 hours',
      totalMarks: 100,
      syllabus: ['Poetry Analysis', 'Essay Writing', 'Grammar'],
      venue: 'Room 205',
      daysLeft: 9
    }
  ]

  const pastExams = [
    {
      id: 4,
      subject: 'History',
      type: 'Unit Test',
      date: '2025-12-10',
      marksObtained: 42,
      totalMarks: 50,
      percentage: 84,
      grade: 'A',
      rank: 3,
      feedback: 'Excellent work! Very detailed answers.'
    },
    {
      id: 5,
      subject: 'Geography',
      type: 'Mid-Term',
      date: '2025-12-05',
      marksObtained: 88,
      totalMarks: 100,
      percentage: 88,
      grade: 'A+',
      rank: 1,
      feedback: 'Outstanding performance. Keep it up!'
    },
    {
      id: 6,
      subject: 'Mathematics',
      type: 'Unit Test',
      date: '2025-11-28',
      marksObtained: 38,
      totalMarks: 50,
      percentage: 76,
      grade: 'B+',
      rank: 8,
      feedback: 'Good effort. Focus more on complex problems.'
    }
  ]

  const performanceData = [
    { subject: 'Math', score: 76 },
    { subject: 'Science', score: 82 },
    { subject: 'English', score: 91 },
    { subject: 'History', score: 84 },
    { subject: 'Geography', score: 88 }
  ]

  const trendData = [
    { exam: 'Test 1', score: 72 },
    { exam: 'Test 2', score: 76 },
    { exam: 'Mid-1', score: 80 },
    { exam: 'Test 3', score: 84 },
    { exam: 'Mid-2', score: 88 }
  ]

  const stats = {
    totalExams: pastExams.length + upcomingExams.length,
    upcoming: upcomingExams.length,
    completed: pastExams.length,
    avgScore: 83
  }

  const getGradeColor = (grade) => {
    if (grade === 'A+' || grade === 'A') return 'text-green-400'
    if (grade === 'B+' || grade === 'B') return 'text-blue-400'
    if (grade === 'C+' || grade === 'C') return 'text-yellow-400'
    return 'text-red-400'
  }

  const getDaysLeftColor = (days) => {
    if (days <= 2) return 'text-red-400 bg-red-500/20 border-red-500/30'
    if (days <= 5) return 'text-orange-400 bg-orange-500/20 border-orange-500/30'
    return 'text-blue-400 bg-blue-500/20 border-blue-500/30'
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-pink-500/20 p-3 rounded-xl">
              <BookOpen className="w-8 h-8 text-pink-400" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">Exams & Tests</h1>
              <p className="text-white/70 text-lg">Track your exam schedule and performance</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-white/70 text-sm">Developed by Hansraj</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="glass-effect rounded-xl p-4 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <p className="text-white/70 text-sm">Total Exams</p>
              <BookOpen className="w-5 h-5 text-blue-400" />
            </div>
            <p className="text-3xl font-bold text-white">{stats.totalExams}</p>
          </div>

          <div className="glass-effect rounded-xl p-4 border border-orange-500/30">
            <div className="flex items-center justify-between mb-2">
              <p className="text-white/70 text-sm">Upcoming</p>
              <Calendar className="w-5 h-5 text-orange-400" />
            </div>
            <p className="text-3xl font-bold text-orange-400">{stats.upcoming}</p>
          </div>

          <div className="glass-effect rounded-xl p-4 border border-green-500/30">
            <div className="flex items-center justify-between mb-2">
              <p className="text-white/70 text-sm">Completed</p>
              <Award className="w-5 h-5 text-green-400" />
            </div>
            <p className="text-3xl font-bold text-green-400">{stats.completed}</p>
          </div>

          <div className="glass-effect rounded-xl p-4 border border-purple-500/30">
            <div className="flex items-center justify-between mb-2">
              <p className="text-white/70 text-sm">Avg Score</p>
              <TrendingUp className="w-5 h-5 text-purple-400" />
            </div>
            <p className="text-3xl font-bold text-purple-400">{stats.avgScore}%</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="glass-effect rounded-xl p-2 border border-white/10 inline-flex">
          {[
            { key: 'upcoming', label: 'Upcoming', icon: Calendar },
            { key: 'past', label: 'Past Results', icon: Award },
            { key: 'performance', label: 'Performance', icon: TrendingUp }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setSelectedTab(tab.key)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center space-x-2 ${selectedTab === tab.key
                ? 'bg-pink-500 text-white'
                : 'text-white/70 hover:bg-white/10'
                }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Upcoming Exams Tab */}
        {selectedTab === 'upcoming' && (
          <div className="space-y-4">
            {upcomingExams.length === 0 ? (
              <div className="glass-effect rounded-2xl p-12 border border-white/10 text-center">
                <Calendar className="w-16 h-16 text-white/30 mx-auto mb-4" />
                <p className="text-white/60 text-lg">No upcoming exams</p>
              </div>
            ) : (
              upcomingExams.map(exam => (
                <div key={exam.id} className="glass-effect rounded-2xl p-6 border border-white/10 hover:border-pink-400/50 transition-all">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="bg-pink-500/20 p-3 rounded-xl">
                          <BookOpen className="w-6 h-6 text-pink-400" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-2xl font-bold text-white">{exam.subject}</h3>
                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-400 border border-purple-500/30">
                              {exam.type}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getDaysLeftColor(exam.daysLeft)}`}>
                              {exam.daysLeft} {exam.daysLeft === 1 ? 'day' : 'days'} left
                            </span>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div className="flex items-center space-x-2 text-white/70">
                              <Calendar className="w-4 h-4" />
                              <span className="text-sm">{new Date(exam.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-white/70">
                              <Clock className="w-4 h-4" />
                              <span className="text-sm">{exam.time}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-white/70">
                              <Clock className="w-4 h-4" />
                              <span className="text-sm">{exam.duration}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-white/70">
                              <Award className="w-4 h-4" />
                              <span className="text-sm">{exam.totalMarks} marks</span>
                            </div>
                          </div>

                          <div className="bg-white/5 rounded-xl p-4">
                            <p className="text-white/70 text-sm mb-2">Syllabus Coverage:</p>
                            <div className="flex flex-wrap gap-2">
                              {exam.syllabus.map((topic, index) => (
                                <span key={index} className="px-3 py-1 rounded-lg bg-blue-500/20 text-blue-400 text-sm">
                                  {topic}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="mt-4 flex items-center justify-between">
                            <span className="text-white/70 text-sm">Venue: <span className="text-white font-semibold">{exam.venue}</span></span>
                            <button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg font-semibold transition-all flex items-center space-x-2">
                              <FileText className="w-5 h-5" />
                              <span>View Syllabus</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {exam.daysLeft <= 3 && (
                    <div className="mt-4 bg-orange-500/10 border border-orange-500/30 rounded-lg p-4 flex items-start space-x-3">
                      <AlertCircle className="w-5 h-5 text-orange-400 mt-0.5" />
                      <div>
                        <p className="text-orange-400 font-semibold">Exam Alert</p>
                        <p className="text-white/80 text-sm">This exam is coming up soon. Make sure you're well prepared!</p>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* Past Exams Tab */}
        {selectedTab === 'past' && (
          <div className="space-y-4">
            {pastExams.map(exam => (
              <div key={exam.id} className="glass-effect rounded-2xl p-6 border border-white/10 hover:border-green-400/50 transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="bg-green-500/20 p-3 rounded-xl">
                        <Award className="w-6 h-6 text-green-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-2xl font-bold text-white">{exam.subject}</h3>
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-400 border border-purple-500/30">
                            {exam.type}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getGradeColor(exam.grade)}`}>
                            Grade: {exam.grade}
                          </span>
                        </div>

                        <div className="flex items-center space-x-6 text-white/70 text-sm mb-4">
                          <span>Date: {new Date(exam.date).toLocaleDateString()}</span>
                          <span>Rank: {exam.rank}</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="bg-white/5 rounded-xl p-4">
                            <p className="text-white/70 text-sm mb-1">Marks Obtained</p>
                            <p className="text-3xl font-bold text-white">{exam.marksObtained}/{exam.totalMarks}</p>
                          </div>
                          <div className="bg-white/5 rounded-xl p-4">
                            <p className="text-white/70 text-sm mb-1">Percentage</p>
                            <p className="text-3xl font-bold text-green-400">{exam.percentage}%</p>
                          </div>
                          <div className="bg-white/5 rounded-xl p-4">
                            <p className="text-white/70 text-sm mb-1">Class Rank</p>
                            <p className="text-3xl font-bold text-purple-400">#{exam.rank}</p>
                          </div>
                        </div>

                        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                          <p className="text-green-400 font-semibold mb-2">Teacher Feedback</p>
                          <p className="text-white/80">{exam.feedback}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Performance Tab */}
        {selectedTab === 'performance' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Subject-wise Performance */}
              <div className="glass-effect rounded-2xl p-6 border border-white/10">
                <h3 className="text-white font-semibold text-xl mb-4">Subject-wise Performance</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="subject" stroke="#fff" tick={{ fill: '#fff' }} />
                    <YAxis stroke="#fff" tick={{ fill: '#fff' }} domain={[0, 100]} />
                    <Tooltip
                      contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px' }}
                    />
                    <Bar dataKey="score" fill="#ec4899" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Radar Chart */}
              <div className="glass-effect rounded-2xl p-6 border border-white/10">
                <h3 className="text-white font-semibold text-xl mb-4">Skills Assessment</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={performanceData}>
                    <PolarGrid stroke="rgba(255,255,255,0.2)" />
                    <PolarAngleAxis dataKey="subject" stroke="#fff" tick={{ fill: '#fff' }} />
                    <PolarRadiusAxis stroke="#fff" domain={[0, 100]} />
                    <Radar name="Score" dataKey="score" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Performance Trend */}
            <div className="glass-effect rounded-2xl p-6 border border-white/10">
              <h3 className="text-white font-semibold text-xl mb-4">Performance Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="exam" stroke="#fff" tick={{ fill: '#fff' }} />
                  <YAxis stroke="#fff" tick={{ fill: '#fff' }} domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#22c55e"
                    strokeWidth={3}
                    dot={{ fill: '#22c55e', r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Performance Summary */}
            <div className="glass-effect rounded-2xl p-6 border border-white/10">
              <h3 className="text-white font-semibold text-xl mb-4">Performance Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                  <h4 className="text-green-400 font-semibold mb-2">Strengths</h4>
                  <ul className="text-white/80 text-sm space-y-1">
                    <li>✅ Consistent performance in English (91%)</li>
                    <li>✅ Strong improvement trend (+16% over 5 tests)</li>
                    <li>✅ Excellent in Geography (88%)</li>
                  </ul>
                </div>
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                  <h4 className="text-yellow-400 font-semibold mb-2">Areas for Improvement</h4>
                  <ul className="text-white/80 text-sm space-y-1">
                    <li>✅ Focus more on Mathematics (76%)</li>
                    <li>✅ Practice complex problem-solving</li>
                    <li>✅ Improve time management during exams</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ExamsPage
