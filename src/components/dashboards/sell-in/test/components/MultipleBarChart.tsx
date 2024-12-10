"use client"

import { TrendingUp } from "lucide-react"
import {
  Bar,
  Line,
  CartesianGrid,
  XAxis,
  ComposedChart,
  Legend,
  Tooltip,
  LabelList,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { week: "45", forecast_v0: 186, forecast_v1: 80, ventaUnidades: 100 },
  { week: "46", forecast_v0: 305, forecast_v1: 200, ventaUnidades: 100 },
  { week: "47", forecast_v0: 237, forecast_v1: 120, ventaUnidades: 100 },
  { week: "48", forecast_v0: 73, forecast_v1: 190, ventaUnidades: 100 },
  { week: "49", forecast_v0: 209, forecast_v1: 130, ventaUnidades: 100 },
  { week: "50", forecast_v0: 214, forecast_v1: 140, ventaUnidades: 100 },
  { week: "51", forecast_v0: 269, forecast_v1: 120, ventaUnidades: 100 },
  { week: "52", forecast_v0: 294, forecast_v1: 180, ventaUnidades: 100 },
]

const chartConfig = {
  forecast_v0: {
    label: "Forecast V0",
    color: "hsl(var(--chart-1))",
  },
  forecast_v1: {
    label: "Forecast V1",
    color: "hsl(var(--chart-2))",
  },
  ventaUnidades: {
    label: "Venta Unidades",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

export default function MultipleBarChart() {
  return (
    <Card className="">
      {/* <CardHeader>
        <CardTitle>Bar Chart - Multiple</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader> */}
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ComposedChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="week"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={true}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar
              dataKey="forecast_v0"
              fill="var(--color-forecast_v0)"
              radius={4}
            >
              <LabelList
                dataKey="forecast_v0"
                position="center"
                style={{
                  fill: "white",
                }}
              />
            </Bar>
            <Bar
              dataKey="forecast_v1"
              fill="var(--color-forecast_v1)"
              radius={4}
            >
              <LabelList
                dataKey="forecast_v1"
                position="center"
                style={{
                  fill: "white",
                }}
              />
            </Bar>
            <Bar
              dataKey="ventaUnidades"
              fill="var(--color-ventaUnidades)"
              radius={4}
            >
              <LabelList
                dataKey="ventaUnidades"
                position="center"
                style={{
                  fill: "white",
                }}
              />
            </Bar>
            <Line dataKey="forecast_v1" fill="var(--color-forecast_v1)" />
            <Legend />
          </ComposedChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter> */}
    </Card>
  )
}
