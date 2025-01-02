import { DBSQLClient } from "databricks-sql-nodejs"
import IDBSQLSession from "databricks-sql-nodejs/dist/contracts/IDBSQLSession"
import IOperation from "databricks-sql-nodejs/dist/contracts/IOperation"

let client: DBSQLClient | null = null
let session: IDBSQLSession | null = null

export async function getConnection(): Promise<{
  client: DBSQLClient
  session: IDBSQLSession
}> {
  if (client && session) {
    return { client, session }
  }

  const serverHostname: string = process.env.DATABRICKS_SERVER_HOSTNAME || ""
  const httpPath: string = process.env.DATABRICKS_HTTP_PATH || ""
  const token: string = process.env.DATABRICKS_TOKEN || ""

  if (serverHostname === "" || httpPath === "" || token === "") {
    throw new Error("Missing required environment variables")
  }

  try {
    client = new DBSQLClient()
    const connectOptions = {
      host: serverHostname,
      path: httpPath,
      token: token,
    }

    await client.connect(connectOptions)
    session = await client.openSession()

    return { client, session }
  } catch (error) {
    console.error("Error connecting to Databricks:", error)
    throw error
  }
}

export async function executeQuery(query: string): Promise<any[]> {
  const { session } = await getConnection()

  try {
    const queryOperation: IOperation = await session.executeStatement(query)
    const result = await queryOperation.fetchAll()
    await queryOperation.close()
    return result
  } catch (error) {
    console.error("Error executing query:", error)
    throw error
  }
}

export async function closeConnection() {
  if (session) {
    await session.close()
    session = null
  }
  if (client) {
    await client.close()
    client = null
  }
}
