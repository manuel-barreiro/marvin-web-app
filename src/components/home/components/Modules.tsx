import { BarChart3, Layout, TrendingUp } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Modules() {
  return (
    <section className="grid gap-6">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <Layout className="h-8 w-8 text-primary" />
            <CardTitle>Descriptive</CardTitle>
            <CardDescription>
              Comprehensive market analysis and insights
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* <ul className="grid gap-2 text-sm">
              <li>Executive Summary</li>
              <li>Market Landscape</li>
              <li>Portfolio Map</li>
              <li>Price Pack Piano</li>
              <li>Price Ladder</li>
            </ul> */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <TrendingUp className="h-8 w-8 text-primary" />
            <CardTitle>Modelling Insights</CardTitle>
            <CardDescription>
              Advanced analytics and predictions
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* <ul className="grid gap-2 text-sm">
              <li>Regular Price & Discount Elasticities</li>
              <li>Volume Transferability</li>
              <li>Cross Price Elasticities</li>
              <li>SKU Delisting</li>
              <li>Promotional Strategy</li>
            </ul> */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <BarChart3 className="h-8 w-8 text-primary" />
            <CardTitle>Scenario Planning</CardTitle>
            <CardDescription>Strategic decision support</CardDescription>
          </CardHeader>
          <CardContent>
            {/* <ul className="grid gap-2 text-sm">
              <li>Portfolio Planner</li>
              <li>Portfolio Planner Comparison</li>
              <li>Impact Analysis</li>
              <li>Strategy Simulator</li>
            </ul> */}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
