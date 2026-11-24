import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { PlayGame } from "@/components/play/games";
import { getActivity } from "@/lib/play/catalog";
import { useProgress } from "@/lib/play/progress";

export const Route = createFileRoute("/play/$id")({ component: PlayPage });

function PlayPage() {
  const { id } = useParams({ from: "/play/$id" });
  const activity = getActivity(id);
  const progress = useProgress();

  if (!activity || (activity.premium && !progress.unlocked)) {
    return (
      <main className="mx-auto max-w-lg px-4 py-8">
        <p className="font-display text-2xl">That den is closed.</p>
        <Link to="/" className="mt-4 inline-block font-bold text-teal">
          Back home
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen max-w-lg px-4 pb-10 pt-4">
      <div className="mb-4 flex items-center gap-3">
        <Link
          to="/"
          aria-label="Back"
          className="flex size-11 items-center justify-center rounded-full bg-surface ring-1 ring-line"
        >
          <ArrowLeft className="size-5" />
        </Link>
        <h1 className="font-display text-3xl">{activity.title}</h1>
      </div>
      <PlayGame id={activity.id} onStar={progress.addStar} />
    </main>
  );
}
