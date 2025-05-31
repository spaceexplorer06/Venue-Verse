
import type { Event } from '@/lib/types';
import { getEventById } from '@/services/eventService';
import Image from 'next/image';
import Link from 'next/link';
import { CalendarDays, MapPin, Users, Ticket, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { format, parseISO } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';


export default async function PublicEventDetailPage({ params }: { params: { eventId: string } }) {
  const event = await getEventById(params.eventId);

  if (!event) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <Ticket className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
        <h1 className="text-3xl font-bold text-foreground mb-2">Event Not Found</h1>
        <p className="text-lg text-muted-foreground mb-6">
          The event you're looking for doesn't exist or may have been moved.
        </p>
        <Button asChild variant="outline">
          <Link href="/browse-events">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to All Events
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-background to-muted/30 min-h-screen py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Button asChild variant="outline" className="text-sm">
            <Link href="/browse-events">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to All Events
            </Link>
          </Button>
        </div>

        <Card className="overflow-hidden shadow-2xl rounded-2xl border border-border/50">
          {event.image && (
            <div className="relative w-full h-64 md:h-80 lg:h-[450px] bg-muted">
              <Image
                src={event.image}
                alt={event.name}
                layout="fill"
                objectFit="cover"
                priority
                className="rounded-t-2xl"
                data-ai-hint="event hero image"
              />
              <div className="absolute inset-0 bg-black/30 rounded-t-2xl" />
            </div>
          )}
          
          <div className="relative p-6 md:p-10 space-y-6 bg-card">
             {event.image && (
                <div className="md:absolute md:bottom-full md:left-10 md:mb-[-40px] md:translate-y-1/2">
                    <h1 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground md:text-white md:p-4 md:bg-black/50 md:rounded-lg md:backdrop-blur-sm">
                        {event.name}
                    </h1>
                </div>
             )}
            {!event.image && (
                 <h1 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
                    {event.name}
                </h1>
            )}

            <div className="flex flex-wrap gap-x-4 gap-y-2 pt-2">
              {event.date && (
                <Badge variant="secondary" className="flex items-center gap-1.5 py-1.5 px-3 text-sm border border-primary/20 bg-primary/10 text-primary">
                  <CalendarDays className="h-4 w-4" />
                  {format(parseISO(event.date), "EEEE, MMMM d, yyyy")}
                  {event.time && ` at ${event.time}`}
                </Badge>
              )}
              <Badge variant="secondary" className="flex items-center gap-1.5 py-1.5 px-3 text-sm border border-primary/20 bg-primary/10 text-primary">
                <MapPin className="h-4 w-4" />
                {event.location}
              </Badge>
              {event.guestCapacity && (
                <Badge variant="secondary" className="flex items-center gap-1.5 py-1.5 px-3 text-sm border border-primary/20 bg-primary/10 text-primary">
                  <Users className="h-4 w-4" />
                  {event.guestCapacity} Capacity
                </Badge>
              )}
            </div>

            <Separator className="my-6" />

            <div>
              <h2 className="text-2xl font-semibold font-headline text-foreground mb-3">About this Event</h2>
              <p className="text-foreground/80 leading-relaxed whitespace-pre-line text-base">
                {event.description}
              </p>
            </div>
            
            <Separator className="my-6" />

            <div className="text-center pt-4">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-10 py-6 rounded-lg shadow-md hover:shadow-lg transition-all">
                <Ticket className="mr-2.5 h-6 w-6" /> Get Your Tickets! (Placeholder)
              </Button>
              <p className="text-xs text-muted-foreground mt-2">(Secure checkout coming soon)</p>
            </div>
          </div>
        </Card>
        
        {/* Placeholder for related events or more info */}
        {/* <div className="mt-12">
          <h3 className="text-2xl font-semibold font-headline text-foreground mb-4">You Might Also Like</h3>
           Placeholder for related event cards 
        </div> */}
      </div>
      <footer className="mt-16 pt-8 border-t border-border/30 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} VenueVerse. All rights reserved.</p>
        <p className="text-xs mt-1">Your Premier Event Ticketing Platform</p>
      </footer>
    </div>
  );
}
