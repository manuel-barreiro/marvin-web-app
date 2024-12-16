import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  // Get filter parameters
  const period = searchParams.get("period")
  const category = searchParams.get("category")

  const dashboardData = {
    metrics: {
      ventas_pyw: 6700000,
      percentage_pyw: 20.1,
      ventas_py30: 7040000,
      percentage_py30: 10.6,
      ventas_py60: 6820000,
      percentage_py60: 12.9,
    },
    composed_chart: [
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
    ],
  }

  // Fetch data based on filters
  // const data = await prisma.sales.findMany({
  //   where: {
  //     period: period,
  //     category: category
  //   }
  // })

  return NextResponse.json(dashboardData)
}
