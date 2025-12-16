class EmotionFusion {
  constructor() {
    this.faceWeight = 0.6
    this.voiceWeight = 0.4
  }

  fuseEmotions(faceEmotion, voiceEmotion) {
    if (!faceEmotion && !voiceEmotion) {
      return {
        fusedEmotion: 'neutral',
        confidence: 0,
        dominantSource: 'none',
        breakdown: {
          face: null,
          voice: null
        }
      }
    }

    if (!faceEmotion && voiceEmotion) {
      return {
        fusedEmotion: voiceEmotion.emotion,
        confidence: voiceEmotion.confidence,
        dominantSource: 'voice',
        breakdown: {
          face: null,
          voice: voiceEmotion
        }
      }
    }

    if (faceEmotion && !voiceEmotion) {
      return {
        fusedEmotion: faceEmotion.emotion,
        confidence: faceEmotion.confidence,
        dominantSource: 'face',
        breakdown: {
          face: faceEmotion,
          voice: null
        }
      }
    }

    const emotionMap = this.mapEmotions(faceEmotion.emotion, voiceEmotion.emotion)
    
    const faceScore = faceEmotion.confidence * this.faceWeight
    const voiceScore = voiceEmotion.confidence * this.voiceWeight

    const totalScore = faceScore + voiceScore
    const normalizedConfidence = Math.round(totalScore)

    const dominantSource = faceScore > voiceScore ? 'face' : 'voice'

    const fusedEmotion = this.determineFusedEmotion(
      faceEmotion.emotion,
      voiceEmotion.emotion,
      faceScore,
      voiceScore
    )

    return {
      fusedEmotion,
      confidence: normalizedConfidence,
      dominantSource,
      breakdown: {
        face: {
          emotion: faceEmotion.emotion,
          confidence: faceEmotion.confidence,
          weight: this.faceWeight,
          score: Math.round(faceScore)
        },
        voice: {
          emotion: voiceEmotion.emotion,
          confidence: voiceEmotion.confidence,
          weight: this.voiceWeight,
          score: Math.round(voiceScore)
        }
      },
      emotionMap
    }
  }

  mapEmotions(faceEmotion, voiceEmotion) {
    const emotionCompatibility = {
      happy: ['happy', 'excited', 'content'],
      sad: ['sad', 'calm'],
      angry: ['angry', 'stressed'],
      fearful: ['fearful', 'anxious', 'stressed'],
      disgusted: ['angry', 'stressed'],
      surprised: ['excited', 'fearful', 'anxious'],
      neutral: ['calm', 'neutral', 'content']
    }

    const faceCompatible = emotionCompatibility[faceEmotion] || []
    const isCompatible = faceCompatible.includes(voiceEmotion)

    return {
      faceEmotion,
      voiceEmotion,
      isCompatible,
      compatibility: isCompatible ? 'high' : 'low'
    }
  }

  determineFusedEmotion(faceEmotion, voiceEmotion, faceScore, voiceScore) {
    const emotionMappings = {
      happy: {
        happy: 'happy',
        excited: 'happy',
        content: 'happy',
        calm: 'content',
        neutral: 'content',
        sad: 'neutral',
        angry: 'confused',
        stressed: 'anxious',
        fearful: 'anxious',
        anxious: 'anxious'
      },
      sad: {
        sad: 'sad',
        calm: 'sad',
        neutral: 'sad',
        happy: 'confused',
        excited: 'confused',
        content: 'neutral',
        angry: 'distressed',
        stressed: 'distressed',
        fearful: 'fearful',
        anxious: 'anxious'
      },
      angry: {
        angry: 'angry',
        stressed: 'angry',
        happy: 'confused',
        excited: 'frustrated',
        sad: 'distressed',
        calm: 'irritated',
        neutral: 'irritated',
        fearful: 'defensive',
        anxious: 'anxious'
      },
      fearful: {
        fearful: 'fearful',
        anxious: 'fearful',
        stressed: 'anxious',
        happy: 'confused',
        excited: 'overwhelmed',
        sad: 'anxious',
        angry: 'defensive',
        calm: 'cautious',
        neutral: 'cautious'
      },
      disgusted: {
        angry: 'disgusted',
        stressed: 'disgusted',
        happy: 'confused',
        sad: 'disappointed',
        calm: 'uncomfortable',
        neutral: 'uncomfortable',
        fearful: 'distressed',
        anxious: 'uncomfortable'
      },
      surprised: {
        excited: 'surprised',
        happy: 'delighted',
        fearful: 'shocked',
        anxious: 'shocked',
        stressed: 'overwhelmed',
        angry: 'shocked',
        sad: 'shocked',
        calm: 'mildly_surprised',
        neutral: 'curious'
      },
      neutral: {
        neutral: 'neutral',
        calm: 'calm',
        content: 'content',
        happy: 'content',
        excited: 'interested',
        sad: 'pensive',
        angry: 'uncomfortable',
        stressed: 'tense',
        fearful: 'cautious',
        anxious: 'uneasy'
      }
    }

    const mapping = emotionMappings[faceEmotion]
    if (mapping && mapping[voiceEmotion]) {
      return mapping[voiceEmotion]
    }

    return faceScore > voiceScore ? faceEmotion : voiceEmotion
  }

  getEmotionColor(emotion) {
    const colors = {
      happy: '#22c55e',
      sad: '#3b82f6',
      angry: '#ef4444',
      fearful: '#f59e0b',
      disgusted: '#8b5cf6',
      surprised: '#ec4899',
      neutral: '#6b7280',
      calm: '#10b981',
      content: '#14b8a6',
      excited: '#f97316',
      stressed: '#dc2626',
      anxious: '#eab308',
      confused: '#6366f1',
      distressed: '#991b1b',
      defensive: '#c2410c',
      overwhelmed: '#be123c',
      disappointed: '#4b5563',
      uncomfortable: '#7c3aed',
      shocked: '#db2777',
      delighted: '#059669',
      mildly_surprised: '#facc15',
      curious: '#06b6d4',
      pensive: '#475569',
      tense: '#dc2626',
      uneasy: '#ca8a04',
      irritated: '#ea580c',
      frustrated: '#b91c1c',
      cautious: '#d97706'
    }

    return colors[emotion] || '#6b7280'
  }

  getEmotionDescription(emotion) {
    const descriptions = {
      happy: 'Positive and joyful state',
      sad: 'Low mood detected',
      angry: 'High arousal negative state',
      fearful: 'Anxious or worried state',
      disgusted: 'Aversion response',
      surprised: 'Unexpected stimulus response',
      neutral: 'Baseline emotional state',
      calm: 'Relaxed and peaceful',
      content: 'Satisfied and comfortable',
      excited: 'High energy positive state',
      stressed: 'Under pressure',
      anxious: 'Worried or nervous',
      confused: 'Mixed emotional signals',
      distressed: 'Significant discomfort',
      defensive: 'Protective response',
      overwhelmed: 'Too much stimulation',
      disappointed: 'Unmet expectations',
      uncomfortable: 'Mild distress',
      shocked: 'Intense surprise',
      delighted: 'Very pleased',
      mildly_surprised: 'Slight surprise',
      curious: 'Interested and attentive',
      pensive: 'Thoughtful state',
      tense: 'Physical and mental strain',
      uneasy: 'Slight discomfort',
      irritated: 'Mild annoyance',
      frustrated: 'Blocked goal response',
      cautious: 'Careful and alert'
    }

    return descriptions[emotion] || 'Unknown emotional state'
  }
}

export default new EmotionFusion()
