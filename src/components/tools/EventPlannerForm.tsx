
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState, useTransition } from "react";
import { generateEventPlan, type GenerateEventPlanOutput } from "@/ai/flows/generate-event-plan";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Wand2, Copy, CalendarDays, Clock, MapPin, Users, FileText } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const plannerFormSchema = z.object({
  theme: z.string().min(10, {
    message: "Event theme must be at least 10 characters for a good plan.",
  }),
});

type PlannerFormValues = z.infer<typeof plannerFormSchema>;

export function EventPlannerForm() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [generatedPlan, setGeneratedPlan] = useState<GenerateEventPlanOutput | null>(null);

  const form = useForm<PlannerFormValues>({
    resolver: zodResolver(plannerFormSchema),
    defaultValues: {
      theme: "",
    },
  });

  async function onSubmit(data: PlannerFormValues) {
    startTransition(async () => {
      setGeneratedPlan(null);
      try {
        const result: GenerateEventPlanOutput = await generateEventPlan({ theme: data.theme });
        setGeneratedPlan(result);
        toast({
          title: "Event Plan Generated!",
          description: "The AI has suggested a plan for your event.",
        });
      } catch (error: any) {
        console.error("Failed to generate event plan:", error);
        toast({
          title: "Error Generating Plan",
          description: error.message || "Could not generate an event plan. Please try again.",
          variant: "destructive",
        });
      }
    });
  }

  const handleCopyToClipboard = (textToCopy: string, fieldName: string) => {
    navigator.clipboard.writeText(textToCopy);
    toast({ title: "Copied to clipboard!", description: `${fieldName} copied.` });
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8 items-start">
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center">
            <Wand2 className="mr-2 h-6 w-6 text-primary" />
            AI Event Planner
          </CardTitle>
          <CardDescription>
            Describe your event theme or idea, and let our AI craft a starting plan for you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="theme"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Theme/Idea</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., A retro 80s themed charity fundraiser, a wellness retreat focusing on yoga and meditation, or a community coding hackathon for social good..."
                        className="resize-y min-h-[150px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Provide as much detail as possible for a comprehensive plan.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isPending} className="w-full">
                {isPending ? "Generating Plan..." : "Generate Event Plan"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">AI-Suggested Event Plan</CardTitle>
          <CardDescription>
            Here's a starting point for your event. Review and refine as needed!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {isPending && (
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-6 w-1/4" />
            </div>
          )}
          {!isPending && generatedPlan && (
            <>
              <div>
                <h3 className="font-semibold text-lg text-primary mb-1">{generatedPlan.name}</h3>
                <Button variant="ghost" size="sm" onClick={() => handleCopyToClipboard(generatedPlan.name, "Event Name")} className="text-xs p-1 h-auto">
                  <Copy className="mr-1 h-3 w-3" /> Copy Name
                </Button>
              </div>
              
              <div>
                <h4 className="font-medium text-md flex items-center mb-1"><FileText className="mr-2 h-4 w-4 text-muted-foreground" />Description</h4>
                <p className="text-sm text-foreground/80 whitespace-pre-line bg-muted/50 p-3 rounded-md">{generatedPlan.description}</p>
                <Button variant="ghost" size="sm" onClick={() => handleCopyToClipboard(generatedPlan.description, "Description")} className="text-xs p-1 h-auto mt-1">
                  <Copy className="mr-1 h-3 w-3" /> Copy Description
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-md flex items-center mb-1"><CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />Suggested Date</h4>
                  <p className="text-sm bg-muted/50 p-2 rounded-md">{generatedPlan.suggestedDate}</p>
                   <Button variant="ghost" size="sm" onClick={() => handleCopyToClipboard(generatedPlan.suggestedDate, "Date")} className="text-xs p-1 h-auto mt-1">
                    <Copy className="mr-1 h-3 w-3" /> Copy Date
                  </Button>
                </div>
                <div>
                  <h4 className="font-medium text-md flex items-center mb-1"><Clock className="mr-2 h-4 w-4 text-muted-foreground" />Suggested Time</h4>
                  <p className="text-sm bg-muted/50 p-2 rounded-md">{generatedPlan.suggestedTime}</p>
                  <Button variant="ghost" size="sm" onClick={() => handleCopyToClipboard(generatedPlan.suggestedTime, "Time")} className="text-xs p-1 h-auto mt-1">
                    <Copy className="mr-1 h-3 w-3" /> Copy Time
                  </Button>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-md flex items-center mb-1"><MapPin className="mr-2 h-4 w-4 text-muted-foreground" />Suggested Location</h4>
                <p className="text-sm bg-muted/50 p-2 rounded-md">{generatedPlan.suggestedLocation}</p>
                <Button variant="ghost" size="sm" onClick={() => handleCopyToClipboard(generatedPlan.suggestedLocation, "Location")} className="text-xs p-1 h-auto mt-1">
                  <Copy className="mr-1 h-3 w-3" /> Copy Location
                </Button>
              </div>

              {generatedPlan.guestCapacity && (
                <div>
                  <h4 className="font-medium text-md flex items-center mb-1"><Users className="mr-2 h-4 w-4 text-muted-foreground" />Guest Capacity</h4>
                  <p className="text-sm bg-muted/50 p-2 rounded-md">{generatedPlan.guestCapacity} guests</p>
                  <Button variant="ghost" size="sm" onClick={() => handleCopyToClipboard(generatedPlan.guestCapacity!.toString(), "Guest Capacity")} className="text-xs p-1 h-auto mt-1">
                    <Copy className="mr-1 h-3 w-3" /> Copy Capacity
                  </Button>
                </div>
              )}
            </>
          )}
          {!isPending && !generatedPlan && (
            <p className="text-muted-foreground text-center py-10">Your comprehensive event plan will appear here once generated.</p>
          )}
        </CardContent>
        {generatedPlan && !isPending && (
           <CardFooter>
            {/* Future: "Use this plan" button to pre-fill create event form */}
           </CardFooter>
        )}
      </Card>
    </div>
  );
}
