/**
 * useMemory — React hook for the Whentor memory system.
 * All components use this to read/write the user's persistent state.
 */

import { useState, useCallback, useEffect } from "react";
import {
  loadMemory,
  saveMemory,
  touchSession,
  logEmotion,
  logConversation,
  addMilestone,
  type UserMemory,
  type Emotion,
  type LifeArea,
} from "@/lib/memory";

export function useMemory() {
  const [memory, setMemory] = useState<UserMemory>(() => {
    const m = loadMemory();
    return touchSession(m);
  });

  // Persist every change to localStorage
  useEffect(() => {
    saveMemory(memory);
  }, [memory]);

  const setMood = useCallback((mood: Emotion) => {
    setMemory((prev) => ({
      ...prev,
      todayMood: mood,
      todayMoodTimestamp: Date.now(),
    }));
  }, []);

  const recordEmotion = useCallback(
    (emotion: Emotion, intensity: 1 | 2 | 3, context: string, mentorId: string) => {
      setMemory((prev) => logEmotion(prev, emotion, intensity, context, mentorId));
    },
    [],
  );

  const recordConversation = useCallback(
    (mentorId: string, userMessage: string, mentorReply: string, emotion: Emotion) => {
      setMemory((prev) => logConversation(prev, mentorId, userMessage, mentorReply, emotion));
    },
    [],
  );

  const recordMilestone = useCallback(
    (mentorId: string, area: LifeArea, message: string, title: string) => {
      setMemory((prev) => addMilestone(prev, mentorId, area, message, title));
    },
    [],
  );

  const setGoal = useCallback((goal: string) => {
    setMemory((prev) => ({
      ...prev,
      goals: [goal, ...prev.goals.filter((g) => g !== goal)].slice(0, 10),
    }));
  }, []);

  return {
    memory,
    setMood,
    recordEmotion,
    recordConversation,
    recordMilestone,
    setGoal,
  };
}
