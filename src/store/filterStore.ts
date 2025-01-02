import { create } from "zustand"
import { Option } from "@/components/ui/multiselect"

export const FILTER_TYPES = {
  CLIENT: "Client",
  STORE: "Store",
  BUSINESS_GROUP: "Business Group",
  CATEGORY: "Category",
  MATERIAL_GROUP: "Material Group",
  SKU_ID: "SKU",
} as const

export type FilterType = keyof typeof FILTER_TYPES

export const FILTER_HIERARCHY: Record<FilterType, FilterType[]> = {
  CLIENT: ["STORE", "BUSINESS_GROUP", "CATEGORY", "MATERIAL_GROUP", "SKU_ID"],
  STORE: ["CATEGORY", "MATERIAL_GROUP", "SKU_ID"],
  BUSINESS_GROUP: ["CATEGORY", "MATERIAL_GROUP", "SKU_ID"],
  CATEGORY: ["MATERIAL_GROUP", "SKU_ID"],
  MATERIAL_GROUP: ["SKU_ID"],
  SKU_ID: [],
}

interface FilterState {
  activeFilters: FilterType[]
  selectedFilters: Record<FilterType, Option[]>
  setActiveFilters: (filters: FilterType[]) => void
  setSelectedFilters: (type: FilterType, options: Option[]) => void
  resetFilters: () => void
}

export const useFilterStore = create<FilterState>((set) => ({
  activeFilters: [],
  selectedFilters: {
    CLIENT: [],
    STORE: [],
    BUSINESS_GROUP: [],
    CATEGORY: [],
    MATERIAL_GROUP: [],
    SKU_ID: [],
  },
  setActiveFilters: (filters) => set({ activeFilters: filters }),
  setSelectedFilters: (type, options) =>
    set((state) => ({
      selectedFilters: {
        ...state.selectedFilters,
        [type]: options,
      },
    })),
  resetFilters: () =>
    set({
      activeFilters: [],
      selectedFilters: {
        CLIENT: [],
        STORE: [],
        BUSINESS_GROUP: [],
        CATEGORY: [],
        MATERIAL_GROUP: [],
        SKU_ID: [],
      },
    }),
}))
