export const ProductDetailSkeleton = () => {
  return (
    <div className="grid animate-fade-in gap-6 lg:grid-cols-[1.2fr_1fr]">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
        <div className="skeleton h-72 w-full rounded-xl" />
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
        <div className="skeleton h-7 w-2/3 rounded-md" />
        <div className="mt-3 skeleton h-5 w-1/3 rounded-md" />
        <div className="mt-6 space-y-3">
          <div className="skeleton h-12 w-full rounded-lg" />
          <div className="skeleton h-12 w-full rounded-lg" />
          <div className="skeleton h-12 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
};
