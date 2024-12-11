"use client"

import {
  Bar,
  Line,
  CartesianGrid,
  XAxis,
  ComposedChart,
  LabelList,
  ResponsiveContainer,
  YAxis,
  Label,
} from "recharts"

import { Card, CardContent } from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const formatToMillions = (value: number) => {
  return `${(value / 1000000).toFixed(1)}M`
}

const chartData = [
  {
    week: "45",
    forecast_v0: 1800000,
    forecast_v1: 2000000,
    ventaUnidades: 1500000,
    ventasPYW: 1700000,
    accuracy_v0: -8,
    accuracy_v1: -3,
  },
  {
    week: "46",
    forecast_v0: 2200000,
    forecast_v1: 2100000,
    ventaUnidades: 1600000,
    ventasPYW: 1800000,
    accuracy_v0: -2,
    accuracy_v1: 1,
  },
  {
    week: "47",
    forecast_v0: 2300000,
    forecast_v1: 2400000,
    ventaUnidades: 1700000,
    ventasPYW: 1900000,
    accuracy_v0: 5,
    accuracy_v1: 3,
  },
  {
    week: "48",
    forecast_v0: 2500000,
    forecast_v1: 2600000,
    ventaUnidades: 1800000,
    ventasPYW: 2000000,
    accuracy_v0: 6,
    accuracy_v1: 5,
  },
  {
    week: "49",
    forecast_v0: 2700000,
    forecast_v1: 2800000,
    ventaUnidades: 1900000,
    ventasPYW: 2100000,
    accuracy_v0: 4,
    accuracy_v1: 2,
  },
  {
    week: "50",
    forecast_v0: 2900000,
    forecast_v1: 3000000,
    ventaUnidades: 2000000,
    ventasPYW: 2200000,
    accuracy_v0: 7,
    accuracy_v1: 6,
  },
  {
    week: "51",
    forecast_v0: 3100000,
    forecast_v1: 3200000,
    ventaUnidades: 2100000,
    ventasPYW: 2300000,
    accuracy_v0: 9,
    accuracy_v1: 6,
  },
  {
    week: "52",
    forecast_v0: 3300000,
    forecast_v1: 3400000,
    ventaUnidades: 2200000,
    ventasPYW: 2400000,
    accuracy_v0: 6,
    accuracy_v1: 3,
  },
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
  ventasPYW: {
    label: "Ventas PYW",
    color: "hsl(var(--chart-4))",
  },
  accuracy_v0: {
    label: "Accuracy V0",
    color: "hsl(var(--chart-5))",
  },
  accuracy_v1: {
    label: "Accuracy V1",
    color: "hsl(var(--chart-6))",
  },
} satisfies ChartConfig

export default function MultipleBarChart() {
  return (
    <Card className="h-full w-full">
      <CardContent className="h-full p-6">
        <ResponsiveContainer width="100%" height="100%">
          <ChartContainer config={chartConfig}>
            <ComposedChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="week"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              >
                <Label value="Week" offset={-5} position="insideBottom" />{" "}
              </XAxis>
              {/* Left Y-axis for forecasts and sales */}
              <YAxis
                yAxisId="left"
                orientation="left"
                tickLine={false}
                axisLine={false}
                tickFormatter={formatToMillions}
              />

              {/* Right Y-axis for accuracy percentages */}
              <YAxis
                yAxisId="right"
                orientation="right"
                domain={[-10, 10]}
                tickLine={false}
                axisLine={false}
                unit="%"
              />

              {/* Bars for forecasts and sales */}
              <Bar
                yAxisId="left"
                dataKey="forecast_v0"
                fill="var(--color-forecast_v0)"
                radius={4}
              >
                <LabelList
                  dataKey="forecast_v0"
                  position="top"
                  style={{
                    fill: "var(--color-forecast_v0)",
                  }}
                  formatter={formatToMillions}
                />
              </Bar>
              <Bar
                yAxisId="left"
                dataKey="forecast_v1"
                fill="var(--color-forecast_v1)"
                radius={4}
              >
                <LabelList
                  dataKey="forecast_v1"
                  position="top"
                  style={{
                    fill: "var(--color-forecast_v1)",
                  }}
                  formatter={formatToMillions}
                />
              </Bar>
              <Bar
                yAxisId="left"
                dataKey="ventaUnidades"
                fill="var(--color-ventaUnidades)"
                radius={4}
              >
                <LabelList
                  dataKey="ventaUnidades"
                  position="top"
                  style={{
                    fill: "var(--color-ventaUnidades)",
                  }}
                  formatter={formatToMillions}
                />
              </Bar>
              <Bar
                yAxisId="left"
                dataKey="ventasPYW"
                fill="var(--color-ventasPYW)"
                radius={4}
              >
                <LabelList
                  dataKey="ventaUnidades"
                  position="top"
                  style={{
                    fill: "var(--color-ventasPYW)",
                  }}
                  formatter={formatToMillions}
                />
              </Bar>

              {/* Lines for accuracy */}
              <Line
                yAxisId="right"
                dataKey="accuracy_v0"
                stroke="var(--color-accuracy_v0)"
              />
              <Line
                yAxisId="right"
                dataKey="accuracy_v1"
                stroke="var(--color-accuracy_v1)"
              />
              <ChartTooltip
                cursor={true}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <ChartLegend
                align="center"
                verticalAlign="top"
                height={36}
                content={<ChartLegendContent />}
              />
            </ComposedChart>
          </ChartContainer>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
