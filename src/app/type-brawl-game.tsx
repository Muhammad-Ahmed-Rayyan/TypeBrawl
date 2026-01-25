"use client";

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Bot, RefreshCw, User, Timer, SignalLow, SignalMedium, SignalHigh, Trophy, Github } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import typebrawlLogo from './typebrawllogo.png';

import { useTypingGame } from '@/hooks/use-typing-game';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { GameSummaryDialog } from '@/components/game-summary-dialog';
import { ThemeToggle } from '@/components/theme-toggle';
import { cn, normalizeChar } from '@/lib/utils';
import type { Difficulty, Score } from '@/lib/types';

// By using React.forwardRef and React.memo, we optimize the Character component.
// It prevents re-rendering of every character on each key-press.
// The ref is passed down to the span to allow the parent to scroll to the cursor position.
// We also remove the transition-colors class to prevent lag from CSS transitions on many elements.
const Character = React.memo(React.forwardRef<HTMLSpanElement, { char: string; state: 'untyped' | 'correct' | 'incorrect'; isCursor: boolean }>(
  function Character({ char, state, isCursor }, ref) {
    return (
      <span
        ref={ref}
        className={cn('font-code text-xl sm:text-2xl md:text-3xl relative', {
          'text-muted-foreground/50': state === 'untyped',
          'text-foreground': state === 'correct',
          'text-destructive': state === 'incorrect',
        })}>
        {isCursor && <span className="animate-pulse absolute inset-y-0 -left-px w-0.5 bg-primary rounded-full" />}
        {char}
      </span>
    );
  }
));
Character.displayName = "Character";

// We centralize the scrolling logic into the TypingArea component.
// This is much more performant than having a useEffect in every Character component.
const TypingArea = React.memo(function TypingArea({ text, typed, cursor, onAreaClick }: { text: string; typed: string; cursor: number; onAreaClick: () => void }) {
    const cursorRef = useRef<HTMLSpanElement>(null);
    
    useEffect(() => {
        if (cursorRef.current) {
            cursorRef.current.scrollIntoView({ block: 'center', behavior: 'auto' });
        }
    }, [cursor]);

    // Memoize the character array based on the text alone.
    // This prevents re-splitting and re-mapping the entire text on every keystroke.
    const characters = React.useMemo(() => text.split('').map((char, index) => ({
        char,
        id: `${char}-${index}`
    })), [text]);

    return (
        <div 
            className="relative p-4 sm:p-6 md:p-8 rounded-xl dark:bg-black/20 bg-white/30 backdrop-blur-sm border dark:border-slate-700 border-slate-300 text-left leading-relaxed tracking-wider cursor-text shadow-lg"
            style={{ wordBreak: 'break-word' }}
            onClick={onAreaClick}
        >
            <div className="h-[98px] sm:h-[117px] md:h-[147px] overflow-y-auto no-scrollbar" style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                {/* Now, we calculate state inside the map function.
                    Because the <Character> component is memoized, React will only re-render
                    the small number of characters whose state or cursor position actually changes.
                    This is much more performant for long texts. */}
                {characters.map(({ char, id }, index) => {
                    const state = index < cursor
                        ? normalizeChar(typed[index]) === normalizeChar(char) ? 'correct' : 'incorrect'
                        : 'untyped';
                    const isCursor = index === cursor;
                    return (
                        <Character 
                            key={id} 
                            char={char} 
                            state={state} 
                            isCursor={isCursor}
                            ref={index === cursor ? cursorRef : null}
                        />
                    );
                })}
            </div>
        </div>
    );
});
TypingArea.displayName = "TypingArea";


const difficultySettings: Record<Difficulty, { label: string; color: string; icon: React.FC<React.SVGProps<SVGSVGElement>> }> = {
  easy: { label: 'Easy', color: 'bg-green-500', icon: SignalLow },
  medium: { label: 'Medium', color: 'bg-yellow-500', icon: SignalMedium },
  hard: { label: 'Hard', color: 'bg-red-500', icon: SignalHigh },
};

const customGameSettings: Record<number, { label: string }> = {
    15: { label: '15s' },
    30: { label: '30s' },
    60: { label: '60s' },
}

