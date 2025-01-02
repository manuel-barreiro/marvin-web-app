import { useQuery } from "@tanstack/react-query"
import { FilterType, FILTER_HIERARCHY } from "@/store/filterStore"

// Helper function to build the API endpoint based on the filter type
const getFilterEndpoint = (filterType: FilterType) => {
  console.log(`/api/filters/${filterType.toLowerCase()}`)
  return `/api/filters/${filterType.toLowerCase()}`
}

// Helper function to build query parameters
const buildQueryParams = (dependentFilters: Record<FilterType, string[]>) => {
  const params = new URLSearchParams()
  Object.entries(dependentFilters).forEach(([filterType, values]) => {
    if (values.length > 0) {
      params.append(`${filterType.toLowerCase()}Ids`, values.join(","))
    }
  })
  return params.toString()
}

export function useFilterQuery(
  filterType: FilterType,
  dependentFilters: Record<FilterType, string[]>,
  options?: {
    enabled?: boolean
  }
) {
  return useQuery({
    queryKey: [filterType, dependentFilters],
    queryFn: async () => {
      const endpoint = getFilterEndpoint(filterType)
      const queryParams = buildQueryParams(dependentFilters)
      const url = `${endpoint}${queryParams ? `?${queryParams}` : ""}`
      console.log("useFilterQuery", url)

      const response = await fetch(url)
      if (!response.ok) throw new Error(`Failed to fetch ${filterType}`)
      return response.json()
    },
    enabled: options?.enabled ?? true,
  })
}

export function useFilterOptions(
  filterType: FilterType,
  activeFilters: FilterType[],
  selectedFilters: Record<FilterType, string[]>
) {
  const dependentFilters = getDependentFilters(
    filterType,
    activeFilters,
    selectedFilters
  )
  return useFilterQuery(filterType, dependentFilters)
}

// Helper function to get dependent filters based on the filter hierarchy
function getDependentFilters(
  filterType: FilterType,
  activeFilters: FilterType[],
  selectedFilters: Record<FilterType, string[]>
): Record<FilterType, string[]> {
  const dependentFilters: Record<FilterType, string[]> = {
    CLIENT: [],
    STORE: [],
    BUSINESS_GROUP: [],
    CATEGORY: [],
    MATERIAL_GROUP: [],
    SKU_ID: [],
  }
  const filterIndex = activeFilters.indexOf(filterType)

  if (filterIndex > 0) {
    for (let i = 0; i < filterIndex; i++) {
      const parentFilter = activeFilters[i]
      if (FILTER_HIERARCHY[parentFilter].includes(filterType)) {
        dependentFilters[parentFilter] = selectedFilters[parentFilter]
      }
    }
  }

  return dependentFilters
}
