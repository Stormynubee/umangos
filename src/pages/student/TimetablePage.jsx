import React, { useState } from 'react'
import { Calendar, Clock, BookOpen, MapPin, User, Download, ChevronLeft, ChevronRight } from 'lucide-react'

function TimetablePage() {
  const [selectedView, setSelectedView] = useState('week')
  const [currentWeek, setCurrentWeek] = useState(0)

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  const timetable = {
    Monday: [
      { time: '08:00 - 09:00', subject: 'Mathematics', teacher: 'Mr. Sharma', room: 'Room 301', type: 'core' },
      { time: '09:00 - 10:00', subject: 'English', teacher: 'Ms. Verma', room: 'Room 205', type: 'core' },
      { time: '10:00 - 10:15', subject: 'Break', type: 'break' },
      { time: '10:15 - 11:15', subject: 'Science', teacher: 'Dr. Patel', room: 'Lab A', type: 'core' },
      { time: '11:15 - 12:15', subject: 'History', teacher: 'Mr. Kumar', room: 'Room 102', type: 'elective' },
      { time: '12:15 - 01:00', subject: 'Lunch Break', type: 'break' },
      { time: '01:00 - 02:00', subject: 'Physical Education', teacher: 'Coach Singh', room: 'Sports Ground', type: 'activity' }
    ],
    Tuesday: [
      { time: '08:00 - 09:00', subject: 'Science', teacher: 'Dr. Patel', room: 'Lab A', type: 'core' },
      { time: '09:00 - 10:00', subject: 'Mathematics', teacher: 'Mr. Sharma', room: 'Room 301', type: 'core' },
      { time: '10:00 - 10:15', subject: 'Break', type: 'break' },
      { time: '10:15 - 11:15', subject: 'Geography', teacher: 'Ms. Reddy', room: 'Room 210', type: 'elective' },
      { time: '11:15 - 12:15', subject: 'English', teacher: 'Ms. Verma', room: 'Room 205', type: 'core' },
      { time: '12:15 - 01:00', subject: 'Lunch Break', type: 'break' },
      { time: '01:00 - 02:00', subject: 'Computer Science', teacher: 'Mr. Joshi', room: 'Lab B', type: 'elective' }
    ],
    Wednesday: [
      { time: '08:00 - 09:00', subject: 'English', teacher: 'Ms. Verma', room: 'Room 205', type: 'core' },
      { time: '09:00 - 10:00', subject: 'Mathematics', teacher: 'Mr. Sharma', room: 'Room 301', type: 'core' },
      { time: '10:00 - 10:15', subject: 'Break', type: 'break' },
      { time: '10:15 - 11:15', subject: 'History', teacher: 'Mr. Kumar', room: 'Room 102', type: 'elective' },
      { time: '11:15 - 12:15', subject: 'Science', teacher: 'Dr. Patel', room: 'Lab A', type: 'core' },
      { time: '12:15 - 01:00', subject: 'Lunch Break', type: 'break' },
      { time: '01:00 - 02:00', subject: 'Art & Craft', teacher: 'Ms. Iyer', room: 'Art Room', type: 'activity' }
    ],
    Thursday: [
      { time: '08:00 - 09:00', subject: 'Science', teacher: 'Dr. Patel', room: 'Lab A', type: 'core' },
      { time: '09:00 - 10:00', subject: 'Geography', teacher: 'Ms. Reddy', room: 'Room 210', type: 'elective' },
      { time: '10:00 - 10:15', subject: 'Break', type: 'break' },
      { time: '10:15 - 11:15', subject: 'Mathematics', teacher: 'Mr. Sharma', room: 'Room 301', type: 'core' },
      { time: '11:15 - 12:15', subject: 'English', teacher: 'Ms. Verma', room: 'Room 205', type: 'core' },
      { time: '12:15 - 01:00', subject: 'Lunch Break', type: 'break' },
      { time: '01:00 - 02:00', subject: 'Music', teacher: 'Mr. Das', room: 'Music Room', type: 'activity' }
    ],
    Friday: [
      { time: '08:00 - 09:00', subject: 'Mathematics', teacher: 'Mr. Sharma', room: 'Room 301', type: 'core' },
      { time: '09:00 - 10:00', subject: 'Computer Science', teacher: 'Mr. Joshi', room: 'Lab B', type: 'elective' },
      { time: '10:00 - 10:15', subject: 'Break', type: 'break' },
      { time: '10:15 - 11:15', subject: 'English', teacher: 'Ms. Verma', room: 'Room 205', type: 'core' },
      { time: '11:15 - 12:15', subject: 'Science', teacher: 'Dr. Patel', room: 'Lab A', type: 'core' },
      { time: '12:15 - 01:00', subject: 'Lunch Break', type: 'break' },
      { time: '01:00 - 02:00', subject: 'Library Period', teacher: 'Ms. Gupta', room: 'Library', type: 'activity' }
    ],
    Saturday: [
      { time: '08:00 - 09:00', subject: 'Activity Club', teacher: 'Various', room: 'Various', type: 'activity' },
      { time: '09:00 - 10:00', subject: 'Sports', teacher: 'Coach Singh', room: 'Sports Ground', type: 'activity' },
      { time: '10:00 - 10:15', subject: 'Break', type: 'break' },
      { time: '10:15 - 11:15', subject: 'Doubt Clearing Session', teacher: 'Various', room: 'Class Rooms', type: 'activity' },
      { time: '11:15 - 12:15', subject: 'Assembly', teacher: 'Principal', room: 'Auditorium', type: 'activity' }
    ]
  }

  const syllabus = [
    {
      subject: 'Mathematics',
      color: 'blue',
      chapters: [
        { id: 1, name: 'Real Numbers', status: 'completed', progress: 100 },
        { id: 2, name: 'Polynomials', status: 'completed', progress: 100 },
        { id: 3, name: 'Linear Equations', status: 'completed', progress: 100 },
        { id: 4, name: 'Quadratic Equations', status: 'in-progress', progress: 60 },
        { id: 5, name: 'Trigonometry', status: 'pending', progress: 0 },
        { id: 6, name: 'Statistics', status: 'pending', progress: 0 }
      ]
    },
    {
      subject: 'Science',
      color: 'green',
      chapters: [
        { id: 1, name: 'Chemical Reactions', status: 'completed', progress: 100 },
        { id: 2, name: 'Acids and Bases', status: 'completed', progress: 100 },
        { id: 3, name: 'Metals and Non-metals', status: 'in-progress', progress: 75 },
        { id: 4, name: 'Life Processes', status: 'in-progress', progress: 40 },
        { id: 5, name: 'Electricity', status: 'pending', progress: 0 },
        { id: 6, name: 'Magnetic Effects', status: 'pending', progress: 0 }
      ]
    },
    {
      subject: 'English',
      color: 'purple',
      chapters: [
        { id: 1, name: 'Literature: Prose', status: 'completed', progress: 100 },
        { id: 2, name: 'Literature: Poetry', status: 'in-progress', progress: 80 },
        { id: 3, name: 'Writing Skills', status: 'in-progress', progress: 70 },
        { id: 4, name: 'Grammar: Tenses', status: 'completed', progress: 100 },
        { id: 5, name: 'Grammar: Voice', status: 'in-progress', progress: 50 },
        { id: 6, name: 'Reading Comprehension', status: 'pending', progress: 20 }
      ]
    }
  ]

  const getClassColor = (type) => {
    switch (type) {
      case 'core': return 'bg-blue-500/20 border-blue-500/50 text-blue-400'
      case 'elective': return 'bg-purple-500/20 border-purple-500/50 text-purple-400'
      case 'activity': return 'bg-green-500/20 border-green-500/50 text-green-400'
      case 'break': return 'bg-gray-500/20 border-gray-500/50 text-gray-400'
      default: return 'bg-white/10 border-white/20 text-white'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-400 bg-green-500/20'
      case 'in-progress': return 'text-yellow-400 bg-yellow-500/20'
      case 'pending': return 'text-gray-400 bg-gray-500/20'
      default: return 'text-white bg-white/10'
    }
  }

  const getCurrentDay = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    return days[new Date().getDay()]
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-500/20 p-3 rounded-xl">
              <Calendar className="w-8 h-8 text-indigo-400" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">Timetable & Syllabus</h1>
              <p className="text-white/70 text-lg">Your weekly schedule and course progress</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-white/70 text-sm">Developed by Hansraj</p>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex items-center justify-between">
          <div className="glass-effect rounded-xl p-2 border border-white/10 inline-flex">
            {[
              { key: 'week', label: 'Weekly Timetable', icon: Calendar },
              { key: 'syllabus', label: 'Syllabus Progress', icon: BookOpen }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setSelectedView(tab.key)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center space-x-2 ${selectedView === tab.key
                    ? 'bg-indigo-500 text-white'
                    : 'text-white/70 hover:bg-white/10'
                  }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          <button className="glass-effect px-6 py-3 rounded-xl border border-white/10 hover:border-indigo-400/50 transition-all flex items-center space-x-2 text-white">
            <Download className="w-5 h-5" />
            <span className="font-semibold">Download PDF</span>
          </button>
        </div>

        {/* Weekly Timetable View */}
        {selectedView === 'week' && (
          <div className="space-y-6">
            {/* Current Day Highlight */}
            <div className="glass-effect rounded-xl p-4 border border-indigo-500/30 bg-indigo-500/5">
              <p className="text-center text-white">
                <span className="text-white/70">Today is </span>
                <span className="font-bold text-indigo-400">{getCurrentDay()}</span>
                <span className="text-white/70"> • Current Week</span>
              </p>
            </div>

            {/* Timetable Grid */}
            <div className="glass-effect rounded-2xl p-6 border border-white/10">
              <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
                {weekDays.map((day, dayIndex) => (
                  <div key={day} className={`${getCurrentDay() === day ? 'ring-2 ring-indigo-500' : ''} rounded-xl overflow-hidden`}>
                    <div className={`p-4 text-center font-bold ${getCurrentDay() === day
                        ? 'bg-indigo-500 text-white'
                        : 'bg-white/10 text-white/70'
                      }`}>
                      {day}
                    </div>
                    <div className="p-3 space-y-2">
                      {timetable[day].map((slot, index) => (
                        <div
                          key={index}
                          className={`rounded-lg p-3 border transition-all hover:scale-105 ${getClassColor(slot.type)}`}
                        >
                          <div className="flex items-start space-x-2 mb-2">
                            <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-semibold">{slot.time}</p>
                            </div>
                          </div>

                          {slot.type !== 'break' && (
                            <>
                              <p className="font-bold text-sm mb-1">{slot.subject}</p>
                              {slot.teacher && (
                                <div className="flex items-center space-x-1 text-xs opacity-80">
                                  <User className="w-3 h-3" />
                                  <p className="truncate">{slot.teacher}</p>
                                </div>
                              )}
                              {slot.room && (
                                <div className="flex items-center space-x-1 text-xs opacity-80">
                                  <MapPin className="w-3 h-3" />
                                  <p className="truncate">{slot.room}</p>
                                </div>
                              )}
                            </>
                          )}

                          {slot.type === 'break' && (
                            <p className="font-bold text-sm">{slot.subject}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="glass-effect rounded-xl p-6 border border-white/10">
              <h3 className="text-white font-semibold mb-4">Class Type Legend</h3>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded bg-blue-500/50 border border-blue-500"></div>
                  <span className="text-white/80 text-sm">Core Subjects</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded bg-purple-500/50 border border-purple-500"></div>
                  <span className="text-white/80 text-sm">Elective Subjects</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded bg-green-500/50 border border-green-500"></div>
                  <span className="text-white/80 text-sm">Activities</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded bg-gray-500/50 border border-gray-500"></div>
                  <span className="text-white/80 text-sm">Breaks</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Syllabus Progress View */}
        {selectedView === 'syllabus' && (
          <div className="space-y-6">
            {syllabus.map((subject, index) => (
              <div key={index} className="glass-effect rounded-2xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className={`bg-${subject.color}-500/20 p-3 rounded-xl`}>
                      <BookOpen className={`w-6 h-6 text-${subject.color}-400`} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">{subject.subject}</h2>
                      <p className="text-white/70">
                        {subject.chapters.filter(c => c.status === 'completed').length} of {subject.chapters.length} chapters completed
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-3xl font-bold text-white">
                      {Math.round(subject.chapters.reduce((sum, ch) => sum + ch.progress, 0) / subject.chapters.length)}%
                    </p>
                    <p className="text-white/70 text-sm">Overall Progress</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {subject.chapters.map((chapter) => (
                    <div key={chapter.id} className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3 flex-1">
                          <span className="text-white/50 font-mono text-sm">Ch {chapter.id}</span>
                          <h4 className="text-white font-semibold">{chapter.name}</h4>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(chapter.status)}`}>
                            {chapter.status === 'completed' ? 'Completed' : chapter.status === 'in-progress' ? 'In Progress' : 'Pending'}
                          </span>
                        </div>
                        <span className="text-white font-bold text-lg">{chapter.progress}%</span>
                      </div>

                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-500`}
                          style={{
                            width: `${chapter.progress}%`,
                            backgroundColor: chapter.status === 'completed' ? '#22c55e' :
                              chapter.status === 'in-progress' ? '#f59e0b' : '#6b7280'
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default TimetablePage
