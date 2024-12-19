"use client"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Filter } from "lucide-react"
import { DateRangePicker } from "./filters/date-range/DateRangeInput"
import MultiSelect from "./filters/multi-select/MultiSelect"
import { TestDashboardFilters } from "@/types/test-dashboard"
import { useState, useMemo, useEffect } from "react"
import { Option } from "@/components/ui/multiselect"

export default function FilterSheet({
  filters,
}: {
  filters: TestDashboardFilters
}) {
  const [selectedClients, setSelectedClients] = useState<Option[]>([])
  const [selectedStores, setSelectedStores] = useState<Option[]>([])

  // Add debugging console log
  useEffect(() => {
    console.log("Filters:", filters)
    console.log("Selected Clients:", selectedClients)
    console.log("Filtered Stores:", filteredStores)
    console.log("Selected Stores:", selectedStores)
  }, [filters, selectedClients])

  const filteredStores = useMemo(() => {
    if (selectedClients.length === 0) return []

    const selectedClientIds = selectedClients.map((client) => client.value)
    return filters.stores
      .filter((store) => selectedClientIds.includes(store.clientId as string))
      .map((store) => ({
        value: store.value,
        label: store.label,
        // clientId is omitted to match Option interface
      }))
  }, [selectedClients, filters.stores])

  const handleClientChange = (selected: Option[]) => {
    console.log("Client Change:", selected) // Debug log
    setSelectedClients(selected)
    setSelectedStores([]) // Clear stores when clients change
  }

  return (
    <Sheet>
      <SheetTrigger asChild className="size-10">
        <Button variant="outline">
          <Filter />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col items-start">
        <SheetHeader>{/* <SheetTitle>Filters</SheetTitle> */}</SheetHeader>
        <div className="flex w-full flex-col gap-5">
          {/* DATE RANGE */}
          <Label>Date Range</Label>
          <DateRangePicker
            onUpdate={(values) => console.log(values)}
            initialDateFrom="2024-01-01"
            initialDateTo="2024-12-31"
            align="end"
            locale="es"
            showCompare={false}
          />
          {/* CLIENT */}
          <MultiSelect
            label="Client"
            placeholder="Select client/s"
            data={filters.clients}
            onChange={handleClientChange}
            value={selectedClients}
          />
          {/* STORE */}
          <MultiSelect
            label="Store"
            placeholder="Select store/s"
            data={filteredStores}
            onChange={setSelectedStores}
            value={selectedStores}
            disabled={selectedClients.length === 0}
          />
          {/* PRODUCT */}
          {/* <MultiSelect
            label={"Product"}
            placeholder="Select product/s"
            data={filters.products}
          /> */}
        </div>

        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit" className="w-full">
              Apply Filters
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
