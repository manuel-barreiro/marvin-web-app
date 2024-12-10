"use client"
import { ChevronRight, Home } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const routeMap: { [key: string]: string } = {
  "sell-out": "Sell Out",
  "sell-in": "Sell In",
  test: "Test",
  "last-projection": "Última Proyección",
  "accuracy-acid": "Accuracy",
  "price-is-doh": "Precio, IS & DOH",
  "replenishment-model-last-projection": "In Stock & DOH",
  "control-validation": "Control & Validacion",
}

export default function AppBreadcrumbs() {
  const pathname = usePathname()

  // Return null if we're on the homepage
  if (pathname === "/") return null

  // Split pathname into segments and remove empty strings
  const segments = pathname.split("/").filter(Boolean)

  // Generate breadcrumb items
  const breadcrumbItems = segments.map((segment, index) => {
    // Build up the URL for this segment
    const url = "/" + segments.slice(0, index + 1).join("/")

    // Get the display title from our route map, or capitalize the segment
    const title =
      routeMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1)

    return {
      title,
      url,
    }
  })

  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground">
      <Link
        href="/"
        className="flex items-center transition-colors hover:text-foreground"
      >
        <Home className="h-4 w-4" />
      </Link>

      {breadcrumbItems.map((item, index) => (
        <div key={item.url} className="flex items-center">
          <ChevronRight className="h-4 w-4" />
          <span
            className={`transition-colors hover:text-foreground ${
              index === breadcrumbItems.length - 1
                ? "font-medium text-foreground"
                : ""
            }`}
          >
            {item.title}
          </span>
        </div>
      ))}
    </nav>
  )
}
