# FitLog — Workout Library & Routine Planner

**Live Site:** https://fit-log-io.vercel.app

FitLog is a dark-themed gym companion and routine planner web app built with Next.js and TypeScript. It lets you browse exercises across different muscle groups, check equipment and step-by-step form instructions, and plan out your daily routine with a simple 5-exercise cap.

---

## Technologies Used

* **Next.js (App Router)** — Modern page routing, server data fetching, and fast page loads.
* **TypeScript** — Strict type safety across the whole project for reliable code.
* **Tailwind CSS** — Clean, responsive dark gym theme with volt-green highlights.
* **shadcn/ui** — Pre-built UI components like buttons, cards, badges, and dropdowns.
* **Sonner** — Simple toast popup alerts when adding, completing, or removing exercises.
* **React Context API** — Global state management to share workout data across pages.
* **LocalStorage** — Keeps your plan and saved lists saved in your browser after refreshing.
* **Lucide React** — Clean icons for stats, buttons, and navigation.

---

## Key Features

1. **12 Core Workouts**: Displays 12 full-body exercises fetched from an API in a clean, responsive grid layout.
2. **Exercise Detail Pages**: Every workout has its own page with demonstration pictures, equipment details, difficulty rating, target muscles, and step-by-step form instructions.
3. **Daily Routine Planner (5-Lift Cap)**: Add exercises to today's plan with a strict limit of 5 workouts. A friendly toast alert tells you if your plan is already full.
4. **Save for Later**: A separate saved tab where you can bookmark exercises you want to try later with no limits.
5. **Live Routine Stats**: Automatically calculates your total exercise count, total workout minutes, and total calories burned as you update your plan.
6. **Search & Multi-Option Sorting**: Filter workouts instantly by name or muscle tag, and sort your routine by duration, calories burned, or rating using a dropdown menu.
7. **LocalStorage Persistence**: Your daily plan and saved exercises stay safe in your browser even if you refresh or close the page.
8. **Dark Gym Theme & Loading States**: High-contrast dark design with volt green accents, smooth loading spinners while fetching data, and a custom 404 page for missing links.