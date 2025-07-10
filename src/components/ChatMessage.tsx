import type { Message } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
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
    <div className={cn('flex items-start gap-4 py-4', { 'justify-end': !isAi })}>
      {isAi && (
        <Avatar className="h-9 w-9 border border-primary/50">
          <AvatarFallback className="bg-primary text-primary-foreground">
            <Bot className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          'max-w-[80%] rounded-lg px-4 py-3 text-sm flex flex-col',
          isAi
            ? 'bg-secondary'
            : 'bg-primary text-primary-foreground'
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
         <Avatar className="h-9 w-9 border border-border">
          <AvatarFallback>
            <User className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
