
import Link from 'next/link';
import Image from 'next/image';
import type { Event } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarDays, MapPin, Users, Ticket } from 'lucide-react'; // Changed ArrowRight to Ticket
import { format, parseISO } from 'date-fns';

interface PublicEventCardProps {
  event: Event;
}

export function PublicEventCard({ event }: PublicEventCardProps) {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col bg-card rounded-xl border">
      {event.image && (
        <div className="relative w-full h-52">
          <Image 
            src={event.image} 
            alt={event.name} 
            layout="fill" 
            objectFit="cover" 
            className="rounded-t-xl"
            data-ai-hint="event image"
          />
        </div>
      )}
      <CardHeader className="pb-3">
        <CardTitle className="font-headline text-2xl text-foreground">{event.name}</CardTitle>
        <CardDescription className="line-clamp-3 text-muted-foreground pt-1">{event.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2.5 text-sm text-muted-foreground flex-grow">
        {event.date && event.time && (
          <div className="flex items-center">
            <CalendarDays className="mr-2.5 h-4 w-4 text-primary" />
            <span>{format(parseISO(event.date), "MMMM d, yyyy")} at {event.time}</span>
          </div>
        )}
        {event.location && (
          <div className="flex items-center">
            <MapPin className="mr-2.5 h-4 w-4 text-primary" />
            <span>{event.location}</span>
          </div>
        )}
        {event.guestCapacity && (
          <div className="flex items-center">
            <Users className="mr-2.5 h-4 w-4 text-primary" />
            <span>Up to {event.guestCapacity} guests</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-4">
        <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 text-base">
          <Link href={`/browse-events/${event.id}`}>
            <Ticket className="mr-2 h-5 w-5" /> View Event & Get Tickets
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
