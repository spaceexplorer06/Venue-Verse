
import Link from 'next/link';
import Image from 'next/image';
import type { Event } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarDays, MapPin, ArrowRight, Ticket } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { Badge } from '@/components/ui/badge';

interface PublicEventCardProps {
  event: Event;
}

export function PublicEventCard({ event }: PublicEventCardProps) {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full bg-card">
      <div className="relative w-full h-52">
        <Image 
          src={event.image || 'https://placehold.co/600x400.png'} 
          alt={event.name} 
          layout="fill" 
          objectFit="cover" 
          data-ai-hint="event outdoor concert"
        />
      </div>
      <CardHeader className="pb-3">
        <CardTitle className="font-headline text-2xl leading-tight">{event.name}</CardTitle>
        {event.date && (
            <Badge variant="secondary" className="w-fit mt-1">
                 {format(parseISO(event.date), "MMMM d, yyyy")}
                 {event.time && ` at ${event.time}`}
            </Badge>
        )}
      </CardHeader>
      <CardContent className="space-y-2 text-sm text-muted-foreground flex-grow pb-4">
        <div className="flex items-start">
          <MapPin className="mr-2 h-4 w-4 mt-0.5 shrink-0" />
          <span>{event.location}</span>
        </div>
        <CardDescription className="line-clamp-3 pt-1">{event.description}</CardDescription>
      </CardContent>
      <CardFooter className="border-t pt-4">
        {/* In a real app, this link would go to a public event details page */}
        <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link href={`/browse-events/details/${event.id}`}> 
            <Ticket className="mr-2 h-4 w-4" /> View Event & Tickets
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
