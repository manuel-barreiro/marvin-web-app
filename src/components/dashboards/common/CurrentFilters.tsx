"use client"
import React from "react"
import { useFilterStore } from "@/store/filterStore"
import { Badge } from "@/components/ui/badge"

export default function CurrentFilters() {
  const { activeFilters } = useFilterStore()
  return (
    <div className="flex gap-2">
      {activeFilters.map((filter) => (
        <Badge key={filter} className="">
          {filter}
        </Badge>
      ))}
    </div>
  )
}
