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
import { generateEventName, type GenerateEventNameOutput } from "@/ai/flows/generate-event-name";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Wand2, Copy } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const generatorFormSchema = z.object({
  description: z.string().min(20, {
    message: "Description must be at least 20 characters to generate good names.",
  }),
});

type GeneratorFormValues = z.infer<typeof generatorFormSchema>;

export function EventNameGeneratorForm() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [generatedName, setGeneratedName] = useState<string | null>(null);

  const form = useForm<GeneratorFormValues>({
    resolver: zodResolver(generatorFormSchema),
    defaultValues: {
      description: "",
    },
  });

  async function onSubmit(data: GeneratorFormValues) {
    startTransition(async () => {
      setGeneratedName(null); // Clear previous result
      try {
        const result: GenerateEventNameOutput = await generateEventName({ description: data.description });
        setGeneratedName(result.eventName);
        toast({
          title: "Name Generated!",
          description: "A new event name has been suggested.",
        });
      } catch (error) {
        console.error("Failed to generate event name:", error);
        toast({
          title: "Error Generating Name",
          description: "Could not generate an event name. Please try again.",
          variant: "destructive",
        });
      }
    });
  }

  const handleCopyToClipboard = () => {
    if (generatedName) {
      navigator.clipboard.writeText(generatedName);
      toast({ title: "Copied to clipboard!", description: generatedName });
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center">
            <Wand2 className="mr-2 h-6 w-6 text-primary" />
            AI Event Name Generator
          </CardTitle>
          <CardDescription>
            Describe your event, and let our AI suggest a creative name for it!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., A weekend workshop for aspiring photographers focusing on landscape and portrait techniques, held in a scenic mountain location."
                        className="resize-y min-h-[150px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Provide as much detail as possible for the best results.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isPending} className="w-full">
                {isPending ? "Generating..." : "Generate Name"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Suggested Name</CardTitle>
          <CardDescription>
            Here's what our AI came up with. Feel free to use it or get inspired!
          </CardDescription>
        </CardHeader>
        <CardContent className="min-h-[150px] flex items-center justify-center">
          {isPending && (
            <div className="space-y-2 w-full">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          )}
          {!isPending && generatedName && (
            <div className="text-center">
              <p className="text-3xl font-bold font-headline text-primary">{generatedName}</p>
            </div>
          )}
          {!isPending && !generatedName && (
            <p className="text-muted-foreground">Your generated name will appear here.</p>
          )}
        </CardContent>
        {generatedName && !isPending && (
           <CardFooter>
            <Button variant="outline" onClick={handleCopyToClipboard} className="w-full">
              <Copy className="mr-2 h-4 w-4" /> Copy to Clipboard
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
