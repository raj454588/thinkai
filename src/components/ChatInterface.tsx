
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
import { cn } from '@/lib/utils';
import { SuggestionChips } from './SuggestionChips';

export function ChatInterface() {
  const { isAuthenticated, user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
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
  
  const handleSendMessage = async (messageContent: string) => {
    if (!messageContent.trim() || isLoading) return;

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
      content: messageContent,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const result = await getAiResponse({ message: messageContent });

      if (result.success) {
        const aiMessage: Message = {
          id: Date.now().toString() + '-ai',
          role: 'ai',
          content: result.response || '',
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


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    handleSendMessage(input);
  };

  const renderFooter = () => {
    if (!isAuthenticated) {
      return (
        <div className="flex w-full items-center justify-center gap-4 text-center flex-wrap">
            <p className="text-muted-foreground text-sm sm:text-base">Please log in to start a conversation.</p>
            <Button asChild size="sm">
                <Link href="/login">
                    <LogIn className="mr-2 h-4 w-4" />
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
            placeholder="Type your message..."
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
  
  const showInitialUI = messages.length === 0 && !isLoading;

  return (
    <Card className="w-full max-w-4xl mx-auto flex flex-col shadow-2xl shadow-primary/10 animate-borderline min-h-[70vh] md:min-h-[75vh] h-full">
      <CardHeader className="border-b">
        <CardTitle className="font-headline text-primary flex items-center gap-2 text-xl sm:text-2xl">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="m12 1-1.88 4.22-4.22 1.88 4.22 1.88L12 13l1.88-4.22 4.22-1.88-4.22-1.88Z"/><path d="m12 13 1.88 4.22 4.22 1.88-4.22 1.88L12 23l-1.88-4.22-4.22-1.88 4.22-1.88Z"/><path d="m5.22 9.22 1.88-4.22L1 3l1.88 4.22Z"/><path d="m18.78 9.22-1.88-4.22L23 3l-1.88 4.22Z"/><path d="m5.22 14.78 1.88 4.22L1 21l1.88-4.22Z"/><path d="m18.78 14.78-1.88 4.22L23 21l-1.88-4.22Z"/></svg>
          Conversational AI
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden p-0 flex flex-col">
        {showInitialUI ? (
          <div className="flex-grow flex flex-col items-center justify-center p-4 text-center">
            <h2 className="text-3xl font-bold font-headline mb-4">What can I help with?</h2>
            <div className="w-full max-w-2xl overflow-hidden relative">
              <div className="flex animate-scroll-x hover:animation-play-state-paused gap-4 py-4">
                 <SuggestionChips onSuggestionClick={handleSendMessage} />
                 {/* Duplicate for seamless scrolling */}
                 <SuggestionChips onSuggestionClick={handleSendMessage} aria-hidden="true" />
              </div>
              <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-card to-transparent pointer-events-none"></div>
              <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-card to-transparent pointer-events-none"></div>
            </div>
          </div>
        ) : (
          <ScrollArea className="h-full" ref={scrollAreaRef}>
            <div className="flex flex-col gap-1 p-2 sm:p-4">
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
        )}
      </CardContent>
      <CardFooter className="border-t pt-4 sm:pt-6 px-2 sm:px-6">
        {renderFooter()}
      </CardFooter>
    </Card>
  );
}
