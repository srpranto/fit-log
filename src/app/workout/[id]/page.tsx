import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DetailActions } from "@/components/detail-actions";
import { getWorkout } from "@/lib/api";

interface WorkoutPageProps {
  params: Promise<{ id: string }>;
}

export default async function WorkoutDetailPage({ params }: WorkoutPageProps) {
  const { id } = await params;
  const workout = await getWorkout(id);

  if (!workout) {
    notFound();
  }

  const specs = [
    { label: "EQUIPMENT", value: workout.equipment },
    { label: "DIFFICULTY", value: workout.difficulty },
    { label: "SETS", value: String(workout.sets) },
    { label: "REPS", value: workout.reps },
    { label: "DURATION", value: `${workout.duration} min` },
    { label: "CALORIES", value: `${workout.caloriesBurned} kcal` },
    { label: "RATING", value: String(workout.rating) },
  ];

  return (
    <div className="bg-[#0a0a0a] py-10 sm:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Library</span>
        </Link>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-white/5 bg-[#15171d]">
            <Image
              src={workout.image}
              alt={`${workout.name} demonstration`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <h1 className="font-display text-3xl font-extrabold uppercase tracking-tight text-white sm:text-4xl lg:text-5xl">
                {workout.name}
              </h1>

              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                {workout.description}
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                {workout.muscleGroups.map((tag) => (
                  <Badge
                    key={tag}
                    className="rounded-full bg-[#ccff00] px-3 py-0.5 text-xs font-bold uppercase tracking-wider text-black hover:bg-[#ccff00]"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/5 bg-[#15171d] p-5 sm:p-6">
              <dl className="divide-y divide-white/5">
                {specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex items-center justify-between py-2.5 text-xs sm:text-sm"
                  >
                    <dt className="font-medium uppercase tracking-wider text-muted-foreground">
                      {spec.label}
                    </dt>
                    <dd className="max-w-[60%] break-words text-right font-medium text-white">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="space-y-3">
              <h2 className="font-display text-sm font-bold uppercase tracking-wider text-white">
                INSTRUCTIONS
              </h2>
              <ol className="space-y-2 text-xs leading-relaxed text-zinc-300">
                {workout.instructions.map((step, index) => (
                  <li key={index} className="flex gap-2">
                    <span className="shrink-0 font-medium text-muted-foreground">
                      {index + 1}.
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <DetailActions workoutId={workout.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
