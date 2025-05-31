"use client"

import React, { useState, useEffect } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { AddGuestDialog } from '@/components/guest/AddGuestDialog';
import { GuestListTable } from '@/components/guest/GuestListTable';
import { mockGuests } from '@/lib/mockData';
import type { Guest } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';

export default function GuestsPage() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<Guest['rsvpStatus'] | 'All'>('All');

  useEffect(() => {
    // Simulate fetching guests
    setGuests(mockGuests);
  }, []);

  const handleAddGuest = (newGuest: Guest) => {
    setGuests(prevGuests => [newGuest, ...prevGuests]);
  };

  const handleUpdateGuest = (updatedGuest: Guest) => {
    setGuests(prevGuests => 
      prevGuests.map(guest => guest.id === updatedGuest.id ? updatedGuest : guest)
    );
  };

  const handleDeleteGuest = (guestId: string) => {
    setGuests(prevGuests => prevGuests.filter(guest => guest.id !== guestId));
  };

  const filteredGuests = guests.filter(guest => {
    const matchesSearch = guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          guest.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || guest.rsvpStatus === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      <PageHeader title="Guest Management" description="Manage your event attendees and invitations.">
        <AddGuestDialog onGuestAdded={handleAddGuest} />
      </PageHeader>

      <div className="flex flex-col sm:flex-row gap-4 mb-6 p-4 border rounded-lg shadow-sm bg-card">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search guests by name or email..."
            className="pl-10 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={filterStatus} onValueChange={(value) => setFilterStatus(value as Guest['rsvpStatus'] | 'All')}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by RSVP status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Statuses</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Attending">Attending</SelectItem>
            <SelectItem value="Not Attending">Not Attending</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <GuestListTable 
        guests={filteredGuests}
        onUpdateGuest={handleUpdateGuest}
        onDeleteGuest={handleDeleteGuest}
      />
    </div>
  );
}
