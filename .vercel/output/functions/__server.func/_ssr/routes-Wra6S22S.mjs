import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as useProgress, t as activities } from "./progress-6R8dbhuk.mjs";
import { n as Star, r as Lock } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Wra6S22S.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const progress = useProgress();
	const [parentOpen, setParentOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto min-h-screen max-w-lg px-4 pb-16 pt-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mb-6 flex items-end justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-bold uppercase tracking-wide text-muted",
					children: "Ages 5–10"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-4xl leading-none text-ink",
					children: "Little Den"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1 rounded-full bg-surface px-3 py-2 ring-1 ring-line",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
						className: "size-5 fill-sun text-sun",
						"aria-hidden": true
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-xl",
						children: progress.stars
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "grid grid-cols-2 gap-3",
				children: activities.map((activity) => {
					const locked = activity.premium && !progress.unlocked;
					const card = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: `flex h-40 flex-col justify-between rounded-card p-4 text-left ${activity.swatch === "coral" ? "bg-coral text-coral-ink" : activity.swatch === "teal" ? "bg-teal text-teal-ink" : "bg-sun text-sun-ink"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-2xl leading-tight",
								children: activity.title
							}), locked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, {
								className: "size-5",
								"aria-label": "Locked"
							}) : null]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-bold opacity-90",
							children: locked ? "Parent pack" : activity.blurb
						})]
					});
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: locked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "w-full",
						onClick: () => setParentOpen(true),
						children: card
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/play/$id",
						params: { id: activity.id },
						className: "block",
						children: card
					}) }, activity.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setParentOpen(true),
				className: "mt-6 w-full rounded-full bg-surface py-3 font-bold text-ink ring-1 ring-line",
				children: "Grown-up corner"
			}),
			parentOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParentSheet, {
				onClose: () => setParentOpen(false),
				unlocked: progress.unlocked,
				unlock: progress.unlock
			}) : null
		]
	});
}
function ParentSheet({ onClose, unlocked, unlock }) {
	const a = 4;
	const b = 3;
	const [answer, setAnswer] = (0, import_react.useState)("");
	const [ok, setOk] = (0, import_react.useState)(false);
	const [miss, setMiss] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-20 flex items-end justify-center bg-ink/40 p-4",
		role: "dialog",
		"aria-modal": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-lg rounded-card bg-surface p-5 text-ink",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl",
					children: "For a grown-up"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "Children should not open purchases. Answer to continue."
				}),
				!ok ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "mt-4 flex gap-2",
					onSubmit: (e) => {
						e.preventDefault();
						if (Number(answer) === 7) {
							setOk(true);
							setMiss(false);
						} else setMiss(true);
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "sr-only",
							htmlFor: "sum",
							children: [
								"What is ",
								a,
								" plus ",
								b
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center font-display text-2xl",
							children: [
								a,
								" + ",
								b,
								" ="
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "sum",
							inputMode: "numeric",
							value: answer,
							onChange: (e) => setAnswer(e.target.value),
							className: "w-20 rounded-xl border border-line bg-bg px-3 text-2xl"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							className: "rounded-full bg-teal px-4 font-bold text-teal-ink",
							children: "Check"
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm leading-relaxed",
						children: "Extra dens (finger paint and color nests) are the paid pack. On a real Android app this button would open Google Play. Here it only unlocks on this phone’s browser, so you can try the loop. Free play stays free. A yearly plan around $25–40 is the usual price for this kind of app."
					}), unlocked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-bold text-teal",
						children: "Pack unlocked on this device."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: unlock,
						className: "w-full rounded-full bg-coral py-3 font-bold text-coral-ink",
						children: "Unlock extra den"
					})]
				}),
				miss ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-coral",
					children: "Not quite."
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onClose,
					className: "mt-4 w-full py-2 font-bold text-muted",
					children: "Close"
				})
			]
		})
	});
}
//#endregion
export { Home as component };
