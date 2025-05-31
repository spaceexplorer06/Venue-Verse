import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { EventCard } from '@/components/event/EventCard';
import { PageHeader } from '@/components/PageHeader';
import { mockEvents } from '@/lib/mockData';
import { PlusCircle } from 'lucide-react';

export default function EventsPage() {
  return (
    <div className="space-y-8">
      <PageHeader title="Events" description="Browse and manage all your events.">
        <Button asChild>
          <Link href="/events/create">
            <PlusCircle className="mr-2 h-4 w-4" /> Create New Event
          </Link>
        </Button>
      </PageHeader>
      
      {mockEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-muted-foreground mb-4">No events yet.</h2>
          <p className="text-muted-foreground mb-6">Start by creating your first event!</p>
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
