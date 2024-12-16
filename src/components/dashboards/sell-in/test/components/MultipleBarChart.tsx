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
import { ChartDataPoint } from "@/types/test-dashboard"
import { formatToMillions } from "@/lib/formatToMillions"

interface MultipleBarChartProps {
  chartData: ChartDataPoint[]
}

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

export default function MultipleBarChart({ chartData }: MultipleBarChartProps) {
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

              {/* Tooltip and legend */}
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
