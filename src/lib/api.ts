import type { Workout } from "@/lib/types";

const API_BASE = "https://api.abcz.workers.dev/api/fitlog";

export async function getWorkouts(): Promise<Workout[]> {
  try {
    const res = await fetch(API_BASE, { cache: "no-store" });
    if (!res.ok) {
      return [];
    }
    const data: Workout[] = await res.json();
    return data;
  } catch {
    return [];
  }
}

export async function getWorkout(id: string | number): Promise<Workout | null> {
  try {
    const res = await fetch(`${API_BASE}/${id}`, { cache: "no-store" });
    if (!res.ok) {
      return null;
    }
    const data: Workout = await res.json();
    return data;
  } catch {
    return null;
  }
}
