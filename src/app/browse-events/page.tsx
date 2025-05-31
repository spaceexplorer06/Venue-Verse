
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PublicEventCard } from '@/components/public/PublicEventCard';
import { PageHeader } from '@/components/PageHeader'; // Can be reused or a simpler header for public
import { getEvents } from '@/services/eventService';
import type { Event } from '@/lib/types';
import { Ticket } from 'lucide-react';

export default async function BrowseEventsPage() {
  const events: Event[] = await getEvents();

  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight font-headline text-foreground sm:text-5xl">
          Upcoming Events
        </h1>
        <p className="mt-3 text-lg text-muted-foreground sm:mt-4">
          Discover amazing events and get your tickets!
        </p>
      </header>
      
      {events.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
          {events.map((event) => (
            <PublicEventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Ticket className="mx-auto h-12 w-12 text-muted-foreground" />
          <h2 className="mt-4 text-2xl font-semibold text-muted-foreground">No events currently scheduled.</h2>
          <p className="mt-2 text-muted-foreground">Please check back soon for exciting new events!</p>
        </div>
      )}

      <footer className="mt-16 pt-8 border-t text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} VenueVerse. All rights reserved.</p>
        <p className="text-xs mt-1">Powered by The Best Event Platform</p>
      </footer>
    </div>
  );
}
