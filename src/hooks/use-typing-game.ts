"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { getTrashTalk } from '@/lib/trashTalkMessages';
import { paragraphs as allParagraphs, getLongParagraph } from '@/lib/words';
import { normalizeChar } from '@/lib/utils';
import type { Difficulty, GameStatus, GameMode } from '@/lib/types';

type GameOptions = { mode: 'ai', difficulty: Difficulty } | { mode: 'custom', duration: number };

export const useTypingGame = () => {
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [gameMode, setGameMode] = useState<GameMode | null>(null);
  const [gameDuration, setGameDuration] = useState(60);
  const [status, setStatus] = useState<GameStatus>('waiting');
  const [text, setText] = useState('');
  const [typed, setTyped] = useState('');
  const [cursor, setCursor] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [lastGameOptions, setLastGameOptions] = useState<GameOptions | null>(null);

  // AI State
  const [aiWpm, setAiWpm] = useState(0);
  const [aiProgress, setAiProgress] = useState(0);
  const [aiTrashTalk, setAiTrashTalk] = useState('');
  const [aiAccuracy, setAiAccuracy] = useState(0);

  const timerInterval = useRef<NodeJS.Timeout | null>(null);
  const aiProgressInterval = useRef<NodeJS.Timeout | null>(null);
  const trashTalkInterval = useRef<NodeJS.Timeout | null>(null);
  const shuffledParagraphs = useRef<string[]>([]);


  // Refs for stale closure
  const textRef = useRef('');
  const difficultyRef = useRef<Difficulty | null>(null);
  const gameModeRef = useRef<GameMode | null>(null);

  const userProgress = useMemo(() => text.length > 0 ? (cursor / text.length) * 100 : 0, [cursor, text.length]);

  const cleanupIntervals = useCallback(() => {
    if (timerInterval.current) clearInterval(timerInterval.current);
    if (aiProgressInterval.current) clearInterval(aiProgressInterval.current);
    if (trashTalkInterval.current) clearInterval(trashTalkInterval.current);
    timerInterval.current = null;
    aiProgressInterval.current = null;
    trashTalkInterval.current = null;
  }, []);
  
  // Calculate final stats when game is finished
  useEffect(() => {
    if (status === 'finished' && startTime) {
      const elapsedSeconds = (Date.now() - startTime) / 1000;
      let durationInMinutes = elapsedSeconds / 60;
      
      // If time ran out, use the game duration for more accuracy
      if (timeLeft === 0) {
        durationInMinutes = gameDuration / 60;
      }

      if (durationInMinutes > 0) {
        const correctChars = typed.split('').filter((char, index) => text[index] && normalizeChar(char) === normalizeChar(text[index])).length;
        const wordsTyped = correctChars / 5;
        const finalWpm = Math.round(wordsTyped / durationInMinutes);
        setWpm(finalWpm);
      } else {
        setWpm(0);
      }

      if (cursor > 0) {
        const correctChars = typed.split('').filter((char, index) => text[index] && normalizeChar(char) === normalizeChar(text[index])).length;
        setAccuracy(Math.round((correctChars / cursor) * 100));
      } else {
        setAccuracy(100);
      }
    }
  }, [status, startTime, typed, text, cursor, gameDuration, timeLeft]);


  const resetStateForNewGame = useCallback(() => {
    cleanupIntervals();
    setWpm(0);
    setAccuracy(0);
    setText('');
    setTyped('');
    setCursor(0);
    setStartTime(null);
    setAiWpm(0);
    setAiProgress(0);
    setAiTrashTalk('');
    setAiAccuracy(0);
  }, [cleanupIntervals]);

  const startTimers = useCallback((duration: number) => {
    setTimeLeft(duration);
    const currentDifficulty = difficultyRef.current;
    const currentMode = gameModeRef.current;

    timerInterval.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setStatus('finished');
          cleanupIntervals();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    if (currentMode === 'ai' && currentDifficulty) {
      const baseAiWpm = { easy: 30, medium: 50, hard: 70 }[currentDifficulty];
      setAiWpm(baseAiWpm); // Set a constant WPM for the AI
      
      aiProgressInterval.current = setInterval(() => {
        setAiProgress(prev => {
          const charsPerSecond = (baseAiWpm * 5) / 60;
          const newProgress = prev + (charsPerSecond / textRef.current.length) * 100;
          return Math.min(newProgress, 100);
        });
      }, 1000);

      trashTalkInterval.current = setInterval(() => {
          const currentDifficulty = difficultyRef.current;
          if (!currentDifficulty) return;
          const message = getTrashTalk(currentDifficulty);
          setAiTrashTalk(message);
      }, 12000);
    }
  }, [cleanupIntervals]);

  const handleInputChange = useCallback((newTypedValue: string) => {
    if (status !== 'running') return;
    
    // Start timer on first character typed
    if (startTime === null && newTypedValue.length > 0) {
      setStartTime(Date.now());
      
      if (gameMode === 'ai' && difficulty) {
        const accuracyRanges = {
          easy: { min: 95, max: 100 },
          medium: { min: 90, max: 98 },
          hard: { min: 85, max: 95 },
        };
        const range = accuracyRanges[difficulty];
        const newAiAccuracy = Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
        setAiAccuracy(newAiAccuracy);
      }

      startTimers(gameDuration);
    }

    // Normalize value to handle mobile keyboard compositions, smart quotes, and remove invisible chars
    let normalizedValue = newTypedValue.replace(/\u200B/g, ''); // remove zero-width space
    normalizedValue = normalizedValue.replace(/[‘’]/g, "'"); // normalize single quotes
    normalizedValue = normalizedValue.replace(/[“”]/g, '"'); // normalize double quotes

    if (normalizedValue.length > text.length) return;

    setTyped(normalizedValue);
    setCursor(normalizedValue.length);

    // End game if text is fully typed
    if (normalizedValue.length === text.length) {
      setStatus('finished');
      cleanupIntervals();
    }
  }, [status, startTime, text.length, startTimers, difficulty, gameMode, gameDuration, cleanupIntervals]);

  const startGame = useCallback((options: GameOptions) => {
    resetStateForNewGame();
    setLastGameOptions(options);

    setGameMode(options.mode);
    gameModeRef.current = options.mode;
    
    let newText = '';
    let duration = 60;

    if (options.mode === 'ai') {
        setDifficulty(options.difficulty);
        difficultyRef.current = options.difficulty;
        duration = 60;
        
        if (shuffledParagraphs.current.length === 0) {
            shuffledParagraphs.current = [...allParagraphs].sort(() => 0.5 - Math.random());
        }
        newText = shuffledParagraphs.current.pop() || allParagraphs[0];

    } else { // custom mode
        setDifficulty(null);
        difficultyRef.current = null;
        duration = options.duration;
        newText = getLongParagraph();
    }
    
    setGameDuration(duration);
    setTimeLeft(duration);
    
    setText(newText);
    textRef.current = newText;
    setStatus('running');
  }, [resetStateForNewGame]);

  const restartGame = useCallback(() => {
    if (lastGameOptions) {
      startGame(lastGameOptions);
    }
  }, [lastGameOptions, startGame]);

  const resetGame = useCallback(() => {
    resetStateForNewGame();
    setStatus('waiting');
    setDifficulty(null);
    difficultyRef.current = null;
    setGameMode(null);
    gameModeRef.current = null;
    setTimeLeft(60);
  }, [resetStateForNewGame]);

  useEffect(() => {
    return cleanupIntervals;
  }, [cleanupIntervals]);

  return {
    status,
    text,
    typed,
    cursor,
    wpm,
    accuracy,
    timeLeft,
    startGame,
    resetGame,
    restartGame,
    userProgress,
    aiProgress,
    aiWpm,
    aiAccuracy,
    aiTrashTalk,
    difficulty,
    gameMode,
    handleInputChange,
    gameDuration,
  };
};
