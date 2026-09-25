import { Hero } from "@/components/hero";
import { LibrarySection } from "@/components/library-section";
import { getWorkouts } from "@/lib/api";

export default async function HomePage() {
  const workouts = await getWorkouts();

  return (
    <>
      <Hero />
      <LibrarySection workouts={workouts} />
    </>
  );
}
