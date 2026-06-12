/**
 * useVoice — React hook for the Whentor voice engine.
 * Manages TTS playback, STT input, and call-mode state.
 */

import { useState, useCallback, useRef } from "react";
import {
  speak,
  startListening,
  stopListening,
  stopAllVoice,
  isSpeechRecognitionSupported,
  hasElevenLabsKey,
} from "@/lib/voice";

export type VoiceStatus =
  | "idle"
  | "loading"    // fetching ElevenLabs audio
  | "speaking"   // mentor is speaking
  | "listening"  // user mic is active
  | "processing" // STT interim text coming in
  | "error";

export function useVoice(mentorId: string) {
  const [status, setStatus] = useState<VoiceStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [interimText, setInterimText] = useState("");
  const [playingMessageId, setPlayingMessageId] = useState<string | null>(null);
  const stopListeningRef = useRef<(() => void) | null>(null);

  // ── Speak a mentor message ──────────────────────────────────────────────────
  const playMessage = useCallback(
    (text: string, messageId: string) => {
      setError(null);

      if (playingMessageId === messageId && status === "speaking") {
        stopAllVoice();
        setStatus("idle");
        setPlayingMessageId(null);
        return;
      }

      stopAllVoice();
      setPlayingMessageId(messageId);
      setStatus("loading");

      speak(text, mentorId, {
        onStart: () => setStatus("speaking"),
        onEnd: () => {
          setStatus("idle");
          setPlayingMessageId(null);
        },
        onError: (e) => {
          setError(e);
          setStatus("error");
          setPlayingMessageId(null);
        },
      });
    },
    [mentorId, playingMessageId, status],
  );

  // ── Stop speaking ───────────────────────────────────────────────────────────
  const stopSpeaking = useCallback(() => {
    stopAllVoice();
    setStatus("idle");
    setPlayingMessageId(null);
  }, []);

  // ── Start listening (mic) ───────────────────────────────────────────────────
  const startMic = useCallback(
    (onFinal: (text: string) => void) => {
      stopAllVoice();
      setError(null);
      setInterimText("");
      setStatus("listening");

      const stop = startListening({
        onInterim: (t) => { setInterimText(t); setStatus("processing"); },
        onFinal: (t) => {
          setInterimText("");
          setStatus("idle");
          onFinal(t);
        },
        onEnd: () => { setInterimText(""); if (status !== "idle") setStatus("idle"); },
        onError: (e) => { setError(e); setStatus("error"); setInterimText(""); },
      });

      stopListeningRef.current = stop;
    },
    [status],
  );

  // ── Stop mic ────────────────────────────────────────────────────────────────
  const stopMic = useCallback(() => {
    stopListening();
    stopListeningRef.current?.();
    setInterimText("");
    setStatus("idle");
  }, []);

  // ── Call mode: speak then auto-listen ───────────────────────────────────────
  const speakThenListen = useCallback(
    (text: string, messageId: string, onUserSpoke: (text: string) => void) => {
      setError(null);
      setPlayingMessageId(messageId);
      setStatus("loading");

      speak(text, mentorId, {
        onStart: () => setStatus("speaking"),
        onEnd: () => {
          setPlayingMessageId(null);
          // Auto-activate mic after mentor finishes speaking
          if (isSpeechRecognitionSupported()) {
            setTimeout(() => startMic(onUserSpoke), 300);
          } else {
            setStatus("idle");
          }
        },
        onError: (e) => {
          setError(e);
          setStatus("idle");
          setPlayingMessageId(null);
        },
      });
    },
    [mentorId, startMic],
  );

  return {
    status,
    error,
    interimText,
    playingMessageId,
    playMessage,
    stopSpeaking,
    startMic,
    stopMic,
    speakThenListen,
    hasElevenLabs: hasElevenLabsKey(),
    hasMic: isSpeechRecognitionSupported(),
  };
}
