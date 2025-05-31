
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, CalendarCheck2, Users, Lightbulb, Settings, Sun, Moon, Briefcase, Wand2 } from 'lucide-react'; // Added Briefcase, Wand2
import { Separator } from '@/components/ui/separator';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/events', label: 'Events', icon: CalendarCheck2 },
  { href: '/guests', label: 'Guests', icon: Users },
];

const toolNavItems = [
  { href: '/tools/name-generator', label: 'Name Generator', icon: Lightbulb },
  { href: '/tools/event-planner', label: 'Event Planner', icon: Wand2 },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex-shrink-0 border-r border-border bg-sidebar text-sidebar-foreground flex flex-col sticky top-0 h-screen">
      <div className="h-16 flex items-center px-6 border-b border-border">
        <Link href="/" className="flex items-center gap-2">
          <Briefcase className="h-7 w-7 text-primary" />
          <h1 className="text-xl font-headline font-semibold text-foreground">VenueVerse</h1>
        </Link>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item) => (
          <Button
            key={item.label}
            variant="ghost"
            asChild
            className={cn(
              'w-full justify-start text-base h-11 px-3',
              pathname === item.href
                ? 'bg-sidebar-active-background text-sidebar-active-foreground hover:bg-sidebar-active-background hover:text-sidebar-active-foreground'
                : 'hover:bg-sidebar-hover-background hover:text-sidebar-hover-foreground text-sidebar-foreground'
            )}
          >
            <Link href={item.href}>
              <item.icon className="mr-3 h-5 w-5" />
              {item.label}
            </Link>
          </Button>
        ))}
        <Separator className="my-3 bg-border/70" />
        <p className="px-3 py-2 text-xs font-semibold text-muted-foreground/80 tracking-wider uppercase">Tools</p>
        {toolNavItems.map((item) => (
          <Button
            key={item.label}
            variant="ghost"
            asChild
            className={cn(
              'w-full justify-start text-base h-11 px-3',
              pathname === item.href
                ? 'bg-sidebar-active-background text-sidebar-active-foreground hover:bg-sidebar-active-background hover:text-sidebar-active-foreground'
                : 'hover:bg-sidebar-hover-background hover:text-sidebar-hover-foreground text-sidebar-foreground'
            )}
          >
            <Link href={item.href}>
              <item.icon className="mr-3 h-5 w-5" />
              {item.label}
            </Link>
          </Button>
        ))}
      </nav>
      <div className="mt-auto p-4 border-t border-border">
        <Button
            variant="ghost"
            className="w-full justify-start text-base h-11 px-3 hover:bg-sidebar-hover-background hover:text-sidebar-hover-foreground text-sidebar-foreground"
          >
          <Settings className="mr-3 h-5 w-5" />
          Settings
        </Button>
      </div>
    </aside>
  );
}
