import { create } from "zustand"
import { Option } from "@/components/ui/multiselect"

interface FilterState {
  selectedClients: Option[]
  selectedStores: Option[]
  selectedCategories: Option[]
  setSelectedClients: (clients: Option[]) => void
  setSelectedStores: (stores: Option[]) => void
  setSelectedCategories: (category: Option[]) => void
  resetFilters: () => void
}

export const useFilterStore = create<FilterState>((set) => ({
  selectedClients: [],
  selectedStores: [],
  selectedCategories: [],
  setSelectedClients: (clients) =>
    set({ selectedClients: clients, selectedStores: [] }),
  setSelectedStores: (stores) =>
    set({ selectedStores: stores, selectedCategories: [] }),
  setSelectedCategories: (category) =>
    set({
      selectedCategories: category,
    }),
  resetFilters: () =>
    set({
      selectedClients: [],
      selectedStores: [],
      selectedCategories: [],
    }),
}))
