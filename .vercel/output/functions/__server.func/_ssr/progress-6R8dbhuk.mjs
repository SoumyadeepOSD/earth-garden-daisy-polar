import { i as __toESM } from "../_runtime.mjs";
import { J as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/progress-6R8dbhuk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var activities = [
	{
		id: "pop",
		title: "Bubble pop",
		blurb: "Tap the bubbles",
		premium: false,
		swatch: "coral"
	},
	{
		id: "match",
		title: "Twin tiles",
		blurb: "Find the pairs",
		premium: false,
		swatch: "teal"
	},
	{
		id: "count",
		title: "How many",
		blurb: "Count the shapes",
		premium: false,
		swatch: "sun"
	},
	{
		id: "piano",
		title: "Color keys",
		blurb: "Play a tune",
		premium: false,
		swatch: "coral"
	},
	{
		id: "draw",
		title: "Finger paint",
		blurb: "Draw anything",
		premium: true,
		swatch: "teal"
	},
	{
		id: "sort",
		title: "Color nests",
		blurb: "Sort by color",
		premium: true,
		swatch: "sun"
	}
];
function getActivity(id) {
	return activities.find((a) => a.id === id);
}
var KEY = "little-den-progress";
var empty = {
	stars: 0,
	unlocked: false,
	played: 0
};
function read() {
	if (typeof window === "undefined") return empty;
	try {
		const raw = localStorage.getItem(KEY);
		if (!raw) return empty;
		const parsed = JSON.parse(raw);
		return {
			stars: Number(parsed.stars) || 0,
			unlocked: Boolean(parsed.unlocked),
			played: Number(parsed.played) || 0
		};
	} catch {
		return empty;
	}
}
function write(next) {
	localStorage.setItem(KEY, JSON.stringify(next));
	window.dispatchEvent(new Event("little-den"));
}
function useProgress() {
	const [progress, setProgress] = (0, import_react.useState)(empty);
	(0, import_react.useEffect)(() => {
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
			write({
				...read(),
				stars: read().stars + 1,
				played: read().played + 1
			});
		},
		markPlayed() {
			write({
				...read(),
				played: read().played + 1
			});
		},
		unlock() {
			write({
				...read(),
				unlocked: true
			});
		}
	};
}
//#endregion
export { getActivity as n, useProgress as r, activities as t };
