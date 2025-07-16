
'use client';

import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Smartphone, Calendar, BarChart, BrainCircuit } from 'lucide-react';
import { UpdatePasswordForm } from '@/components/UpdatePasswordForm';

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) return null;

  const badgeVariant = user.aiKnowledge === 'advanced' ? 'default' : 
                       user.aiKnowledge === 'intermediate' ? 'secondary' : 'outline';

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <Avatar className="h-28 w-28 border-4 border-primary/40 transition-all duration-500 ease-in-out hover:scale-105 hover:border-primary">
          <AvatarFallback className="bg-primary/10">
            <User className="h-14 w-14 text-primary" />
          </AvatarFallback>
        </Avatar>
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-bold font-headline text-primary">{user.username}</h1>
          <p className="text-lg text-muted-foreground">{user.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="transform-gpu transition-all duration-300 ease-in-out hover:-translate-y-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 font-headline">
              <User className="h-6 w-6 text-primary" />
              About
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <div className="flex items-center gap-3">
              <Smartphone className="h-5 w-5" />
              <span>{user.mobile}</span>
            </div>
            <div className="flex items-center gap-3">
               <Calendar className="h-5 w-5" />
              <span>{user.age} years old</span>
            </div>
             <div className="flex items-center gap-3">
              <BarChart className="h-5 w-5" />
              <span className="capitalize">{user.gender}</span>
            </div>
            <div className="flex items-center gap-3">
                <BrainCircuit className="h-5 w-5" />
                <Badge variant={badgeVariant} className="capitalize text-sm">
                    {user.aiKnowledge} AI Knowledge
                </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 transform-gpu transition-all duration-300 ease-in-out hover:-translate-y-1">
          <CardHeader>
            <CardTitle className="font-headline">Account Security</CardTitle>
            <CardDescription>Update your password here. Choose a strong and unique password.</CardDescription>
          </CardHeader>
          <CardContent>
            <UpdatePasswordForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
