export const EmptySectionFallback = ({ label }: { label: string }) => {
  return (
    <div className="rounded-2xl border border-dashed border-white/20 bg-white/5 p-4 text-sm text-white/60">
      {label}
    </div>
  );
};
