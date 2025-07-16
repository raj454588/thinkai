
'use client';

import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart, PieChart, Users, PersonStanding } from 'lucide-react';
import { GenderDistributionChart } from '@/components/GenderDistributionChart';
import { KnowledgeLevelChart } from '@/components/KnowledgeLevelChart';

export default function AnalyticsPage() {
    const { users } = useAuth();

    const totalUsers = users.length;
    const averageAge = totalUsers > 0 
        ? Math.round(users.reduce((acc, user) => acc + user.age, 0) / totalUsers)
        : 0;
    
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{totalUsers}</div>
                    <p className="text-xs text-muted-foreground">Registered users in the system</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Average Age</CardTitle>
                    <PersonStanding className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{averageAge}</div>
                    <p className="text-xs text-muted-foreground">Average age of all users</p>
                </CardContent>
            </Card>

            <Card className="md:col-span-2">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <PieChart className="h-5 w-5" />
                        Gender Distribution
                    </CardTitle>
                    <CardDescription>A breakdown of users by gender.</CardDescription>
                </CardHeader>
                <CardContent>
                    <GenderDistributionChart users={users} />
                </CardContent>
            </Card>

            <Card className="md:col-span-2 lg:col-span-4">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BarChart className="h-5 w-5" />
                        AI Knowledge Levels
                    </CardTitle>
                    <CardDescription>A breakdown of users by their self-reported AI knowledge.</CardDescription>
                </CardHeader>
                <CardContent>
                     <KnowledgeLevelChart users={users} />
                </CardContent>
            </Card>
        </div>
    );
}
