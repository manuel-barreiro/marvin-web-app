import { create } from "zustand"
import { Option } from "@/components/ui/multiselect"

export type FilterType = string

export interface FilterConfig {
  label: string
  excludeOptions?: FilterType[]
  isTerminal?: boolean
}

interface FilterState {
  filterConfigs: Record<FilterType, FilterConfig>
  activeFilters: FilterType[]
  selectedFilters: Record<FilterType, Option[]>
  setFilterConfigs: (configs: Record<FilterType, FilterConfig>) => void
  setActiveFilters: (filters: FilterType[]) => void
  setSelectedFilters: (type: FilterType, options: Option[]) => void
  addFilter: (type: FilterType) => void
  removeFilter: (index: number) => void
  getAvailableFilterTypes: () => FilterType[]
  resetFilters: () => void
}

export const useFilterStore = create<FilterState>((set, get) => ({
  filterConfigs: {},
  activeFilters: [],
  selectedFilters: {},
  setFilterConfigs: (configs) => set({ filterConfigs: configs }),
  setActiveFilters: (filters) => set({ activeFilters: filters }),
  setSelectedFilters: (type, options) =>
    set((state) => ({
      selectedFilters: {
        ...state.selectedFilters,
        [type]: options,
      },
    })),
  addFilter: (type) =>
    set((state) => ({
      activeFilters: [...state.activeFilters, type],
    })),
  removeFilter: (index) =>
    set((state) => {
      const newActiveFilters = state.activeFilters.filter((_, i) => i !== index)
      const newSelectedFilters = { ...state.selectedFilters }
      delete newSelectedFilters[state.activeFilters[index]]
      return {
        activeFilters: newActiveFilters,
        selectedFilters: newSelectedFilters,
      }
    }),
  getAvailableFilterTypes: () => {
    const { filterConfigs, activeFilters } = get()
    const allFilterTypes = Object.keys(filterConfigs)
    const excludedTypes = new Set(
      activeFilters.flatMap(
        (filter) => filterConfigs[filter].excludeOptions || []
      )
    )
    return allFilterTypes.filter(
      (type) => !excludedTypes.has(type) && !activeFilters.includes(type)
    )
  },
  resetFilters: () =>
    set({
      activeFilters: [],
      selectedFilters: {},
    }),
}))
