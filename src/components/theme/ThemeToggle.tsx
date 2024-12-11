"use client"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export default function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  const handleThemeToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <Button
      className="flex w-full items-center justify-start gap-2 text-sm"
      onClick={handleThemeToggle}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <>
          <Sun className="icon" />
          <span>Light Mode</span>
        </>
      ) : (
        <>
          <Moon className="icon" />
          <span>Dark Mode</span>
        </>
      )}
    </Button>
  )
}
