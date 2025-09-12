'use client';

import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { quotes } from '@/lib/data';
import { Quote } from 'lucide-react';

type QuoteType = {
  quote: string;
  author: string;
};

export default function DailyQuote() {
  const [quote, setQuote] = useState<QuoteType | null>(null);

  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  if (!quote) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Quote of the Day</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="animate-pulse flex space-x-4">
                    <div className="flex-1 space-y-3 py-1">
                        <div className="h-2 bg-muted rounded"></div>
                        <div className="h-2 bg-muted rounded w-3/4"></div>
                        <div className="h-2 bg-muted rounded w-1/2 mt-4"></div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
  }

  return (
    <Card>
       <CardHeader>
        <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-lg">
                <Quote className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="font-headline">Quote of the Day</CardTitle>
        </div>
        <CardDescription>A daily dose of inspiration from the bot.</CardDescription>
      </CardHeader>
      <CardContent>
        <blockquote className="border-l-2 border-primary pl-4 italic">
          <p className="text-foreground/90">"{quote.quote}"</p>
          <footer className="mt-2 text-sm text-muted-foreground not-italic">- {quote.author}</footer>
        </blockquote>
      </CardContent>
    </Card>
  );
}
