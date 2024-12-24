import { NextRequest, NextResponse } from "next/server"
import { DBSQLClient } from "databricks-sql-nodejs"
import IDBSQLSession from "databricks-sql-nodejs/dist/contracts/IDBSQLSession"
import IOperation from "databricks-sql-nodejs/dist/contracts/IOperation"

export async function GET(request: NextRequest) {
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

    const queryOperation: IOperation = await session.executeStatement(
      "select distinct idRetailer, cliente4_dsc_nestle from cpfr_solution.tb_cpfr_dim_stores limit 100"
      // "select distinct CATEGORIA from cpfr_solution.pbi_products"
    )
    console.log("QUERY EXECUTED")

    const result = await queryOperation.fetchAll()
    await queryOperation.close()
    console.table(result)

    await session.close()
    console.log("SESSION CLOSED")
    await client.close()
    console.log("CLIENT CLOSED")

    return NextResponse.json(result, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Failed to fetch data from Databricks" },
      { status: 500 }
    )
  }
}
