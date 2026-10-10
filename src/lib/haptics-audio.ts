/**
 * Cupertino Acoustic & Haptic Audio Engine
 * 
 * Synthesizes subtle, elegant Apple-grade acoustic feedback using the native
 * browser Web Audio API (zero external assets or network requests needed).
 */

class AudioFeedbackEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  private getContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    return this.ctx;
  }

  /**
   * Subtle soft click (mimics Taptic Engine micro-click)
   */
  public playClick(): void {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.04);
    } catch {
      // Graceful fallback if audio is restricted
    }
  }

  /**
   * Elegant harmonic chime for verified success (mimics Apple Pay confirmation)
   */
  public playSuccessChime(): void {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      // Two harmonic tones in sequence (E5 -> B5)
      const now = ctx.currentTime;
      const notes = [
        { freq: 659.25, time: now, duration: 0.18 },       // E5
        { freq: 987.77, time: now + 0.08, duration: 0.3 },  // B5
      ];

      notes.forEach(({ freq, time, duration }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, time);

        gain.gain.setValueAtTime(0.06, time);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(time);
        osc.stop(time + duration);
      });
    } catch {
      // Graceful fallback
    }
  }

  /**
   * Subtle resonant thud for minting confirmation
   */
  public playMintChime(): void {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.exponentialRampToValueAtTime(1046.5, now + 0.15); // C6

      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.25);
    } catch {
      // Graceful fallback
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }
}

export const soundEffects = new AudioFeedbackEngine();
