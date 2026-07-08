export default function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[11px] font-semibold border-2 border-ink px-2 py-0.5 bg-bg text-ink font-body">
      {children}
    </span>
  );
}
