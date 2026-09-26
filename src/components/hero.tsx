import Image from "next/image";
import { ArrowDown, Dumbbell } from "lucide-react";

export function Hero() {
  return (
    <section className="bg-background pt-6 pb-4 sm:pt-8 sm:pb-6">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="overflow-hidden rounded-2xl border border-white/5 bg-[#15171d] p-8 sm:p-10 lg:rounded-3xl lg:p-12">
          <div className="grid items-center gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:gap-8">
            <div className="space-y-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ccff00]">
                WORKOUT LIBRARY
              </p>

              <h1 className="font-display text-3xl font-extrabold uppercase leading-[1.0] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-6xl">
                <span className="block sm:whitespace-nowrap">
                  TRAIN WITH INTENT. LOG
                </span>
                <span className="block">EVERY SET.</span>
              </h1>

              <p className="max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
                FitLog is a dark, no-nonsense gym companion: pick a lift, lock
                it
                <br className="hidden sm:inline" /> into today&apos;s plan, and
                watch the week&apos;s work add up.
              </p>

              <div>
                <a
                  href="#library"
                  className="group inline-flex h-11 max-w-full items-center justify-center gap-2 rounded-lg bg-[#ccff00] px-5 sm:px-7 font-display text-xs font-bold uppercase tracking-wider text-black transition-colors hover:bg-[#b8e600]"
                >
                  <Dumbbell className="h-4 w-4 shrink-0" />
                  <span className="whitespace-nowrap">BROWSE WORKOUTS</span>
                  <ArrowDown className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-hover:translate-y-0.5" />
                </a>
              </div>
            </div>

            <div className="relative flex items-center justify-center lg:justify-end">
              <div className="relative aspect-square w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[420px]">
                <Image
                  src="/banner.png"
                  alt="FitLog training demonstration"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
