import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, BrainCog, Wrench } from "lucide-react";

export function InfoSection() {
  return (
    <section className="w-full max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <Lightbulb className="h-8 w-8 text-primary" />
            <CardTitle className="font-headline text-xl">About Think AI</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Think AI is a cutting-edge conversational platform designed to be your intelligent partner. 
              We leverage powerful generative AI models to provide helpful answers, creative solutions, and efficient code generation.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <BrainCog className="h-8 w-8 text-primary" />
            <CardTitle className="font-headline text-xl">What is AI?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Artificial Intelligence is a branch of computer science focused on building smart machines capable of performing tasks that typically require human intelligence, like learning, reasoning, and problem-solving.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <Wrench className="h-8 w-8 text-primary" />
            <CardTitle className="font-headline text-xl">Our Services</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We offer a range of services from natural language understanding and text generation to complex problem-solving and code assistance, all accessible through this simple and intuitive chat interface.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
