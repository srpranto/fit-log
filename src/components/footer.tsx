import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-[#0a0a0a]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/logo.png"
            alt="FitLog logo"
            width={24}
            height={24}
            className="h-5 w-5 object-contain sm:h-6 sm:w-6"
          />
          <span className="font-display text-lg font-bold tracking-wider text-white sm:text-xl">
            FITLOG
          </span>
        </Link>

        <p className="text-center text-xs text-muted-foreground sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
