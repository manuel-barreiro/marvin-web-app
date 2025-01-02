import { Suspense } from "react"
import TestDashboard from "@/components/dashboards/sell-in/test/TestDashboard"
import { Loader } from "lucide-react"
import { TestDashboardResponse } from "@/types/test-dashboard"
import FilterSheet from "@/components/dashboards/common/FilterSheet_v2"
import CurrentFilters from "@/components/dashboards/common/CurrentFilters"

async function getTestDashboardData(): Promise<TestDashboardResponse> {
  // Server-side fetch
  const response = await fetch(`http://localhost:3000/api/sell-in/test`)
  if (!response.ok) {
    throw new Error("Failed to fetch dashboard data")
  }
  const data = await response.json()
  return data
}

export default async function Page() {
  const data = await getTestDashboardData()
  return (
    <Suspense
      fallback={
        <section className="flex h-[85dvh] w-full flex-col items-center justify-center gap-1">
          <Loader className="h-16 w-16 animate-spin" />
        </section>
      }
    >
      <div className="flex items-center justify-between">
        <CurrentFilters />
        <FilterSheet />
      </div>
      <TestDashboard
        metrics={data.testDashboardData.metrics}
        composed_chart={data.testDashboardData.composed_chart}
      />
    </Suspense>
  )
}
