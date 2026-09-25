import Image from "next/image";
import Link from "next/link";
import { Clock, Flame, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Workout } from "@/lib/types";

interface WorkoutCardProps {
  workout: Workout;
}

export function WorkoutCard({ workout }: WorkoutCardProps) {
  return (
    <Card className="group overflow-hidden rounded-2xl border border-white/5 bg-[#15171d] p-0 transition-all hover:border-[#ccff00]/50">
      <Link href={`/workout/${workout.id}`} className="block">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/40">
          <Image
            src={workout.image}
            alt={`${workout.name} demonstration`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <CardContent className="space-y-3 p-5">
          <div className="flex flex-wrap gap-1.5">
            {workout.muscleGroups.map((tag) => (
              <Badge
                key={tag}
                className="rounded-full bg-[#ccff00] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-black hover:bg-[#ccff00]"
              >
                {tag}
              </Badge>
            ))}
          </div>

          <h3 className="font-display text-lg font-bold uppercase tracking-wide text-white transition-colors group-hover:text-[#ccff00]">
            {workout.name}
          </h3>

          <p className="text-xs text-muted-foreground">{workout.equipment}</p>

          <div className="flex items-center gap-4 pt-1 text-xs font-medium text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-[#ccff00]" />
              <span>{workout.duration} min</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Flame className="h-3.5 w-3.5 text-[#ccff00]" />
              <span>{workout.caloriesBurned} kcal</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Star className="h-3.5 w-3.5 fill-[#ccff00] text-[#ccff00]" />
              <span>{workout.rating}</span>
            </span>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
