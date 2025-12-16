import { useState, useEffect, useRef } from 'react'

export function useMicrophone() {
  const [stream, setStream] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [audioData, setAudioData] = useState({
    volume: 0,
    frequency: 0,
    isActive: false
  })

  const audioContextRef = useRef(null)
  const analyserRef = useRef(null)
  const dataArrayRef = useRef(null)
  const animationFrameRef = useRef(null)

  useEffect(() => {
    let mounted = true
    let currentStream = null

    const initMicrophone = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const mediaStream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true
          }
        })

        if (!mounted) {
          mediaStream.getTracks().forEach(track => track.stop())
          return
        }

        currentStream = mediaStream
        setStream(mediaStream)

        const audioContext = new (window.AudioContext || window.webkitAudioContext)()
        const analyser = audioContext.createAnalyser()
        const source = audioContext.createMediaStreamSource(mediaStream)
        
        analyser.fftSize = 2048
        source.connect(analyser)

        audioContextRef.current = audioContext
        analyserRef.current = analyser

        const bufferLength = analyser.frequencyBinCount
        const dataArray = new Uint8Array(bufferLength)
        dataArrayRef.current = dataArray

        const analyzeAudio = () => {
          if (!mounted || !analyserRef.current) return

          try {
            analyser.getByteTimeDomainData(dataArray)
            analyser.getByteFrequencyData(dataArray)

            let sum = 0
            let maxFreq = 0
            let maxFreqIndex = 0

            for (let i = 0; i < bufferLength; i++) {
              sum += dataArray[i]
              if (dataArray[i] > maxFreq) {
                maxFreq = dataArray[i]
                maxFreqIndex = i
              }
            }

            const average = sum / bufferLength
            const volume = Math.round((average / 255) * 100)
            const frequency = Math.round((maxFreqIndex * audioContext.sampleRate) / (analyser.fftSize * 2))

            if (mounted) {
              setAudioData({
                volume,
                frequency,
                isActive: volume > 5
              })
            }

            animationFrameRef.current = requestAnimationFrame(analyzeAudio)
          } catch (err) {
            console.error('Audio analysis error:', err)
          }
        }

        analyzeAudio()
        setIsLoading(false)
      } catch (err) {
        console.warn('Microphone initialization failed:', err)
        if (mounted) {
          setError(err.message)
          setIsLoading(false)
          setAudioData({
            volume: 0,
            frequency: 0,
            isActive: false
          })
        }
      }
    }

    initMicrophone()

    return () => {
      mounted = false
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(err => console.warn('AudioContext close error:', err))
      }
      
      if (currentStream) {
        currentStream.getTracks().forEach(track => track.stop())
      }
    }
  }, [])

  const stopMicrophone = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }
    
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close().catch(err => console.warn('AudioContext close error:', err))
    }
    
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
      setStream(null)
    }
  }

  return {
    stream,
    error,
    isLoading,
    audioData,
    stopMicrophone
  }
}