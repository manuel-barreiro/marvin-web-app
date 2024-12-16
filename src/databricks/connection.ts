// import { DBSQLClient } from "@databricks/sql"

// let clientPool: DBSQLClient | null = null
// let sessionPool: any | null = null

// export const getConnection = async () => {
//   try {
//     if (!clientPool) {
//       clientPool = new DBSQLClient()
//       await clientPool.connect({
//         token: process.env.DATABRICKS_TOKEN!,
//         host: process.env.DATABRICKS_HOST!,
//         path: process.env.DATABRICKS_PATH!,
//       })
//       sessionPool = await clientPool.openSession()
//     }
//     return { client: clientPool, session: sessionPool }
//   } catch (error) {
//     console.error("Connection error:", error)
//     throw error
//   }
// }

// export async function testConnection() {
//   try {
//     const { client, session } = await getConnection()
//     console.log("✅ Databricks connection successful")
//     return true
//   } catch (error) {
//     console.error("❌ Databricks connection error:", error)
//     return false
//   }
// }
