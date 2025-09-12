'use client';
import * as LucideIcons from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const iconList = [
  'AppWindow', 'Calendar', 'LayoutTemplate', 'Code', 'FileText', 'Folder', 'Home', 'Image', 'Link',
  'Mail', 'MessageSquare', 'Music', 'Newspaper', 'Settings', 'Shield', 'ShoppingBag', 'Star', 'Users', 'Video',
];

export function IconSelect({ onValueChange, defaultValue }: { onValueChange: (value: string) => void; defaultValue: string }) {
  const Icon = ({ name, ...props }: { name: string, [key: string]: any }) => {
    const LucideIcon = (LucideIcons as any)[name];
    if (!LucideIcon) return null;
    return <LucideIcon {...props} />;
  };

  return (
    <Select onValueChange={onValueChange} defaultValue={defaultValue}>
      <SelectTrigger>
        <SelectValue placeholder="Select an icon" />
      </SelectTrigger>
      <SelectContent>
        {iconList.map((iconName) => (
          <SelectItem key={iconName} value={iconName}>
            <div className="flex items-center gap-2">
              <Icon name={iconName} className="h-4 w-4" />
              <span>{iconName}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
