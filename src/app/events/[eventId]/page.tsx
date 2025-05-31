import { mockEvents } from '@/lib/mockData';
import type { Event } from '@/lib/types';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { CalendarDays, MapPin, Users, Edit, Trash2, Ticket, UserPlus, ListChecks } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { format, parseISO } from 'date-fns';

async function getEvent(id: string): Promise<Event | undefined> {
  // In a real app, fetch this from a database
  return mockEvents.find(event => event.id === id);
}

export default async function EventDetailsPage({ params }: { params: { eventId: string } }) {
  const event = await getEvent(params.eventId);

  if (!event) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-semibold">Event not found</h1>
        <p className="text-muted-foreground">The event you are looking for does not exist.</p>
        <Button asChild className="mt-4">
          <Link href="/events">Back to Events</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader title={event.name} description={`Details for ${event.name}.`}>
        <div className="flex gap-2">
          <Button variant="outline"><Edit className="mr-2 h-4 w-4" /> Edit</Button>
          <Button variant="destructive" className="bg-red-600 hover:bg-red-700"><Trash2 className="mr-2 h-4 w-4" /> Delete</Button>
        </div>
      </PageHeader>

      <Card className="overflow-hidden shadow-xl">
        {event.image && (
          <div className="relative w-full h-64 md:h-96">
            <Image 
              src={event.image} 
              alt={event.name} 
              layout="fill" 
              objectFit="cover"
              priority 
              data-ai-hint="event hero"
            />
          </div>
        )}
        <CardHeader className="border-b">
          <CardTitle className="font-headline text-3xl">{event.name}</CardTitle>
          <div className="flex flex-wrap gap-2 pt-2">
            <Badge variant="secondary" className="flex items-center gap-1.5 py-1 px-2.5">
              <CalendarDays className="h-4 w-4" />
              {format(parseISO(event.date), "EEEE, MMMM d, yyyy")}
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1.5 py-1 px-2.5">
              <MapPin className="h-4 w-4" />
              {event.location}
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1.5 py-1 px-2.5">
              <Ticket className="h-4 w-4" />
              {event.time} Start Time
            </Badge>
            {event.guestCapacity && (
              <Badge variant="secondary" className="flex items-center gap-1.5 py-1 px-2.5">
                <Users className="h-4 w-4" />
                {event.guestCapacity} Capacity
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold font-headline mb-2">About this event</h2>
          <p className="text-foreground/80 leading-relaxed whitespace-pre-line">{event.description}</p>
          
          <Separator className="my-6" />

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold font-headline mb-2 flex items-center"><ListChecks className="mr-2 h-5 w-5 text-primary" /> Schedule (Placeholder)</h3>
              <p className="text-muted-foreground">Detailed event schedule will appear here.</p>
              <ul className="mt-2 space-y-1 list-disc list-inside text-foreground/80">
                <li>10:00 AM - Welcome & Registration</li>
                <li>11:00 AM - Keynote Speech</li>
                <li>01:00 PM - Lunch Break</li>
                <li>02:00 PM - Workshops</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold font-headline mb-2 flex items-center"><Users className="mr-2 h-5 w-5 text-primary" /> Speakers (Placeholder)</h3>
              <p className="text-muted-foreground">Information about speakers will be listed here.</p>
               <div className="mt-2 space-y-2">
                <div className="flex items-center gap-3 p-2 border rounded-md">
                    <Image src="https://placehold.co/40x40.png" alt="Speaker 1" width={40} height={40} className="rounded-full" data-ai-hint="person portrait" />
                    <div>
                        <p className="font-medium text-foreground/90">Jane Doe</p>
                        <p className="text-xs text-muted-foreground">Lead Innovator</p>
                    </div>
                </div>
               </div>
            </div>
          </div>

          <Separator className="my-6" />
          
          <div>
            <h3 className="text-lg font-semibold font-headline mb-3 flex items-center"><UserPlus className="mr-2 h-5 w-5 text-primary" /> Guest List ({event.guests?.length || 0} attending)</h3>
            {event.guests && event.guests.length > 0 ? (
              <ul className="space-y-1 max-h-40 overflow-y-auto">
                {event.guests.map(guest => (
                  <li key={guest.id} className="text-sm text-foreground/80 p-1.5 bg-muted/50 rounded-md">{guest.name} - <span className="italic text-muted-foreground">{guest.rsvpStatus}</span></li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">No guests registered yet.</p>
            )}
            <Button variant="outline" asChild className="mt-4">
                <Link href="/guests">Manage Guests</Link>
            </Button>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
