"use client";

import { useState, useRef, useEffect, type FormEvent } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Loader2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatMessage } from './ChatMessage';
import { getAiResponse } from '@/app/actions';
import type { Message } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init',
      role: 'ai',
      content: "Hello! I am Think AI, your intelligent assistant. I can answer questions, solve math problems, and even write code for you. What's on your mind?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const result = await getAiResponse({ message: input });

      if (result.success && result.response) {
        const aiMessage: Message = {
          id: Date.now().toString() + '-ai',
          role: 'ai',
          content: result.response,
        };
        setMessages((prev) => [...prev, aiMessage]);
      } else {
        throw new Error(result.error || 'Failed to get a response.');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
      const errorResponseMessage: Message = {
        id: Date.now().toString() + '-error',
        role: 'ai',
        content: `I'm sorry, but I encountered an error. Please try again later. \n\n\`\`\`\n${errorMessage}\n\`\`\``,
      };
      setMessages((prev) => [...prev, errorResponseMessage]);
       toast({
        title: "Error",
        description: "Failed to get a response from the AI.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto flex flex-col h-[75vh]">
      <CardHeader>
        <CardTitle className="font-headline text-primary">Conversational AI</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden">
        <ScrollArea className="h-full pr-4" ref={scrollAreaRef}>
          <div className="flex flex-col gap-2">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isLoading && (
              <div className="flex justify-start items-center">
                <Loader2 className="h-6 w-6 text-primary animate-spin" />
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
          <Input
            id="message"
            placeholder="Type your message..."
            className="flex-1"
            autoComplete="off"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
