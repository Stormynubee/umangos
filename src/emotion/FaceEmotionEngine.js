import * as faceapi from '@vladmandic/face-api'

class FaceEmotionEngine {
  constructor() {
    this.modelsLoaded = false
    this.isInitializing = false
  }

  async loadModels() {
    if (this.modelsLoaded || this.isInitializing) {
      return this.modelsLoaded
    }

    this.isInitializing = true

    try {
      const MODEL_URL = '/models'
      
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
      ])

      this.modelsLoaded = true
      this.isInitializing = false
      console.log('Face-api models loaded successfully')
      return true
    } catch (error) {
      console.error('Error loading face-api models:', error)
      this.isInitializing = false
      this.modelsLoaded = false
      return false
    }
  }

  async detectEmotion(videoElement) {
    if (!this.modelsLoaded) {
      await this.loadModels()
    }

    if (!this.modelsLoaded || !videoElement) {
      return null
    }

    try {
      const options = new faceapi.TinyFaceDetectorOptions({
        inputSize: 416,
        scoreThreshold: 0.5
      })

      const detections = await faceapi
        .detectSingleFace(videoElement, options)
        .withFaceExpressions()

      if (!detections) {
        return null
      }

      const expressions = detections.expressions
      const box = detections.detection.box

      let maxEmotion = 'neutral'
      let maxConfidence = 0

      Object.entries(expressions).forEach(([emotion, confidence]) => {
        if (confidence > maxConfidence) {
          maxConfidence = confidence
          maxEmotion = emotion
        }
      })

      const confidencePercent = Math.round(maxConfidence * 100)

      if (confidencePercent < 30) {
        return null
      }

      return {
        emotion: maxEmotion,
        confidence: confidencePercent,
        allExpressions: {
          happy: Math.round(expressions.happy * 100),
          sad: Math.round(expressions.sad * 100),
          angry: Math.round(expressions.angry * 100),
          fearful: Math.round(expressions.fearful * 100),
          disgusted: Math.round(expressions.disgusted * 100),
          surprised: Math.round(expressions.surprised * 100),
          neutral: Math.round(expressions.neutral * 100)
        },
        boundingBox: {
          x: Math.round(box.x),
          y: Math.round(box.y),
          width: Math.round(box.width),
          height: Math.round(box.height)
        },

      }
    } catch (error) {
      console.error('Error detecting emotion:', error)
      return null
    }
  }

  drawDetections(canvas, videoElement, detections) {
    if (!canvas || !videoElement || !detections) return

    const ctx = canvas.getContext('2d')
    canvas.width = videoElement.videoWidth
    canvas.height = videoElement.videoHeight

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const { boundingBox, emotion, confidence } = detections

    const colors = {
      happy: '#22c55e',
      sad: '#3b82f6',
      angry: '#ef4444',
      fearful: '#f59e0b',
      disgusted: '#8b5cf6',
      surprised: '#ec4899',
      neutral: '#6b7280'
    }

    const color = colors[emotion] || '#00ff00'

    ctx.strokeStyle = color
    ctx.lineWidth = 4
    ctx.shadowBlur = 10
    ctx.shadowColor = color
    ctx.strokeRect(
      boundingBox.x,
      boundingBox.y,
      boundingBox.width,
      boundingBox.height
    )

    ctx.shadowBlur = 0

    ctx.font = 'bold 22px Arial'
    const text = `${emotion.toUpperCase()} ${confidence}%`
    const textMetrics = ctx.measureText(text)
    
    ctx.fillStyle = 'rgba(0, 0, 0, 0.85)'
    ctx.fillRect(
      boundingBox.x,
      boundingBox.y - 35,
      textMetrics.width + 20,
      35
    )

    ctx.fillStyle = color
    ctx.fillText(text, boundingBox.x + 10, boundingBox.y - 10)
  }
}

export default new FaceEmotionEngine()