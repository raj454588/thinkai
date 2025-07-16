
'use client';

import { Button } from './ui/button';
import {
  Lightbulb,
  FileText,
  GraduationCap,
  Gift,
  PenLine,
  Code2,
  BarChart3,
  type LucideIcon,
} from 'lucide-react';

interface Suggestion {
  text: string;
  Icon: LucideIcon;
}

const suggestions: Suggestion[] = [
  { text: 'Make a plan', Icon: Lightbulb },
  { text: 'Summarize text', Icon: FileText },
  { text: 'Get advice', Icon: GraduationCap },
  { text: 'Surprise me', Icon: Gift },
  { text: 'Help me write', Icon: PenLine },
  { text: 'Code', Icon: Code2 },
  { text: 'Brainstorm', Icon: Lightbulb },
  { text: 'Analyze data', Icon: BarChart3 },
];

interface SuggestionChipsProps {
  onSuggestionClick: (suggestion: string) => void;
  'aria-hidden'?: boolean;
}

export function SuggestionChips({ onSuggestionClick, ...props }: SuggestionChipsProps) {
  return (
    <>
      {suggestions.map(({ text, Icon }, index) => (
        <Button
          key={index}
          variant="outline"
          className="rounded-full px-4 py-2 text-base flex-shrink-0"
          onClick={() => onSuggestionClick(text)}
          {...props}
        >
          <Icon className="mr-2 h-5 w-5" />
          {text}
        </Button>
      ))}
    </>
  );
}
