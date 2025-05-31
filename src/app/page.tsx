'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PageHeader } from '@/components/PageHeader';
import { mockEvents } from '@/lib/mockData';
import type { Event } from '@/lib/types';
import { PlusCircle, ArrowRight } from 'lucide-react';
import { format, parseISO } from 'date-fns';

export default function DashboardPage() {
  const [currentDate, setCurrentDate] = useState<Date | undefined>(new Date());

  const eventsByDate = useMemo(() => {
    const map = new Map<string, Event[]>();
    mockEvents.forEach(event => {
      const dateStr = event.date; // Assuming YYYY-MM-DD format
      if (!map.has(dateStr)) {
        map.set(dateStr, []);
      }
      map.get(dateStr)?.push(event);
    });
    return map;
  }, []);
  
  const upcomingEvents = mockEvents
    .filter(event => parseISO(event.date) >= new Date())
    .sort((a, b) => parseISO(a.date).getTime() - parseISO(b.date).getTime())
    .slice(0, 3);

  return (
    <div className="space-y-8">
      <PageHeader title="Dashboard" description="Overview of your events and schedule.">
        <Button asChild>
          <Link href="/events/create">
            <PlusCircle className="mr-2 h-4 w-4" /> Create New Event
          </Link>
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline">Event Calendar</CardTitle>
            <CardDescription>View and manage your event schedule.</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Calendar
              mode="single"
              selected={currentDate}
              onSelect={setCurrentDate}
              className="rounded-md border"
              modifiers={{
                eventDay: Array.from(eventsByDate.keys()).map(dateStr => parseISO(dateStr))
              }}
              modifiersStyles={{
                eventDay: { color: 'hsl(var(--accent-foreground))', backgroundColor: 'hsl(var(--accent))' }
              }}
              components={{
                DayContent: ({ date, ...props }) => {
                  const dateStr = format(date, 'yyyy-MM-dd');
                  const dayEvents = eventsByDate.get(dateStr);
                  return (
                    <div className="relative h-full w-full flex items-center justify-center">
                      <span>{format(date, 'd')}</span>
                      {dayEvents && dayEvents.length > 0 && (
                        <span className="absolute bottom-0.5 right-0.5 h-1.5 w-1.5 rounded-full bg-primary" />
                      )}
                    </div>
                  );
                }
              }}
            />
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline">Upcoming Events</CardTitle>
              <CardDescription>Your next few scheduled events.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingEvents.length > 0 ? (
                upcomingEvents.map(event => (
                  <div key={event.id} className="p-3 rounded-md border hover:shadow-md transition-shadow">
                    <h3 className="font-semibold text-foreground">{event.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {format(parseISO(event.date), "MMMM d, yyyy")} at {event.time}
                    </p>
                    <Link href={`/events/${event.id}`} className="text-sm text-primary hover:underline mt-1 inline-flex items-center">
                      View Details <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground">No upcoming events.</p>
              )}
            </CardContent>
             {upcomingEvents.length > 0 && (
              <CardFooter>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/events">View All Events</Link>
                </Button>
              </CardFooter>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
