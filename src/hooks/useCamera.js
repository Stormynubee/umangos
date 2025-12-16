import { useState, useEffect, useRef } from 'react'

export function useCamera() {
  const [stream, setStream] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isVideoReady, setIsVideoReady] = useState(false)
  const videoRef = useRef(null)

  useEffect(() => {
    let mounted = true
    let currentStream = null

    const initCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { width: 1280, height: 720, facingMode: 'user' }
        })

        if (!mounted) {
          mediaStream.getTracks().forEach(track => track.stop())
          return
        }

        currentStream = mediaStream
        setStream(mediaStream)
        setIsLoading(false)

        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream
          
          videoRef.current.onloadedmetadata = () => {
            if (mounted && videoRef.current) {
              videoRef.current.play()
                .then(() => {
                  if (mounted) {
                    setIsVideoReady(true)
                  }
                })
                .catch(err => {
                  console.error('Video play error:', err)
                })
            }
          }
        }
      } catch (err) {
        console.error('Camera error:', err)
        if (mounted) {
          setError(err.message)
          setIsLoading(false)
        }
      }
    }

    initCamera()

    return () => {
      mounted = false
      if (videoRef.current) {
        videoRef.current.srcObject = null
        videoRef.current.onloadedmetadata = null
      }
      if (currentStream) {
        currentStream.getTracks().forEach(track => track.stop())
      }
    }
  }, [])

  return {
    stream,
    error,
    isLoading,
    isVideoReady,
    videoRef,
    stopCamera: () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
        setStream(null)
        setIsVideoReady(false)
      }
    }
  }
}