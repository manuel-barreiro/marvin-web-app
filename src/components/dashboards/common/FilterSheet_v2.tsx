"use client"
import { useFilterStore } from "@/store/filterStore"
import {
  useClientsQuery,
  useCategoriesQuery,
  useStoresQuery,
} from "@/hooks/useFilters"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Filter, Loader2, Plus } from "lucide-react"
import MultiSelect from "./filters/multi-select/MultiSelect"
import { useCallback, useState } from "react"
import { TestDashboardFilters } from "@/types/test-dashboard"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const FILTER_TYPES = {
  CLIENT: "Client",
  STORE: "Store",
  BUSINESS_GROUP: "Business Group",
  CATEGORY: "Category",
  MATERIAL_GROUP: "Material Group",
  SKU_ID: "SKU",
} as const

type FilterType = keyof typeof FILTER_TYPES

interface ActiveFilter {
  type: FilterType
  isLoading: boolean
}

export default function FilterSheet({
  filters,
}: {
  filters: TestDashboardFilters
}) {
  const [activeFilters, setActiveFilters] = useState<ActiveFilter[]>([])
  const {
    selectedClients,
    selectedStores,
    setSelectedClients,
    setSelectedStores,
  } = useFilterStore()

  // Data fetching hooks
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

  const handleAddFilter = (type: FilterType) => {
    setActiveFilters((prev) => [...prev, { type, isLoading: false }])
  }

  const handleRemoveFilter = (index: number) => {
    setActiveFilters((prev) => prev.filter((_, i) => i !== index))
  }

  const getAvailableFilterTypes = () => {
    const usedTypes = activeFilters.map((f) => f.type)
    return Object.keys(FILTER_TYPES).filter(
      (type) => !usedTypes.includes(type as FilterType)
    ) as FilterType[]
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <div className="flex flex-col gap-4">
          {/* Active Filters */}
          {activeFilters.map((filter, index) => (
            <div
              key={`${filter.type}-${index}`}
              className="flex flex-col gap-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  {FILTER_TYPES[filter.type]}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveFilter(index)}
                >
                  Remove
                </Button>
              </div>

              {/* Render appropriate filter component based on type */}
              {filter.type === "CLIENT" && (
                <MultiSelect
                  placeholder="Select client/s"
                  data={filters.clients || []}
                  onChange={setSelectedClients}
                  value={selectedClients}
                />
              )}

              {filter.type === "STORE" && (
                <MultiSelect
                  placeholder="Select store/s"
                  data={stores || []}
                  onChange={setSelectedStores}
                  value={selectedStores}
                  disabled={!stores}
                />
              )}
              {/* Add other filter type components here */}
            </div>
          ))}

          {/* Add Filter Button */}
          {getAvailableFilterTypes().length > 0 && (
            <Select
              onValueChange={(value) => handleAddFilter(value as FilterType)}
            >
              <SelectTrigger>
                <SelectValue placeholder="+ Add Filter" />
              </SelectTrigger>
              <SelectContent>
                {getAvailableFilterTypes().map((type) => (
                  <SelectItem key={type} value={type}>
                    {FILTER_TYPES[type]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
