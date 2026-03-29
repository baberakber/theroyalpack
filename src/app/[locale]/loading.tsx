export default function LocaleLoading() {
  return (
    <div className="min-h-[60vh] animate-pulse bg-bg-secondary">
      <div className="mx-auto w-[min(90vw,1280px)] px-4 py-12 space-y-6">
        <div className="h-8 w-1/3 rounded bg-white/70" />
        <div className="h-4 w-2/3 rounded bg-white/70" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="h-48 rounded-xl bg-white/70" />
          <div className="h-48 rounded-xl bg-white/70" />
          <div className="h-48 rounded-xl bg-white/70" />
        </div>
      </div>
    </div>
  );
}
