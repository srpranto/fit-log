import Link from "next/link";
import { Dumbbell } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-[#0a0a0a] px-4 text-center">
      <p className="font-display text-xs font-bold uppercase tracking-[0.3em] text-[#ccff00]">
        404 ERROR
      </p>
      <h1 className="mt-3 font-display text-4xl font-extrabold uppercase tracking-tight text-white sm:text-5xl">
        WORKOUT NOT FOUND
      </h1>
      <p className="mt-4 max-w-md text-sm text-muted-foreground sm:text-base">
        The lift or page you are looking for has been moved, removed, or never
        existed. Get back to the gym floor.
      </p>
      <div className="mt-8">
        <Link
          href="/"
          className="inline-flex h-11 items-center gap-2 rounded-full bg-[#ccff00] px-6 font-display text-sm font-bold uppercase tracking-wider text-black transition-colors hover:bg-[#b8e600]"
        >
          <Dumbbell className="h-4 w-4" />
          <span>Back to workouts</span>
        </Link>
      </div>
    </div>
  );
}
