import React, { useState } from 'react'
import { User, Users, UserCircle, Shield, Sparkles, ArrowRight, Lock, Info } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

// Safely import audioManager with error handling
let audioManager
try {
  audioManager = require('../utils/audioManager').default
} catch (e) {
  console.warn('AudioManager not available, using dummy:', e)
  // Create dummy audioManager if import fails
  audioManager = {
    playSound: () => {},
    handleUserInteraction: () => {}
  }
}

function RoleSelection({ onRoleSelect }) {
  const [selectedRole, setSelectedRole] = useState(null)
  const [showLoginForm, setShowLoginForm] = useState(false)
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  

  const roles = [
    {
      id: 'student',
      title: 'Student',
      icon: User,
      color: 'blue',
      gradient: 'from-blue-500 to-cyan-500',
      description: 'Track your wellbeing and emotions'
    },
    {
      id: 'teacher',
      title: 'Teacher',
      icon: Users,
      color: 'purple',
      gradient: 'from-purple-500 to-pink-500',
      description: 'Monitor class emotions and engagement'
    },
    {
      id: 'parent',
      title: 'Parent',
      icon: UserCircle,
      color: 'green',
      gradient: 'from-green-500 to-emerald-500',
      description: 'View your child\'s wellbeing summary'
    },
    {
      id: 'admin',
      title: 'Admin',
      icon: Shield,
      color: 'orange',
      gradient: 'from-orange-500 to-red-500',
      description: 'Manage institution-wide settings'
    }
  ]

  const handleRoleClick = (role) => {
    try {
      if (audioManager) audioManager.playSound('click')
    } catch (e) {
      console.warn('Audio error:', e)
    }
    setSelectedRole(role)
    setShowLoginForm(true)
  }

  const handleAboutClick = () => {
    try {
      if (audioManager) audioManager.playSound('navigation')
    } catch (e) {
      console.warn('Audio error:', e)
    }
    // Navigate directly to about page as student role
    onRoleSelect('student', 'Guest')
    setTimeout(() => {
      // Navigation will happen through onRoleSelect
    }, 100)
  }

  const handleLogin = (e) => {
    e.preventDefault()
    if (name.trim() && password.trim()) {
      try {
        if (audioManager) audioManager.playSound('success')
      } catch (e) {
        console.warn('Audio error:', e)
      }
      onRoleSelect(selectedRole.id, name)
    }
  }

  const handleBack = () => {
    try {
      if (audioManager) audioManager.playSound('click')
    } catch (e) {
      console.warn('Audio error:', e)
    }
    setShowLoginForm(false)
    setSelectedRole(null)
    setName('')
    setPassword('')
  }

  if (showLoginForm && selectedRole) {
    return (
      <div className="min-h-screen relative overflow-hidden flex items-center justify-center gradient-primary p-6">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full opacity-10 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                animationDuration: `${Math.random() * 4 + 2}s`
              }}
            />
          ))}
        </div>

        <div className="absolute top-20 left-20 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />

        {/* Login Form */}
        <div className="relative z-10 max-w-md w-full glass-effect rounded-3xl p-8 md:p-10 shadow-2xl border border-white/20 animate-slide-up">
          <button
            onClick={handleBack}
            className="mb-6 text-white/70 hover:text-white transition-colors flex items-center space-x-2"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            <span>Back to roles</span>
          </button>

          <div className="text-center space-y-6">
            {/* Role Icon */}
            <div className="flex justify-center">
              <div className="relative">
                <div className={`absolute inset-0 bg-gradient-to-br ${selectedRole.gradient} rounded-full blur-2xl opacity-50 animate-pulse`} />
                <div className={`relative bg-gradient-to-br ${selectedRole.gradient} p-6 rounded-full`}>
                  <selectedRole.icon className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-4xl font-bold text-white mb-2">
                Welcome, {selectedRole.title}!
              </h2>
              <p className="text-white/70">Please enter your details to continue</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4 mt-8">
              <div className="text-left space-y-2">
                <label className="text-white/90 text-sm font-semibold flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>Full Name</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all"
                  required
                />
              </div>

              <div className="text-left space-y-2">
                <label className="text-white/90 text-sm font-semibold flex items-center space-x-2">
                  <Lock className="w-4 h-4" />
                  <span>Password</span>
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter any password"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all"
                  required
                />
                <p className="text-white/50 text-xs">You can use any password</p>
              </div>

              <button
                type="submit"
                className="group relative w-full py-4 rounded-2xl font-bold text-lg overflow-hidden transition-all duration-300 bg-white hover:scale-105 active:scale-95 shadow-2xl hover:shadow-white/50 mt-6"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${selectedRole.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <span className="relative z-10 flex items-center justify-center space-x-3 text-purple-600 group-hover:text-white transition-colors duration-300">
                  <Sparkles className="w-5 h-5" />
                  <span>Continue to Dashboard</span>
                  <ArrowRight className="w-5 h-5" />
                </span>
              </button>
            </form>

            {/* Footer */}
            <div className="pt-6">
              <div className="inline-block px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <p className="text-white font-semibold flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-yellow-300" />
                  <span>Developed by Hansraj</span>
                  <Sparkles className="w-4 h-4 text-yellow-300" />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center gradient-primary p-6">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-10 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              animationDuration: `${Math.random() * 3 + 2}s`
            }}
          />
        ))}
      </div>

      <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
      <div className="absolute top-40 right-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />

      {/* About Developer Button - Bottom Left */}
      <button
        onClick={handleAboutClick}
        className="fixed bottom-8 left-8 z-20 group glass-effect px-6 py-4 rounded-2xl border-2 border-indigo-400/40 hover:border-indigo-400/70 transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl hover:shadow-indigo-500/50"
      >
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-500 p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300">
            <Info className="w-5 h-5 text-white" />
          </div>
          <div className="text-left">
            <p className="text-white font-bold text-sm">About the Developer</p>
            <p className="text-white/70 text-xs">Learn about Umang OS</p>
          </div>
        </div>
      </button>

      {/* Role Selection */}
      <div className="relative z-10 max-w-6xl w-full space-y-12 animate-slide-up">
        <div className="text-center space-y-4">
          <h1 className="text-6xl md:text-7xl font-black text-white drop-shadow-lg">
            Choose Your Role
          </h1>
          <p className="text-2xl text-white/80 font-light">
            Select how you want to access UmangOS
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => handleRoleClick(role)}
              className="group relative overflow-hidden glass-effect rounded-3xl p-8 border-2 border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl"
            >
              {/* Background Gradient on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${role.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
              
              {/* Content */}
              <div className="relative z-10 space-y-6 text-center">
                {/* Icon */}
                <div className="flex justify-center">
                  <div className={`bg-gradient-to-br ${role.gradient} p-6 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <role.icon className="w-12 h-12 text-white drop-shadow-glow" />
                  </div>
                </div>

                {/* Text */}
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-white">{role.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {role.description}
                  </p>
                </div>

                {/* Arrow */}
                <div className="flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowRight className="w-6 h-6 text-white animate-pulse" />
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center pt-8">
          <div className="inline-block px-8 py-4 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <p className="text-white text-lg font-semibold flex items-center space-x-3">
              <Sparkles className="w-5 h-5 text-yellow-300 animate-spin-slow" />
              <span>Developed by Hansraj</span>
              <Sparkles className="w-5 h-5 text-yellow-300 animate-spin-slow" />
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoleSelection
