'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Gamepad2, Github } from 'lucide-react';

import { Leaderboard } from '@/components/leaderboard';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import type { Difficulty, Score } from '@/lib/types';
import typebrawlLogo from '../typebrawllogo.png';


export default function LeaderboardPage() {
  const [scores, setScores] = useState<Record<Difficulty, Score[]>>({ easy: [], medium: [], hard: [] });

  useEffect(() => {
    try {
      const savedScores = localStorage.getItem('typebrawl-leaderboard');
      if (savedScores) {
        setScores(JSON.parse(savedScores));
      }
    } catch (error) {
      console.error("Failed to load scores from localStorage", error);
    }
  }, []);

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
          <Link href="/">
            <Button variant="outline" className="hover:ring-2 hover:ring-primary">
              <Gamepad2 />
              <span className="hidden sm:inline">Play Game</span>
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
      <main className="flex-grow container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <Leaderboard scores={scores} />
          </div>
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
