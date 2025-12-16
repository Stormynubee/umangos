class EmotionStabilizer {
  constructor() {
    this.emotionHistory = []
    this.maxHistorySize = 5
    this.minConfidence = 55
    this.stabilityThreshold = 0.5
    this.currentStableEmotion = null
    this.emotionLockFrames = 0
    this.lockDuration = 3
  }

  addEmotionReading(emotion, confidence) {
    if (!emotion || confidence < this.minConfidence) {
      return this.currentStableEmotion
    }

    this.emotionHistory.push({
      emotion,
      confidence,
      timestamp: Date.now()
    })

    if (this.emotionHistory.length > this.maxHistorySize) {
      this.emotionHistory.shift()
    }

    if (this.emotionLockFrames > 0) {
      this.emotionLockFrames--
      return this.currentStableEmotion
    }

    const stabilized = this.calculateStableEmotion()
    
    if (stabilized.emotion !== this.currentStableEmotion?.emotion) {
      this.emotionLockFrames = this.lockDuration
    }

    this.currentStableEmotion = stabilized
    return stabilized
  }

  calculateStableEmotion() {
    if (this.emotionHistory.length === 0) {
      return { emotion: 'neutral', confidence: 0 }
    }

    const emotionScores = {}
    
    this.emotionHistory.forEach((reading, index) => {
      const recencyWeight = (index + 1) / this.emotionHistory.length
      const confidenceWeight = reading.confidence / 100
      const weightedConfidence = reading.confidence * recencyWeight * (1 + confidenceWeight)
      
      if (!emotionScores[reading.emotion]) {
        emotionScores[reading.emotion] = {
          totalScore: 0,
          count: 0,
          avgConfidence: 0,
          maxConfidence: 0
        }
      }
      
      emotionScores[reading.emotion].totalScore += weightedConfidence
      emotionScores[reading.emotion].count++
      emotionScores[reading.emotion].avgConfidence += reading.confidence
      emotionScores[reading.emotion].maxConfidence = Math.max(
        emotionScores[reading.emotion].maxConfidence, 
        reading.confidence
      )
    })

    let maxScore = 0
    let dominantEmotion = 'neutral'
    let dominantConfidence = 0

    Object.entries(emotionScores).forEach(([emotion, data]) => {
      data.avgConfidence = Math.round(data.avgConfidence / data.count)
      
      if (data.totalScore > maxScore) {
        maxScore = data.totalScore
        dominantEmotion = emotion
        dominantConfidence = Math.round((data.avgConfidence + data.maxConfidence) / 2)
      }
    })

    const stability = this.emotionHistory.filter(r => r.emotion === dominantEmotion).length / this.emotionHistory.length

    if (stability < this.stabilityThreshold && this.currentStableEmotion && this.emotionHistory.length >= this.maxHistorySize) {
      return this.currentStableEmotion
    }

    return {
      emotion: dominantEmotion,
      confidence: Math.min(dominantConfidence, 99),
      stability: Math.round(stability * 100)
    }
  }

  reset() {
    this.emotionHistory = []
    this.currentStableEmotion = null
    this.emotionLockFrames = 0
  }

  getEmotionHistory() {
    return this.emotionHistory
  }

  setMinConfidence(value) {
    this.minConfidence = Math.max(0, Math.min(100, value))
  }

  setLockDuration(frames) {
    this.lockDuration = Math.max(1, frames)
  }
}

export default EmotionStabilizer