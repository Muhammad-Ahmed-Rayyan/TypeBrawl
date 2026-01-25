"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface GameSummaryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  stats: { wpm: number; accuracy: number };
  onSave: (username: string) => void;
  onRestart: () => void;
  isCustomGame: boolean;
}

export function GameSummaryDialog({ open, onOpenChange, stats, onSave, onRestart, isCustomGame }: GameSummaryDialogProps) {
  const [username, setUsername] = useState('');

  const handleSave = () => {
    if (username.trim()) {
      onSave(username.trim());
    }
  };
  
  const handleRestart = () => {
    onOpenChange(false);
    onRestart();
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">Race Finished!</DialogTitle>
          <DialogDescription>
            {isCustomGame 
              ? "Here's how you did in your practice run."
              : "Here's how you did. Enter your name to save your score to the leaderboard."
            }
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4 text-center">
          <div>
            <p className="text-sm text-muted-foreground">WPM</p>
            <p className="text-4xl font-bold">{Math.round(stats.wpm)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Accuracy</p>
            <p className="text-4xl font-bold">{Math.round(stats.accuracy)}%</p>
          </div>
        </div>
        {!isCustomGame && (
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your name"
            />
          </div>
        )}
        <DialogFooter className={cn(isCustomGame && "sm:justify-center")}>
          <Button variant="outline" onClick={handleRestart}>Play Again</Button>
          {!isCustomGame && <Button onClick={handleSave} disabled={!username.trim()}>Save Score</Button>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
