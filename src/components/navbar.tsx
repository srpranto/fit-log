"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { usePlan } from "@/context/plan-context";

export function Navbar() {
  const pathname = usePathname();
  const { planIds, savedIds } = usePlan();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const isWorkoutActive = pathname === "/" || pathname.startsWith("/workout");
  const isPlanActive = pathname === "/my-plan";

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-[#0a0a0a]/90 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-2 px-3 py-2.5 sm:px-6 sm:py-3 md:grid md:grid-cols-[1fr_auto_1fr] md:gap-x-6">
        <div className="flex items-center gap-2 min-[380px]:gap-2.5 md:justify-self-start">
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="relative flex h-8 w-8 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/10 md:hidden"
            aria-label={
              isOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={isOpen}
          >
            <Menu
              className={`absolute h-4.5 w-4.5 transition-all duration-300 ease-in-out ${
                isOpen
                  ? "rotate-90 scale-0 opacity-0"
                  : "rotate-0 scale-100 opacity-100"
              }`}
            />
            <X
              className={`absolute h-4.5 w-4.5 transition-all duration-300 ease-in-out ${
                isOpen
                  ? "rotate-0 scale-100 opacity-100"
                  : "-rotate-90 scale-0 opacity-0"
              }`}
            />
          </button>

          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-1.5 sm:gap-2"
          >
            <Image
              src="/logo.png"
              alt="FitLog logo"
              width={24}
              height={24}
              className="h-5 w-5 shrink-0 object-contain sm:h-6 sm:w-6"
            />
            <span className="whitespace-nowrap font-display text-lg font-bold tracking-wider text-white sm:text-xl">
              FITLOG
            </span>
          </Link>
        </div>

        <nav className="hidden items-center justify-center gap-2 md:flex md:justify-self-center">
          <Link
            href="/"
            className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
              isWorkoutActive
                ? "bg-[#182012] text-[#ccff00]"
                : "text-muted-foreground hover:text-white"
            }`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
              isPlanActive
                ? "bg-[#182012] text-[#ccff00]"
                : "text-muted-foreground hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </nav>

        <div className="flex items-center justify-end gap-2 sm:gap-3 md:justify-self-end">
          <Link
            href="/my-plan?tab=today"
            onClick={() => setIsOpen(false)}
            className="inline-flex items-center gap-1 whitespace-nowrap text-xs font-medium text-white transition-opacity hover:opacity-80 min-[380px]:gap-1.5"
          >
            <span>Plan</span>
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ccff00] px-1 text-[11px] font-bold text-black">
              {planIds.length}
            </span>
          </Link>
          <Link
            href="/my-plan?tab=saved"
            onClick={() => setIsOpen(false)}
            className="inline-flex items-center gap-1 whitespace-nowrap text-xs font-medium text-muted-foreground transition-colors hover:text-white min-[380px]:gap-1.5"
          >
            <span>Saved</span>
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-white/20 bg-transparent px-1 text-[11px] font-medium text-white">
              {savedIds.length}
            </span>
          </Link>
        </div>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
          isOpen
            ? "max-h-48 border-t border-border/60 opacity-100"
            : "max-h-0 border-t-0 opacity-0"
        }`}
      >
        <div className="flex flex-col items-center justify-center gap-2.5 px-4 py-4">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className={`flex w-full max-w-xs items-center justify-center rounded-xl py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
              isWorkoutActive
                ? "border border-[#ccff00]/30 bg-[#182012] text-[#ccff00]"
                : "text-muted-foreground hover:bg-white/5 hover:text-white"
            }`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            onClick={() => setIsOpen(false)}
            className={`flex w-full max-w-xs items-center justify-center rounded-xl py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
              isPlanActive
                ? "border border-[#ccff00]/30 bg-[#182012] text-[#ccff00]"
                : "text-muted-foreground hover:bg-white/5 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </div>
      </div>
    </header>
  );
}
