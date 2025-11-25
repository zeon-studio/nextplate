import { useEffect, useState } from "react";

/**
 * useMounted
 * Returns `true` after the component has mounted on the client.
 * Uses requestAnimationFrame with a timeout fallback and proper cleanup.
 */
export default function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const schedule = (globalThis.requestAnimationFrame ??
      ((cb: FrameRequestCallback) => window.setTimeout(cb, 0))) as (
      cb: FrameRequestCallback,
    ) => number;

    const id = schedule(() => {
      if (!cancelled) setMounted(true);
    });

    return () => {
      cancelled = true;
      if (typeof globalThis.cancelAnimationFrame === "function") {
        globalThis.cancelAnimationFrame(id);
      } else {
        clearTimeout(id);
      }
    };
  }, []);

  return mounted;
}
