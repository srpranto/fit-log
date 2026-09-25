"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface StoredState {
  planIds: number[];
  savedIds: number[];
}

interface PlanContextType {
  planIds: number[];
  savedIds: number[];
  addToPlan: (id: number) => boolean;
  removeFromPlan: (id: number) => void;
  addToSaved: (id: number) => boolean;
  removeFromSaved: (id: number) => void;
  isPlanFull: boolean;
  isInPlan: (id: number) => boolean;
  isSaved: (id: number) => boolean;
}

const STORAGE_KEY = "fitlog:state";

const PlanContext = createContext<PlanContextType | null>(null);

export function PlanProvider({ children }: { children: ReactNode }) {
  const [planIds, setPlanIds] = useState<number[]>([]);
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed.planIds)) {
            setPlanIds(parsed.planIds.map(Number));
          }
          if (Array.isArray(parsed.savedIds)) {
            setSavedIds(parsed.savedIds.map(Number));
          }
        }
      } catch {}
      setIsLoaded(true);
    }, 0);
  }, []);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }
    const state: StoredState = { planIds, savedIds };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [planIds, savedIds, isLoaded]);

  const addToPlan = (id: number): boolean => {
    if (planIds.includes(id) || planIds.length >= 5) {
      return false;
    }
    setPlanIds((prev) => [...prev, id]);
    return true;
  };

  const removeFromPlan = (id: number): void => {
    setPlanIds((prev) => prev.filter((item) => item !== id));
  };

  const addToSaved = (id: number): boolean => {
    if (savedIds.includes(id)) {
      return false;
    }
    setSavedIds((prev) => [...prev, id]);
    return true;
  };

  const removeFromSaved = (id: number): void => {
    setSavedIds((prev) => prev.filter((item) => item !== id));
  };

  const isInPlan = (id: number): boolean => planIds.includes(id);
  const isSaved = (id: number): boolean => savedIds.includes(id);
  const isPlanFull = planIds.length >= 5;

  return (
    <PlanContext.Provider
      value={{
        planIds,
        savedIds,
        addToPlan,
        removeFromPlan,
        addToSaved,
        removeFromSaved,
        isPlanFull,
        isInPlan,
        isSaved,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan(): PlanContextType {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error("usePlan must be used within a PlanProvider");
  }
  return context;
}
