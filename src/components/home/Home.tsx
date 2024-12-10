import Hero from "@/components/home/components/Hero"
import Modules from "@/components/home/components/Modules"

export default function Home() {
  return (
    <div className="container p-5">
      <div className="grid gap-6">
        <Hero />
        <Modules />
      </div>
    </div>
  )
}
