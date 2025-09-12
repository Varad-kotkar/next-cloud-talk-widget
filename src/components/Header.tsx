import { BotMessageSquare } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-card border-b p-4 sm:p-6 flex items-center">
      <div className="flex items-center gap-4">
        <BotMessageSquare className="h-8 w-8 text-primary" />
        <h1 className="text-2xl font-headline font-bold text-foreground">
          Nextcloud Assistant
        </h1>
      </div>
    </header>
  );
}
