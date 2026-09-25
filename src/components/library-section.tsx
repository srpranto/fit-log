"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { WorkoutCard } from "@/components/workout-card";
import type { Workout } from "@/lib/types";

interface LibrarySectionProps {
  workouts: Workout[];
}

export function LibrarySection({ workouts }: LibrarySectionProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const trimmed = searchQuery.trim().toLowerCase();
  const filteredWorkouts = workouts.filter((workout) => {
    if (!trimmed) {
      return true;
    }
    const nameMatch = workout.name.toLowerCase().includes(trimmed);
    const tagMatch = workout.muscleGroups.some((tag) =>
      tag.toLowerCase().includes(trimmed),
    );
    return nameMatch || tagMatch;
  });

  return (
    <section
      id="library"
      className="scroll-mt-28 bg-[#0a0a0a] py-10 sm:scroll-mt-20 sm:py-16"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-1.5">
            <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight text-white sm:text-4xl">
              THE LIBRARY
            </h2>
            <p className="text-sm text-muted-foreground sm:text-base">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          <div className="relative w-full sm:w-72 md:w-80">
            <label htmlFor="library-search" className="sr-only">
              Search workouts by name or muscle group
            </label>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted-foreground">
              <Search className="h-4 w-4" />
            </div>
            <input
              id="library-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search lifts or tags..."
              className="w-full rounded-full border border-white/10 bg-[#15171d] py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-muted-foreground focus:border-[#ccff00] focus:outline-none"
            />
          </div>
        </div>

        {filteredWorkouts.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-dashed border-white/10 bg-[#15171d]/30 p-12 text-center">
            <p className="break-words font-display text-lg uppercase tracking-wide text-muted-foreground">
              No lifts match &ldquo;{searchQuery}&rdquo;
            </p>
            <p className="mt-1 text-sm text-muted-foreground/80">
              Try searching for another exercise or muscle group.
            </p>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredWorkouts.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
