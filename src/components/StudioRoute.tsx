import { lazy, Suspense, useEffect, useState } from "react";

const StudioApp = lazy(() =>
  import("@/components/StudioApp").then((mod) => ({ default: mod.StudioApp })),
);

export function StudioRoute() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex h-[100dvh] items-center justify-center bg-[#101112] text-sm text-white/70">
        Loading studio…
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="flex h-[100dvh] items-center justify-center bg-[#101112] text-sm text-white/70">
          Loading studio…
        </div>
      }
    >
      <StudioApp />
    </Suspense>
  );
}
