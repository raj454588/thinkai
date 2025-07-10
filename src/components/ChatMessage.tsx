import type { Message } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from './ui/avatar';
import { CodeBlock } from './CodeBlock';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isAi = message.role === 'ai';
  const codeBlockRegex = /```(\w+)?\n([\s\S]+?)```/g;
  const parts = message.content.split(codeBlockRegex);

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
          'max-w-[85%] rounded-2xl px-4 py-3 text-base flex flex-col shadow-sm',
          isAi
            ? 'bg-secondary rounded-bl-none'
            : 'bg-primary text-primary-foreground rounded-br-none'
        )}
      >
        {parts.map((part, index) => {
          if (index % 3 === 2) {
            // This is the code content
            const language = parts[index - 1] || '';
            return <CodeBlock key={index} code={part} language={language} />;
          } else if (index % 3 === 0 && part.trim()) {
            // This is the text part
            return (
              <p key={index} className="whitespace-pre-wrap leading-relaxed">
                {part}
              </p>
            );
          }
          return null;
        })}
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
