import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Lightbulb, Code, Target } from 'lucide-react';

export function LandingSections() {
  return (
    <div className="space-y-16">
      <section id="about">
        <div className="text-center">
          <h2 className="text-3xl font-bold font-headline tracking-tight text-primary">About Think AI</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A smarter way to interact with artificial intelligence. Built for developers, students, and curious minds.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          <Card>
            <CardHeader className="items-center">
              <Lightbulb className="w-12 h-12 mb-4 text-accent" />
              <CardTitle className="font-headline">General Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground">Get instant, accurate answers to your questions on any topic, from history to science.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="items-center">
              <Code className="w-12 h-12 mb-4 text-accent" />
              <CardTitle className="font-headline">Code Generation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground">Generate code snippets in various languages, complete with explanations and a copy-paste-ready format.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="items-center">
              <Target className="w-12 h-12 mb-4 text-accent" />
              <CardTitle className="font-headline">Problem Solving</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground">Receive step-by-step solutions for complex math problems, helping you learn the process.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="services" className="grid md:grid-cols-2 gap-8 items-center">
        <div>
           <h2 className="text-3xl font-bold font-headline tracking-tight text-primary">Powered by Cutting-Edge AI</h2>
           <p className="mt-4 text-lg text-muted-foreground">
             Think AI leverages Google's advanced Genkit and Gemini models to provide a conversational experience that is not only intelligent but also intuitive and helpful. Our platform is designed to understand context, generate human-like text, and assist with a wide range of tasks.
           </p>
        </div>
        <div className="rounded-lg overflow-hidden">
            <Image
                src="https://placehold.co/600x400.png"
                alt="AI Technology"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
                data-ai-hint="AI technology"
            />
        </div>
      </section>

       <section id="developer" className="grid md:grid-cols-2 gap-8 items-center">
         <div className="rounded-lg overflow-hidden md:order-2">
            <Image
                src="https://placehold.co/600x400.png"
                alt="Developer working on code"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
                data-ai-hint="developer code"
            />
        </div>
        <div className="md:order-1">
           <h2 className="text-3xl font-bold font-headline tracking-tight text-primary">Developer Spotlight</h2>
           <p className="mt-4 text-lg text-muted-foreground">
            This application was built with the modern web in mind. Leveraging the power of Next.js Server Components, Server Actions, and the Genkit framework, Think AI is a showcase of building performant, full-stack AI applications entirely within the Next.js ecosystem.
           </p>
        </div>
      </section>
    </div>
  );
}
