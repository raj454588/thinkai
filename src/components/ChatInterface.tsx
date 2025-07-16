
"use client";

import { useState, useRef, useEffect, type FormEvent } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Loader2, LogIn } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatMessage } from './ChatMessage';
import { getAiResponse } from '@/app/actions';
import type { Message } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export function ChatInterface() {
  const { isAuthenticated, user } = useAuth();
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

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
      if (viewport) {
        viewport.scrollTo({ top: viewport.scrollHeight, behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToBottom();
    }, 100);
    return () => clearTimeout(timer);
  }, [messages]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please log in or sign up to start chatting.",
        variant: "destructive",
      });
      return;
    }

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

  const renderFooter = () => {
    if (!isAuthenticated) {
      return (
        <div className="flex w-full items-center justify-center gap-4">
            <p className="text-muted-foreground">Please log in to start a conversation.</p>
            <Button asChild>
                <Link href="/login">
                    <LogIn className="mr-2 h-5 w-5" />
                    Login / Sign Up
                </Link>
            </Button>
        </div>
      );
    }

    return (
       <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
          <Input
            id="message"
            placeholder="Type your message to Think AI..."
            className="flex-1 text-base"
            autoComplete="off"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
            <span className="sr-only">Send</span>
          </Button>
        </form>
    )
  }

  return (
    <Card className="w-full max-w-4xl mx-auto flex flex-col h-[75vh] shadow-2xl shadow-primary/10 animate-borderline">
      <CardHeader className="border-b">
        <CardTitle className="font-headline text-primary flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="m12 1-1.88 4.22-4.22 1.88 4.22 1.88L12 13l1.88-4.22 4.22-1.88-4.22-1.88Z"/><path d="m12 13 1.88 4.22 4.22 1.88-4.22 1.88L12 23l-1.88-4.22-4.22-1.88 4.22-1.88Z"/><path d="m5.22 9.22 1.88-4.22L1 3l1.88 4.22Z"/><path d="m18.78 9.22-1.88-4.22L23 3l-1.88 4.22Z"/><path d="m5.22 14.78 1.88 4.22L1 21l1.88-4.22Z"/><path d="m18.78 14.78-1.88 4.22L23 21l-1.88-4.22Z"/></svg>
          Conversational AI
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden p-0">
        <ScrollArea className="h-full" ref={scrollAreaRef}>
          <div className="flex flex-col gap-1 p-4">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isLoading && isAuthenticated && (
              <div className="flex justify-start items-center p-4">
                <Loader2 className="h-6 w-6 text-primary animate-spin" />
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="border-t pt-6">
        {renderFooter()}
      </CardFooter>
    </Card>
  );
}
