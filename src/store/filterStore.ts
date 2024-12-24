import { create } from "zustand"
import { Option } from "@/components/ui/multiselect"

interface FilterState {
  selectedClients: Option[]
  selectedStores: Option[]
  selectedCategories: Option[]
  selectedMaterialGroups: Option[]
  selectedBusinessGroups: Option[]
  selectedSkuIDs: Option[]
  setSelectedClients: (clients: Option[]) => void
  setSelectedStores: (stores: Option[]) => void
  setSelectedCategories: (category: Option[]) => void
  setSelectedMaterialGroups: (groups: Option[]) => void
  setSelectedBusinessGroups: (groups: Option[]) => void
  setSelectedSkuIDs: (skus: Option[]) => void
  resetFilters: () => void
}

export const useFilterStore = create<FilterState>((set) => ({
  selectedClients: [],
  selectedStores: [],
  selectedCategories: [],
  selectedMaterialGroups: [],
  selectedBusinessGroups: [],
  selectedSkuIDs: [],
  setSelectedClients: (clients) =>
    set({ selectedClients: clients, selectedStores: [] }),
  setSelectedStores: (stores) =>
    set({ selectedStores: stores, selectedCategories: [] }),
  setSelectedCategories: (category) =>
    set({
      selectedCategories: category,
      selectedMaterialGroups: [],
    }),
  setSelectedMaterialGroups: (groups) =>
    set({
      selectedMaterialGroups: groups,
      selectedSkuIDs: [],
    }),
  setSelectedBusinessGroups: (groups) =>
    set({ selectedBusinessGroups: groups }),
  setSelectedSkuIDs: (skus) => set({ selectedSkuIDs: skus }),
  resetFilters: () =>
    set({
      selectedClients: [],
      selectedStores: [],
      selectedCategories: [],
      selectedMaterialGroups: [],
      selectedBusinessGroups: [],
      selectedSkuIDs: [],
    }),
}))
