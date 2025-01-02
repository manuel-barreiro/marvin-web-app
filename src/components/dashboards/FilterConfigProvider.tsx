"use client"

import { useEffect } from "react"
import { useFilterStore, FilterConfig } from "@/store/filterStore"

interface FilterConfigProviderProps {
  configs: Record<string, FilterConfig>
  children: React.ReactNode
}

export function FilterConfigProvider({
  configs,
  children,
}: FilterConfigProviderProps) {
  const setFilterConfigs = useFilterStore((state) => state.setFilterConfigs)

  useEffect(() => {
    setFilterConfigs(configs)
  }, [configs, setFilterConfigs])

  return <>{children}</>
}
