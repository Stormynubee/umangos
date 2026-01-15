import React, { useEffect, useState } from 'react'
import { Brain, Heart, Sparkles, Zap, Activity, Users } from 'lucide-react'

function SplashScreen({ onContinue }) {
  const [showContent, setShowContent] = useState(false)
  const [particles, setParticles] = useState([])

  useEffect(() => {
    setShowContent(true)

    // Generate random particles
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center gradient-primary">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute bg-white rounded-full opacity-20 animate-float"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`
            }}
          />
        ))}
      </div>

      {/* Animated Gradient Orbs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
      <div className="absolute top-40 right-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />

      {/* Main Content */}
      <div className={`relative z-10 text-center space-y-12 px-6 transition-all duration-1000 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

        {/* Floating Icons Ring */}
        <div className="relative w-48 h-48 mx-auto mb-8">
          <div className="absolute inset-0 rounded-full border-4 border-white/20 animate-spin-slow" />
          <div className="absolute inset-4 rounded-full border-2 border-white/30 animate-spin-reverse" />

          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-float">
            <Brain className="w-12 h-12 text-white drop-shadow-glow" />
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 animate-float animation-delay-1000">
            <Heart className="w-12 h-12 text-pink-300 drop-shadow-glow" />
          </div>
          <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-float animation-delay-2000">
            <Activity className="w-10 h-10 text-green-300 drop-shadow-glow" />
          </div>
          <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 animate-float animation-delay-3000">
            <Users className="w-10 h-10 text-blue-300 drop-shadow-glow" />
          </div>

          {/* Center Logo */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <Sparkles className="w-16 h-16 text-yellow-300 animate-pulse" />
              <Zap className="absolute inset-0 w-16 h-16 text-yellow-400 animate-ping" />
            </div>
          </div>
        </div>

        {/* Title with Gradient Text */}
        <div className="space-y-4">
          <div className="relative inline-block">
            <h1 className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-purple-200 tracking-tight animate-text-shimmer py-6 pb-8 leading-normal">
              UmangOS
            </h1>
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 opacity-30 blur-2xl animate-pulse-slow" />
          </div>

          <p className="text-2xl md:text-3xl text-white/90 font-light max-w-3xl mx-auto animate-slide-up animation-delay-500">
            Student–Teacher Wellbeing & Institutional Operating System
          </p>
        </div>

        {/* Developer Credit - Prominent & Animated */}
        <div className="mt-16 animate-slide-up animation-delay-1000">
          <div className="relative inline-block group">
            <div className="absolute -inset-2 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-2xl opacity-60 group-hover:opacity-100 blur-xl transition-all duration-500 animate-gradient" />
            <div className="relative px-10 py-5 glass-effect rounded-2xl border-2 border-white/30 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center space-x-3">
                <Sparkles className="w-6 h-6 text-yellow-300 animate-spin-slow" />
                <div className="text-left">
                  <p className="text-sm text-white/70 font-medium">Developed by</p>
                  <p className="text-3xl font-bold text-white tracking-wide">Hansraj</p>
                </div>
                <Sparkles className="w-6 h-6 text-yellow-300 animate-spin-slow animation-delay-1000" />
              </div>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <div className="mt-12 flex flex-col items-center space-y-6 animate-fade-in animation-delay-2000">
          <button
            onClick={onContinue}
            className="group relative px-12 py-5 bg-white text-purple-600 font-bold text-xl rounded-2xl overflow-hidden transform hover:scale-110 active:scale-95 transition-all duration-300 shadow-2xl hover:shadow-white/50"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 group-hover:text-white transition-colors duration-300 flex items-center space-x-3">
              <Sparkles className="w-6 h-6" />
              <span>Continue to UmangOS</span>
              <Zap className="w-6 h-6" />
            </span>
          </button>

          <p className="text-white/60 text-sm animate-pulse">Click to begin your wellbeing journey</p>
        </div>

        {/* Feature Pills */}
        <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto animate-fade-in animation-delay-2500">
          <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/80 text-sm border border-white/20">
            🎭 Face Detection
          </span>
          <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/80 text-sm border border-white/20">
            🎤 Voice Analysis
          </span>
          <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/80 text-sm border border-white/20">
            🧠 AI Fusion
          </span>
          <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/80 text-sm border border-white/20">
            100% Private
          </span>
        </div>
      </div>

      {/* Bottom Wave Animation */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-32" viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="rgba(255,255,255,0.05)"
            fillOpacity="1"
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            className="animate-wave"
          />
        </svg>
      </div>
    </div>
  )
}

export default SplashScreen
