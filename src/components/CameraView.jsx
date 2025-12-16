import React, { useEffect, useRef, useState } from 'react'
import { Camera, Mic, Activity, Brain } from 'lucide-react'
import { useCamera } from '../hooks/useCamera'
import { useMicrophone } from '../hooks/useMicrophone'
import FaceEmotionEngine from '../emotion/FaceEmotionEngine'
import VoiceEmotionEngine from '../emotion/VoiceEmotionEngine'
import EmotionFusion from '../emotion/EmotionFusion'
import EmotionStabilizer from '../emotion/EmotionStabilizer'

function CameraView({ onEmotionUpdate }) {
  const { stream: cameraStream, error: cameraError, isLoading: cameraLoading, isVideoReady, videoRef } = useCamera()
  const { stream: micStream, error: micError, isLoading: micLoading, audioData } = useMicrophone()
  
  const canvasRef = useRef(null)
  const animationFrameRef = useRef(null)
  const [modelsLoaded, setModelsLoaded] = useState(false)
  const [faceEmotion, setFaceEmotion] = useState(null)
  const [voiceEmotion, setVoiceEmotion] = useState(null)
  const [fusedEmotion, setFusedEmotion] = useState(null)
  const [fps, setFps] = useState(0)
  const faceStabilizerRef = useRef(new EmotionStabilizer())
  const voiceStabilizerRef = useRef(new EmotionStabilizer())
  const fusedStabilizerRef = useRef(new EmotionStabilizer())
  const fpsCounterRef = useRef({ frames: 0, lastTime: Date.now() })

  useEffect(() => {
    const loadModels = async () => {
      const loaded = await FaceEmotionEngine.loadModels()
      setModelsLoaded(loaded)
    }
    loadModels()
  }, [])

  useEffect(() => {
    if (micStream) {
      VoiceEmotionEngine.initialize(micStream)
    }
  }, [micStream])

  useEffect(() => {
    if (!videoRef.current || !cameraStream || !modelsLoaded) return

    let mounted = true

    const detectEmotions = async () => {
      if (!mounted || !videoRef.current) {
        animationFrameRef.current = requestAnimationFrame(detectEmotions)
        return
      }

      const faceResult = await FaceEmotionEngine.detectEmotion(videoRef.current)
      
      if (faceResult && canvasRef.current) {
        FaceEmotionEngine.drawDetections(canvasRef.current, videoRef.current, faceResult)
      }

      const voiceResult = VoiceEmotionEngine.analyzeVoiceEmotion()

      if (mounted) {
        setFaceEmotion(faceResult)
        setVoiceEmotion(voiceResult)

        const fused = EmotionFusion.fuseEmotions(faceResult, voiceResult)
        setFusedEmotion(fused)

        if (onEmotionUpdate) {
          onEmotionUpdate(fused)
        }

        fpsCounterRef.current.frames++
        const now = Date.now()
        if (now - fpsCounterRef.current.lastTime >= 1000) {
          setFps(fpsCounterRef.current.frames)
          fpsCounterRef.current.frames = 0
          fpsCounterRef.current.lastTime = now
        }
      }

      animationFrameRef.current = requestAnimationFrame(detectEmotions)
    }

    detectEmotions()

    return () => {
      mounted = false
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [cameraStream, isVideoReady, onEmotionUpdate])

  const getWaveformPath = () => {
    const waveform = VoiceEmotionEngine.getWaveformData()
    if (!waveform || waveform.length === 0) return ''

    const width = 200
    const height = 60
    const step = width / waveform.length

    let path = `M 0 ${height / 2}`

    waveform.forEach((value, index) => {
      const x = index * step
      const y = ((value - 128) / 128) * (height / 2) + height / 2
      path += ` L ${x} ${y}`
    })

    return path
  }


  if (cameraError || micError) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="bg-red-500/20 border border-red-400/50 rounded-xl p-6 max-w-md">
          <p className="text-white">{cameraError || micError}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="relative rounded-3xl overflow-hidden bg-black shadow-2xl border-4 border-white/10">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-auto"
        />
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
        />
        
        {/* Enhanced Overlay Stats */}
        <div className="absolute top-4 right-4 flex flex-col space-y-3">
          <div className="backdrop-blur-xl bg-white/15 rounded-xl px-4 py-3 flex items-center space-x-3 border-2 border-white/30 shadow-lg">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <Camera className="w-5 h-5 text-green-400" />
            <span className="text-white text-sm font-bold">{fps} FPS</span>
          </div>
          
          {!modelsLoaded && (
            <div className="backdrop-blur-xl bg-white/15 rounded-xl px-4 py-3 border-2 border-yellow-400/30 shadow-lg">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />
                <span className="text-yellow-300 text-sm font-medium">Loading AI models...</span>
              </div>
            </div>
          )}

          {modelsLoaded && (
            <div className="backdrop-blur-xl bg-white/15 rounded-xl px-4 py-3 border-2 border-green-400/30 shadow-lg">
              <div className="flex items-center space-x-2">
                <Activity className="w-4 h-4 text-green-400" />
                <span className="text-green-300 text-sm font-medium">AI Ready</span>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Gradient Overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="relative overflow-hidden backdrop-blur-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl p-6 space-y-4 border-2 border-blue-400/30 hover:border-blue-400/60 shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="relative z-10 flex items-center space-x-3">
            <div className="bg-blue-500/20 p-3 rounded-xl">
              <Camera className="w-6 h-6 text-blue-400 drop-shadow-glow" />
            </div>
            <h3 className="text-white font-bold text-lg">Face Emotion</h3>
          </div>
          
          <div className="relative z-10">
            {faceEmotion ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-white text-2xl font-bold capitalize">{faceEmotion.emotion}</span>
                  <span className="text-green-400 font-bold text-xl">{faceEmotion.confidence}%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-3 shadow-inner">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-blue-400 h-3 rounded-full transition-all duration-500 shadow-lg"
                    style={{ width: `${faceEmotion.confidence}%` }}
                  />
                </div>
                <div className="flex items-center justify-center space-x-1 pt-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-green-400 text-xs font-medium">Detected</span>
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <div className="w-12 h-12 border-4 border-white/20 border-t-blue-400 rounded-full animate-spin mx-auto mb-3" />
                <p className="text-white/60 text-sm">Scanning for face...</p>
              </div>
            )}
          </div>
        </div>

        <div className="relative overflow-hidden backdrop-blur-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-6 space-y-4 border-2 border-purple-400/30 hover:border-purple-400/60 shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="relative z-10 flex items-center space-x-3">
            <div className="bg-purple-500/20 p-3 rounded-xl">
              <Mic className="w-6 h-6 text-purple-400 drop-shadow-glow" />
            </div>
            <h3 className="text-white font-bold text-lg">Voice Emotion</h3>
          </div>
          
          <div className="relative z-10">
            {voiceEmotion && audioData.volume > 5 ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-white text-2xl font-bold capitalize">{voiceEmotion.emotion}</span>
                  <span className="text-purple-400 font-bold text-xl">{voiceEmotion.confidence}%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-3 shadow-inner">
                  <div 
                    className="bg-gradient-to-r from-purple-400 to-pink-400 h-3 rounded-full transition-all duration-500 shadow-lg"
                    style={{ width: `${voiceEmotion.confidence}%` }}
                  />
                </div>
                
                <div className="bg-black/30 rounded-xl p-3 mt-3">
                  <svg className="w-full h-16" viewBox="0 0 200 60">
                    <defs>
                      <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#a78bfa" />
                        <stop offset="100%" stopColor="#ec4899" />
                      </linearGradient>
                    </defs>
                    <path
                      d={getWaveformPath()}
                      stroke="url(#waveGradient)"
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                <div className="flex items-center justify-center space-x-1 pt-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                  <span className="text-purple-400 text-xs font-medium">Listening</span>
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <Mic className="w-12 h-12 text-white/30 mx-auto mb-3 animate-pulse" />
                <p className="text-white/60 text-sm">Speak to analyze voice...</p>
              </div>
            )}
          </div>
        </div>

        <div className="relative overflow-hidden backdrop-blur-xl bg-gradient-to-br from-pink-500/20 to-rose-500/20 rounded-2xl p-6 space-y-4 border-2 border-pink-400/30 hover:border-pink-400/60 shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-3xl" />
          <div className="relative z-10 flex items-center space-x-3">
            <div className="bg-pink-500/20 p-3 rounded-xl">
              <Brain className="w-6 h-6 text-pink-400 drop-shadow-glow" />
            </div>
            <h3 className="text-white font-bold text-lg">Fused Emotion</h3>
          </div>
          
          <div className="relative z-10">
            {fusedEmotion ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span 
                    className="text-2xl font-bold capitalize"
                    style={{ color: EmotionFusion.getEmotionColor(fusedEmotion.fusedEmotion) }}
                  >
                    {fusedEmotion.fusedEmotion.replace('_', ' ')}
                  </span>
                  <span className="text-pink-400 font-bold text-xl">{fusedEmotion.confidence}%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-3 shadow-inner">
                  <div 
                    className="h-3 rounded-full transition-all duration-500 shadow-lg"
                    style={{ 
                      width: `${fusedEmotion.confidence}%`,
                      background: `linear-gradient(90deg, ${EmotionFusion.getEmotionColor(fusedEmotion.fusedEmotion)}, ${EmotionFusion.getEmotionColor(fusedEmotion.fusedEmotion)}dd)`
                    }}
                  />
                </div>
                <div className="bg-white/5 rounded-xl p-3 mt-2">
                  <p className="text-white/80 text-sm leading-relaxed">
                    {EmotionFusion.getEmotionDescription(fusedEmotion.fusedEmotion)}
                  </p>
                </div>
                <div className="flex items-center justify-between text-sm text-white/70 mt-3 pt-3 border-t border-white/10">
                  <div className="flex items-center space-x-2">
                    <Activity className="w-4 h-4" />
                    <span className="capitalize">{fusedEmotion.dominantSource}</span>
                  </div>
                  <span className="text-xs bg-white/10 px-3 py-1 rounded-full">AI Fused</span>
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <Brain className="w-12 h-12 text-white/30 mx-auto mb-3 animate-pulse" />
                <p className="text-white/60 text-sm">Processing emotions...</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {voiceEmotion && voiceEmotion.metrics && (
        <div className="glass-effect rounded-xl p-4">
          <h3 className="text-white font-semibold mb-3">Voice Metrics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-white/60 text-xs">Volume</p>
              <p className="text-white font-semibold">{voiceEmotion.metrics.volume}%</p>
            </div>
            <div>
              <p className="text-white/60 text-xs">Pitch</p>
              <p className="text-white font-semibold">{voiceEmotion.metrics.pitch} Hz</p>
            </div>
            <div>
              <p className="text-white/60 text-xs">Energy</p>
              <p className="text-white font-semibold">{voiceEmotion.metrics.energy}%</p>
            </div>
            <div>
              <p className="text-white/60 text-xs">Stress</p>
              <p className="text-white font-semibold">{voiceEmotion.metrics.stress}%</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CameraView
