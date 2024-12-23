"use client"

import { Label } from "@/components/ui/label"
import { Check, ChevronDown } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { SelectValueType } from "@/types/test-dashboard"

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
  {
    value: "angular",
    label: "Angular",
  },
  {
    value: "vue",
    label: "Vue.js",
  },
  {
    value: "react",
    label: "React",
  },
  {
    value: "ember",
    label: "Ember.js",
  },
  {
    value: "gatsby",
    label: "Gatsby",
  },
  {
    value: "eleventy",
    label: "Eleventy",
  },
  {
    value: "solid",
    label: "SolidJS",
  },
  {
    value: "preact",
    label: "Preact",
  },
  {
    value: "qwik",
    label: "Qwik",
  },
  {
    value: "alpine",
    label: "Alpine.js",
  },
  {
    value: "lit",
    label: "Lit",
  },
]

export default function SearchSelect({
  label,
  placeholder,
  data,
  selected,
  onSelect,
  disabled,
}: {
  label: string
  placeholder: string
  data: Array<{ value: string; label: string }>
  selected: SelectValueType | null
  onSelect: (value: SelectValueType | null) => void
  disabled?: boolean
}) {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <div className="space-y-2">
      <Label htmlFor="select-client">{label}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="select-client"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            disabled={disabled}
            className="w-full justify-between bg-background px-3 font-normal"
          >
            <span
              className={cn("truncate", !selected && "text-muted-foreground")}
            >
              {selected ? selected.label : placeholder}
            </span>
            <ChevronDown size={16} strokeWidth={2} className="shrink-0" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder={`Search ${label.toLowerCase()}...`} />
            <CommandList>
              <CommandEmpty>No {label.toLowerCase()} found.</CommandEmpty>
              <CommandGroup>
                {data.map((item) => (
                  <CommandItem
                    key={item.value}
                    value={item.value}
                    onSelect={(currentValue) => {
                      onSelect(currentValue === selected?.value ? null : item)
                      setOpen(false)
                    }}
                  >
                    {item.label}
                    {selected?.value === item.value && (
                      <Check size={16} strokeWidth={2} className="ml-auto" />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
