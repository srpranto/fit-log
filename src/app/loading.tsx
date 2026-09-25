export default function Loading() {
  return (
    <div className="bg-[#0a0a0a] py-20">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center space-y-4 px-4 text-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-border border-t-[#ccff00]" />
        <p className="font-display text-sm font-bold uppercase tracking-widest text-muted-foreground">
          Loading library…
        </p>
      </div>
    </div>
  );
}
