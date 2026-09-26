"use client";

import { Bookmark, CalendarPlus, Check } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { usePlan } from "@/context/plan-context";

interface DetailActionsProps {
  workoutId: number;
}

export function DetailActions({ workoutId }: DetailActionsProps) {
  const { addToPlan, addToSaved, isInPlan, isSaved, isPlanFull } = usePlan();

  const inPlan = isInPlan(workoutId);
  const inSaved = isSaved(workoutId);

  const handleAddToPlan = () => {
    if (inPlan || isPlanFull) {
      return;
    }
    if (addToPlan(workoutId)) {
      toast.success("Added to today's plan");
    }
  };

  const handleSaveForLater = () => {
    if (inSaved) {
      return;
    }
    if (addToSaved(workoutId)) {
      toast.success("Saved for later");
    }
  };

  return (
    <div className="flex flex-col gap-3.5 pt-2 sm:flex-row sm:items-center">
      <Button
        onClick={handleAddToPlan}
        disabled={inPlan || isPlanFull}
        className="h-11 w-full rounded-lg bg-[#ccff00] text-xs font-semibold text-black transition-colors hover:bg-[#b8e600] disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground sm:flex-1"
      >
        {inPlan ? (
          <span className="inline-flex items-center gap-2">
            <Check className="h-4 w-4" />
            <span>In today&apos;s plan</span>
          </span>
        ) : isPlanFull ? (
          <span>Plan full (5 lifts max)</span>
        ) : (
          <span className="inline-flex items-center gap-2">
            <CalendarPlus className="h-4 w-4" />
            <span>Add to today&apos;s plan</span>
          </span>
        )}
      </Button>

      <Button
        onClick={handleSaveForLater}
        disabled={inSaved}
        variant="outline"
        className="h-11 w-full rounded-lg border-white/10 bg-[#15171d] px-6 text-xs font-semibold text-white transition-colors hover:border-[#ccff00] hover:text-[#ccff00] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
      >
        {inSaved ? (
          <span className="inline-flex items-center gap-2">
            <Check className="h-4 w-4 text-[#ccff00]" />
            <span>Saved for later</span>
          </span>
        ) : (
          <span className="inline-flex items-center gap-2">
            <Bookmark className="h-4 w-4" />
            <span>Save for later</span>
          </span>
        )}
      </Button>
    </div>
  );
}
