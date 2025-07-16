import type { Message } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from './ui/avatar';
import { CodeBlock } from './CodeBlock';
import { Bot, User } from 'lucide-react';
import Image from 'next/image';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isAi = message.role === 'ai';
  const codeBlockRegex = /```(\w+)?\n([\s\S]+?)```/g;
  const parts = message.content.split(codeBlockRegex);

  const renderContent = () => {
    if (message.imageUrl) {
      return (
        <>
          {message.content && <p className="mb-4 whitespace-pre-wrap leading-relaxed">{message.content}</p>}
          <div className="relative aspect-square max-w-sm rounded-lg overflow-hidden border-2 border-primary/20 shadow-lg transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-primary/20">
            <Image
              src={message.imageUrl}
              alt="Generated image"
              width={500}
              height={500}
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              data-ai-hint="generated art"
            />
             <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
        </>
      );
    }

    return parts.map((part, index) => {
      if (index % 3 === 2) {
        const language = parts[index - 1] || '';
        return <CodeBlock key={index} code={part} language={language} />;
      } else if (index % 3 === 0 && part.trim()) {
        return (
          <p key={index} className="whitespace-pre-wrap leading-relaxed">
            {part}
          </p>
        );
      }
      return null;
    });
  }

  return (
    <div className={cn('flex items-start gap-3 py-3', { 'justify-end': !isAi })}>
      {isAi && (
        <Avatar className="h-9 w-9 border-2 border-primary/40 bg-primary/20">
          <AvatarFallback className="bg-transparent text-primary">
            <Bot className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          'max-w-[85%] rounded-2xl px-4 py-3 text-base flex flex-col shadow-sm transition-all duration-300 ease-in-out',
          isAi
            ? 'bg-secondary rounded-bl-none'
            : 'bg-primary text-primary-foreground rounded-br-none'
        )}
      >
        {renderContent()}
      </div>
      {!isAi && (
         <Avatar className="h-9 w-9 border-2 border-border bg-background">
          <AvatarFallback>
            <User className="h-5 w-5 text-muted-foreground" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
