
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah L.',
    role: 'DIY Enthusiast',
    testimonial:
      "Think AI is a game-changer! I used it to generate a step-by-step plan for my backyard project. The process was seamless and so much better than endless searching online.",
    avatar: 'https://placehold.co/100x100.png',
    aiHint: 'woman face',
  },
  {
    name: 'Mike R.',
    role: 'Freelance Developer',
    testimonial:
      'Needed a specific Python script for a photoshoot, and Think AI wrote it perfectly. The code was clean, efficient, and worked on the first try. Highly recommend!',
    avatar: 'https://placehold.co/100x100.png',
    aiHint: 'man face',
  },
  {
    name: 'Emily C.',
    role: 'Event Planner',
    testimonial:
      'I run a small event business, and being able to quickly draft emails and marketing copy has been a lifesaver for my budget. The creative suggestions are fantastic.',
    avatar: 'https://placehold.co/100x100.png',
    aiHint: 'woman smiling',
  },
];

export function Testimonials() {
  return (
    <section className="w-full max-w-6xl mx-auto py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">
          What Our Users Say
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          We're proud to have helped so many people access the power of AI.
          Here's what they think about Think AI.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((item, index) => (
          <Card key={index} className="bg-card/80 backdrop-blur-sm p-6 transform-gpu transition-all duration-300 ease-in-out hover:-translate-y-2">
            <CardContent className="p-0 flex flex-col items-start text-left">
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="h-14 w-14">
                  <AvatarImage src={item.avatar} alt={item.name} data-ai-hint={item.aiHint} />
                  <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-bold text-lg text-card-foreground">{item.name}</p>
                  <p className="text-sm text-muted-foreground">{item.role}</p>
                </div>
              </div>
               <div className="flex items-center gap-1 mb-4 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="text-muted-foreground italic">"{item.testimonial}"</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
