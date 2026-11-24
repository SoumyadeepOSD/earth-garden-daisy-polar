import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime, b as useParams, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as getActivity, r as useProgress } from "./progress-6R8dbhuk.mjs";
import { i as ArrowLeft } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/play._id-CPiwCkos.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SHAPES = [
	"circle",
	"square",
	"triangle",
	"diamond"
];
function ShapeMark({ shape, className }) {
	const common = `fill-current ${className ?? ""}`;
	if (shape === "circle") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `inline-block size-10 rounded-full bg-current ${className ?? ""}` });
	if (shape === "square") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `inline-block size-10 rounded-md bg-current ${className ?? ""}` });
	if (shape === "diamond") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `inline-block size-10 rotate-45 rounded-md bg-current ${className ?? ""}` });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 40 36",
		className: `size-10 ${common}`,
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M20 2 L38 34 H2 Z" })
	});
}
function tone(i) {
	return [
		"text-coral",
		"text-teal",
		"text-sun-ink"
	][i % 3];
}
function PlayGame({ id, onStar }) {
	if (id === "pop") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BubblePop, { onStar });
	if (id === "match") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TwinTiles, { onStar });
	if (id === "count") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HowMany, { onStar });
	if (id === "piano") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorKeys, { onStar });
	if (id === "draw") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FingerPaint, { onStar });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorNests, { onStar });
}
function BubblePop({ onStar }) {
	const [bubbles, setBubbles] = (0, import_react.useState)(() => seedBubbles());
	const [left, setLeft] = (0, import_react.useState)(8);
	const [popped, setPopped] = (0, import_react.useState)(0);
	const awarded = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		if (left === 0 && !awarded.current) {
			awarded.current = true;
			onStar();
		}
	}, [left, onStar]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mb-3 text-center font-display text-xl text-ink",
		children: left === 0 ? "All popped" : `${left} bubbles left`
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-4 gap-3",
		children: bubbles.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			"aria-label": b.gone ? "popped" : "bubble",
			disabled: b.gone,
			onClick: () => {
				if (b.gone) return;
				setBubbles((list) => list.map((x) => x.id === b.id ? {
					...x,
					gone: true
				} : x));
				setLeft((n) => n - 1);
				setPopped((n) => n + 1);
			},
			className: `flex h-16 items-center justify-center rounded-full border-4 border-surface shadow-sm transition active:scale-90 ${b.gone ? "bg-line opacity-40" : b.color}`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-display text-lg text-surface",
				children: b.gone ? "" : popped > 20 ? "" : ""
			})
		}, b.id))
	})] });
}
function seedBubbles() {
	const colors = [
		"bg-coral",
		"bg-teal",
		"bg-sun"
	];
	return Array.from({ length: 8 }, (_, id) => ({
		id,
		gone: false,
		color: colors[id % 3]
	}));
}
function TwinTiles({ onStar }) {
	const deck = (0, import_react.useMemo)(() => shufflePairs(), []);
	const [open, setOpen] = (0, import_react.useState)([]);
	const [known, setKnown] = (0, import_react.useState)([]);
	const [lock, setLock] = (0, import_react.useState)(false);
	const awarded = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		if (known.length === 8 && !awarded.current) {
			awarded.current = true;
			onStar();
		}
	}, [known.length, onStar]);
	function tap(index) {
		if (lock || known.includes(index) || open.includes(index)) return;
		const next = [...open, index];
		setOpen(next);
		if (next.length === 2) {
			setLock(true);
			const [a, b] = next;
			window.setTimeout(() => {
				if (deck[a] === deck[b]) setKnown((k) => [
					...k,
					a,
					b
				]);
				setOpen([]);
				setLock(false);
			}, 650);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mb-3 text-center font-display text-xl",
		children: known.length === 8 ? "Pairs found" : "Find the twins"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-4 gap-2",
		children: deck.map((shape, index) => {
			const show = open.includes(index) || known.includes(index);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => tap(index),
				className: `flex h-20 items-center justify-center rounded-2xl border-2 ${show ? "border-line bg-surface" : "border-teal bg-teal text-teal-ink"}`,
				"aria-label": show ? shape : "hidden tile",
				children: show ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShapeMark, {
					shape,
					className: tone(SHAPES.indexOf(shape))
				}) : null
			}, index);
		})
	})] });
}
function shufflePairs() {
	const pair = [...SHAPES, ...SHAPES];
	for (let i = pair.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[pair[i], pair[j]] = [pair[j], pair[i]];
	}
	return pair;
}
function HowMany({ onStar }) {
	const [round, setRound] = (0, import_react.useState)(() => makeRound());
	const [note, setNote] = (0, import_react.useState)("Tap the number");
	const awarded = (0, import_react.useRef)(false);
	const wins = (0, import_react.useRef)(0);
	function choose(n) {
		if (n === round.count) {
			wins.current += 1;
			if (wins.current >= 3 && !awarded.current) {
				awarded.current = true;
				onStar();
				setNote("Three right. Star earned.");
			} else setNote("Yes");
			setRound(makeRound());
		} else setNote("Try again");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-4 font-display text-xl",
				children: note
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-6 flex min-h-28 flex-wrap items-center justify-center gap-3",
				children: Array.from({ length: round.count }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShapeMark, {
					shape: round.shape,
					className: tone(SHAPES.indexOf(round.shape))
				}, i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-3 gap-3",
				children: round.choices.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => choose(n),
					className: "h-16 rounded-2xl bg-surface font-display text-3xl text-ink shadow-sm ring-1 ring-line",
					children: n
				}, n))
			})
		]
	});
}
function makeRound() {
	const count = 2 + Math.floor(Math.random() * 6);
	const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
	const choices = /* @__PURE__ */ new Set([count]);
	while (choices.size < 3) choices.add(1 + Math.floor(Math.random() * 8));
	return {
		count,
		shape,
		choices: [...choices].sort(() => Math.random() - .5)
	};
}
var NOTES = [
	262,
	294,
	330,
	349,
	392,
	440,
	494,
	523
];
function ColorKeys({ onStar }) {
	const [played, setPlayed] = (0, import_react.useState)(0);
	const awarded = (0, import_react.useRef)(false);
	const ctx = (0, import_react.useRef)(null);
	function play(freq) {
		const AudioCtx = window.AudioContext || window.webkitAudioContext;
		if (!ctx.current) ctx.current = new AudioCtx();
		const audio = ctx.current;
		const osc = audio.createOscillator();
		const gain = audio.createGain();
		osc.frequency.value = freq;
		osc.type = "triangle";
		gain.gain.setValueAtTime(1e-4, audio.currentTime);
		gain.gain.exponentialRampToValueAtTime(.2, audio.currentTime + .02);
		gain.gain.exponentialRampToValueAtTime(1e-4, audio.currentTime + .45);
		osc.connect(gain);
		gain.connect(audio.destination);
		osc.start();
		osc.stop(audio.currentTime + .46);
		setPlayed((n) => {
			const next = n + 1;
			if (next >= 8 && !awarded.current) {
				awarded.current = true;
				onStar();
			}
			return next;
		});
	}
	const colors = [
		"bg-coral",
		"bg-sun",
		"bg-teal",
		"bg-coral",
		"bg-sun",
		"bg-teal",
		"bg-coral",
		"bg-sun"
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mb-3 text-center font-display text-xl",
		children: played >= 8 ? "Nice tune" : "Tap eight keys"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-4 gap-2",
		children: NOTES.map((freq, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			"aria-label": `key ${i + 1}`,
			onClick: () => play(freq),
			className: `h-24 rounded-2xl ${colors[i]} active:scale-95`
		}, freq))
	})] });
}
function FingerPaint({ onStar }) {
	const canvasRef = (0, import_react.useRef)(null);
	const drawing = (0, import_react.useRef)(false);
	const awarded = (0, import_react.useRef)(false);
	const [color, setColor] = (0, import_react.useState)("#ef5b4c");
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const rect = canvas.getBoundingClientRect();
		canvas.width = rect.width * 2;
		canvas.height = rect.height * 2;
		const g = canvas.getContext("2d");
		if (!g) return;
		g.scale(2, 2);
		g.fillStyle = "#fffdf8";
		g.fillRect(0, 0, rect.width, rect.height);
	}, []);
	function pos(e) {
		const r = canvasRef.current.getBoundingClientRect();
		return {
			x: e.clientX - r.left,
			y: e.clientY - r.top
		};
	}
	function down(e) {
		drawing.current = true;
		const g = canvasRef.current?.getContext("2d");
		if (!g) return;
		const p = pos(e);
		g.strokeStyle = color;
		g.lineWidth = 8;
		g.lineCap = "round";
		g.beginPath();
		g.moveTo(p.x, p.y);
	}
	function move(e) {
		if (!drawing.current) return;
		const g = canvasRef.current?.getContext("2d");
		if (!g) return;
		const p = pos(e);
		g.strokeStyle = color;
		g.lineTo(p.x, p.y);
		g.stroke();
		if (!awarded.current) {
			awarded.current = true;
			onStar();
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mb-3 flex justify-center gap-2",
		children: [
			"#ef5b4c",
			"#1f8a70",
			"#f4b942",
			"#2a2118"
		].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			"aria-label": "paint color",
			onClick: () => setColor(c),
			className: "size-11 rounded-full ring-2 ring-surface",
			style: {
				background: c,
				outline: color === c ? "3px solid #2a2118" : "none"
			}
		}, c))
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
		ref: canvasRef,
		className: "h-72 w-full touch-none rounded-3xl ring-1 ring-line",
		onPointerDown: down,
		onPointerMove: move,
		onPointerUp: () => {
			drawing.current = false;
		},
		onPointerLeave: () => {
			drawing.current = false;
		}
	})] });
}
var NESTS = [
	{
		id: "coral",
		label: "Red",
		token: "bg-coral"
	},
	{
		id: "teal",
		label: "Green",
		token: "bg-teal"
	},
	{
		id: "sun",
		label: "Yellow",
		token: "bg-sun"
	}
];
function ColorNests({ onStar }) {
	const [pieces, setPieces] = (0, import_react.useState)(() => NESTS.flatMap((n) => [{
		id: `${n.id}-a`,
		nest: n.id
	}, {
		id: `${n.id}-b`,
		nest: n.id
	}]).sort(() => Math.random() - .5));
	const [held, setHeld] = (0, import_react.useState)(null);
	const awarded = (0, import_react.useRef)(false);
	const placed = pieces.filter((p) => p.nest === "done").length;
	(0, import_react.useEffect)(() => {
		if (placed === 6 && !awarded.current) {
			awarded.current = true;
			onStar();
		}
	}, [placed, onStar]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-3 text-center font-display text-xl",
			children: placed === 6 ? "Sorted" : "Tap a shape, then its nest"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4 flex min-h-16 flex-wrap justify-center gap-2",
			children: pieces.filter((p) => p.nest !== "done").map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setHeld(p.id),
				className: `size-14 rounded-2xl ${held === p.id ? "ring-4 ring-ink" : ""} ${NESTS.find((n) => n.id === p.nest)?.token}`,
				"aria-label": "shape"
			}, p.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-3 gap-2",
			children: NESTS.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => {
					if (!held) return;
					setPieces((list) => list.map((p) => p.id === held && p.nest === n.id ? {
						...p,
						nest: "done"
					} : p));
					setHeld(null);
				},
				className: `flex h-24 items-end justify-center rounded-3xl pb-3 font-display ${n.token} ${n.id === "sun" ? "text-sun-ink" : "text-surface"}`,
				children: n.label
			}, n.id))
		})
	] });
}
function PlayPage() {
	const { id } = useParams({ from: "/play/$id" });
	const activity = getActivity(id);
	const progress = useProgress();
	if (!activity || activity.premium && !progress.unlocked) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-lg px-4 py-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-2xl",
			children: "That den is closed."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/",
			className: "mt-4 inline-block font-bold text-teal",
			children: "Back home"
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto min-h-screen max-w-lg px-4 pb-10 pt-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				"aria-label": "Back",
				className: "flex size-11 items-center justify-center rounded-full bg-surface ring-1 ring-line",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-5" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl",
				children: activity.title
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayGame, {
			id: activity.id,
			onStar: progress.addStar
		})]
	});
}
//#endregion
export { PlayPage as component };
