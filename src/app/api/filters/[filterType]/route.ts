import { NextRequest, NextResponse } from "next/server"
import { FilterType, FILTER_TYPES } from "@/store/filterStore"
import { executeQuery, closeConnection } from "@/lib/databricks"

export async function GET(
  request: NextRequest,
  { params }: { params: { filterType: string } }
) {
  const filterType = params.filterType.toUpperCase() as FilterType

  if (!Object.keys(FILTER_TYPES).includes(filterType)) {
    return NextResponse.json({ error: "Invalid filter type" }, { status: 400 })
  }

  const searchParams = request.nextUrl.searchParams
  const dependentFilters: Record<string, string[]> = {}

  // Extract dependent filter values from query parameters
  for (const [key, value] of searchParams.entries()) {
    if (key.endsWith("Ids")) {
      const filterKey = key.replace("Ids", "").toUpperCase() as FilterType
      dependentFilters[filterKey] = value.split(",")
    }
  }

  try {
    const options = await fetchFilterOptions(filterType, dependentFilters)
    await closeConnection()
    return NextResponse.json(options)
  } catch (error) {
    console.error("Error fetching filter options:", error)
    await closeConnection()
    return NextResponse.json(
      { error: "Failed to fetch filter options" },
      { status: 500 }
    )
  }
}

async function fetchFilterOptions(
  filterType: FilterType,
  dependentFilters: Record<string, string[]>
): Promise<{ value: string; label: string }[]> {
  let query =
    "select distinct idRetailer, cliente4_dsc_nestle from cpfr_solution.tb_cpfr_dim_stores"

  const whereConditions: string[] = []

  Object.entries(dependentFilters).forEach(([key, values]) => {
    if (values.length > 0) {
      whereConditions.push(
        `${key.toLowerCase()} IN (${values.map(() => "?").join(", ")})`
      )
    }
  })

  if (whereConditions.length > 0) {
    query += ` WHERE ${whereConditions.join(" AND ")}`
  }

  // query += ` AND idRetailer IS NOT NULL AND cliente4_dsc_nestle IS NOT NULL`

  const result = await executeQuery(query)
  console.log(
    result
      .filter((row) => row.idRetailer && row.cliente4_dsc_nestle)
      .map((row) => ({
        value: row.idRetailer,
        label: row.cliente4_dsc_nestle,
      }))
  )
  return result
    .filter((row) => row.idRetailer && row.cliente4_dsc_nestle)
    .map((row) => ({
      value: row.idRetailer,
      label: row.cliente4_dsc_nestle,
    }))
}
