"use client";

import { formatDistanceToNow } from 'date-fns';
import { Trophy, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { Difficulty, Score } from '@/lib/types';
import { cn } from '@/lib/utils';

const LeaderboardTable = ({ scores }: { scores: Score[] }) => {
  if (scores.length === 0) {
    return <p className="text-center text-muted-foreground py-8">No scores yet. Be the first!</p>;
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">Rank</TableHead>
          <TableHead>Player</TableHead>
          <TableHead className="text-right">WPM</TableHead>
          <TableHead className="text-right">Accuracy</TableHead>
          <TableHead className="text-right">Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {scores.map((score, index) => (
          <TableRow key={`${score.username}-${score.date}`}>
            <TableCell className="font-medium">
              <div className="flex items-center justify-center">
                {index < 3 ? (
                  <Award
                    className={cn('w-6 h-6', {
                      'text-yellow-400': index === 0,
                      'text-gray-400': index === 1,
                      'text-yellow-600': index === 2,
                    })}
                  />
                ) : (
                  index + 1
                )}
              </div>
            </TableCell>
            <TableCell>{score.username}</TableCell>
            <TableCell className="text-right font-semibold">{score.wpm}</TableCell>
            <TableCell className="text-right">{score.accuracy}%</TableCell>
            <TableCell className="text-right text-muted-foreground">{formatDistanceToNow(new Date(score.date), { addSuffix: true })}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export function Leaderboard({ scores }: { scores: Record<Difficulty, Score[]> }) {
  return (
    <Card className="dark:bg-black/20 bg-white/30 backdrop-blur-sm border dark:border-slate-700 border-slate-300 rounded-xl shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl flex items-center gap-2">
          <Trophy /> Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="easy">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="easy">Easy</TabsTrigger>
            <TabsTrigger value="medium">Medium</TabsTrigger>
            <TabsTrigger value="hard">Hard</TabsTrigger>
          </TabsList>
          <TabsContent value="easy">
            <LeaderboardTable scores={scores.easy} />
          </TabsContent>
          <TabsContent value="medium">
            <LeaderboardTable scores={scores.medium} />
          </TabsContent>
          <TabsContent value="hard">
            <LeaderboardTable scores={scores.hard} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
