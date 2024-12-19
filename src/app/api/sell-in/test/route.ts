import { NextResponse } from "next/server"
import { DBSQLClient } from "databricks-sql-nodejs"
import IDBSQLSession from "databricks-sql-nodejs/dist/contracts/IDBSQLSession"
import IOperation from "databricks-sql-nodejs/dist/contracts/IOperation"
import { TestDashboardData } from "@/types/test-dashboard"

export async function GET(request: Request) {
  const testDashboardData: TestDashboardData = {
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

  const serverHostname: string = process.env.DATABRICKS_SERVER_HOSTNAME || ""
  const httpPath: string = process.env.DATABRICKS_HTTP_PATH || ""
  const token: string = process.env.DATABRICKS_TOKEN || ""

  if (serverHostname == "" || httpPath == "" || token == "") {
    return NextResponse.json(
      { error: "Missing required environment variables" },
      { status: 500 }
    )
  }

  try {
    const client: DBSQLClient = new DBSQLClient()
    console.log("CREATED CLIENT")
    const connectOptions = {
      host: serverHostname,
      path: httpPath,
      token: token,
    }

    await client.connect(connectOptions)
    const session: IDBSQLSession = await client.openSession()
    console.log("SESSION CREATED")

    // Fetch clients
    const clientsOperation: IOperation = await session.executeStatement(
      "select distinct idRetailer, cliente4_dsc_nestle from cpfr_solution.tb_cpfr_dim_stores"
    )
    console.log("CLIENTS QUERY EXECUTED")
    const clientsResult = await clientsOperation.fetchAll()
    await clientsOperation.close()

    const mappedClientResult = clientsResult
      .filter((item: any) => item.cliente4_dsc_nestle !== null)
      .map((item: any) => ({
        value: item.idRetailer.toString(),
        label: item.cliente4_dsc_nestle,
      }))

    // Fetch stores
    const storesOperation: IOperation = await session.executeStatement(
      "select distinct idRetailer, RET_ID from cpfr_solution.tb_cpfr_dim_stores"
    )
    console.log("STORES QUERY EXECUTED")
    const storesResult = await storesOperation.fetchAll()
    await storesOperation.close()

    const mappedStoresResult = storesResult.map((item: any) => ({
      value: item.RET_ID,
      label: item.RET_ID,
      clientId: item.idRetailer.toString(), // Add clientId for filtering
    }))

    // Fetch products
    // const productsOperation: IOperation = await session.executeStatement(
    //   "select distinct SKU_ID, DESCRIPCION_DSC, CATEGORIA,MATERIAL_GROUP, GRUPO_NEGOCIO from cpfr_solution.pbi_products"
    // )
    // console.log("PRODUCTS QUERY EXECUTED")
    // const productsResult = await productsOperation.fetchAll()
    // await productsOperation.close()

    // const mappedProductsResult = productsResult.map((item: any) => ({
    //   value: item.SKU_ID,
    //   label: item.DESCRIPCION_DSC,
    // }))

    const filters = {
      clients: mappedClientResult,
      stores: mappedStoresResult,
      products: [],
    }

    await session.close()
    console.log("SESSION CLOSED")
    await client.close()
    console.log("CLIENT CLOSED")

    const response = {
      testDashboardData,
      filters,
    }

    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Failed to fetch data from Databricks" },
      { status: 500 }
    )
  }
}
