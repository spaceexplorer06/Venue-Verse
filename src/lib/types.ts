export interface Event {
  id: string;
  name: string;
  description: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  location: string;
  image?: string; // URL for event image
  guestCapacity?: number;
  guests?: Guest[]; // List of guests attending this event
}

export interface Guest {
  id: string;
  name: string;
  email: string;
  rsvpStatus: 'Pending' | 'Attending' | 'Not Attending';
  eventId?: string; // Optional: if guest is specific to an event
}
