'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { getFaqAnswer } from '@/app/actions';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Bot, HelpCircle, Loader2, Sparkles } from 'lucide-react';

const faqSchema = z.object({
  faqMarkdown: z.string().min(10, 'FAQ content is too short.'),
  question: z.string().min(3, 'Question must be at least 3 characters.'),
});

const defaultFaq = `# How to reset my password?
## Variants
- I forgot my password
- Can't log in
- Password reset
### Answer
To reset your password, go to the login page and click on the "Forgot Password" link. You will receive an email with instructions on how to reset it.

# What are the server settings for mobile?
## Variants
- mobile setup
- connect my phone
### Answer
The server address is cloud.example.com. Use your standard username and password to connect. For more details, check the mobile setup guide in our documentation.

# How to share a file?
## Variants
- share link
- send file to someone
### Answer
To share a file, click the share icon next to the file name. You can share with other users on this Nextcloud instance, or create a public share link. You can also set a password and an expiration date for public links.
`;

export default function FaqBot() {
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const form = useForm<z.infer<typeof faqSchema>>({
    resolver: zodResolver(faqSchema),
    defaultValues: {
      faqMarkdown: defaultFaq,
      question: '',
    },
  });

  async function onSubmit(values: z.infer<typeof faqSchema>) {
    setIsLoading(true);
    setError('');
    setAnswer('');

    const result = await getFaqAnswer(values);

    if (result.success) {
      setAnswer(result.answer || 'No answer found.');
    } else {
      setError(result.error || 'An unknown error occurred.');
    }
    setIsLoading(false);
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-lg">
                <HelpCircle className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="font-headline">FAQ Bot</CardTitle>
        </div>
        <CardDescription>
          Ask a question and the bot will answer based on the provided FAQ document.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="faqMarkdown"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>FAQ Content (in Markdown)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter your FAQ content here..."
                      className="min-h-[200px] bg-background"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Question</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., How do I reset my password?" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Asking...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Ask Bot
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
      {(isLoading || error || answer) && (
        <CardFooter className="flex flex-col items-start gap-4">
            {isLoading && (
                 <div className="flex items-center text-muted-foreground w-full">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <span>Thinking...</span>
                </div>
            )}
            {error && <p className="text-destructive">{error}</p>}
            {answer && (
                <Card className="w-full bg-primary/5">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Bot className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg font-medium font-headline">Answer</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-foreground/90">{answer}</p>
                </CardContent>
                </Card>
            )}
        </CardFooter>
      )}
    </Card>
  );
}
