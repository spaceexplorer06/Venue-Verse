
import { EventPlannerForm } from '@/components/tools/EventPlannerForm';
import { PageHeader } from '@/components/PageHeader';

export default function EventPlannerPage() {
  return (
    <div className="space-y-8">
      <PageHeader 
        title="AI Event Planner Pro" 
        description="Let AI help you brainstorm and structure your next amazing event from scratch." 
      />
      <EventPlannerForm />
    </div>
  );
}
