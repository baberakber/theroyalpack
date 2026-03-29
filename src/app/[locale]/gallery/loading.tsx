export default function GalleryLoading() {
  return (
    <div className="mx-auto w-[min(90vw,1280px)] px-4 py-12 animate-pulse">
      <div className="h-8 w-56 rounded bg-bg-secondary mb-8" />
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        <div className="h-44 rounded-xl bg-bg-secondary" />
        <div className="h-56 rounded-xl bg-bg-secondary" />
        <div className="h-48 rounded-xl bg-bg-secondary" />
        <div className="h-52 rounded-xl bg-bg-secondary" />
      </div>
    </div>
  );
}
