// Sound Effects Manager
class SoundManager {
  constructor() {
    this.audioContext = null;
    this.enabled = true;
  }

  init() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  playSound(frequency, duration = 0.2, type = 'sine', volume = 0.3) {
    if (!this.enabled) return;
    
    this.init();
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = type;
    
    gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
    
    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  click() {
    this.playSound(800, 0.1, 'sine', 0.2);
  }

  success() {
    this.playSound(523.25, 0.1, 'sine', 0.3);
    setTimeout(() => this.playSound(659.25, 0.15, 'sine', 0.3), 100);
  }

  error() {
    this.playSound(200, 0.2, 'sawtooth', 0.3);
  }

  notification() {
    this.playSound(880, 0.1, 'sine', 0.25);
    setTimeout(() => this.playSound(1046.5, 0.15, 'sine', 0.25), 100);
  }

  toggle() {
    this.playSound(440, 0.1, 'triangle', 0.2);
  }

  hover() {
    this.playSound(600, 0.05, 'sine', 0.15);
  }

  enable() {
    this.enabled = true;
  }

  disable() {
    this.enabled = false;
  }
}

export default new SoundManager();
