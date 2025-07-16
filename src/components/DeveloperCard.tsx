
'use client';

import type { User } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { User as UserIcon, Bot } from 'lucide-react';

interface DeveloperCardProps {
  user: User;
}

export function DeveloperCard({ user }: DeveloperCardProps) {
    const badgeVariant = user.aiKnowledge === 'advanced' ? 'default' : 
                         user.aiKnowledge === 'intermediate' ? 'secondary' : 'outline';

    return (
        <Card className="flex flex-col items-center text-center p-4">
            <Avatar className="h-20 w-20 mb-4 border-2 border-primary/40">
                <AvatarFallback className="bg-primary/10">
                    <UserIcon className="h-10 w-10 text-primary" />
                </AvatarFallback>
            </Avatar>
            <CardHeader className="p-0 mb-2">
                <CardTitle className="font-headline text-lg">{user.username}</CardTitle>
            </CardHeader>
            <CardContent className="p-0 flex flex-col items-center gap-3">
                <p className="text-sm text-muted-foreground capitalize">{user.gender}, Age {user.age}</p>
                <Badge variant={badgeVariant} className="capitalize">
                    {user.aiKnowledge} AI Knowledge
                </Badge>
            </CardContent>
        </Card>
    );
}
