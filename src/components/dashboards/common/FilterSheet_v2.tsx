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

// Define which filters are allowed after selecting each filter type
const FILTER_RELATIONSHIPS: Record<FilterType, FilterType[]> = {
  CLIENT: ["STORE", "CATEGORY", "BUSINESS_GROUP", "MATERIAL_GROUP", "SKU_ID"],
  STORE: ["CATEGORY", "BUSINESS_GROUP", "MATERIAL_GROUP", "SKU_ID"],
  BUSINESS_GROUP: ["CATEGORY", "MATERIAL_GROUP", "CLIENT", "STORE", "SKU_ID"],
  CATEGORY: ["CLIENT", "STORE", "MATERIAL_GROUP", "SKU_ID"],
  MATERIAL_GROUP: ["CATEGORY", "BUSINESS_GROUP", "CLIENT", "STORE", "SKU_ID"],
  SKU_ID: ["CLIENT", "STORE"],
} as const

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
  const [enableAddFilter, setEnableAddFilter] = useState(false)
  const {
    selectedClients,
    selectedStores,
    selectedCategories,
    selectedMaterialGroups,
    selectedBusinessGroups,
    selectedSkuIDs,
    setSelectedClients,
    setSelectedStores,
    setSelectedCategories,
    setSelectedMaterialGroups,
    setSelectedBusinessGroups,
    setSelectedSkuIDs,
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
    setEnableAddFilter(false)
  }

  const handleRemoveFilter = (index: number) => {
    setActiveFilters((prev) => prev.filter((_, i) => i !== index))
  }

  const getAvailableFilterTypes = () => {
    const usedTypes = activeFilters.map((f) => f.type)

    // If no filters selected, all types are available
    if (usedTypes.length === 0) {
      return Object.keys(FILTER_TYPES) as FilterType[]
    }

    // Get allowed filters based on current selections
    const allowedFilters = usedTypes.reduce((allowed, currentFilter) => {
      return [...allowed, ...FILTER_RELATIONSHIPS[currentFilter]]
    }, [] as FilterType[])

    // Return unique allowed filters that haven't been used yet
    return [...new Set(allowedFilters)].filter(
      (type) => !usedTypes.includes(type)
    )
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

              {filter.type === "CATEGORY" && (
                <MultiSelect
                  placeholder="Select category/ies"
                  data={stores || []}
                  onChange={setSelectedCategories}
                  value={selectedCategories}
                  // disabled={!categories}
                />
              )}

              {filter.type === "BUSINESS_GROUP" && (
                <MultiSelect
                  placeholder="Select business group/s"
                  data={stores || []}
                  onChange={setSelectedBusinessGroups}
                  value={selectedBusinessGroups}
                  // disabled={!businessGroups}
                />
              )}

              {filter.type === "MATERIAL_GROUP" && (
                <MultiSelect
                  placeholder="Select material group/s"
                  data={stores || []}
                  onChange={setSelectedMaterialGroups}
                  value={selectedMaterialGroups}
                  // disabled={!materialGroups}
                />
              )}

              {filter.type === "SKU_ID" && (
                <MultiSelect
                  placeholder="Select SKU ID/s"
                  data={stores || []}
                  onChange={setSelectedSkuIDs}
                  value={selectedSkuIDs}
                  // disabled={!skuIDs}
                />
              )}
              {/* Add other filter type components here */}
            </div>
          ))}

          {!enableAddFilter && (
            <Button variant={"link"} onClick={() => setEnableAddFilter(true)}>
              + Add Filter
            </Button>
          )}
          {/* Add Filter Button */}
          {getAvailableFilterTypes().length > 0 && enableAddFilter && (
            <Select
              onValueChange={(value) => handleAddFilter(value as FilterType)}
            >
              <SelectTrigger>
                <SelectValue placeholder="+ Select New Filter" />
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
