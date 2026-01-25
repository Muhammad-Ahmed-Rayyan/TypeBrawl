export type Difficulty = 'easy' | 'medium' | 'hard';

export type GameMode = 'ai' | 'custom';

export type GameStatus = 'waiting' | 'running' | 'finished';

export type Score = {
  username: string;
  wpm: number;
  accuracy: number;
  date: string;
};
