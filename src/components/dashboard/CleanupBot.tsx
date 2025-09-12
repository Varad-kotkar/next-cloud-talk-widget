import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cleanupSuggestions } from '@/lib/data';
import { Archive, FileWarning, Mails, Trash2 } from 'lucide-react';

const iconMap: { [key: string]: React.ElementType } = {
  'Inactive Room': Mails,
  'Stale File': FileWarning,
  'Old Pinned Message': Archive,
};

export default function CleanupBot() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-lg">
                <Trash2 className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="font-headline">Cleanup Bot Suggestions</CardTitle>
        </div>
        <CardDescription>
          Weekly reminders from the bot to help keep your workspace tidy.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {cleanupSuggestions.map((suggestion) => {
            const Icon = iconMap[suggestion.type] || FileWarning;
            return (
              <div key={suggestion.id} className="flex items-center justify-between p-3 bg-background rounded-lg">
                <div className="flex items-center gap-4">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                    <div>
                        <p className="font-semibold text-foreground">{suggestion.type}</p>
                        <p className="text-sm text-muted-foreground">{suggestion.message}</p>
                    </div>
                </div>
                <Button variant="ghost" size="sm">
                  {suggestion.action}
                </Button>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
