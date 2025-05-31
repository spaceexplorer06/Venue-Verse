import type { Event, Guest } from './types';

export const mockGuests: Guest[] = [
  { id: 'guest1', name: 'Alice Wonderland', email: 'alice@example.com', rsvpStatus: 'Attending', eventId: 'event1' },
  { id: 'guest2', name: 'Bob The Builder', email: 'bob@example.com', rsvpStatus: 'Pending', eventId: 'event1' },
  { id: 'guest3', name: 'Charlie Chaplin', email: 'charlie@example.com', rsvpStatus: 'Not Attending', eventId: 'event2' },
  { id: 'guest4', name: 'Diana Prince', email: 'diana@example.com', rsvpStatus: 'Attending', eventId: 'event2' },
  { id: 'guest5', name: 'Edward Scissorhands', email: 'edward@example.com', rsvpStatus: 'Pending', eventId: 'event3' },
];

export const mockEvents: Event[] = [
  {
    id: 'event1',
    name: 'Tech Conference 2024',
    description: 'Annual technology conference focusing on future innovations.',
    date: '2024-09-15',
    time: '09:00',
    location: 'Silicon Valley Convention Center',
    image: 'https://placehold.co/600x400.png',
    guestCapacity: 500,
    guests: [mockGuests[0], mockGuests[1]],
  },
  {
    id: 'event2',
    name: 'Art & Design Expo',
    description: 'A showcase of contemporary art and design from around the world.',
    date: '2024-10-20',
    time: '10:00',
    location: 'Metropolitan Art Gallery',
    image: 'https://placehold.co/600x400.png',
    guestCapacity: 300,
    guests: [mockGuests[2], mockGuests[3]],
  },
  {
    id: 'event3',
    name: 'Music Festival Unplugged',
    description: 'An intimate music festival featuring acoustic performances.',
    date: '2024-11-05',
    time: '14:00',
    location: 'Greenfield Park Amphitheater',
    image: 'https://placehold.co/600x400.png',
    guestCapacity: 1000,
    guests: [mockGuests[4]],
  },
  {
    id: 'event4',
    name: 'Startup Pitch Night',
    description: 'Entrepreneurs pitch their innovative ideas to investors.',
    date: '2024-09-25',
    time: '18:00',
    location: 'Innovation Hub Downtown',
    image: 'https://placehold.co/600x400.png',
    guestCapacity: 150,
  },
];
