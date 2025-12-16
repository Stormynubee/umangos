import React, { useState } from 'react'
import { Calendar, CheckCircle, XCircle, Clock, TrendingUp, AlertCircle } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts'

function AttendancePage() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  const [selectedYear] = useState(new Date().getFullYear())

  // Sample attendance data
  const attendanceStats = {
    total: 120,
    present: 108,
    absent: 8,
    late: 4,
    percentage: 90
  }

  const subjectAttendance = [
    { subject: 'Mathematics', total: 24, present: 22, percentage: 91.67, status: 'good' },
    { subject: 'Science', total: 24, present: 20, percentage: 83.33, status: 'warning' },
    { subject: 'English', total: 24, present: 23, percentage: 95.83, status: 'excellent' },
    { subject: 'History', total: 24, present: 21, percentage: 87.5, status: 'good' },
    { subject: 'Geography', total: 24, present: 22, percentage: 91.67, status: 'good' }
  ]

  const monthlyTrend = [
    { month: 'Jul', percentage: 92 },
    { month: 'Aug', percentage: 88 },
    { month: 'Sep', percentage: 94 },
    { month: 'Oct', percentage: 89 },
    { month: 'Nov', percentage: 91 },
    { month: 'Dec', percentage: 90 }
  ]

  const attendancePieData = [
    { name: 'Present', value: attendanceStats.present, color: '#22c55e' },
    { name: 'Absent', value: attendanceStats.absent, color: '#ef4444' },
    { name: 'Late', value: attendanceStats.late, color: '#f59e0b' }
  ]

  // Generate calendar days
  const generateCalendarDays = () => {
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate()
    const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1).getDay()
    const days = []

    // Fill empty days
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push({ day: null, status: null })
    }

    // Fill actual days with random attendance
    for (let i = 1; i <= daysInMonth; i++) {
      const random = Math.random()
      let status = 'present'
      if (random > 0.95) status = 'absent'
      else if (random > 0.90) status = 'late'
      
      // Future dates
      if (i > new Date().getDate() && selectedMonth === new Date().getMonth()) {
        status = 'future'
      }

      days.push({ day: i, status })
    }

    return days
  }

  const calendarDays = generateCalendarDays()

  const getStatusColor = (status) => {
    switch (status) {
      case 'present': return 'bg-green-500/25 text-green-300 border-green-500/40 hover:border-green-400/60'
      case 'absent': return 'bg-red-500/25 text-red-300 border-red-500/40 hover:border-red-400/60'
      case 'late': return 'bg-yellow-500/25 text-yellow-300 border-yellow-500/40 hover:border-yellow-400/60'
      case 'future': return 'bg-white/8 text-white/40 border-white/15'
      default: return 'bg-transparent'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'present': return <CheckCircle className="w-5 h-5" />
      case 'absent': return <XCircle className="w-5 h-5" />
      case 'late': return <Clock className="w-5 h-5" />
      default: return null
    }
  }

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Enhanced Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-500/20 p-4 rounded-2xl border-2 border-blue-400/30">
              <Calendar className="w-10 h-10 text-blue-400" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white text-shadow-lg mb-1">Attendance</h1>
              <p className="text-white/80 text-lg font-medium text-shadow-sm">Track your attendance records</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-white/80 text-sm font-medium">Developed by Hansraj</p>
          </div>
        </div>

        {/* Enhanced Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="card-enhanced border-2 border-blue-400/30">
            <div className="flex items-center justify-between mb-3">
              <p className="text-white/85 text-base font-semibold">Total Days</p>
              <Calendar className="w-6 h-6 text-blue-400" />
            </div>
            <p className="text-4xl font-extrabold text-white text-shadow-md">{attendanceStats.total}</p>
          </div>

          <div className="card-enhanced border-2 border-green-500/40">
            <div className="flex items-center justify-between mb-3">
              <p className="text-white/85 text-base font-semibold">Present</p>
              <CheckCircle className="w-6 h-6 text-green-400" />
            </div>
            <p className="text-4xl font-extrabold text-green-400 text-shadow-md">{attendanceStats.present}</p>
          </div>

          <div className="card-enhanced border-2 border-red-500/40">
            <div className="flex items-center justify-between mb-3">
              <p className="text-white/85 text-base font-semibold">Absent</p>
              <XCircle className="w-6 h-6 text-red-400" />
            </div>
            <p className="text-4xl font-extrabold text-red-400 text-shadow-md">{attendanceStats.absent}</p>
          </div>

          <div className="card-enhanced border-2 border-yellow-500/40">
            <div className="flex items-center justify-between mb-3">
              <p className="text-white/85 text-base font-semibold">Late</p>
              <Clock className="w-6 h-6 text-yellow-400" />
            </div>
            <p className="text-4xl font-extrabold text-yellow-400 text-shadow-md">{attendanceStats.late}</p>
          </div>

          <div className="card-enhanced border-2 border-purple-500/40">
            <div className="flex items-center justify-between mb-3">
              <p className="text-white/85 text-base font-semibold">Percentage</p>
              <TrendingUp className="w-6 h-6 text-purple-400" />
            </div>
            <p className="text-4xl font-extrabold text-purple-400 text-shadow-md">{attendanceStats.percentage}%</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Enhanced Calendar */}
          <div className="lg:col-span-2 card-readable border-2 border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-bold text-2xl text-shadow-md">Attendance Calendar</h3>
              <select 
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                className="input-enhanced text-base font-semibold"
              >
                {months.map((month, index) => (
                  <option key={index} value={index} className="bg-gray-900">{month} {selectedYear}</option>
                ))}
              </select>
            </div>

            {/* Calendar Grid */}
            <div className="space-y-3">
              {/* Week Days Header */}
              <div className="grid grid-cols-7 gap-2 mb-3">
                {weekDays.map((day) => (
                  <div key={day} className="text-center text-white/80 text-base font-bold py-2 text-shadow-sm">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-2">
                {calendarDays.map((item, index) => (
                  <div
                    key={index}
                    className={`aspect-square flex flex-col items-center justify-center rounded-xl border-2 transition-all ${item.day ? getStatusColor(item.status) + ' cursor-pointer hover:scale-105 shadow-lg' : 'bg-white/5 border-white/10'}`}
                  >
                    {item.day && (
                      <>
                        <span className="text-xl font-bold text-shadow-sm">{item.day}</span>
                        {item.status !== 'future' && (
                          <span className="mt-1">{getStatusIcon(item.status)}</span>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Legend */}
            <div className="flex items-center justify-center space-x-8 mt-8 pt-6 border-t-2 border-white/20">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-white/85 text-base font-semibold">Present</span>
              </div>
              <div className="flex items-center space-x-2">
                <XCircle className="w-5 h-5 text-red-400" />
                <span className="text-white/85 text-base font-semibold">Absent</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-yellow-400" />
                <span className="text-white/85 text-base font-semibold">Late</span>
              </div>
            </div>
          </div>

          {/* Enhanced Attendance Distribution */}
          <div className="card-readable border-2 border-white/20">
            <h3 className="text-white font-bold text-2xl mb-6 text-shadow-md">Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={attendancePieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => \\: \%\}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {attendancePieData.map((entry, index) => (
                    <Cell key={\cell-\\} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0,0,0,0.85)', 
                    border: '2px solid rgba(255,255,255,0.3)', 
                    borderRadius: '12px',
                    padding: '12px',
                    fontSize: '14px',
                    fontWeight: 600
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="mt-8 space-y-3">
              {attendancePieData.map((item, index) => (
                <div key={index} className="flex items-center justify-between bg-white/10 rounded-lg px-4 py-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 rounded-full shadow-lg" style={{ backgroundColor: item.color }} />
                    <span className="text-white/85 text-base font-semibold">{item.name}</span>
                  </div>
                  <span className="text-white font-bold text-lg">{item.value} days</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Subject-wise Attendance */}
        <div className="card-readable border-2 border-white/20">
          <h3 className="text-white font-bold text-2xl mb-6 text-shadow-md">Subject-wise Attendance</h3>
          <div className="space-y-4">
            {subjectAttendance.map((subject, index) => (
              <div key={index} className="bg-white/10 rounded-xl p-5 hover:bg-white/15 transition-all border-2 border-white/20 hover:border-white/30">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-white font-bold text-xl text-shadow-sm">{subject.subject}</h4>
                    <p className="text-white/75 text-base font-medium mt-1">{subject.present} / {subject.total} classes</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-extrabold text-white text-shadow-md">{subject.percentage.toFixed(1)}%</p>
                    <span className={\	ext-sm font-bold px-3 py-1.5 rounded-full mt-2 inline-block \\}>
                      {subject.status === 'excellent' ? 'Excellent' : subject.status === 'good' ? 'Good' : 'Warning'}
                    </span>
                  </div>
                </div>
                <div className="w-full bg-white/15 rounded-full h-4 shadow-inner">
                  <div 
                    className="h-4 rounded-full transition-all duration-500 shadow-lg"
                    style={{ 
                      width: \\%\,
                      backgroundColor: subject.percentage >= 90 ? '#22c55e' : subject.percentage >= 75 ? '#3b82f6' : '#f59e0b'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Monthly Trend */}
        <div className="card-readable border-2 border-white/20">
          <h3 className="text-white font-bold text-2xl mb-6 text-shadow-md">6-Month Attendance Trend</h3>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.15)" />
              <XAxis 
                dataKey="month" 
                stroke="#fff" 
                tick={{ fill: '#fff', fontSize: 14, fontWeight: 600 }} 
              />
              <YAxis 
                stroke="#fff" 
                tick={{ fill: '#fff', fontSize: 14, fontWeight: 600 }} 
                domain={[0, 100]} 
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
                dataKey="percentage" 
                stroke="#8b5cf6" 
                strokeWidth={3} 
                dot={{ fill: '#8b5cf6', r: 6 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Enhanced Alerts */}
        {attendanceStats.percentage < 75 && (
          <div className="card-readable border-2 border-red-500/40 bg-red-500/10">
            <div className="flex items-start space-x-4">
              <AlertCircle className="w-7 h-7 text-red-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-red-300 font-bold text-xl mb-3 text-shadow-sm">Attendance Alert!</h3>
                <p className="text-white/85 text-base leading-relaxed font-medium">
                  Your attendance is below 75%. You need to maintain at least 75% attendance to be eligible for exams.
                  Please ensure regular attendance to avoid academic issues.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AttendancePage
