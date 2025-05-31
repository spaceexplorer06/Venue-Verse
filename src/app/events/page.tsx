
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { EventCard } from '@/components/event/EventCard';
import { PageHeader } from '@/components/PageHeader';
import { getEvents } from '@/services/eventService';
import { PlusCircle } from 'lucide-react';
import type { Event } from '@/lib/types';

export default async function EventsPage() {
  const events: Event[] = await getEvents();

  return (
    <div className="space-y-8">
      <PageHeader title="Events" description="Browse and manage all your events.">
        <Button asChild>
          <Link href="/events/create">
            <PlusCircle className="mr-2 h-4 w-4" /> Create New Event
          </Link>
        </Button>
      </PageHeader>
      
      {events.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-muted-foreground mb-4">No events found.</h2>
          <p className="text-muted-foreground mb-6">Start by creating your first event or check your Firestore 'events' collection!</p>
          <Button asChild size="lg">
            <Link href="/events/create">
              <PlusCircle className="mr-2 h-5 w-5" /> Create Event
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
