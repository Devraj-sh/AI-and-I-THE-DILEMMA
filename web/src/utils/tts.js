// Text-to-Speech utility for AI narration
class TTSManager {
  constructor() {
    this.synthesis = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.voices = [];
    this.isEnabled = true;
    this.aiVoice = null;
    
    if (this.synthesis) {
      this.loadVoices();
      this.synthesis.onvoiceschanged = () => this.loadVoices();
    }
  }

  loadVoices() {
    if (!this.synthesis) return;
    
    this.voices = this.synthesis.getVoices();
    
    // Try to find a good AI voice (prefer female, clear voices)
    const preferredVoices = [
      'Google UK English Female',
      'Microsoft Zira Desktop',
      'Samantha',
      'Alex',
      'Google US English'
    ];
    
    for (const preferred of preferredVoices) {
      const voice = this.voices.find(v => v.name.includes(preferred));
      if (voice) {
        this.aiVoice = voice;
        break;
      }
    }
    
    // Fallback to first available voice
    if (!this.aiVoice && this.voices.length > 0) {
      this.aiVoice = this.voices.find(v => v.lang.includes('en')) || this.voices[0];
    }
  }

  speak(text, options = {}) {
    if (!this.synthesis || !this.isEnabled || !text) return Promise.resolve();

    return new Promise((resolve, reject) => {
      // Cancel any ongoing speech
      this.synthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      
      // Configure voice
      if (this.aiVoice) {
        utterance.voice = this.aiVoice;
      }
      
      // Configure speech parameters
      utterance.rate = options.rate || 0.9;
      utterance.pitch = options.pitch || 1.0;
      utterance.volume = options.volume || 0.8;
      
      utterance.onend = () => resolve();
      utterance.onerror = (error) => reject(error);
      
      this.synthesis.speak(utterance);
    });
  }

  stop() {
    if (this.synthesis) {
      this.synthesis.cancel();
    }
  }

  toggle() {
    this.isEnabled = !this.isEnabled;
    if (!this.isEnabled) {
      this.stop();
    }
    return this.isEnabled;
  }

  // Predefined AI messages
  async welcomeMessage(nickname) {
    const messages = [
      `Hello ${nickname}! Welcome to AI and I: The Dilemma. I'm excited to guide you through this learning adventure!`,
      `Hi there ${nickname}! Ready to explore the fascinating world of AI together? Let's dive in!`,
      `Welcome back ${nickname}! I've been waiting to continue our AI literacy journey. What shall we discover today?`
    ];
    
    const message = messages[Math.floor(Math.random() * messages.length)];
    return this.speak(message);
  }

  async thinkingMessage() {
    const messages = [
      "Let me analyze this for a moment...",
      "Hmm, interesting question. I'm processing...",
      "Give me a second to think about this...",
      "Analyzing the patterns here...",
      "Let me consider all the possibilities..."
    ];
    
    const message = messages[Math.floor(Math.random() * messages.length)];
    return this.speak(message, { rate: 0.8 });
  }

  async explanationIntro() {
    const messages = [
      "Here's what I found interesting about this:",
      "Let me explain my reasoning:",
      "This is how I approached this problem:",
      "Here's my analysis:",
      "Let me break this down for you:"
    ];
    
    const message = messages[Math.floor(Math.random() * messages.length)];
    return this.speak(message);
  }

  async encouragement(correct) {
    if (correct) {
      const messages = [
        "Excellent work! You're really getting the hang of this!",
        "Well done! Your critical thinking skills are improving!",
        "Perfect! You spotted that one correctly!",
        "Great job! You're becoming quite the AI detective!"
      ];
      const message = messages[Math.floor(Math.random() * messages.length)];
      return this.speak(message, { pitch: 1.1 });
    } else {
      const messages = [
        "Don't worry, that was a tricky one! Let me explain why...",
        "Good attempt! This one can be challenging. Here's what to look for...",
        "No problem! Learning from mistakes makes us stronger. Let me show you...",
        "That's okay! Even I find some of these challenging. Here's the key..."
      ];
      const message = messages[Math.floor(Math.random() * messages.length)];
      return this.speak(message, { rate: 0.9 });
    }
  }

  async gameComplete(score, total) {
    const percentage = (score / total) * 100;
    let message = "";
    
    if (percentage >= 80) {
      message = `Outstanding! You scored ${score} out of ${total}! You're really mastering this AI detection skill!`;
    } else if (percentage >= 60) {
      message = `Well done! You got ${score} out of ${total} correct. You're making great progress!`;
    } else {
      message = `Good effort! You scored ${score} out of ${total}. Keep practicing and you'll improve quickly!`;
    }
    
    return this.speak(message, { pitch: 1.05 });
  }
}

// Create singleton instance
let ttsInstance = null;

export const getTTS = () => {
  if (!ttsInstance) {
    ttsInstance = new TTSManager();
  }
  return ttsInstance;
};

export default getTTS;