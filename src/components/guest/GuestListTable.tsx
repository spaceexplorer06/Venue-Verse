"use client"

import React from 'react';
import type { Guest } from '@/lib/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Trash2, Edit2, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface GuestListTableProps {
  guests: Guest[];
  onUpdateGuest: (updatedGuest: Guest) => void;
  onDeleteGuest: (guestId: string) => void;
}

export function GuestListTable({ guests, onUpdateGuest, onDeleteGuest }: GuestListTableProps) {
  const { toast } = useToast();

  const handleRsvpChange = (guest: Guest, status: Guest['rsvpStatus']) => {
    onUpdateGuest({ ...guest, rsvpStatus: status });
    toast({ title: "RSVP Updated", description: `${guest.name}'s RSVP status changed to ${status}.`});
  };
  
  const handleSendInvitation = (guest: Guest) => {
    // Mock sending invitation
    console.log(`Sending invitation to ${guest.name} (${guest.email})`);
    toast({ title: "Invitation Sent", description: `Invitation sent to ${guest.name} at ${guest.email}.`});
  };

  const handleDelete = (guestId: string) => {
    onDeleteGuest(guestId);
    toast({ title: "Guest Deleted", description: `Guest has been removed from the list.`, variant: "destructive" });
  };

  const getBadgeVariant = (status: Guest['rsvpStatus']) => {
    switch (status) {
      case 'Attending': return 'default'; // Uses primary color
      case 'Not Attending': return 'destructive';
      case 'Pending': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <div className="rounded-lg border overflow-hidden shadow-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>RSVP Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {guests.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                No guests added yet.
              </TableCell>
            </TableRow>
          ) : (
            guests.map((guest) => (
              <TableRow key={guest.id}>
                <TableCell className="font-medium">{guest.name}</TableCell>
                <TableCell>{guest.email}</TableCell>
                <TableCell>
                  <Badge variant={getBadgeVariant(guest.rsvpStatus)}>{guest.rsvpStatus}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleSendInvitation(guest)}>
                        <Send className="mr-2 h-4 w-4" /> Send Invitation
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleRsvpChange(guest, 'Attending')}>Mark as Attending</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleRsvpChange(guest, 'Not Attending')}>Mark as Not Attending</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleRsvpChange(guest, 'Pending')}>Mark as Pending</DropdownMenuItem>
                      <DropdownMenuItem disabled>
                        <Edit2 className="mr-2 h-4 w-4" /> Edit Guest (Soon)
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(guest.id)} className="text-red-600 focus:text-red-600 focus:bg-red-50">
                        <Trash2 className="mr-2 h-4 w-4" /> Delete Guest
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
