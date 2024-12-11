import { DollarSign } from "lucide-react"
import MultipleBarChart from "./components/MultipleBarChart"
import StatCard from "./components/StatCard"

export default function TestDashboard() {
  return (
    <section className="flex h-[85dvh] w-full flex-col gap-1">
      <div className="grid h-1/4 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title={"Ventas PYW"}
          icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
          value={6700000}
          percentage={20.1}
        />
        <StatCard
          title={"Avg. Ventas PY30"}
          icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
          value={7040000}
          percentage={20.1}
        />
        <StatCard
          title={"Avg. Ventas PY30"}
          icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
          value={6820000}
          percentage={20.1}
        />
      </div>
      <div className="h-3/4">
        <MultipleBarChart />
      </div>
    </section>
  )
}
