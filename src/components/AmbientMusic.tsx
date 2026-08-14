"use client";

import { useEffect, useState, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function AmbientMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const isPlayingRef = useRef(false);
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  const startAmbientMusic = () => {
    if (audioCtxRef.current) return;
    
    // Create AudioContext
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new AudioContextClass();
    audioCtxRef.current = ctx;
    
    // Main volume gain node (set to very soft volume)
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.04, ctx.currentTime); // 4% volume
    masterGain.connect(ctx.destination);
    
    // Ambient Pad synth voice
    const playChordTone = (freq: number, startTime: number, duration: number) => {
      if (!isPlayingRef.current) return;
      
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      // Warm low-pass filtered triangle wave
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, startTime);
      
      // Gentle attack and release envelope
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(0.3, startTime + 2); // Soft attack
      gainNode.gain.setValueAtTime(0.3, startTime + duration - 2);
      gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration); // Soft fade
      
      // Filter high frequencies for a warm mellow sound
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(600, startTime);
      
      osc.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(masterGain);
      
      osc.start(startTime);
      osc.stop(startTime + duration);
    };

    // Sparking high chime voice
    const playChime = (freq: number, startTime: number) => {
      if (!isPlayingRef.current) return;
      
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, startTime);
      
      // Quick attack, long smooth decay
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(0.4, startTime + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + 1.5);
      
      osc.connect(gainNode);
      gainNode.connect(masterGain);
      
      osc.start(startTime);
      osc.stop(startTime + 1.6);
    };

    // Chill chord progression chords (frequencies in Hz)
    // Cmaj7 (C3, G3, B3, E4) -> Am7 (A2, E3, G3, C4) -> Fmaj7 (F2, C3, A3, E4) -> G6 (G2, D3, B3, E4)
    const progressions = [
      [130.81, 196.00, 246.94, 329.63], // Cmaj7
      [110.00, 164.81, 196.00, 261.63], // Am7
      [87.31, 130.81, 220.00, 329.63],  // Fmaj7
      [98.00, 146.83, 246.94, 329.63],  // G6
    ];

    const chimesScale = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50]; // Pentatonic chimes (C5 - C6)

    let chordIndex = 0;
    const beatDuration = 8; // Each chord plays for 8 seconds
    
    const playLoop = () => {
      if (!isPlayingRef.current) return;
      
      const now = ctx.currentTime;
      const notes = progressions[chordIndex];
      
      // Play 4 chord tones for the current pad chord
      notes.forEach((freq) => {
        playChordTone(freq, now, beatDuration);
      });
      
      // Play 2-3 random sparkling chimes during the chord
      const chimeTimes = [1, 3, 5];
      chimeTimes.forEach((delay) => {
        const chimeFreq = chimesScale[Math.floor(Math.random() * chimesScale.length)];
        playChime(chimeFreq, now + delay + Math.random() * 0.5);
      });
      
      chordIndex = (chordIndex + 1) % progressions.length;
      
      const timer = setTimeout(playLoop, beatDuration * 1000);
      timersRef.current.push(timer);
    };
    
    playLoop();
  };

  const stopAmbientMusic = () => {
    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current = [];
    if (audioCtxRef.current) {
      audioCtxRef.current.close();
      audioCtxRef.current = null;
    }
  };

  const togglePlayback = () => {
    const nextState = !isPlaying;
    setIsPlaying(nextState);
    isPlayingRef.current = nextState;
    
    if (nextState) {
      startAmbientMusic();
    } else {
      stopAmbientMusic();
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      timersRef.current.forEach((t) => clearTimeout(t));
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-30 flex items-center gap-3">
      <button
        onClick={togglePlayback}
        className={`p-3.5 rounded-full shadow-2xl transition-all hover:scale-105 border flex items-center justify-center cursor-pointer ${
          isPlaying
            ? "bg-brand-red text-white border-transparent"
            : "bg-white text-gray-700 border-gray-200 hover:text-black hover:border-black"
        }`}
        aria-label="Toggle Ambient Music"
      >
        {isPlaying ? <Volume2 className="h-6 w-6 animate-pulse" /> : <VolumeX className="h-6 w-6" />}
      </button>

      {/* Floating animated visualizer bars */}
      {isPlaying && (
        <div className="flex gap-0.5 items-end h-4 w-6">
          <span className="w-1 bg-brand-red rounded-full animate-sound-bar" style={{ animationDelay: '0.1s' }}></span>
          <span className="w-1 bg-brand-red rounded-full animate-sound-bar" style={{ animationDelay: '0.4s' }}></span>
          <span className="w-1 bg-brand-red rounded-full animate-sound-bar" style={{ animationDelay: '0.2s' }}></span>
          <span className="w-1 bg-brand-red rounded-full animate-sound-bar" style={{ animationDelay: '0.5s' }}></span>
        </div>
      )}
    </div>
  );
}
