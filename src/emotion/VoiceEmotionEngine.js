class VoiceEmotionEngine {
  constructor() {
    this.audioContext = null
    this.analyser = null
    this.dataArray = null
    this.bufferLength = 0
  }

  initialize(audioStream) {
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
      this.analyser = this.audioContext.createAnalyser()
      const source = this.audioContext.createMediaStreamSource(audioStream)
      
      this.analyser.fftSize = 2048
      this.analyser.smoothingTimeConstant = 0.8
      source.connect(this.analyser)

      this.bufferLength = this.analyser.frequencyBinCount
      this.dataArray = new Uint8Array(this.bufferLength)

      return true
    } catch (error) {
      console.error('Error initializing voice emotion engine:', error)
      return false
    }
  }

  analyzeVoiceEmotion() {
    if (!this.analyser || !this.dataArray) {
      return null
    }

    this.analyser.getByteTimeDomainData(this.dataArray)
    this.analyser.getByteFrequencyData(this.dataArray)

    const volume = this.calculateVolume()
    const pitch = this.calculatePitch()
    const energy = this.calculateEnergy()
    const spectralCentroid = this.calculateSpectralCentroid()

    const emotion = this.mapToEmotion(volume, pitch, energy, spectralCentroid)

    return {
      emotion: emotion.name,
      confidence: emotion.confidence,
      metrics: {
        volume,
        pitch,
        energy,
        spectralCentroid,
        stress: this.calculateStress(volume, pitch, energy)
      }
    }
  }

  calculateVolume() {
    let sum = 0
    for (let i = 0; i < this.bufferLength; i++) {
      const normalized = (this.dataArray[i] - 128) / 128
      sum += normalized * normalized
    }
    const rms = Math.sqrt(sum / this.bufferLength)
    return Math.min(Math.round(rms * 100), 100)
  }

  calculatePitch() {
    const frequencies = new Uint8Array(this.bufferLength)
    this.analyser.getByteFrequencyData(frequencies)

    let maxValue = 0
    let maxIndex = 0

    for (let i = 0; i < frequencies.length; i++) {
      if (frequencies[i] > maxValue) {
        maxValue = frequencies[i]
        maxIndex = i
      }
    }

    const nyquist = this.audioContext.sampleRate / 2
    const frequency = (maxIndex * nyquist) / frequencies.length

    return Math.round(frequency)
  }

  calculateEnergy() {
    const frequencies = new Uint8Array(this.bufferLength)
    this.analyser.getByteFrequencyData(frequencies)

    let sum = 0
    for (let i = 0; i < frequencies.length; i++) {
      sum += frequencies[i]
    }

    return Math.min(Math.round((sum / (frequencies.length * 255)) * 100), 100)
  }

  calculateSpectralCentroid() {
    const frequencies = new Uint8Array(this.bufferLength)
    this.analyser.getByteFrequencyData(frequencies)

    let numerator = 0
    let denominator = 0

    for (let i = 0; i < frequencies.length; i++) {
      numerator += i * frequencies[i]
      denominator += frequencies[i]
    }

    if (denominator === 0) return 0

    const centroid = numerator / denominator
    return Math.round(centroid)
  }

  calculateStress(volume, pitch, energy) {
    const volumeStress = volume > 60 ? (volume - 60) / 40 : 0
    const pitchStress = pitch > 300 ? (pitch - 300) / 200 : 0
    const energyStress = energy > 50 ? (energy - 50) / 50 : 0

    const stress = (volumeStress + pitchStress + energyStress) / 3
    return Math.min(Math.round(stress * 100), 100)
  }

  mapToEmotion(volume, pitch, energy, spectralCentroid) {
    const emotions = []

    if (volume < 20 && energy < 30) {
      emotions.push({ name: 'sad', score: 70 })
      emotions.push({ name: 'calm', score: 50 })
    }

    if (volume > 60 && energy > 60) {
      if (pitch > 250) {
        emotions.push({ name: 'excited', score: 75 })
        emotions.push({ name: 'happy', score: 70 })
      } else {
        emotions.push({ name: 'angry', score: 75 })
        emotions.push({ name: 'stressed', score: 65 })
      }
    }

    if (volume > 40 && volume < 65 && pitch > 200 && pitch < 300) {
      emotions.push({ name: 'happy', score: 70 })
      emotions.push({ name: 'content', score: 60 })
    }

    if (volume < 40 && energy < 40 && spectralCentroid < 100) {
      emotions.push({ name: 'calm', score: 75 })
      emotions.push({ name: 'neutral', score: 60 })
    }

    if (pitch > 300 && energy > 50) {
      emotions.push({ name: 'fearful', score: 70 })
      emotions.push({ name: 'anxious', score: 65 })
    }

    if (emotions.length === 0) {
      emotions.push({ name: 'neutral', score: 50 })
    }

    emotions.sort((a, b) => b.score - a.score)

    return {
      name: emotions[0].name,
      confidence: emotions[0].score
    }
  }

  getWaveformData() {
    if (!this.analyser || !this.dataArray) {
      return []
    }

    this.analyser.getByteTimeDomainData(this.dataArray)
    
    const waveform = []
    const step = Math.floor(this.bufferLength / 100)
    
    for (let i = 0; i < 100; i++) {
      const index = i * step
      waveform.push(this.dataArray[index])
    }

    return waveform
  }

  cleanup() {
    if (this.audioContext) {
      this.audioContext.close()
      this.audioContext = null
    }
    this.analyser = null
    this.dataArray = null
  }
}

export default new VoiceEmotionEngine()
