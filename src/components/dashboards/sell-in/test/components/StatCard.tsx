"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { JSX, useEffect, useState } from "react"
import NumberFlow from "@number-flow/react"
import { TrendingUp } from "lucide-react"

interface StatCardProps {
  title: string
  value: number
  percentage: number
  icon: JSX.Element
}

export default function StatCard({
  title,
  value,
  percentage,
  icon,
}: StatCardProps) {
  const [defaultValue, setDefaultValue] = useState(0)
  const [defaultPercentage, setDefaultPercentage] = useState(0)
  useEffect(() => {
    setTimeout(() => setDefaultValue(value), 100)
    setTimeout(() => setDefaultPercentage(percentage), 100)
  }, [])
  return (
    <Card className="">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          <NumberFlow
            value={defaultValue}
            format={{
              style: "currency",
              currency: "MXN",
              currencyDisplay: "narrowSymbol",
              trailingZeroDisplay: "stripIfInteger",
            }}
            className="font-nestleText"
          />
        </div>
        <p className="flex items-center gap-1 text-sm text-green-600">
          <span>
            <NumberFlow
              value={defaultPercentage}
              format={{
                trailingZeroDisplay: "stripIfInteger",
              }}
              className="font-nestleBrush"
              prefix="+"
              suffix="%"
            />{" "}
            from last period
          </span>
          <TrendingUp className="h-4 w-4" />
        </p>
      </CardContent>
    </Card>
  )
}
