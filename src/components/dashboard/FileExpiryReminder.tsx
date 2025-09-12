import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { expiringFiles } from '@/lib/data';
import { Clock, FileText, MessageSquare, Bell } from 'lucide-react';

export default function FileExpiryReminder() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-lg">
                <Bell className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="font-headline">File Expiry Reminders</CardTitle>
        </div>
        <CardDescription>
          The bot will post reminders for files nearing their expiration date.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {expiringFiles.map((file) => (
            <li key={file.id} className="flex items-start gap-4">
              <div className="bg-muted rounded-full p-2">
                <FileText className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex-grow">
                <p className="font-medium text-foreground">{file.name}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                  <Clock className="h-4 w-4" />
                  <span>Expires: {file.expires}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MessageSquare className="h-4 w-4" />
                  <span>Room: {file.room}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
