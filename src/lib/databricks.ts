// import { DBSQLClient } from "databricks-sql-nodejs"

// let clientPool: DBSQLClient | null = null
// let sessionPool: any | null = null

// const getConnection = async () => {
//   try {
//     if (!clientPool) {
//       clientPool = new DBSQLClient()
//       await clientPool.connect({
//         token: process.env.DATABRICKS_TOKEN!,
//         host: process.env.DATABRICKS_HOST!,
//         path: process.env.DATABRICKS_PATH!,
//       })
//       sessionPool = await clientPool.openSession()

//       const queryOperation = await sessionPool.executeStatement('SELECT DISTINCT idRetailer, cliente4_dsc_nestle FROM cpfr_solution.tb_cpfr_dim_stores');
//       const result = await queryOperation.fetchAll();
//       await queryOperation.close();  
//       await sessionPool.close();
//       await clientPool.close();
//     }
//     console.log("✅ getConnection - Databricks connection established successfully")
//     // console.log(clientPool, sessionPool)
//     return { client: clientPool, session: sessionPool }
//   } catch (error) {
//     console.error("Connection error:", error)
//     throw error
//   }
// }

// export async function testConnection() {
//   try {
//     const { client, session } = await getConnection()
//     return  {
//       success: true,
//       message: "✅ Databricks connection established successfully",
//     }
//   } catch (error) {
//       console.error("❌ Databricks Connection Test Failed:", error)
//       return {
//         success: false,
//         message:
//           error instanceof Error ? error.message : "❌ Unknown connection error",
//       }
//     }
// }
