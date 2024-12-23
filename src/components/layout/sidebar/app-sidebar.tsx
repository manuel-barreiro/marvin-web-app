"use client"

import * as React from "react"
import { Settings2, Home, ShoppingCart, Store } from "lucide-react"
import { NavMain } from "@/components/layout/sidebar/nav-main"
import { NavUser } from "@/components/layout/sidebar/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from "next/image"
import Link from "next/link"
import ThemeToggle from "@/components/theme/ThemeToggle"

const data = {
  user: {
    name: "Manuel Barreiro",
    email: "manuel.barreiro@ar.nestle.com",
    avatar: "",
  },
  navMain: [
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
    {
      title: "Sell In Analysis",
      icon: Store,
      isActive: true,
      items: [
        {
          title: "Test",
          url: "/sell-in/test",
        },
        {
          title: "Test v2",
          url: "/sell-in/test_v2",
        },
        {
          title: "Última Proyección",
          url: "/sell-in/last-projection",
        },
        {
          title: "CEDIS - Última Proyección",
          url: "/sell-in/cedis-last-projection",
        },
        {
          title: "Accuracy & Accuracy Acid",
          url: "/sell-in/accuracy-acid",
        },
        {
          title: "Vista Dinámica",
          url: "/sell-in/dynamic-view",
        },
        {
          title: "Modelo de Reabasto - Última Proyección",
          url: "/sell-in/replenishment-model-last-projection",
        },
        {
          title: "Inventario",
          url: "/sell-in/stock",
        },
      ],
    },
    {
      title: "Sell Out Analysis",
      icon: ShoppingCart,
      isActive: true,
      items: [
        {
          title: "Última Proyección",
          url: "/sell-out/last-projection",
        },
        {
          title: "Accuracy",
          url: "/sell-out/accuracy-acid",
        },
        {
          title: "Precio, IS & DOH",
          url: "/sell-out/price-is-doh",
        },
        {
          title: "In Stock & DOH",
          url: "/sell-out/replenishment-model-last-projection",
        },
        {
          title: "Control & Validacion",
          url: "/sell-out/control-validation",
        },
        {
          title: "Dispersión de Stock",
          url: "/sell-out/inventory-dispersion",
        },
        {
          title: "Dispersión de Precios",
          url: "/sell-out/price-dispersion",
        },
      ],
    },

    {
      title: "Settings",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Theme",
          url: "#",
          component: <ThemeToggle />, // Add this new property
        },
      ],
    },
  ],
  // navSecondary: [
  //   {
  //     title: "Support",
  //     url: "#",
  //     icon: LifeBuoy,
  //   },
  //   {
  //     title: "Feedback",
  //     url: "#",
  //     icon: Send,
  //   },
  // ],
  // projects: [
  //   {
  //     name: "Design Engineering",
  //     url: "#",
  //     icon: Frame,
  //   },
  //   {
  //     name: "Sales & Marketing",
  //     url: "#",
  //     icon: PieChart,
  //   },
  //   {
  //     name: "Travel",
  //     url: "#",
  //     icon: Map,
  //   },
  // ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Image
                    src={"/nestleLogo.png"}
                    alt="Nestlé Logo"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-nestleBrush text-lg font-medium">
                    MARVIN | CPFR
                  </span>
                  <span className="truncate text-xs">México</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
