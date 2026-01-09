export default function ScholarshipCardSkeleton() {
  return (
    <div className="card bg-base-200 border border-base-300 shadow-md animate-pulse">
      <div className="card-body space-y-4">
        {/* Logo + Title */}
        <div className="flex items-center gap-4">
          <div className="skeleton h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <div className="skeleton h-4 w-40" />
            <div className="skeleton h-3 w-28" />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <div className="skeleton h-3 w-full" />
          <div className="skeleton h-3 w-5/6" />
        </div>

        {/* Meta info */}
        <div className="flex gap-6">
          <div className="skeleton h-3 w-20" />
          <div className="skeleton h-3 w-28" />
        </div>

        {/* Button */}
        <div className="skeleton h-9 w-32 rounded-md" />
      </div>
    </div>
  );
}
