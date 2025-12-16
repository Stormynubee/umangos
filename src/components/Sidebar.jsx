import React, { useState } from 'react'
import audioManager from '../utils/audioManager'
import { Home, Camera, BarChart3, Settings, User, LogOut, Menu, X, Heart, Brain, Activity, MessageSquare, Calendar, FileText, Users, TrendingUp, CheckSquare, BookOpen, Clock, Target, Award, Zap, ChevronDown, Volume2, VolumeX, Music } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

function Sidebar({ role, userName, onLogout }) {
  const [isOpen, setIsOpen] = useState(true)
  const [expandedGroups, setExpandedGroups] = useState({ dashboard: true, wellbeing: true, system: true })
  const [showAudioSettings, setShowAudioSettings] = useState(false)
  const [musicEnabled, setMusicEnabled] = useState(audioManager.getMusicEnabled())
  const [sfxEnabled, setSfxEnabled] = useState(audioManager.getSFXEnabled())
  const [musicVolume, setMusicVolume] = useState(audioManager.getMusicVolume())
  const [sfxVolume, setSfxVolume] = useState(audioManager.getSFXVolume())
  
  const location = useLocation()
  const navigate = useNavigate()

  const menuGroups = {
    student: {
      dashboard: {
        label: 'Dashboard',
        items: [
          { path: '/student', icon: Home, label: 'Overview', color: 'blue' },
          { path: '/student/live', icon: Camera, label: 'Live Detection', color: 'green' },
          { path: '/student/analytics', icon: BarChart3, label: 'Analytics', color: 'orange' }
        ]
      },
      wellbeing: {
        label: 'Wellbeing & Productivity',
        items: [
          { path: '/student/pomodoro', icon: Clock, label: 'Pomodoro Timer', color: 'red' },
          { path: '/student/planner', icon: Target, label: 'Task Planner', color: 'cyan' },
          { path: '/student/ai-assistant', icon: Brain, label: 'AI Assistant', color: 'violet' },
          { path: '/student/gamification', icon: Award, label: 'Achievements', color: 'yellow' }
        ]
      },
      academic: {
        label: 'Academic',
        items: [
          { path: '/student/attendance', icon: CheckSquare, label: 'Attendance', color: 'indigo' },
          { path: '/student/assignments', icon: FileText, label: 'Assignments', color: 'purple' },
          { path: '/student/exams', icon: BookOpen, label: 'Exams & Tests', color: 'pink' },
          { path: '/student/timetable', icon: Calendar, label: 'Timetable', color: 'teal' }
        ]
      },
      system: {
        label: 'System',
        items: [
          { path: '/student/about', icon: User, label: 'About Developer', color: 'indigo' },
          { path: '/student/settings', icon: Settings, label: 'Settings', color: 'gray' }
        ]
      }
    },
    teacher: {
      dashboard: {
        label: 'Dashboard',
        items: [
          { path: '/teacher', icon: Home, label: 'Overview', color: 'blue' },
          { path: '/teacher/live', icon: Camera, label: 'Live Class Monitor', color: 'green' },
          { path: '/teacher/analytics', icon: BarChart3, label: 'Analytics', color: 'pink' }
        ]
      },
      management: {
        label: 'Management',
        items: [
          { path: '/teacher/students', icon: Users, label: 'Students', color: 'purple' },
          { path: '/teacher/reports', icon: FileText, label: 'Reports', color: 'orange' },
          { path: '/teacher/alerts', icon: Activity, label: 'Alerts', color: 'red' }
        ]
      },
      system: {
        label: 'System',
        items: [
          { path: '/teacher/settings', icon: Settings, label: 'Settings', color: 'gray' }
        ]
      }
    },
    parent: {
      dashboard: {
        label: 'Dashboard',
        items: [
          { path: '/parent', icon: Home, label: 'Overview', color: 'blue' },
          { path: '/parent/child', icon: User, label: 'My Child', color: 'green' }
        ]
      },
      communication: {
        label: 'Communication',
        items: [
          { path: '/parent/reports', icon: FileText, label: 'Reports', color: 'purple' },
          { path: '/parent/calendar', icon: Calendar, label: 'Calendar', color: 'pink' },
          { path: '/parent/messages', icon: MessageSquare, label: 'Messages', color: 'orange' }
        ]
      },
      system: {
        label: 'System',
        items: [
          { path: '/parent/settings', icon: Settings, label: 'Settings', color: 'gray' }
        ]
      }
    },
    admin: {
      dashboard: {
        label: 'Dashboard',
        items: [
          { path: '/admin', icon: Home, label: 'Overview', color: 'blue' },
          { path: '/admin/analytics', icon: TrendingUp, label: 'System Analytics', color: 'purple' }
        ]
      },
      management: {
        label: 'Management',
        items: [
          { path: '/admin/users', icon: Users, label: 'User Management', color: 'green' },
          { path: '/admin/reports', icon: FileText, label: 'Reports', color: 'pink' },
          { path: '/admin/alerts', icon: Activity, label: 'Alerts', color: 'red' }
        ]
      },
      system: {
        label: 'System',
        items: [
          { path: '/admin/settings', icon: Settings, label: 'Settings', color: 'gray' }
        ]
      }
    }
  }

  const groups = menuGroups[role] || menuGroups.student

  const toggleGroup = (groupKey) => {
    audioManager.playSound('toggle')
    setExpandedGroups(prev => ({ ...prev, [groupKey]: !prev[groupKey] }))
  }

  const handleNavClick = () => {
    audioManager.playSound('navigation')
  }

  const toggleMusic = () => {
    const newState = audioManager.toggleMusic()
    setMusicEnabled(newState)
    audioManager.playSound('toggle')
  }

  const toggleSFX = () => {
    const newState = audioManager.toggleSFX()
    setSfxEnabled(newState)
  }

  const handleMusicVolumeChange = (e) => {
    const vol = parseFloat(e.target.value)
    setMusicVolume(vol)
    audioManager.setMusicVolume(vol)
  }

  const handleSFXVolumeChange = (e) => {
    const vol = parseFloat(e.target.value)
    setSfxVolume(vol)
    audioManager.setSFXVolume(vol)
  }

  const getColorClasses = (color, isActive) => {
    const colors = {
      blue: isActive ? 'bg-blue-500/90 text-white shadow-lg shadow-blue-500/50' : 'text-blue-300 hover:bg-blue-500/30 hover:text-white',
      green: isActive ? 'bg-green-500/90 text-white shadow-lg shadow-green-500/50' : 'text-green-300 hover:bg-green-500/30 hover:text-white',
      purple: isActive ? 'bg-purple-500/90 text-white shadow-lg shadow-purple-500/50' : 'text-purple-300 hover:bg-purple-500/30 hover:text-white',
      pink: isActive ? 'bg-pink-500/90 text-white shadow-lg shadow-pink-500/50' : 'text-pink-300 hover:bg-pink-500/30 hover:text-white',
      orange: isActive ? 'bg-orange-500/90 text-white shadow-lg shadow-orange-500/50' : 'text-orange-300 hover:bg-orange-500/30 hover:text-white',
      red: isActive ? 'bg-red-500/90 text-white shadow-lg shadow-red-500/50' : 'text-red-300 hover:bg-red-500/30 hover:text-white',
      cyan: isActive ? 'bg-cyan-500/90 text-white shadow-lg shadow-cyan-500/50' : 'text-cyan-300 hover:bg-cyan-500/30 hover:text-white',
      teal: isActive ? 'bg-teal-500/90 text-white shadow-lg shadow-teal-500/50' : 'text-teal-300 hover:bg-teal-500/30 hover:text-white',
      indigo: isActive ? 'bg-indigo-500/90 text-white shadow-lg shadow-indigo-500/50' : 'text-indigo-300 hover:bg-indigo-500/30 hover:text-white',
      violet: isActive ? 'bg-violet-500/90 text-white shadow-lg shadow-violet-500/50' : 'text-violet-300 hover:bg-violet-500/30 hover:text-white',
      yellow: isActive ? 'bg-yellow-500/90 text-white shadow-lg shadow-yellow-500/50' : 'text-yellow-300 hover:bg-yellow-500/30 hover:text-white',
      gray: isActive ? 'bg-gray-500/90 text-white shadow-lg shadow-gray-500/50' : 'text-gray-300 hover:bg-gray-500/30 hover:text-white'
    }
    return colors[color] || colors.blue
  }

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      audioManager.playSound('click')
      onLogout()
      navigate('/')
    }
  }

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => {
          audioManager.playSound('click')
          setIsOpen(!isOpen)
        }}
        className="lg:hidden fixed top-4 left-4 z-50 glass-effect p-3 rounded-xl border border-white/30 shadow-lg backdrop-blur-xl bg-black/30 hover:bg-black/40 transition-all"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white drop-shadow-lg" />
        ) : (
          <Menu className="w-6 h-6 text-white drop-shadow-lg" />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen glass-effect border-r border-white/30 shadow-2xl z-40 transition-all duration-300 overflow-y-auto backdrop-blur-2xl bg-black/40 ${
          isOpen ? 'w-72' : 'w-0 lg:w-20'
        }`}
      >
        <div className={`h-full flex flex-col ${isOpen ? '' : 'items-center'}`}>
          {/* Header */}
          <div className={`p-6 border-b border-white/20 bg-black/20 ${isOpen ? '' : 'hidden lg:block'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-2 rounded-xl shadow-lg">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                {isOpen && (
                  <div>
                    <h2 className="text-white font-bold text-lg drop-shadow-lg">UmangOS</h2>
                    <p className="text-white/80 text-xs font-semibold">by Hansraj</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* User Info */}
          {isOpen && (
            <div className="p-4 border-b border-white/20 bg-black/20">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <p className="text-white font-bold drop-shadow-lg">{userName}</p>
                  <p className="text-white/80 text-sm capitalize font-semibold">{role}</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Menu - Grouped */}
          <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
            {Object.entries(groups).map(([groupKey, group]) => (
              <div key={groupKey} className="space-y-2">
                {/* Group Header */}
                {isOpen && (
                  <button
                    onClick={() => toggleGroup(groupKey)}
                    className="w-full flex items-center justify-between px-3 py-2 text-white/70 hover:text-white transition-all font-bold text-xs uppercase tracking-wider bg-white/5 rounded-lg backdrop-blur-sm"
                  >
                    <span className="drop-shadow-lg">{group.label}</span>
                    <ChevronDown 
                      className={`w-4 h-4 transition-transform duration-300 ${expandedGroups[groupKey] ? 'rotate-180' : ''}`} 
                    />
                  </button>
                )}

                {/* Group Items */}
                {(expandedGroups[groupKey] || !isOpen) && (
                  <div className="space-y-1">
                    {group.items.map((item) => {
                      const Icon = item.icon
                      const isActive = location.pathname === item.path
                      
                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={handleNavClick}
                          className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 font-semibold backdrop-blur-sm ${
                            getColorClasses(item.color, isActive)
                          } ${isOpen ? '' : 'justify-center lg:justify-start'} ${isActive ? 'scale-105' : 'hover:scale-105'}`}
                          title={!isOpen ? item.label : undefined}
                          style={{
                            textShadow: isActive ? '0 2px 8px rgba(0,0,0,0.5)' : 'none'
                          }}
                        >
                          <Icon className="w-5 h-5 flex-shrink-0 drop-shadow-lg" />
                          {isOpen && <span className="drop-shadow-lg">{item.label}</span>}
                          {isActive && isOpen && (
                            <div className="ml-auto w-2 h-2 bg-white rounded-full shadow-lg" />
                          )}
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Audio Controls */}
          {isOpen && (
            <div className="p-4 border-t border-white/20 bg-black/20">
              <button
                onClick={() => {
                  audioManager.playSound('click')
                  setShowAudioSettings(!showAudioSettings)
                }}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-white hover:bg-white/10 transition-all font-semibold backdrop-blur-sm"
              >
                <div className="flex items-center space-x-3">
                  <Music className="w-5 h-5" />
                  <span className="drop-shadow-lg">Audio</span>
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform ${showAudioSettings ? 'rotate-180' : ''}`} />
              </button>

              {showAudioSettings && (
                <div className="mt-3 space-y-4 px-2">
                  {/* Music Toggle */}
                  <div className="flex items-center justify-between">
                    <span className="text-white/90 text-sm font-semibold drop-shadow-lg">Background Music</span>
                    <button
                      onClick={toggleMusic}
                      className={`p-2 rounded-lg transition-all ${musicEnabled ? 'bg-green-500/30 text-green-300' : 'bg-white/10 text-white/50'}`}
                    >
                      {musicEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Music Volume */}
                  {musicEnabled && (
                    <div className="space-y-1">
                      <label className="text-white/70 text-xs font-semibold drop-shadow-lg">Music Volume</label>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={musicVolume}
                        onChange={handleMusicVolumeChange}
                        className="w-full accent-purple-500"
                      />
                    </div>
                  )}

                  {/* SFX Toggle */}
                  <div className="flex items-center justify-between">
                    <span className="text-white/90 text-sm font-semibold drop-shadow-lg">Sound Effects</span>
                    <button
                      onClick={toggleSFX}
                      className={`p-2 rounded-lg transition-all ${sfxEnabled ? 'bg-green-500/30 text-green-300' : 'bg-white/10 text-white/50'}`}
                    >
                      {sfxEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* SFX Volume */}
                  {sfxEnabled && (
                    <div className="space-y-1">
                      <label className="text-white/70 text-xs font-semibold drop-shadow-lg">SFX Volume</label>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={sfxVolume}
                        onChange={handleSFXVolumeChange}
                        className="w-full accent-purple-500"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Logout Button */}
          <div className={`p-4 border-t border-white/20 bg-black/20 ${isOpen ? '' : 'hidden lg:block'}`}>
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-300 hover:bg-red-500/30 hover:text-white transition-all font-semibold backdrop-blur-sm"
            >
              <LogOut className="w-5 h-5 drop-shadow-lg" />
              {isOpen && <span className="drop-shadow-lg">Logout</span>}
            </button>
          </div>

          {/* Footer */}
          {isOpen && (
            <div className="p-4 border-t border-white/20 bg-black/20">
              <p className="text-white/70 text-xs text-center font-semibold drop-shadow-lg">
                © 2025 UmangOS
                <br />
                Developed by Hansraj
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Sidebar