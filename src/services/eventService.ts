'use server';

import { collection, getDocs, doc, getDoc, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Event } from '@/lib/types';

// Helper to convert Firestore document data to Event type
// For simplicity, assumes date is stored as YYYY-MM-DD string in Firestore
// and time as HH:MM string.
// Does not fetch nested guests for now.
const docToEvent = (docSnapshot: any): Event => {
  const data = docSnapshot.data();
  return {
    id: docSnapshot.id,
    name: data.name || '',
    description: data.description || '',
    date: data.date || '', // Assuming date is stored as 'YYYY-MM-DD' string
    time: data.time || '', // Assuming time is stored as 'HH:MM' string
    location: data.location || '',
    image: data.image || undefined,
    guestCapacity: data.guestCapacity || undefined,
    // guests: [], // TODO: Implement fetching/linking guest data
  };
};

export async function getEvents(): Promise<Event[]> {
  try {
    const eventsCollection = collection(db, 'events');
    // Order events by date, then by time
    const q = query(eventsCollection, orderBy('date'), orderBy('time'));
    const eventSnapshot = await getDocs(q);
    const eventList = eventSnapshot.docs.map(doc => docToEvent(doc));
    return eventList;
  } catch (error) {
    console.error("Error fetching events:", error);
    return []; // Return empty array on error
  }
}

export async function getEventById(id: string): Promise<Event | null> {
  try {
    const eventDocRef = doc(db, 'events', id);
    const eventSnap = await getDoc(eventDocRef);

    if (eventSnap.exists()) {
      return docToEvent(eventSnap);
    } else {
      console.log("No such event document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching event by ID:", error);
    return null; // Return null on error
  }
}
