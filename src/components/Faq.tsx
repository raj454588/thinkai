
'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqItems = [
  {
    question: 'Why Think AI?',
    answer:
      'Think AI provides a powerful, intuitive, and versatile conversational AI experience. Our platform is designed for everyone, from developers seeking robust tools to beginners looking to explore the world of artificial intelligence.',
  },
  {
    question: 'How does Think AI work?',
    answer:
      "Think AI is built on top of Google's state-of-the-art Genkit and Gemini models. When you send a message, it's securely processed by our AI agent, which understands your intent and generates a relevant, helpful response in real-time.",
  },
  {
    question: 'Can I use Think AI for my business?',
    answer:
      'Absolutely. Think AI can be a valuable asset for businesses, helping with tasks like drafting emails, generating code, brainstorming ideas, and analyzing data. For enterprise solutions, please feel free to contact our team.',
  },
  {
    question: 'Is my data secure?',
    answer:
      'Yes, we take data privacy and security very seriously. All conversations are handled securely, and we have strict policies in place to protect your data. We do not use your private conversations to train our models.',
  },
   {
    question: 'What can I build with Think AI?',
    answer:
      "The possibilities are vast! You can build conversational agents, specialized tools for tasks like code generation or text summarization, integrate AI into your existing applications, and much more. Explore our developer showcase to see what others have built.",
  },
];

export function Faq() {
  return (
    <section className="w-full max-w-5xl mx-auto py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">
          Frequently Asked Questions
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Have questions? We've got answers. If you can't find what you're looking for,
          feel free to contact us.
        </p>
      </div>
      <Accordion type="single" collapsible className="w-full">
        {faqItems.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-lg text-left hover:no-underline">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
