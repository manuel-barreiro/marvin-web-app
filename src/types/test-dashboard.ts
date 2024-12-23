export interface Metrics {
  ventas_pyw: number
  percentage_pyw: number
  ventas_py30: number
  percentage_py30: number
  ventas_py60: number
  percentage_py60: number
}

export interface ChartDataPoint {
  week: string
  forecast_v0: number
  forecast_v1: number
  ventaUnidades: number
  ventasPYW: number
  accuracy_v0: number
  accuracy_v1: number
}

export interface TestDashboardData {
  metrics: Metrics
  composed_chart: ChartDataPoint[]
}

export interface TestDashboardFilters {
  clients: Array<{
    value: string
    label: string
  }>
  stores: Array<{
    value: string
    label: string
    clientId: string
  }>
  products: Array<{
    value: string
    label: string
  }>
}

export interface TestDashboardResponse {
  testDashboardData: TestDashboardData
  filters: TestDashboardFilters
}

export interface SelectValueType {
  value: string
  label: string
}
