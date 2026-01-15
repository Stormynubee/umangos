import React, { useState, useEffect } from 'react'
import { Camera, Mic, Shield, AlertCircle, CheckCircle, Sparkles, Lock, Zap, ArrowRight } from 'lucide-react'
import audioManager from '../utils/audioManager'

function PermissionScreen({ onPermissionsGranted, onPermissionsDenied, isRetry = false }) {
  const [requesting, setRequesting] = useState(false)
  const [error, setError] = useState('')
  const [cameraGranted, setCameraGranted] = useState(false)
  const [micGranted, setMicGranted] = useState(false)
  const [particles, setParticles] = useState([])

  useEffect(() => {
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 4 + 2
    }))
    setParticles(newParticles)
  }, [])

  const requestPermissions = async () => {
    setRequesting(true)
    setError('')

    // Initialize audio on user interaction
    audioManager.handleUserInteraction()
    audioManager.playSound('click')

    try {
      console.log('Requesting camera and microphone permissions...')
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720 },
        audio: true
      })

      console.log('Permissions granted!')
      setCameraGranted(true)
      setMicGranted(true)

      stream.getTracks().forEach(track => track.stop())

      audioManager.playSound('success')

      setTimeout(() => {
        console.log('Calling onPermissionsGranted...')
        onPermissionsGranted()
      }, 1000)

    } catch (err) {
      console.error('Permission error:', err)
      setCameraGranted(false)
      setMicGranted(false)
      setRequesting(false)
      // Don't call onPermissionsDenied here, let user try again
    }
  }

  const skipPermissions = () => {
    console.log('User skipped permissions')
    audioManager.handleUserInteraction()
    audioManager.playSound('click')
    setTimeout(() => {
      onPermissionsGranted() // Proceed anyway
    }, 500)
  }

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center gradient-primary p-6">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute bg-white rounded-full opacity-10 animate-float"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDuration: `${particle.duration}s`
            }}
          />
        ))}
      </div>

      <div className="absolute top-20 left-20 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
      <div className="absolute bottom-20 right-20 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />

      <div className="relative z-10 max-w-3xl w-full glass-effect rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20 animate-slide-up">
        <div className="text-center space-y-8">
          {/* Icon with Animation */}
          <div className="flex justify-center relative">
            <div className="relative">
              <div className="absolute inset-0 bg-white/20 rounded-full blur-2xl animate-pulse" />
              <div className="relative bg-gradient-to-br from-white/20 to-white/5 p-6 rounded-full border-2 border-white/30">
                <Shield className="w-20 h-20 text-white drop-shadow-glow" />
              </div>
              <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-yellow-300 animate-spin-slow" />
              <Zap className="absolute -bottom-2 -left-2 w-6 h-6 text-blue-300 animate-pulse" />
            </div>
          </div>

          <div className="space-y-3">
            <h1 className="text-5xl font-bold text-white drop-shadow-lg">
              {isRetry ? '👋 Permissions Required' : '👋 Welcome to UmangOS'}
            </h1>

            <p className="text-2xl text-white/90 font-light max-w-xl mx-auto">
              We need access to your camera and microphone for emotion detection
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`relative overflow-hidden rounded-2xl p-6 text-left transition-all duration-500 ${cameraGranted
                ? 'bg-green-500/20 border-2 border-green-400/50 shadow-lg shadow-green-400/20'
                : 'bg-white/10 border-2 border-white/20 hover:border-white/40'
              }`}>
              <div className="relative z-10 flex items-start space-x-4">
                {cameraGranted ? (
                  <div className="bg-green-400 p-2 rounded-xl">
                    <CheckCircle className="w-7 h-7 text-white" />
                  </div>
                ) : (
                  <div className="bg-white/20 p-2 rounded-xl">
                    <Camera className="w-7 h-7 text-white" />
                  </div>
                )}
                <div>
                  <h3 className="text-white font-bold text-lg mb-1">Camera Access</h3>
                  <p className="text-white/80 text-sm">
                    Facial emotion detection and real-time face tracking
                  </p>
                </div>
              </div>
              {cameraGranted && (
                <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-transparent animate-pulse" />
              )}
            </div>

            <div className={`relative overflow-hidden rounded-2xl p-6 text-left transition-all duration-500 ${micGranted
                ? 'bg-purple-500/20 border-2 border-purple-400/50 shadow-lg shadow-purple-400/20'
                : 'bg-white/10 border-2 border-white/20 hover:border-white/40'
              }`}>
              <div className="relative z-10 flex items-start space-x-4">
                {micGranted ? (
                  <div className="bg-purple-400 p-2 rounded-xl">
                    <CheckCircle className="w-7 h-7 text-white" />
                  </div>
                ) : (
                  <div className="bg-white/20 p-2 rounded-xl">
                    <Mic className="w-7 h-7 text-white" />
                  </div>
                )}
                <div>
                  <h3 className="text-white font-bold text-lg mb-1">Microphone Access</h3>
                  <p className="text-white/80 text-sm">
                    Voice emotion analysis and stress level detection
                  </p>
                </div>
              </div>
              {micGranted && (
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-transparent animate-pulse" />
              )}
            </div>
          </div>

          <div className="relative overflow-hidden bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-2 border-blue-400/50 rounded-2xl p-6">
            <div className="relative z-10 flex items-start space-x-4">
              <div className="bg-blue-400/30 p-3 rounded-xl">
                <Lock className="w-6 h-6 text-white drop-shadow-glow" />
              </div>
              <div className="text-left flex-1">
                <h4 className="text-white font-bold text-lg mb-2 flex items-center space-x-2">
                  <span>Privacy Guarantee</span>
                </h4>
                <p className="text-white/90 text-sm leading-relaxed">
                  All processing happens <span className="font-bold text-blue-200">locally in your browser</span>.
                  No data is uploaded to any server. Your privacy is <span className="font-bold text-green-300">100% guaranteed</span>.
                </p>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/10 rounded-full blur-3xl" />
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-400/50 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-red-300 flex-shrink-0 mt-0.5" />
                <p className="text-white text-sm text-left">{error}</p>
              </div>
            </div>
          )}

          <div className="space-y-3">
            <button
              onClick={requestPermissions}
              disabled={requesting}
              className={`group relative w-full py-6 rounded-2xl font-bold text-xl overflow-hidden transition-all duration-300 ${requesting
                  ? 'bg-white/50 cursor-not-allowed'
                  : 'bg-white hover:scale-105 active:scale-95 shadow-2xl hover:shadow-white/50'
                }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 transition-opacity duration-300 ${!requesting && 'group-hover:opacity-100'
                }`} />
              <span className={`relative z-10 flex items-center justify-center space-x-3 transition-colors duration-300 ${requesting ? 'text-purple-400' : 'text-purple-600 group-hover:text-white'
                }`}>
                {requesting ? (
                  <>
                    <div className="w-6 h-6 border-4 border-purple-400 border-t-transparent rounded-full animate-spin" />
                    <span>Requesting Permissions...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-6 h-6" />
                    <span>Grant Permissions & Continue</span>
                    <Zap className="w-6 h-6" />
                  </>
                )}
              </span>
            </button>

            <button
              onClick={skipPermissions}
              className="w-full py-4 rounded-2xl font-semibold text-white/80 hover:text-white border-2 border-white/30 hover:border-white/50 hover:bg-white/10 transition-all duration-300"
            >
              <span className="flex items-center justify-center space-x-2">
                <span>Skip for Now</span>
                <ArrowRight className="w-5 h-5" />
              </span>
            </button>
          </div>

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

export default PermissionScreen
