"use client"
import { useState } from "react"
import { useFilterStore, FilterType } from "@/store/filterStore"
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
    filterConfigs,
    activeFilters,
    selectedFilters,
    addFilter,
    removeFilter,
    setSelectedFilters,
    getAvailableFilterTypes,
  } = useFilterStore()

  const [isAddingFilter, setIsAddingFilter] = useState(false)

  const availableFilterTypes = getAvailableFilterTypes()

  const handleAddFilter = (type: FilterType) => {
    addFilter(type)
    setIsAddingFilter(false)
  }

  const handleRemoveFilter = (index: number) => {
    removeFilter(index)
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
            availableFilterTypes.length > 0 &&
            !filterConfigs[activeFilters[activeFilters.length - 1]]
              ?.isTerminal && (
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
                    {filterConfigs[type].label}
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
  const { filterConfigs, selectedFilters, setSelectedFilters } =
    useFilterStore()

  const handleChange = (options: Option[]) => {
    setSelectedFilters(filterType, options)
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">
          {filterConfigs[filterType].label}
        </span>
        <Button variant="ghost" size="sm" onClick={() => onRemove(index)}>
          Remove
        </Button>
      </div>
      <MultiSelect
        placeholder={`Select ${filterConfigs[filterType].label.toLowerCase()}/s`}
        data={[]} // You'll need to implement a way to fetch this data
        onChange={handleChange}
        value={selectedFilters[filterType] || []}
      />
    </div>
  )
}