export function TypeBrawlGame() {
  const [showSummary, setShowSummary] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const isComposing = useRef(false);

  const {
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
    gameDuration,
    handleInputChange,
  } = useTypingGame();

  const handleFocus = useCallback(() => {
    if (status === 'running') {
      inputRef.current?.focus();
    }
  }, [status]);

  useEffect(() => {
    handleFocus();
  }, [handleFocus]);

  const handleStartAiGame = (level: Difficulty) => {
    startGame({ mode: 'ai', difficulty: level });
  };
  
  const handleStartCustomGame = (duration: number) => {
    startGame({ mode: 'custom', duration });
  };

  const handleSaveScore = useCallback((username: string) => {
    if (!difficulty) return;
    const newScore: Score = { username, wpm: Math.round(wpm), accuracy: Math.round(accuracy), date: new Date().toISOString() };
    
    try {
        const savedScoresRaw = localStorage.getItem('typebrawl-leaderboard');
        const savedScores: Record<Difficulty, Score[]> = savedScoresRaw ? JSON.parse(savedScoresRaw) : { easy: [], medium: [], hard: [] };
        
        const newBoard = [...(savedScores[difficulty] || []), newScore];
        newBoard.sort((a, b) => b.wpm - a.wpm || b.accuracy - a.accuracy);

        const updatedScores = { ...savedScores, [difficulty]: newBoard.slice(0, 10) };
        
        localStorage.setItem('typebrawl-leaderboard', JSON.stringify(updatedScores));

    } catch (error) {
        console.error("Failed to save score to localStorage", error);
    }

    setShowSummary(false);
  }, [wpm, accuracy, difficulty]);

  React.useEffect(() => {
    if (status === 'finished') {
      setShowSummary(true);
    }
  }, [status]);
  
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1
          className="text-xl sm:text-3xl font-bold font-headline flex items-center gap-2 cursor-pointer"
          onClick={() => window.location.reload()}
        >
          <Image
            src={typebrawlLogo}
            alt="TypeBrawl Logo"
            width={100}
            height={100}
            className="h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11"
          />
          TypeBrawl
        </h1>
        <div className="flex items-center gap-2">
            <Link href="/leaderboard">
                <Button variant="outline" className="hover:ring-2 hover:ring-primary">
                  <Trophy />
                  <span className="hidden sm:inline">Leaderboard</span>
                </Button>
            </Link>
            <a
              href="https://github.com/Muhammad-Ahmed-Rayyan/TypeBrawl"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Repository"
            >
              <Button variant="ghost" size="icon">
                <Github className="h-5 w-5" />
              </Button>
            </a>
            <ThemeToggle />
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center">
        {status === 'waiting' && (
          <div className="flex flex-col gap-4 max-w-lg w-full">
            <Card className="dark:bg-black/20 bg-white/30 backdrop-blur-sm border dark:border-slate-700 border-slate-300 rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:ring-2 hover:ring-primary">
              <CardHeader className="p-6 pb-2">
                  <CardTitle className="text-xl text-center font-headline">AI Challenge</CardTitle>
                  <CardDescription className="text-center">Test your skills against an AI opponent.</CardDescription>
              </CardHeader>
              <CardContent className="pt-2 flex flex-col sm:flex-row gap-4 justify-center">
                {(['easy', 'medium', 'hard'] as Difficulty[]).map(level => {
                  const Icon = difficultySettings[level].icon;
                  return (
                    <Button key={level} onClick={() => handleStartAiGame(level)} className="w-full sm:w-auto">
                      <Icon />
                      {difficultySettings[level].label}
                    </Button>
                  );
                })}
              </CardContent>
            </Card>
            <Card className="dark:bg-black/20 bg-white/30 backdrop-blur-sm border dark:border-slate-700 border-slate-300 rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:ring-2 hover:ring-primary">
               <CardHeader className="p-6 pb-2">
                  <CardTitle className="text-xl text-center font-headline">Custom Game</CardTitle>
                  <CardDescription className="text-center">Practice without an AI. Choose your time.</CardDescription>
              </CardHeader>
              <CardContent className="pt-2 flex flex-col sm:flex-row gap-4 justify-center">
                  {([15, 30, 60] as const).map(duration => (
                      <Button key={duration} onClick={() => handleStartCustomGame(duration)} className="w-full sm:w-auto">
                          {customGameSettings[duration].label}
                      </Button>
                  ))}
              </CardContent>
            </Card>
          </div>
        )}

        {(status === 'running' || status === 'finished') && (
          <div className="w-full max-w-6xl mx-auto flex flex-col gap-8">
            <input
              ref={inputRef}
              type="text"
              className="absolute w-0 h-0 p-0 m-0 border-0"
              value={typed}
              onCompositionStart={() => { isComposing.current = true; }}
              onCompositionEnd={(e) => {
                isComposing.current = false;
                handleInputChange(e.currentTarget.value);
              }}
              onChange={(e) => {
                if (!isComposing.current) {
                  handleInputChange(e.target.value);
                }
              }}
              onPaste={(e) => e.preventDefault()}
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              onBlur={handleFocus}
            />
            <div className={cn("grid grid-cols-1 gap-8", gameMode === 'ai' && "lg:grid-cols-5")}>
              {/* User Side */}
              <div className={cn("flex flex-col gap-4", gameMode === 'ai' ? "lg:col-span-3" : "lg:col-span-5 w-full max-w-3xl mx-auto")}>
                <Card className="dark:bg-black/20 bg-white/30 backdrop-blur-sm border dark:border-slate-700 border-slate-300 rounded-xl shadow-lg">
                  <CardContent className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-2">
                        <User />
                        <span className="text-sm font-medium">You</span>
                      </div>
                      <div className="flex items-center gap-4 text-center sm:gap-8">
                        <div>
                          <p className="text-xs text-muted-foreground">Time</p>
                          <p className="text-lg sm:text-2xl font-bold">{timeLeft}</p>
                        </div>
                      </div>
                      {gameMode === 'ai' && difficulty ? (
                        <div className={cn("w-3 h-3 rounded-full", difficultySettings[difficulty].color, status === 'running' && 'animate-pulse')}></div>
                      ) : (
                        <div className="flex items-center gap-2 text-primary">
                          <Timer className="w-4 h-4" />
                          <span className="text-sm font-medium">{gameDuration}s</span>
                        </div>
                      )}
                  </CardContent>
                </Card>
                <TypingArea text={text} typed={typed} cursor={cursor} onAreaClick={handleFocus} />
                <Progress value={userProgress} aria-label="Your typing progress"/>
              </div>

              {/* AI Side */}
              {gameMode === 'ai' && difficulty && (
                <div className="lg:col-span-2 flex flex-col gap-4">
                    <Card className="dark:bg-black/20 bg-white/30 backdrop-blur-sm border dark:border-slate-700 border-slate-300 rounded-xl shadow-lg">
                    <CardContent className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-2">
                        <Bot />
                        <span className="text-sm font-medium">{difficultySettings[difficulty].label} AI</span>
                        </div>
                        <div className="flex items-center gap-4 text-center sm:gap-8">
                        <div>
                            <p className="text-xs text-muted-foreground">WPM</p>
                            <p className="text-lg sm:text-2xl font-bold">{aiWpm > 0 ? aiWpm : '--'}</p>
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground">Accuracy</p>
                            <p className="text-lg sm:text-2xl font-bold">{aiAccuracy > 0 ? `${aiAccuracy}%` : '--'}</p>
                        </div>
                        </div>
                    </CardContent>
                    </Card>
                    {aiTrashTalk ? (
                        <div className="dark:bg-black/20 bg-white/30 backdrop-blur-sm border dark:border-slate-700 border-slate-300 p-3 rounded-xl text-sm text-center italic text-muted-foreground shadow-lg min-h-[60px] flex items-center justify-center">
                            {aiTrashTalk}
                        </div>
                    ) : <div className="min-h-[60px]" />}
                    <Progress value={aiProgress} aria-label="AI typing progress" />
                </div>
              )}
            </div>

            <div className="flex justify-center gap-4">
                <Button onClick={restartGame} variant="secondary">
                    <RefreshCw className="mr-2 h-4 w-4" /> Restart
                </Button>
                <Button onClick={resetGame} variant="outline">
                    New Game
                </Button>
            </div>
            
            <GameSummaryDialog
              open={showSummary}
              onOpenChange={setShowSummary}
              stats={{ wpm, accuracy }}
              onSave={handleSaveScore}
              onRestart={restartGame}
              isCustomGame={gameMode === 'custom'}
            />
          </div>
        )}
      </main>

      <footer className="container mx-auto px-4 py-4 text-muted-foreground text-sm">
        <div className="flex justify-center">
          <p className="text-center">
            Made with ❤️ by{" "}
            <a
              href="https://github.com/Muhammad-Ahmed-Rayyan"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-primary"
            >
              Muhammad Ahmed Rayyan
            </a>
            .{" "}
            <span onClick={() => window.location.reload()} className="cursor-pointer hover:text-primary">
              TypeBrawl &copy; {new Date().getFullYear()}.
            </span>
          </p>
        </div>
      </footer>
    </div>
  );
}
    

    





