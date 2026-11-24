import { useEffect, useState } from "react";

type Progress = {
  stars: number;
  unlocked: boolean;
  played: number;
};

const KEY = "little-den-progress";
const empty: Progress = { stars: 0, unlocked: false, played: 0 };

function read(): Progress {
  if (typeof window === "undefined") return empty;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return empty;
    const parsed = JSON.parse(raw) as Partial<Progress>;
    return {
      stars: Number(parsed.stars) || 0,
      unlocked: Boolean(parsed.unlocked),
      played: Number(parsed.played) || 0,
    };
  } catch {
    return empty;
  }
}

function write(next: Progress) {
  localStorage.setItem(KEY, JSON.stringify(next));
  window.dispatchEvent(new Event("little-den"));
}

export function useProgress() {
  const [progress, setProgress] = useState<Progress>(empty);

  useEffect(() => {
    setProgress(read());
    const sync = () => setProgress(read());
    window.addEventListener("little-den", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("little-den", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return {
    ...progress,
    addStar() {
      const next = { ...read(), stars: read().stars + 1, played: read().played + 1 };
      write(next);
    },
    markPlayed() {
      const next = { ...read(), played: read().played + 1 };
      write(next);
    },
    unlock() {
      write({ ...read(), unlocked: true });
    },
  };
}
