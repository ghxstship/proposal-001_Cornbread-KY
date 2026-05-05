import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-paper">
      <div className="text-center max-w-lg">
        <div className="eyebrow mb-4">Lost in the Cornfield</div>
        <h1 className="font-display text-[80px] md:text-[120px] leading-none text-cedar mb-4">
          404
        </h1>
        <p className="font-head italic text-[20px] text-muted mb-8">
          This page ain't here, neighbor. But the proposal is.
        </p>
        <Link
          href="/"
          className="inline-block bg-orange text-mist px-7 py-4 font-mono text-[12px] uppercase tracking-[0.2em] rounded-sm hover:bg-orange-dark transition-colors"
        >
          Back to the Proposal
        </Link>
      </div>
    </main>
  );
}
