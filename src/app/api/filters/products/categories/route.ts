import { NextResponse } from "next/server"
import { DBSQLClient } from "databricks-sql-nodejs"
import IDBSQLSession from "databricks-sql-nodejs/dist/contracts/IDBSQLSession"
import IOperation from "databricks-sql-nodejs/dist/contracts/IOperation"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const storeIds = searchParams.get("storeIds")?.split(",") || []

  if (!storeIds.length) {
    return NextResponse.json(
      { error: "No client IDs provided" },
      { status: 400 }
    )
  }

  // Sanitize input by ensuring all IDs are strings and wrapping in quotes
  const sanitizedIds = storeIds.map((id) => `'${id}'`).join(",")

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

    const categoriesOperation: IOperation = await session.executeStatement("")
    console.log("PRODUCTS QUERY EXECUTED")
    const productsResult = await categoriesOperation.fetchAll()
    await categoriesOperation.close()

    const mappedProductsResult = productsResult.map((item: any) => ({
      value: item.SKU_ID,
      label: item.DESCRIPCION_DSC,
    }))

    await session.close()
    console.log("SESSION CLOSED")
    await client.close()
    console.log("CLIENT CLOSED")

    return NextResponse.json(mappedProductsResult, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch stores" },
      { status: 500 }
    )
  }
}
