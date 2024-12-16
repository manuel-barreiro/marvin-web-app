import { DollarSign, Loader } from "lucide-react"
import MultipleBarChart from "./components/MultipleBarChart"
import StatCard from "./components/StatCard"
import { TestDashboardData } from "@/types/test-dashboard"

interface TestDashboardProps {
  testDashboardData: TestDashboardData
}

export default function TestDashboard({
  testDashboardData,
}: TestDashboardProps) {
  return (
    <section className="flex h-[85dvh] w-full flex-col gap-1">
      <div className="grid h-1/4 gap-1 md:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title={"Ventas PYW"}
          icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
          value={testDashboardData.metrics.ventas_pyw}
          percentage={testDashboardData.metrics.percentage_pyw}
        />
        <StatCard
          title={"Avg. Ventas PY30"}
          icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
          value={testDashboardData.metrics.ventas_py30}
          percentage={testDashboardData.metrics.percentage_py30}
        />
        <StatCard
          title={"Avg. Ventas PY60"}
          icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
          value={testDashboardData.metrics.ventas_py60}
          percentage={testDashboardData.metrics.percentage_py60}
        />
      </div>
      <div className="h-3/4">
        <MultipleBarChart chartData={testDashboardData.composed_chart} />
      </div>
    </section>
  )
}
