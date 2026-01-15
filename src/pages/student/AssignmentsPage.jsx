import React, { useState } from 'react'
import { FileText, Upload, Clock, CheckCircle, AlertCircle, Calendar, Filter, Search } from 'lucide-react'

function AssignmentsPage() {
  const [selectedTab, setSelectedTab] = useState('pending')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('all')

  // Sample assignments data
  const assignments = [
    {
      id: 1,
      title: 'Mathematics - Quadratic Equations',
      subject: 'Mathematics',
      description: 'Solve all problems from chapter 4, exercises 4.1 to 4.5',
      dueDate: '2025-12-20',
      assignedDate: '2025-12-10',
      marks: 50,
      difficulty: 'Medium',
      status: 'pending',
      priority: 'high',
      attachments: ['Chapter4_Questions.pdf']
    },
    {
      id: 2,
      title: 'Science - Lab Report on Photosynthesis',
      subject: 'Science',
      description: 'Write a detailed lab report based on the photosynthesis experiment conducted in class',
      dueDate: '2025-12-18',
      assignedDate: '2025-12-08',
      marks: 30,
      difficulty: 'Hard',
      status: 'pending',
      priority: 'urgent',
      attachments: ['Lab_Guidelines.pdf', 'Report_Template.docx']
    },
    {
      id: 3,
      title: 'English - Essay on Climate Change',
      subject: 'English',
      description: 'Write a 1000-word essay discussing the impacts of climate change',
      dueDate: '2025-12-25',
      assignedDate: '2025-12-12',
      marks: 40,
      difficulty: 'Medium',
      status: 'submitted',
      submittedDate: '2025-12-15',
      grade: 38,
      feedback: 'Excellent work! Well-researched and articulated.'
    },
    {
      id: 4,
      title: 'History - Timeline Project',
      subject: 'History',
      description: 'Create a visual timeline of major events in World War II',
      dueDate: '2025-12-22',
      assignedDate: '2025-12-05',
      marks: 35,
      difficulty: 'Easy',
      status: 'submitted',
      submittedDate: '2025-12-14',
      grade: 32,
      feedback: 'Good effort. Add more details about key battles.'
    },
    {
      id: 5,
      title: 'Geography - Map Project',
      subject: 'Geography',
      description: 'Draw and label a political map of Asia',
      dueDate: '2025-12-15',
      assignedDate: '2025-12-01',
      marks: 25,
      difficulty: 'Easy',
      status: 'graded',
      submittedDate: '2025-12-12',
      grade: 23,
      feedback: 'Very neat and accurate. Well done!'
    }
  ]

  const stats = {
    total: assignments.length,
    pending: assignments.filter(a => a.status === 'pending').length,
    submitted: assignments.filter(a => a.status === 'submitted').length,
    graded: assignments.filter(a => a.status === 'graded').length,
    avgGrade: 88
  }

  const subjects = ['all', 'Mathematics', 'Science', 'English', 'History', 'Geography']

  const filteredAssignments = assignments.filter(assignment => {
    const matchesTab = selectedTab === 'all' || assignment.status === selectedTab
    const matchesSearch = assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assignment.subject.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSubject = selectedSubject === 'all' || assignment.subject === selectedSubject
    return matchesTab && matchesSearch && matchesSubject
  })

  const getDaysRemaining = (dueDate) => {
    const today = new Date()
    const due = new Date(dueDate)
    const diff = Math.ceil((due - today) / (1000 * 60 * 60 * 24))
    return diff
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'text-red-400 bg-red-500/20 border-red-500/30'
      case 'high': return 'text-orange-400 bg-orange-500/20 border-orange-500/30'
      case 'medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30'
      default: return 'text-blue-400 bg-blue-500/20 border-blue-500/30'
    }
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Hard': return 'text-red-400'
      case 'Medium': return 'text-yellow-400'
      default: return 'text-green-400'
    }
  }

  const getStatusBadge = (assignment) => {
    switch (assignment.status) {
      case 'pending':
        const days = getDaysRemaining(assignment.dueDate)
        if (days < 0) {
          return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-500/20 text-red-400 border border-red-500/30">Overdue</span>
        } else if (days === 0) {
          return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-orange-500/20 text-orange-400 border border-orange-500/30">Due Today</span>
        } else if (days <= 2) {
          return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">Due Soon</span>
        }
        return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-400 border border-blue-500/30">Pending</span>
      case 'submitted':
        return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-400 border border-purple-500/30">Submitted</span>
      case 'graded':
        return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-400 border border-green-500/30">Graded</span>
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-purple-500/20 p-3 rounded-xl">
              <FileText className="w-8 h-8 text-purple-400" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">Assignments</h1>
              <p className="text-white/70 text-lg">Manage and submit your assignments</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-white/70 text-sm">Developed by Hansraj</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="glass-effect rounded-xl p-4 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <p className="text-white/70 text-sm">Total</p>
              <FileText className="w-5 h-5 text-blue-400" />
            </div>
            <p className="text-3xl font-bold text-white">{stats.total}</p>
          </div>

          <div className="glass-effect rounded-xl p-4 border border-blue-500/30">
            <div className="flex items-center justify-between mb-2">
              <p className="text-white/70 text-sm">Pending</p>
              <Clock className="w-5 h-5 text-blue-400" />
            </div>
            <p className="text-3xl font-bold text-blue-400">{stats.pending}</p>
          </div>

          <div className="glass-effect rounded-xl p-4 border border-purple-500/30">
            <div className="flex items-center justify-between mb-2">
              <p className="text-white/70 text-sm">Submitted</p>
              <Upload className="w-5 h-5 text-purple-400" />
            </div>
            <p className="text-3xl font-bold text-purple-400">{stats.submitted}</p>
          </div>

          <div className="glass-effect rounded-xl p-4 border border-green-500/30">
            <div className="flex items-center justify-between mb-2">
              <p className="text-white/70 text-sm">Graded</p>
              <CheckCircle className="w-5 h-5 text-green-400" />
            </div>
            <p className="text-3xl font-bold text-green-400">{stats.graded}</p>
          </div>

          <div className="glass-effect rounded-xl p-4 border border-yellow-500/30">
            <div className="flex items-center justify-between mb-2">
              <p className="text-white/70 text-sm">Avg Grade</p>
              <CheckCircle className="w-5 h-5 text-yellow-400" />
            </div>
            <p className="text-3xl font-bold text-yellow-400">{stats.avgGrade}%</p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="glass-effect rounded-xl p-6 border border-white/10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 gap-4">
            {/* Tabs */}
            <div className="flex items-center space-x-2">
              {[
                { key: 'all', label: 'All', count: stats.total },
                { key: 'pending', label: 'Pending', count: stats.pending },
                { key: 'submitted', label: 'Submitted', count: stats.submitted },
                { key: 'graded', label: 'Graded', count: stats.graded }
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setSelectedTab(tab.key)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${selectedTab === tab.key
                      ? 'bg-purple-500 text-white'
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                    }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  type="text"
                  placeholder="Search assignments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white/10 text-white pl-10 pr-4 py-2 rounded-lg border border-white/20 focus:outline-none focus:border-purple-400 w-64"
                />
              </div>

              {/* Subject Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="bg-white/10 text-white pl-10 pr-4 py-2 rounded-lg border border-white/20 focus:outline-none focus:border-purple-400 appearance-none"
                >
                  {subjects.map(subject => (
                    <option key={subject} value={subject} className="bg-gray-900">
                      {subject === 'all' ? 'All Subjects' : subject}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Assignments List */}
        <div className="space-y-4">
          {filteredAssignments.length === 0 ? (
            <div className="glass-effect rounded-2xl p-12 border border-white/10 text-center">
              <FileText className="w-16 h-16 text-white/30 mx-auto mb-4" />
              <p className="text-white/60 text-lg">No assignments found</p>
            </div>
          ) : (
            filteredAssignments.map(assignment => (
              <div key={assignment.id} className="glass-effect rounded-2xl p-6 border border-white/10 hover:border-purple-400/50 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-start space-x-4">
                      <div className="bg-purple-500/20 p-3 rounded-xl">
                        <FileText className="w-6 h-6 text-purple-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-bold text-white">{assignment.title}</h3>
                          {getStatusBadge(assignment)}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-white/70 mb-3">
                          <span className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>Assigned: {new Date(assignment.assignedDate).toLocaleDateString()}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                          </span>
                          {assignment.status === 'pending' && (
                            <span className={`font-semibold ${getDaysRemaining(assignment.dueDate) < 0 ? 'text-red-400' :
                                getDaysRemaining(assignment.dueDate) <= 2 ? 'text-orange-400' :
                                  'text-blue-400'
                              }`}>
                              {getDaysRemaining(assignment.dueDate) < 0
                                ? `${Math.abs(getDaysRemaining(assignment.dueDate))} days overdue`
                                : getDaysRemaining(assignment.dueDate) === 0
                                  ? 'Due today!'
                                  : `${getDaysRemaining(assignment.dueDate)} days left`
                              }
                            </span>
                          )}
                        </div>
                        <p className="text-white/80 mb-4">{assignment.description}</p>

                        <div className="flex items-center space-x-6">
                          <span className="text-sm text-white/70">
                            Subject: <span className="text-white font-semibold">{assignment.subject}</span>
                          </span>
                          <span className="text-sm text-white/70">
                            Marks: <span className="text-white font-semibold">{assignment.marks}</span>
                          </span>
                          <span className="text-sm text-white/70">
                            Difficulty: <span className={`font-semibold ${getDifficultyColor(assignment.difficulty)}`}>{assignment.difficulty}</span>
                          </span>
                        </div>

                        {assignment.attachments && assignment.attachments.length > 0 && (
                          <div className="mt-4 flex items-center space-x-2">
                            <p className="text-sm text-white/70">Attachments:</p>
                            {assignment.attachments.map((file, index) => (
                              <button key={index} className="text-sm bg-blue-500/20 text-blue-400 px-3 py-1 rounded-lg hover:bg-blue-500/30 transition-all">
                                {file}
                              </button>
                            ))}
                          </div>
                        )}

                        {assignment.status === 'graded' && (
                          <div className="mt-4 bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-white font-semibold">Grade Received:</span>
                              <span className="text-2xl font-bold text-green-400">{assignment.grade}/{assignment.marks}</span>
                            </div>
                            <p className="text-white/80 text-sm"><span className="font-semibold">Feedback:</span> {assignment.feedback}</p>
                          </div>
                        )}

                        {assignment.status === 'submitted' && (
                          <div className="mt-4 bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                            <p className="text-purple-400 text-sm">
                              ✅ Submitted on {new Date(assignment.submittedDate).toLocaleDateString()} - Awaiting grade
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {assignment.status === 'pending' && (
                    <button className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold transition-all flex items-center space-x-2">
                      <Upload className="w-5 h-5" />
                      <span>Submit</span>
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default AssignmentsPage
