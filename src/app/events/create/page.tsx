import { EventForm } from '@/components/event/EventForm';
import { PageHeader } from '@/components/PageHeader';

export default function CreateEventPage() {
  return (
    <div className="space-y-8">
      <PageHeader title="Plan Your Next Event" description="Fill in the details below to get started." />
      <EventForm />
    </div>
  );
}
