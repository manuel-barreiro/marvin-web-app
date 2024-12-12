import Hero from "@/components/home/components/Hero"
import Modules from "@/components/home/components/Modules"

export default function Home() {
  return (
    <div className="container w-full p-5">
      <div className="grid w-full gap-6">
        <Hero />
        <Modules />
      </div>
    </div>
  )
}
