"use client"
import { useFilterStore } from "@/store/filterStore"
import {
  useClientsQuery,
  useCategoriesQuery,
  useStoresQuery,
} from "@/hooks/useFilters"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Filter, Loader2 } from "lucide-react"
import MultiSelect from "./filters/multi-select/MultiSelect"
import { useCallback, useEffect, useState } from "react"
import { TestDashboardFilters } from "@/types/test-dashboard"

export default function FilterSheet({
  filters,
}: {
  filters: TestDashboardFilters
}) {
  const [clientsModified, setClientsModified] = useState(false)
  const {
    selectedClients,
    selectedStores,
    selectedCategories,
    setSelectedClients,
    setSelectedStores,
    setSelectedCategories,
  } = useFilterStore()

  const {
    data: stores,
    isLoading: isLoadingStores,
    refetch: refetchStores,
  } = useStoresQuery(
    selectedClients.map((c) => c.value),
    {
      enabled: false,
    }
  )

  const {
    data: categories,
    isLoading: isLoadingCategories,
    refetch: refetchCategories,
  } = useStoresQuery(
    selectedStores.map((c) => c.value),
    {
      enabled: false,
    }
  )

  const handleFetchStores = useCallback(() => {
    if (selectedClients.length > 0) {
      refetchStores()
    }
  }, [selectedClients, refetchStores])

  return (
    <Sheet>
      <SheetTrigger asChild className="size-10">
        <Button variant="outline">
          <Filter />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <div className="flex flex-col gap-5">
          {/* SSR CLIENTS - CACHED ON BUILD */}
          <MultiSelect
            label="Client"
            placeholder="Select client/s"
            data={filters.clients || []}
            onChange={setSelectedClients}
            value={selectedClients}
            disabled={false}
          />

          {/* LOAD CLIENT STORES */}
          {!stores && (
            <Button
              onClick={handleFetchStores}
              variant={"link"}
              disabled={
                selectedClients.length === 0 ||
                isLoadingStores ||
                (!clientsModified && stores)
              }
              className="w-full"
            >
              {isLoadingStores ? (
                <div className="flex items-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading stores...
                </div>
              ) : (
                "+ Filter by Store"
              )}
            </Button>
          )}

          {/* STORES - BASED IN CLIENT SELECTION */}
          {stores && (
            <MultiSelect
              label="Store"
              placeholder="Select store/s"
              data={stores || []}
              onChange={setSelectedStores}
              value={selectedStores}
              disabled={selectedClients.length === 0 || !stores}
            />
          )}

          {/* LOAD CLIENT + STORES CATEGORIES*/}
          {/* {!stores && (
            <Button
              onClick={handleFetchStores}
              variant={"link"}
              disabled={
                selectedClients.length === 0 ||
                isLoadingStores ||
                (!clientsModified && stores)
              }
              className="w-full"
            >
              {isLoadingStores ? (
                <div className="flex items-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading stores...
                </div>
              ) : (
                "+ Filter by Store"
              )}
            </Button>
          )} */}
        </div>
      </SheetContent>
    </Sheet>
  )
}
