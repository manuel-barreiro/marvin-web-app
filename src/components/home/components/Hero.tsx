import Image from "next/image"

export default function Hero() {
  return (
    <section className="grid w-full gap-6 lg:grid-cols-2 lg:gap-12">
      <div className="space-y-4">
        <h1 className="font-nestleBrush text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          MARVIN - CPFR TOOL
        </h1>
        <p className="text-muted-foreground md:text-xl">
          Identify potential price growth and pack-size change opportunities,
          prescribe price and assortment changes while considering
          cannibalization and competition and simulate the impact on business.
        </p>
      </div>
      <div className="hidden lg:block">
        <Image
          src="/hero.webp"
          alt="hero imahe"
          width={400}
          height={400}
          className="rounded-lg object-cover"
          priority
        />
      </div>
    </section>
  )
}
