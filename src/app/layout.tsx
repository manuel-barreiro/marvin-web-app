import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import { AppSidebar } from "@/components/layout/sidebar/app-sidebar"

import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import AppBreadcrumbs from "@/components/layout/AppBreadcrumbs"

const nestleBrush = localFont({
  src: "../assets/fonts/NestleBrush-Regular.ttf",
  variable: "--font-nestle-brush",
})
const nestleScript = localFont({
  src: "../assets/fonts/NestleScriptOfficeEUR-Regular.ttf",
  variable: "--font-nestle-script",
})
const nestleText = localFont({
  src: "../assets/fonts/NestleTextTF-Book.ttf",
  variable: "--font-nestle-text",
})

export const metadata: Metadata = {
  title: "MARVIN | CPFR Tool",
  description: "",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${nestleBrush.variable} ${nestleText.variable} ${nestleScript.variable} font-nestleText antialiased`}
      >
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <AppBreadcrumbs />
              </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
              {children}
            </div>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  )
}
