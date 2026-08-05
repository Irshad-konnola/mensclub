import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-4 text-ink">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-display">404</h1>
        <h2 className="mt-4 text-xl">Page not found</h2>
        <p className="mt-2 text-sm text-ink/60">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-ink px-5 py-3 font-label text-sm text-paper transition hover:bg-accent-rust"
          >
            Back home
          </Link>
        </div>
      </div>
    </div>
  );
}
