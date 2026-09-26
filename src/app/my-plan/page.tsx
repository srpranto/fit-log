"use client";

import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Check,
  ChevronDown,
  Clock,
  Flame,
  Search,
  Star,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePlan } from "@/context/plan-context";
import { getWorkouts } from "@/lib/api";
import type { Workout } from "@/lib/types";

type SortOption = "duration" | "calories" | "rating";

const SORT_OPTIONS: { id: SortOption; label: string }[] = [
  { id: "duration", label: "Duration" },
  { id: "calories", label: "Calories" },
  { id: "rating", label: "Rating" },
];

const sortLabelMap: Record<SortOption, string> = {
  duration: "Duration",
  calories: "Calories",
  rating: "Rating",
};

function MyPlanContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tabQuery = searchParams.get("tab");
  const activeTab: "today" | "saved" = tabQuery === "saved" ? "saved" : "today";

  const { planIds, savedIds, removeFromPlan, removeFromSaved } = usePlan();
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<SortOption>("duration");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleTabChange = (tab: "today" | "saved") => {
    router.replace(`/my-plan?tab=${tab}`, { scroll: false });
  };

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      const data = await getWorkouts();
      setWorkouts(data);
      setIsLoading(false);
    }
    loadData();
  }, []);

  const todayWorkouts = workouts.filter((workout) =>
    planIds.includes(workout.id),
  );
  const savedWorkouts = workouts.filter((workout) =>
    savedIds.includes(workout.id),
  );

  const totalMinutes = todayWorkouts.reduce(
    (sum, workout) => sum + workout.duration,
    0,
  );
  const totalCalories = todayWorkouts.reduce(
    (sum, workout) => sum + workout.caloriesBurned,
    0,
  );

  const currentTabList = activeTab === "today" ? todayWorkouts : savedWorkouts;
  const trimmed = searchQuery.trim().toLowerCase();

  const filteredWorkouts = currentTabList.filter((workout) => {
    if (!trimmed) {
      return true;
    }
    const nameMatch = workout.name.toLowerCase().includes(trimmed);
    const tagMatch = workout.muscleGroups.some((tag) =>
      tag.toLowerCase().includes(trimmed),
    );
    return nameMatch || tagMatch;
  });

  const sortedList = [...filteredWorkouts].sort((a, b) => {
    if (sortBy === "calories") {
      return b.caloriesBurned - a.caloriesBurned;
    }
    if (sortBy === "rating") {
      return b.rating - a.rating;
    }
    return b.duration - a.duration;
  });

  const handleMarkAsDone = (workout: Workout) => {
    removeFromPlan(workout.id);
    toast.success(`Completed ${workout.name}! Great work.`);
  };

  const handleRemoveFromPlan = (workout: Workout) => {
    removeFromPlan(workout.id);
    toast.info(`Removed ${workout.name} from today's plan`);
  };

  const handleRemoveFromSaved = (workout: Workout) => {
    removeFromSaved(workout.id);
    toast.info(`Removed ${workout.name} from saved`);
  };

  return (
    <div className="bg-[#0a0a0a] py-10 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="space-y-2">
          <h1 className="font-display text-3xl font-extrabold uppercase tracking-tight text-white sm:text-4xl lg:text-5xl">
            MY PLAN
          </h1>
          <p className="text-sm text-muted-foreground sm:text-base">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        <div className="mt-8 rounded-2xl border border-white/5 bg-[#15171d] p-6 sm:p-8">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1">
              <p className="text-xs font-semibold tracking-wider text-muted-foreground">
                Exercises
              </p>
              <p className="font-display text-3xl font-extrabold text-[#ccff00] sm:text-5xl">
                {todayWorkouts.length}
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-xs font-semibold tracking-wider text-muted-foreground">
                Minutes
              </p>
              <p className="font-display text-3xl font-extrabold text-white sm:text-5xl">
                {totalMinutes}
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-xs font-semibold tracking-wider text-muted-foreground">
                Calories
              </p>
              <p className="font-display text-3xl font-extrabold text-white sm:text-5xl">
                {totalCalories}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex w-full items-center gap-1 rounded-xl border border-white/5 bg-[#121418] p-1 sm:w-auto">
            <button
              type="button"
              onClick={() => handleTabChange("today")}
              className={`flex-1 whitespace-nowrap rounded-lg px-4 py-2 text-xs font-semibold transition-colors sm:flex-none ${
                activeTab === "today"
                  ? "bg-[#1e222b] text-white"
                  : "text-muted-foreground hover:text-white"
              }`}
            >
              Today&apos;s Plan
            </button>
            <button
              type="button"
              onClick={() => handleTabChange("saved")}
              className={`flex-1 whitespace-nowrap rounded-lg px-4 py-2 text-xs font-semibold transition-colors sm:flex-none ${
                activeTab === "saved"
                  ? "bg-[#1e222b] text-white"
                  : "text-muted-foreground hover:text-white"
              }`}
            >
              Saved
            </button>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative w-full sm:w-60">
              <label htmlFor="plan-search" className="sr-only">
                Search plan
              </label>
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted-foreground">
                <Search className="h-4 w-4" />
              </div>
              <input
                id="plan-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search plan..."
                className="w-full rounded-full border border-white/10 bg-[#15171d] py-2 pl-9 pr-3 text-xs text-white placeholder:text-muted-foreground focus:border-[#ccff00] focus:outline-none"
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex h-9 cursor-pointer items-center justify-between gap-2 rounded-lg border border-white/10 bg-[#15171d] px-4 font-display text-xs font-bold uppercase tracking-wider text-white transition-colors hover:border-[#ccff00] hover:text-[#ccff00]">
                <span>Sort By: {sortLabelMap[sortBy]}</span>
                <ChevronDown className="h-3.5 w-3.5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="min-w-[140px] rounded-xl border border-white/10 bg-[#15171d] p-1 text-white shadow-xl"
              >
                {SORT_OPTIONS.map((option) => (
                  <DropdownMenuItem
                    key={option.id}
                    onClick={() => setSortBy(option.id)}
                    className={`flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 font-display text-xs uppercase transition-colors ${
                      sortBy === option.id
                        ? "bg-white/10 font-bold text-[#ccff00]"
                        : "text-zinc-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span>{option.label}</span>
                    {sortBy === option.id && (
                      <Check className="h-3.5 w-3.5 text-[#ccff00]" />
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {isLoading ? (
          <div className="mt-16 flex flex-col items-center justify-center space-y-3 py-16 text-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-[#ccff00]" />
            <p className="font-display text-sm font-bold uppercase tracking-wider text-muted-foreground">
              Loading workouts…
            </p>
          </div>
        ) : sortedList.length === 0 ? (
          <div className="mt-12 flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-[#15171d]/40 px-6 py-20 text-center">
            <h3 className="font-display text-2xl font-bold uppercase tracking-wider text-white sm:text-3xl">
              NOTHING HERE YET
            </h3>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              {searchQuery
                ? `No lifts in ${activeTab === "today" ? "today's plan" : "saved"} match "${searchQuery}".`
                : "Browse the library and add a lift to get today moving."}
            </p>
            <Link
              href="/"
              className="mt-6 inline-flex items-center rounded-full bg-[#ccff00] px-6 py-2.5 text-xs font-semibold text-black transition-colors hover:bg-[#b8e600]"
            >
              Go to workouts
            </Link>
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            {sortedList.map((workout) => (
              <div
                key={workout.id}
                className="flex flex-col gap-4 rounded-2xl border border-white/5 bg-[#15171d] p-4 transition-colors hover:border-[#ccff00]/40 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex min-w-0 flex-1 items-center gap-4">
                  <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-lg bg-black/50">
                    <Image
                      src={workout.image}
                      alt={`${workout.name} demonstration`}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="truncate font-display text-base font-bold uppercase tracking-wide text-white">
                      {workout.name}
                    </h4>
                    <p className="truncate text-xs text-muted-foreground">
                      {workout.equipment}
                    </p>
                    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1 whitespace-nowrap">
                        <Clock className="h-3 w-3 shrink-0 text-[#ccff00]" />
                        <span>{workout.duration} min</span>
                      </span>
                      <span className="inline-flex items-center gap-1 whitespace-nowrap">
                        <Flame className="h-3 w-3 shrink-0 text-[#ccff00]" />
                        <span>{workout.caloriesBurned} kcal</span>
                      </span>
                      <span className="inline-flex items-center gap-1 whitespace-nowrap">
                        <Star className="h-3 w-3 shrink-0 fill-[#ccff00] text-[#ccff00]" />
                        <span>{workout.rating}</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex w-full flex-wrap items-center gap-2 pt-2 sm:w-auto sm:flex-nowrap sm:pt-0">
                  <Link
                    href={`/workout/${workout.id}`}
                    className="inline-flex h-9 min-w-0 flex-1 items-center justify-center whitespace-nowrap rounded-full border border-white/10 bg-[#121418] px-3 text-[11px] font-semibold text-white transition-colors hover:border-[#ccff00] hover:text-[#ccff00] sm:flex-none sm:px-4 sm:text-xs"
                  >
                    View Details
                  </Link>

                  {activeTab === "today" && (
                    <Button
                      onClick={() => handleMarkAsDone(workout)}
                      className="h-9 min-w-0 flex-1 whitespace-nowrap rounded-full bg-[#ccff00] px-3 text-[11px] font-semibold text-black hover:bg-[#b8e600] sm:flex-none sm:px-4 sm:text-xs"
                    >
                      <Check className="h-3.5 w-3.5 shrink-0" />
                      <span className="ml-1">Mark as Done</span>
                    </Button>
                  )}

                  <Button
                    onClick={() =>
                      activeTab === "today"
                        ? handleRemoveFromPlan(workout)
                        : handleRemoveFromSaved(workout)
                    }
                    variant="ghost"
                    size="icon"
                    aria-label={`Remove ${workout.name}`}
                    className="h-9 w-9 shrink-0 rounded-full text-muted-foreground hover:bg-white/5 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function MyPlanPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-[#0a0a0a] py-20">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-center space-y-4 px-4 text-center">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-border border-t-[#ccff00]" />
            <p className="font-display text-sm font-bold uppercase tracking-widest text-muted-foreground">
              Loading workouts…
            </p>
          </div>
        </div>
      }
    >
      <MyPlanContent />
    </Suspense>
  );
}
