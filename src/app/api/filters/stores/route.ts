import { NextResponse } from "next/server"
import { DBSQLClient } from "databricks-sql-nodejs"
import IDBSQLSession from "databricks-sql-nodejs/dist/contracts/IDBSQLSession"
import IOperation from "databricks-sql-nodejs/dist/contracts/IOperation"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const clientIds = searchParams.get("clientIds")?.split(",") || []

  if (!clientIds.length) {
    return NextResponse.json(
      { error: "No client IDs provided" },
      { status: 400 }
    )
  }

  // Sanitize input by ensuring all IDs are strings and wrapping in quotes
  const sanitizedIds = clientIds.map((id) => `'${id}'`).join(",")

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

    const storesOperation: IOperation = await session.executeStatement(
      `SELECT DISTINCT idRetailer, RET_ID 
       FROM cpfr_solution.tb_cpfr_dim_stores 
       WHERE idRetailer IN (${sanitizedIds})`
    )
    console.log("STORES QUERY EXECUTED")
    const storesResult = await storesOperation.fetchAll()
    await storesOperation.close()

    const mappedStoresResult = storesResult.map((item: any) => ({
      value: item.RET_ID,
      label: item.RET_ID,
    }))

    await session.close()
    console.log("SESSION CLOSED")
    await client.close()
    console.log("CLIENT CLOSED")

    return NextResponse.json(mappedStoresResult, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch stores" },
      { status: 500 }
    )
  }
}
