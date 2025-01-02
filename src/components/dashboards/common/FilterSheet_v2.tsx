"use client"

import { useState, useMemo, useEffect } from "react"
import {
  useFilterStore,
  FILTER_TYPES,
  FilterType,
  FILTER_HIERARCHY,
} from "@/store/filterStore"
import { useFilterQuery } from "@/hooks/useFilters"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"
import MultiSelect from "./filters/multi-select/MultiSelect"
import { Option } from "@/components/ui/multiselect"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function FilterSheet() {
  const {
    activeFilters,
    selectedFilters,
    setActiveFilters,
    setSelectedFilters,
  } = useFilterStore()

  const [isAddingFilter, setIsAddingFilter] = useState(false)

  useEffect(() => {
    console.log(activeFilters)
  }, [activeFilters])

  const availableFilterTypes = useMemo(() => {
    if (activeFilters.length === 0) {
      return Object.keys(FILTER_TYPES) as FilterType[]
    }

    const lastActiveFilter = activeFilters[activeFilters.length - 1]
    return FILTER_HIERARCHY[lastActiveFilter]
  }, [activeFilters])

  const handleAddFilter = (type: FilterType) => {
    setActiveFilters([...activeFilters, type])
    setIsAddingFilter(false)
  }

  const handleRemoveFilter = (index: number) => {
    const newActiveFilters = activeFilters.slice(0, index)
    setActiveFilters(newActiveFilters)

    // Reset selected filters for removed filter and its dependents
    const removedFilter = activeFilters[index]
    const filtersToReset = [removedFilter, ...FILTER_HIERARCHY[removedFilter]]
    filtersToReset.forEach((filterType) => {
      setSelectedFilters(filterType, [])
    })
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
          {activeFilters.map((filterType, index) => (
            <FilterComponent
              key={`${filterType}-${index}`}
              filterType={filterType}
              index={index}
              onRemove={handleRemoveFilter}
            />
          ))}

          {!isAddingFilter &&
            activeFilters.length < Object.keys(FILTER_TYPES).length && (
              <Button variant="link" onClick={() => setIsAddingFilter(true)}>
                + Add Filter
              </Button>
            )}

          {isAddingFilter && availableFilterTypes.length > 0 && (
            <Select
              onValueChange={(value) => handleAddFilter(value as FilterType)}
            >
              <SelectTrigger>
                <SelectValue placeholder="+ Select New Filter" />
              </SelectTrigger>
              <SelectContent>
                {availableFilterTypes.map((type) => (
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

interface FilterComponentProps {
  filterType: FilterType
  index: number
  onRemove: (index: number) => void
}

function FilterComponent({
  filterType,
  index,
  onRemove,
}: FilterComponentProps) {
  const { activeFilters, selectedFilters, setSelectedFilters } =
    useFilterStore()

  const dependentFilters = useMemo(() => {
    const filters: Record<FilterType, string[]> = {
      CLIENT: [],
      STORE: [],
      BUSINESS_GROUP: [],
      CATEGORY: [],
      MATERIAL_GROUP: [],
      SKU_ID: [],
    }
    for (let i = 0; i < index; i++) {
      const type = activeFilters[i]
      filters[type] = selectedFilters[type].map((option) => option.value)
    }
    return filters
  }, [activeFilters, index, selectedFilters])

  // const { data, isLoading } = useFilterQuery(filterType, dependentFilters)

  const handleChange = (options: Option[]) => {
    setSelectedFilters(filterType, options)

    // Reset dependent filters
    const dependentFiltersToReset = FILTER_HIERARCHY[filterType]
    dependentFiltersToReset.forEach((dependentFilter) => {
      if (activeFilters.includes(dependentFilter)) {
        setSelectedFilters(dependentFilter, [])
      }
    })
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{FILTER_TYPES[filterType]}</span>
        <Button variant="ghost" size="sm" onClick={() => onRemove(index)}>
          Remove
        </Button>
      </div>
      <MultiSelect
        placeholder={`Select ${FILTER_TYPES[filterType].toLowerCase()}/s`}
        // data={data || []}
        data={[]}
        onChange={handleChange}
        value={selectedFilters[filterType]}
        // disabled={isLoading}
      />
    </div>
  )
}
