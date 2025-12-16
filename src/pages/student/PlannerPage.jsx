import React, { useState } from 'react'
import { Calendar, CheckSquare, Plus, Trash2, Edit, Flag, Clock, Filter, Search, Tag } from 'lucide-react'

function PlannerPage() {
  const [selectedView, setSelectedView] = useState('tasks')
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [showAddTask, setShowAddTask] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterPriority, setFilterPriority] = useState('all')
  const [filterCategory, setFilterCategory] = useState('all')

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Complete Math Assignment',
      description: 'Solve problems from Chapter 4',
      dueDate: '2025-12-18',
      dueTime: '10:00 AM',
      priority: 'high',
      category: 'academic',
      completed: false,
      tags: ['Mathematics', 'Homework']
    },
    {
      id: 2,
      title: 'Science Lab Report',
      description: 'Write photosynthesis experiment report',
      dueDate: '2025-12-20',
      dueTime: '02:00 PM',
      priority: 'urgent',
      category: 'academic',
      completed: false,
      tags: ['Science', 'Lab']
    },
    {
      id: 3,
      title: 'Morning Workout',
      description: '30 minutes cardio and stretching',
      dueDate: '2025-12-17',
      dueTime: '06:00 AM',
      priority: 'medium',
      category: 'personal',
      completed: true,
      tags: ['Health', 'Exercise']
    },
    {
      id: 4,
      title: 'Read English Novel',
      description: 'Read chapters 5-7 of assigned novel',
      dueDate: '2025-12-22',
      dueTime: '08:00 PM',
      priority: 'low',
      category: 'academic',
      completed: false,
      tags: ['English', 'Reading']
    },
    {
      id: 5,
      title: 'Project Meeting',
      description: 'Discuss group project progress',
      dueDate: '2025-12-19',
      dueTime: '04:00 PM',
      priority: 'high',
      category: 'extra',
      completed: false,
      tags: ['Group Work', 'Meeting']
    }
  ])

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    dueTime: '',
    priority: 'medium',
    category: 'academic',
    tags: []
  })

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length,
    overdue: tasks.filter(t => !t.completed && new Date(t.dueDate) < new Date()).length
  }

  const handleAddTask = () => {
    if (newTask.title.trim()) {
      setTasks([...tasks, {
        ...newTask,
        id: Date.now(),
        completed: false
      }])
      setNewTask({
        title: '',
        description: '',
        dueDate: '',
        dueTime: '',
        priority: 'medium',
        category: 'academic',
        tags: []
      })
      setShowAddTask(false)
    }
  }

  const handleToggleComplete = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ))
  }

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId))
  }

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'urgent': return 'text-red-400 bg-red-500/20 border-red-500/50'
      case 'high': return 'text-orange-400 bg-orange-500/20 border-orange-500/50'
      case 'medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/50'
      case 'low': return 'text-blue-400 bg-blue-500/20 border-blue-500/50'
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/50'
    }
  }

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'academic': return '??'
      case 'personal': return '??'
      case 'extra': return '??'
      default: return '??'
    }
  }

  const getDaysUntilDue = (dueDate) => {
    const today = new Date()
    const due = new Date(dueDate)
    const diffTime = due - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority
    const matchesCategory = filterCategory === 'all' || task.category === filterCategory
    return matchesSearch && matchesPriority && matchesCategory
  })

  const pendingTasks = filteredTasks.filter(t => !t.completed)
  const completedTasks = filteredTasks.filter(t => t.completed)

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-teal-500/20 p-3 rounded-xl">
              <CheckSquare className="w-8 h-8 text-teal-400" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">Smart Planner</h1>
              <p className="text-white/70 text-lg">Organize your tasks and manage your time</p>
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
              <p className="text-white/70 text-sm">Total Tasks</p>
              <CheckSquare className="w-5 h-5 text-blue-400" />
            </div>
            <p className="text-3xl font-bold text-white">{stats.total}</p>
          </div>

          <div className="glass-effect rounded-xl p-4 border border-green-500/30">
            <div className="flex items-center justify-between mb-2">
              <p className="text-white/70 text-sm">Completed</p>
              <CheckSquare className="w-5 h-5 text-green-400" />
            </div>
            <p className="text-3xl font-bold text-green-400">{stats.completed}</p>
          </div>

          <div className="glass-effect rounded-xl p-4 border border-yellow-500/30">
            <div className="flex items-center justify-between mb-2">
              <p className="text-white/70 text-sm">Pending</p>
              <Clock className="w-5 h-5 text-yellow-400" />
            </div>
            <p className="text-3xl font-bold text-yellow-400">{stats.pending}</p>
          </div>

          <div className="glass-effect rounded-xl p-4 border border-red-500/30">
            <div className="flex items-center justify-between mb-2">
              <p className="text-white/70 text-sm">Overdue</p>
              <Flag className="w-5 h-5 text-red-400" />
            </div>
            <p className="text-3xl font-bold text-red-400">{stats.overdue}</p>
          </div>
        </div>

        {/* Controls */}
        <div className="glass-effect rounded-xl p-6 border border-white/10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 gap-4">
            <div className="flex items-center space-x-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white/10 text-white pl-10 pr-4 py-2 rounded-lg border border-white/20 focus:outline-none focus:border-teal-400 w-64"
                />
              </div>

              {/* Priority Filter */}
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="bg-white/10 text-white px-4 py-2 rounded-lg border border-white/20 focus:outline-none focus:border-teal-400"
              >
                <option value="all" className="bg-gray-900">All Priorities</option>
                <option value="urgent" className="bg-gray-900">Urgent</option>
                <option value="high" className="bg-gray-900">High</option>
                <option value="medium" className="bg-gray-900">Medium</option>
                <option value="low" className="bg-gray-900">Low</option>
              </select>

              {/* Category Filter */}
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="bg-white/10 text-white px-4 py-2 rounded-lg border border-white/20 focus:outline-none focus:border-teal-400"
              >
                <option value="all" className="bg-gray-900">All Categories</option>
                <option value="academic" className="bg-gray-900">Academic</option>
                <option value="personal" className="bg-gray-900">Personal</option>
                <option value="extra" className="bg-gray-900">Extra-curricular</option>
              </select>
            </div>

            <button
              onClick={() => setShowAddTask(true)}
              className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-lg font-semibold transition-all flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add Task</span>
            </button>
          </div>
        </div>

        {/* Add Task Modal */}
        {showAddTask && (
          <div className="glass-effect rounded-2xl p-6 border border-teal-500/30 bg-teal-500/5">
            <h3 className="text-white font-semibold text-xl mb-4">Add New Task</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-white/70 text-sm block mb-2">Task Title *</label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  className="w-full bg-white/10 text-white px-4 py-2 rounded-lg border border-white/20 focus:outline-none focus:border-teal-400"
                  placeholder="Enter task title"
                />
              </div>
              <div>
                <label className="text-white/70 text-sm block mb-2">Category</label>
                <select
                  value={newTask.category}
                  onChange={(e) => setNewTask({...newTask, category: e.target.value})}
                  className="w-full bg-white/10 text-white px-4 py-2 rounded-lg border border-white/20 focus:outline-none focus:border-teal-400"
                >
                  <option value="academic" className="bg-gray-900">Academic</option>
                  <option value="personal" className="bg-gray-900">Personal</option>
                  <option value="extra" className="bg-gray-900">Extra-curricular</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="text-white/70 text-sm block mb-2">Description</label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                  className="w-full bg-white/10 text-white px-4 py-2 rounded-lg border border-white/20 focus:outline-none focus:border-teal-400"
                  rows="3"
                  placeholder="Enter task description"
                />
              </div>
              <div>
                <label className="text-white/70 text-sm block mb-2">Due Date</label>
                <input
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                  className="w-full bg-white/10 text-white px-4 py-2 rounded-lg border border-white/20 focus:outline-none focus:border-teal-400"
                />
              </div>
              <div>
                <label className="text-white/70 text-sm block mb-2">Due Time</label>
                <input
                  type="time"
                  value={newTask.dueTime}
                  onChange={(e) => setNewTask({...newTask, dueTime: e.target.value})}
                  className="w-full bg-white/10 text-white px-4 py-2 rounded-lg border border-white/20 focus:outline-none focus:border-teal-400"
                />
              </div>
              <div>
                <label className="text-white/70 text-sm block mb-2">Priority</label>
                <select
                  value={newTask.priority}
                  onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                  className="w-full bg-white/10 text-white px-4 py-2 rounded-lg border border-white/20 focus:outline-none focus:border-teal-400"
                >
                  <option value="urgent" className="bg-gray-900">Urgent</option>
                  <option value="high" className="bg-gray-900">High</option>
                  <option value="medium" className="bg-gray-900">Medium</option>
                  <option value="low" className="bg-gray-900">Low</option>
                </select>
              </div>
            </div>
            <div className="flex items-center space-x-3 mt-6">
              <button
                onClick={handleAddTask}
                className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-lg font-semibold transition-all"
              >
                Add Task
              </button>
              <button
                onClick={() => setShowAddTask(false)}
                className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-lg font-semibold transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Tasks List */}
        <div className="space-y-6">
          {/* Pending Tasks */}
          <div className="glass-effect rounded-2xl p-6 border border-white/10">
            <h3 className="text-white font-semibold text-xl mb-4 flex items-center space-x-2">
              <Clock className="w-6 h-6 text-yellow-400" />
              <span>Pending Tasks ({pendingTasks.length})</span>
            </h3>
            
            {pendingTasks.length === 0 ? (
              <div className="text-center py-12">
                <CheckSquare className="w-16 h-16 text-white/30 mx-auto mb-4" />
                <p className="text-white/60">No pending tasks. Great job!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {pendingTasks.map(task => {
                  const daysLeft = getDaysUntilDue(task.dueDate)
                  const isOverdue = daysLeft < 0
                  return (
                    <div key={task.id} className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all">
                      <div className="flex items-start space-x-4">
                        <button
                          onClick={() => handleToggleComplete(task.id)}
                          className="mt-1 w-6 h-6 rounded border-2 border-white/30 hover:border-teal-400 transition-all flex items-center justify-center"
                        >
                          {task.completed && <CheckSquare className="w-5 h-5 text-teal-400" />}
                        </button>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="text-white font-semibold text-lg">{task.title}</h4>
                            <span className="text-xl">{getCategoryIcon(task.category)}</span>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(task.priority)}`}>
                              {task.priority.toUpperCase()}
                            </span>
                            {isOverdue && (
                              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-500/20 text-red-400 border border-red-500/50">
                                OVERDUE
                              </span>
                            )}
                          </div>
                          
                          <p className="text-white/70 mb-3">{task.description}</p>
                          
                          <div className="flex items-center space-x-4 text-sm text-white/60">
                            <span className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{task.dueTime}</span>
                            </span>
                            <span className={`font-semibold ${
                              isOverdue ? 'text-red-400' : daysLeft === 0 ? 'text-orange-400' : daysLeft <= 2 ? 'text-yellow-400' : 'text-blue-400'
                            }`}>
                              {isOverdue ? `${Math.abs(daysLeft)} days overdue` : daysLeft === 0 ? 'Due today' : `${daysLeft} days left`}
                            </span>
                          </div>
                          
                          {task.tags && task.tags.length > 0 && (
                            <div className="flex items-center space-x-2 mt-3">
                              {task.tags.map((tag, index) => (
                                <span key={index} className="px-2 py-1 rounded bg-white/10 text-white/70 text-xs">
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          className="text-red-400 hover:text-red-300 transition-all"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Completed Tasks */}
          {completedTasks.length > 0 && (
            <div className="glass-effect rounded-2xl p-6 border border-green-500/30 bg-green-500/5">
              <h3 className="text-white font-semibold text-xl mb-4 flex items-center space-x-2">
                <CheckSquare className="w-6 h-6 text-green-400" />
                <span>Completed Tasks ({completedTasks.length})</span>
              </h3>
              
              <div className="space-y-3">
                {completedTasks.map(task => (
                  <div key={task.id} className="bg-white/5 rounded-xl p-4 opacity-70">
                    <div className="flex items-start space-x-4">
                      <button
                        onClick={() => handleToggleComplete(task.id)}
                        className="mt-1 w-6 h-6 rounded border-2 border-green-400 bg-green-500/20 hover:bg-green-500/30 transition-all flex items-center justify-center"
                      >
                        <CheckSquare className="w-5 h-5 text-green-400" />
                      </button>
                      
                      <div className="flex-1">
                        <h4 className="text-white/70 font-semibold line-through">{task.title}</h4>
                        <p className="text-white/50 text-sm">{task.description}</p>
                      </div>
                      
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="text-red-400/50 hover:text-red-300 transition-all"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PlannerPage
