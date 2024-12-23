import { useQuery } from "@tanstack/react-query"
import { useFilterStore } from "@/store/filterStore"

export function useClientsQuery() {
  return useQuery({
    queryKey: ["clients"],
    queryFn: async () => {
      const response = await fetch("/api/filters/clients")
      if (!response.ok) throw new Error("Failed to fetch clients")
      return response.json()
    },
  })
}

export function useStoresQuery(
  clientIds: string[],
  options?: {
    enabled?: boolean
  }
) {
  return useQuery({
    queryKey: ["stores", clientIds],
    queryFn: async () => {
      const response = await fetch(
        `/api/filters/stores?clientIds=${clientIds.join(",")}`
      )
      if (!response.ok) throw new Error("Failed to fetch stores")
      return response.json()
    },
    enabled: options?.enabled ?? false,
  })
}

export function useCategoriesQuery(
  storeIds: string[],
  options?: {
    enabled?: boolean
  }
) {
  return useQuery({
    queryKey: ["categories", storeIds],
    queryFn: async () => {
      const response = await fetch(
        `/api/filters/stores?storeId=${storeIds.join(",")}`
      )
      if (!response.ok) throw new Error("Failed to fetch stores")
      return response.json()
    },
    enabled: options?.enabled ?? false,
  })
}
