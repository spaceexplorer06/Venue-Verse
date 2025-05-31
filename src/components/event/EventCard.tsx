import Link from 'next/link';
import Image from 'next/image';
import type { Event } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarDays, MapPin, Users, ArrowRight } from 'lucide-react';
import { format, parseISO } from 'date-fns';

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
      {event.image && (
        <div className="relative w-full h-48">
          <Image 
            src={event.image} 
            alt={event.name} 
            layout="fill" 
            objectFit="cover" 
            data-ai-hint="event image"
          />
        </div>
      )}
      <CardHeader>
        <CardTitle className="font-headline text-xl">{event.name}</CardTitle>
        <CardDescription className="line-clamp-2">{event.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 text-sm text-muted-foreground flex-grow">
        <div className="flex items-center">
          <CalendarDays className="mr-2 h-4 w-4" />
          <span>{format(parseISO(event.date), "MMMM d, yyyy")} at {event.time}</span>
        </div>
        <div className="flex items-center">
          <MapPin className="mr-2 h-4 w-4" />
          <span>{event.location}</span>
        </div>
        {event.guestCapacity && (
          <div className="flex items-center">
            <Users className="mr-2 h-4 w-4" />
            <span>Up to {event.guestCapacity} guests</span>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full bg-primary hover:bg-primary/90">
          <Link href={`/events/${event.id}`}>
            View Details <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
