import { EventNameGeneratorForm } from '@/components/tools/EventNameGeneratorForm';
import { PageHeader } from '@/components/PageHeader';

export default function NameGeneratorPage() {
  return (
    <div className="space-y-8">
      <PageHeader 
        title="Event Name Wizard" 
        description="Unleash creativity with AI-powered name suggestions for your next big event." 
      />
      <EventNameGeneratorForm />
    </div>
  );
}
