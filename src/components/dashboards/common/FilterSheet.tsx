"use client"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Filter } from "lucide-react"
import { DateRangePicker } from "./filters/date-range/DateRangeInput"
import MultiSelect from "./filters/multi-select/MultiSelect"
import { TestDashboardFilters } from "@/types/test-dashboard"

export default function FilterSheet(filters: TestDashboardFilters) {
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
          <MultiSelect label={"Client"} placeholder="Select client/s" />
          {/* STORE */}
          <MultiSelect label={"Store"} placeholder="Select store/s" />
          {/* PRODUCT */}
          <MultiSelect label={"Product"} placeholder="Select product/s" />
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
