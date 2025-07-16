
'use client';

import type { User } from '@/lib/types';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

interface KnowledgeLevelChartProps {
    users: User[];
}

export function KnowledgeLevelChart({ users }: KnowledgeLevelChartProps) {
    const data = users.reduce((acc, user) => {
        const level = user.aiKnowledge;
        if (!acc[level]) {
            acc[level] = 0;
        }
        acc[level]++;
        return acc;
    }, {} as Record<string, number>);

    const chartData = [
        { level: 'Beginner', count: data.beginner || 0 },
        { level: 'Intermediate', count: data.intermediate || 0 },
        { level: 'Advanced', count: data.advanced || 0 },
    ];

    const chartConfig = {
        count: {
            label: "Users",
            color: "hsl(var(--chart-1))",
        },
    }

    return (
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="level"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis />
            <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="count" fill="var(--color-count)" radius={4} />
          </BarChart>
        </ChartContainer>
    )
}
