import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Lock, Star } from "lucide-react";
import { activities } from "@/lib/play/catalog";
import { useProgress } from "@/lib/play/progress";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const progress = useProgress();
  const [parentOpen, setParentOpen] = useState(false);

  return (
    <main className="mx-auto min-h-screen max-w-lg px-4 pb-16 pt-6">
      <header className="mb-6 flex items-end justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-muted">Ages 5–10</p>
          <h1 className="font-display text-4xl leading-none text-ink">Little Den</h1>
        </div>
        <div className="flex items-center gap-1 rounded-full bg-surface px-3 py-2 ring-1 ring-line">
          <Star className="size-5 fill-sun text-sun" aria-hidden />
          <span className="font-display text-xl">{progress.stars}</span>
        </div>
      </header>

      <ul className="grid grid-cols-2 gap-3">
        {activities.map((activity) => {
          const locked = activity.premium && !progress.unlocked;
          const card = (
            <article
              className={`flex h-40 flex-col justify-between rounded-card p-4 text-left ${
                activity.swatch === "coral"
                  ? "bg-coral text-coral-ink"
                  : activity.swatch === "teal"
                    ? "bg-teal text-teal-ink"
                    : "bg-sun text-sun-ink"
              }`}
            >
              <div className="flex items-start justify-between">
                <h2 className="font-display text-2xl leading-tight">{activity.title}</h2>
                {locked ? <Lock className="size-5" aria-label="Locked" /> : null}
              </div>
              <p className="text-sm font-bold opacity-90">{locked ? "Parent pack" : activity.blurb}</p>
            </article>
          );
          return (
            <li key={activity.id}>
              {locked ? (
                <button type="button" className="w-full" onClick={() => setParentOpen(true)}>
                  {card}
                </button>
              ) : (
                <Link to="/play/$id" params={{ id: activity.id }} className="block">
                  {card}
                </Link>
              )}
            </li>
          );
        })}
      </ul>

      <button
        type="button"
        onClick={() => setParentOpen(true)}
        className="mt-6 w-full rounded-full bg-surface py-3 font-bold text-ink ring-1 ring-line"
      >
        Grown-up corner
      </button>

      {parentOpen ? <ParentSheet onClose={() => setParentOpen(false)} unlocked={progress.unlocked} unlock={progress.unlock} /> : null}
    </main>
  );
}

function ParentSheet({
  onClose,
  unlocked,
  unlock,
}: {
  onClose: () => void;
  unlocked: boolean;
  unlock: () => void;
}) {
  const a = 4;
  const b = 3;
  const [answer, setAnswer] = useState("");
  const [ok, setOk] = useState(false);
  const [miss, setMiss] = useState(false);

  return (
    <div className="fixed inset-0 z-20 flex items-end justify-center bg-ink/40 p-4" role="dialog" aria-modal>
      <div className="w-full max-w-lg rounded-card bg-surface p-5 text-ink">
        <h2 className="font-display text-2xl">For a grown-up</h2>
        <p className="mt-1 text-sm text-muted">Children should not open purchases. Answer to continue.</p>
        {!ok ? (
          <form
            className="mt-4 flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              if (Number(answer) === a + b) {
                setOk(true);
                setMiss(false);
              } else setMiss(true);
            }}
          >
            <label className="sr-only" htmlFor="sum">
              What is {a} plus {b}
            </label>
            <span className="flex items-center font-display text-2xl">
              {a} + {b} =
            </span>
            <input
              id="sum"
              inputMode="numeric"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-20 rounded-xl border border-line bg-bg px-3 text-2xl"
            />
            <button type="submit" className="rounded-full bg-teal px-4 font-bold text-teal-ink">
              Check
            </button>
          </form>
        ) : (
          <div className="mt-4 space-y-3">
            <p className="text-sm leading-relaxed">
              Extra dens (finger paint and color nests) are the paid pack. On a real Android app this button
              would open Google Play. Here it only unlocks on this phone’s browser, so you can try the loop.
              Free play stays free. A yearly plan around $25–40 is the usual price for this kind of app.
            </p>
            {unlocked ? (
              <p className="font-bold text-teal">Pack unlocked on this device.</p>
            ) : (
              <button type="button" onClick={unlock} className="w-full rounded-full bg-coral py-3 font-bold text-coral-ink">
                Unlock extra den
              </button>
            )}
          </div>
        )}
        {miss ? <p className="mt-2 text-sm text-coral">Not quite.</p> : null}
        <button type="button" onClick={onClose} className="mt-4 w-full py-2 font-bold text-muted">
          Close
        </button>
      </div>
    </div>
  );
}
