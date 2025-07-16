
'use client';

import type { User } from '@/lib/types';
import { Pie, PieChart, Cell } from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

interface GenderDistributionChartProps {
    users: User[];
}

export function GenderDistributionChart({ users }: GenderDistributionChartProps) {
    const data = users.reduce((acc, user) => {
        const gender = user.gender;
        if (!acc[gender]) {
            acc[gender] = { count: 0 };
        }
        acc[gender].count++;
        return acc;
    }, {} as Record<string, { count: number }>);

    const chartData = Object.entries(data).map(([gender, { count }]) => ({
        gender: gender.charAt(0).toUpperCase() + gender.slice(1),
        count,
        fill: gender === 'male' ? 'hsl(var(--chart-1))' : 'hsl(var(--chart-2))',
    }));

     const chartConfig = {
        count: {
          label: "Users",
        },
        male: {
          label: "Male",
          color: "hsl(var(--chart-1))",
        },
        female: {
          label: "Female",
          color: "hsl(var(--chart-2))",
        },
    };

    if (chartData.length === 0) {
        return (
            <div className="flex items-center justify-center h-[250px] text-muted-foreground">
                No data to display.
            </div>
        )
    }

    return (
        <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square h-[250px]"
        >
            <PieChart>
            <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
            />
            <Pie
                data={chartData}
                dataKey="count"
                nameKey="gender"
                innerRadius={60}
                strokeWidth={5}
            >
                {chartData.map((entry) => (
                    <Cell key={entry.gender} fill={entry.fill} />
                ))}
            </Pie>
            </PieChart>
        </ChartContainer>
    )
}
