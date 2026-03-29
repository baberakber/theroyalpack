export default function ProductsLoading() {
  return (
    <div className="mx-auto w-[min(90vw,1280px)] px-4 py-12 animate-pulse">
      <div className="h-8 w-64 rounded bg-bg-secondary mb-4" />
      <div className="h-4 w-2/3 rounded bg-bg-secondary mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="h-60 rounded-2xl bg-bg-secondary" />
        <div className="h-60 rounded-2xl bg-bg-secondary" />
        <div className="h-60 rounded-2xl bg-bg-secondary" />
      </div>
    </div>
  );
}
