export type ActivityId = "pop" | "match" | "count" | "piano" | "draw" | "sort";

export type Activity = {
  id: ActivityId;
  title: string;
  blurb: string;
  premium: boolean;
  swatch: "coral" | "teal" | "sun";
};

export const activities: Activity[] = [
  { id: "pop", title: "Bubble pop", blurb: "Tap the bubbles", premium: false, swatch: "coral" },
  { id: "match", title: "Twin tiles", blurb: "Find the pairs", premium: false, swatch: "teal" },
  { id: "count", title: "How many", blurb: "Count the shapes", premium: false, swatch: "sun" },
  { id: "piano", title: "Color keys", blurb: "Play a tune", premium: false, swatch: "coral" },
  { id: "draw", title: "Finger paint", blurb: "Draw anything", premium: true, swatch: "teal" },
  { id: "sort", title: "Color nests", blurb: "Sort by color", premium: true, swatch: "sun" },
];

export function getActivity(id: string): Activity | undefined {
  return activities.find((a) => a.id === id);
}
