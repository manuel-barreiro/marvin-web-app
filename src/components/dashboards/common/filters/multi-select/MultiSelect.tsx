import { Label } from "@/components/ui/label"
import MultipleSelector, { Option } from "@/components/ui/multiselect"

const frameworks: Option[] = [
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

export default function MultiSelect({
  label,
  placeholder,
  data,
  onChange,
  // onSearch,
  disabled,
  value, // Add this
}: {
  label?: string
  placeholder?: string
  data?: Option[]
  onChange?: (selected: Option[]) => void
  // onSearch?: (value: string) => Promise<Option[]>
  disabled?: boolean
  value?: Option[] // Add this
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <MultipleSelector
        value={value} // Add this
        disabled={disabled}
        onChange={onChange}
        // onSearch={onSearch}
        hidePlaceholderWhenSelected
        commandProps={{
          label: placeholder,
        }}
        // defaultOptions={data}
        placeholder={placeholder}
        options={data || frameworks}
        emptyIndicator={<p className="text-center text-sm">No results found</p>}
      />
    </div>
  )
}
