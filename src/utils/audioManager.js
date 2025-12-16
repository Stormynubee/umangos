class AudioManager {
  constructor() {
    this.bgMusic = null
    this.sfxVolume = 0.3
    this.musicVolume = 0.15
    this.musicEnabled = true
    this.sfxEnabled = true
    this.isInitialized = false
    this.userInteracted = false

    // Load settings from localStorage
    this.loadSettings()

    // Preload sound effects with fallback
    this.sounds = {
      click: this.createSound('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3'),
      navigation: this.createSound('https://assets.mixkit.co/active_storage/sfx/2570/2570-preview.mp3'),
      toggle: this.createSound('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3'),
      success: this.createSound('https://assets.mixkit.co/active_storage/sfx/2019/2019-preview.mp3')
    }

    // Background music sources with multiple fallbacks
    this.musicSources = [
      'https://cdn.pixabay.com/audio/2022/03/10/audio_c8c8e1e570.mp3',
      'https://cdn.pixabay.com/audio/2022/08/02/audio_92f9ef012d.mp3',
      'https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3'
    ]
    this.currentMusicIndex = 0
  }

  createSound(src) {
    const audio = new Audio()
    audio.preload = 'auto'
    audio.src = src
    audio.volume = this.sfxVolume
    return audio
  }

  loadSettings() {
    try {
      const settings = localStorage.getItem('umangos_audio_settings')
      if (settings) {
        const parsed = JSON.parse(settings)
        this.musicEnabled = parsed.musicEnabled !== false
        this.sfxEnabled = parsed.sfxEnabled !== false
        this.musicVolume = parsed.musicVolume || 0.15
        this.sfxVolume = parsed.sfxVolume || 0.3
      }
    } catch (e) {
      console.warn('Could not load audio settings:', e)
    }
  }

  saveSettings() {
    try {
      localStorage.setItem('umangos_audio_settings', JSON.stringify({
        musicEnabled: this.musicEnabled,
        sfxEnabled: this.sfxEnabled,
        musicVolume: this.musicVolume,
        sfxVolume: this.sfxVolume
      }))
    } catch (e) {
      console.warn('Could not save audio settings:', e)
    }
  }

  async initBackgroundMusic() {
    if (this.isInitialized || !this.userInteracted) {
      console.log('Audio not initialized: isInitialized=', this.isInitialized, 'userInteracted=', this.userInteracted)
      return
    }

    try {
      console.log('Initializing background music...')
      this.bgMusic = new Audio()
      this.bgMusic.src = this.musicSources[this.currentMusicIndex]
      this.bgMusic.loop = true
      this.bgMusic.volume = this.musicVolume
      
      // Add error handler for fallback
      this.bgMusic.onerror = () => {
        console.warn('Music source failed, trying fallback...')
        this.currentMusicIndex = (this.currentMusicIndex + 1) % this.musicSources.length
        if (this.currentMusicIndex > 0) {
          this.bgMusic.src = this.musicSources[this.currentMusicIndex]
          if (this.musicEnabled) {
            this.bgMusic.play().catch(e => console.warn('Fallback music also failed:', e))
          }
        }
      }
      
      if (this.musicEnabled) {
        console.log('Playing background music...')
        await this.bgMusic.play()
        console.log('Background music started successfully')
      }
      
      this.isInitialized = true
    } catch (e) {
      console.warn('Background music failed to play:', e)
      // Try fallback
      this.currentMusicIndex = (this.currentMusicIndex + 1) % this.musicSources.length
      if (this.currentMusicIndex > 0) {
        try {
          this.bgMusic.src = this.musicSources[this.currentMusicIndex]
          if (this.musicEnabled) {
            await this.bgMusic.play()
            this.isInitialized = true
          }
        } catch (e2) {
          console.warn('All music sources failed:', e2)
        }
      }
    }
  }

  handleUserInteraction() {
    if (!this.userInteracted) {
      console.log('User interaction detected, initializing audio...')
      this.userInteracted = true
      this.initBackgroundMusic()
    }
  }

  playSound(soundName) {
    if (!this.sfxEnabled) return

    try {
      const sound = this.sounds[soundName]
      if (sound) {
        sound.volume = this.sfxVolume
        sound.currentTime = 0
        sound.play().catch(e => console.warn('Sound failed to play:', e))
      }
    } catch (e) {
      console.warn('Error playing sound:', e)
    }
  }

  toggleMusic() {
    this.musicEnabled = !this.musicEnabled
    console.log('Music toggled:', this.musicEnabled)
    
    if (this.bgMusic) {
      if (this.musicEnabled) {
        this.bgMusic.play().catch(e => console.warn('Music failed to resume:', e))
      } else {
        this.bgMusic.pause()
      }
    } else if (this.musicEnabled && this.userInteracted) {
      // Try to initialize if not already done
      this.initBackgroundMusic()
    }
    
    this.saveSettings()
    return this.musicEnabled
  }

  toggleSFX() {
    this.sfxEnabled = !this.sfxEnabled
    console.log('SFX toggled:', this.sfxEnabled)
    this.saveSettings()
    return this.sfxEnabled
  }

  setMusicVolume(volume) {
    this.musicVolume = Math.max(0, Math.min(1, volume))
    if (this.bgMusic) {
      this.bgMusic.volume = this.musicVolume
    }
    this.saveSettings()
  }

  setSFXVolume(volume) {
    this.sfxVolume = Math.max(0, Math.min(1, volume))
    this.saveSettings()
  }

  getMusicEnabled() {
    return this.musicEnabled
  }

  getSFXEnabled() {
    return this.sfxEnabled
  }

  getMusicVolume() {
    return this.musicVolume
  }

  getSFXVolume() {
    return this.sfxVolume
  }

  isPlaying() {
    return this.bgMusic && !this.bgMusic.paused
  }
}

const audioManager = new AudioManager()

// Set up global interaction listeners
if (typeof window !== 'undefined') {
  const handleInteraction = () => {
    console.log('Global interaction detected')
    audioManager.handleUserInteraction()
  }
  
  window.addEventListener('click', handleInteraction, { once: false })
  window.addEventListener('keydown', handleInteraction, { once: false })
  window.addEventListener('touchstart', handleInteraction, { once: false })
}

export default audioManager