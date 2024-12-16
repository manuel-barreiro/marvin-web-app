// import { getConnection } from "@/databricks/connection"

// export async function getTestDashboardData(period: string, category: string) {
//   const { session } = await getConnection()

//   const query = `
//     SELECT 
//       week,
//       forecast_v0,
//       forecast_v1,
//       venta_unidades as ventaUnidades,
//       ventas_pyw as ventasPYW,
//       accuracy_v0,
//       accuracy_v1
//     FROM your_table
//     WHERE period = '${period}'
//     AND category = '${category}'
//     ORDER BY week
//   `

//   try {
//     const operation = await session.executeStatement(query)
//     const result = await operation.fetchAll()
//     await operation.close()
//     return result
//   } catch (error) {
//     console.error("Query error:", error)
//     throw error
//   }
// }
