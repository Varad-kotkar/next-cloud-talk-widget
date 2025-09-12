'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import * as LucideIcons from 'lucide-react';

import type { ExternalApp } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { IconSelect, iconList } from './IconSelect';
import { useToast } from '@/hooks/use-toast';
import { Grid3x3, PlusCircle, ExternalLink, X } from 'lucide-react';

const appSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  url: z.string().url({ message: 'Please enter a valid URL.' }),
  icon: z.string().min(1, { message: 'Please select an icon.' }),
});

const initialApps: ExternalApp[] = [
  { id: '1', name: 'Nextcloud Calendar', url: 'https://apps.nextcloud.com/apps/calendar', icon: 'Calendar' },
  { id: '2', name: 'Nextcloud Deck', url: 'https://apps.nextcloud.com/apps/deck', icon: 'LayoutTemplate' },
  { id: '3', name: 'Developer Docs', url: 'https://docs.nextcloud.com/server/latest/developer_manual/', icon: 'Code' },
];

export default function AppLauncher() {
  const [apps, setApps] = useState<ExternalApp[]>(initialApps);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [iframeState, setIframeState] = useState<{ open: boolean, app?: ExternalApp }>({ open: false });
  const { toast } = useToast();

  const form = useForm<z.infer<typeof appSchema>>({
    resolver: zodResolver(appSchema),
    defaultValues: { name: '', url: '', icon: '' },
  });

  function onSubmit(values: z.infer<typeof appSchema>) {
    const newApp: ExternalApp = {
      id: new Date().toISOString(),
      ...values,
    };
    setApps([...apps, newApp]);
    toast({ title: 'Success', description: 'Application added.' });
    setIsAddDialogOpen(false);
    form.reset();
  }
  
  const removeApp = (id: string) => {
    setApps(apps.filter(app => app.id !== id));
    toast({ title: 'Application removed', variant: 'destructive' });
  };

  const Icon = ({ name, ...props }: { name: string, [key: string]: any }) => {
    const LucideIcon = (LucideIcons as any)[name];
    if (!LucideIcon) return <LucideIcons.AppWindow {...props} />;
    return <LucideIcon {...props} />;
  };

  return (
    <>
      <Card>
        <CardHeader className="flex-row items-center justify-between">
            <div>
                <div className="flex items-center gap-3">
                     <div className="bg-primary/10 p-2 rounded-lg">
                        <Grid3x3 className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="font-headline">External App Launcher</CardTitle>
                </div>
                <CardDescription className="mt-2">Launch your favorite external apps from one place.</CardDescription>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                    <Button>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add App
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                    <DialogTitle>Add External App</DialogTitle>
                    <DialogDescription>
                        Enter the details for your new application link.
                    </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField control={form.control} name="name" render={({ field }) => (
                            <FormItem>
                                <FormLabel>App Name</FormLabel>
                                <FormControl><Input placeholder="e.g., Nextcloud News" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="url" render={({ field }) => (
                            <FormItem>
                                <FormLabel>App URL</FormLabel>
                                <FormControl><Input placeholder="https://..." {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="icon" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Icon</FormLabel>
                                <IconSelect onValueChange={field.onChange} defaultValue={field.value} />
                                <FormMessage />
                            </FormItem>
                        )} />
                        <DialogFooter>
                            <Button type="submit">Save App</Button>
                        </DialogFooter>
                    </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </CardHeader>
        <CardContent>
          {apps.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {apps.map((app) => (
                <div key={app.id} className="relative group">
                    <button
                        onClick={() => setIframeState({ open: true, app })}
                        className="w-full aspect-square flex flex-col items-center justify-center gap-2 bg-background hover:bg-accent/50 transition-colors rounded-lg border p-2 text-center"
                        >
                        <Icon name={app.icon} className="h-8 w-8 text-primary" />
                        <span className="text-sm font-medium text-foreground truncate w-full">{app.name}</span>
                    </button>
                    <Button variant="destructive" size="icon" className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => removeApp(app.id)}>
                        <X className="h-4 w-4"/>
                        <span className="sr-only">Remove {app.name}</span>
                    </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">No external apps added yet. Click 'Add App' to get started.</p>
          )}
        </CardContent>
      </Card>
      
      <Dialog open={iframeState.open} onOpenChange={(open) => setIframeState({ open, app: open ? iframeState.app : undefined })}>
        <DialogContent className="max-w-4xl h-[80vh] flex flex-col p-0 gap-0">
          <DialogHeader className="p-4 border-b flex-row items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
                {iframeState.app && <Icon name={iframeState.app.icon} className="h-5 w-5" />}
                {iframeState.app?.name}
            </DialogTitle>
            <div className='flex items-center gap-2'>
                 <a href={iframeState.app?.url} target="_blank" rel="noopener noreferrer" className={""}>
                    <Button variant="ghost" size="sm">
                        <ExternalLink className="mr-2 h-4 w-4" /> Open in new tab
                    </Button>
                </a>
                <DialogClose asChild>
                    <Button variant="ghost" size="icon"><X className="h-4 w-4"/></Button>
                </DialogClose>
            </div>

          </DialogHeader>
          {iframeState.app?.url.startsWith('https://docs.nextcloud.com') || iframeState.app?.url.startsWith('https://apps.nextcloud.com') ? (
            <iframe
                src={iframeState.app?.url}
                title={iframeState.app?.name}
                className="w-full h-full border-0"
                sandbox="allow-scripts allow-same-origin"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-background p-8 text-center">
                <LucideIcons.AlertTriangle className="h-12 w-12 text-destructive mb-4" />
                <h3 className="text-xl font-bold">Content Blocked</h3>
                <p className="text-muted-foreground mt-2">
                    For security reasons, many websites (including this one) prevent being embedded in other sites.
                    <br />
                    You can try opening it in a new tab instead.
                </p>
                 <a href={iframeState.app?.url} target="_blank" rel="noopener noreferrer" className="mt-4">
                    <Button>
                        <ExternalLink className="mr-2 h-4 w-4" /> Open {iframeState.app?.name} in new tab
                    </Button>
                </a>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
