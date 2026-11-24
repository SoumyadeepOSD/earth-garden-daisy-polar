import { useEffect, useMemo, useRef, useState } from "react";
import type { ActivityId } from "@/lib/play/catalog";

const SHAPES = ["circle", "square", "triangle", "diamond"] as const;
type Shape = (typeof SHAPES)[number];

function ShapeMark({ shape, className }: { shape: Shape; className?: string }) {
  const common = `fill-current ${className ?? ""}`;
  if (shape === "circle") return <span className={`inline-block size-10 rounded-full bg-current ${className ?? ""}`} />;
  if (shape === "square") return <span className={`inline-block size-10 rounded-md bg-current ${className ?? ""}`} />;
  if (shape === "diamond") return <span className={`inline-block size-10 rotate-45 rounded-md bg-current ${className ?? ""}`} />;
  return (
    <svg viewBox="0 0 40 36" className={`size-10 ${common}`} aria-hidden>
      <path d="M20 2 L38 34 H2 Z" />
    </svg>
  );
}

function tone(i: number) {
  return ["text-coral", "text-teal", "text-sun-ink"][i % 3];
}

export function PlayGame({
  id,
  onStar,
}: {
  id: ActivityId;
  onStar: () => void;
}) {
  if (id === "pop") return <BubblePop onStar={onStar} />;
  if (id === "match") return <TwinTiles onStar={onStar} />;
  if (id === "count") return <HowMany onStar={onStar} />;
  if (id === "piano") return <ColorKeys onStar={onStar} />;
  if (id === "draw") return <FingerPaint onStar={onStar} />;
  return <ColorNests onStar={onStar} />;
}

function BubblePop({ onStar }: { onStar: () => void }) {
  const [bubbles, setBubbles] = useState(() => seedBubbles());
  const [left, setLeft] = useState(8);
  const [popped, setPopped] = useState(0);
  const awarded = useRef(false);

  useEffect(() => {
    if (left === 0 && !awarded.current) {
      awarded.current = true;
      onStar();
    }
  }, [left, onStar]);

  return (
    <div>
      <p className="mb-3 text-center font-display text-xl text-ink">
        {left === 0 ? "All popped" : `${left} bubbles left`}
      </p>
      <div className="grid grid-cols-4 gap-3">
        {bubbles.map((b) => (
          <button
            key={b.id}
            type="button"
            aria-label={b.gone ? "popped" : "bubble"}
            disabled={b.gone}
            onClick={() => {
              if (b.gone) return;
              setBubbles((list) => list.map((x) => (x.id === b.id ? { ...x, gone: true } : x)));
              setLeft((n) => n - 1);
              setPopped((n) => n + 1);
            }}
            className={`flex h-16 items-center justify-center rounded-full border-4 border-surface shadow-sm transition active:scale-90 ${
              b.gone ? "bg-line opacity-40" : b.color
            }`}
          >
            <span className="font-display text-lg text-surface">{b.gone ? "" : popped > 20 ? "" : ""}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function seedBubbles() {
  const colors = ["bg-coral", "bg-teal", "bg-sun"];
  return Array.from({ length: 8 }, (_, id) => ({
    id,
    gone: false,
    color: colors[id % 3],
  }));
}

function TwinTiles({ onStar }: { onStar: () => void }) {
  const deck = useMemo(() => shufflePairs(), []);
  const [open, setOpen] = useState<number[]>([]);
  const [known, setKnown] = useState<number[]>([]);
  const [lock, setLock] = useState(false);
  const awarded = useRef(false);

  useEffect(() => {
    if (known.length === 8 && !awarded.current) {
      awarded.current = true;
      onStar();
    }
  }, [known.length, onStar]);

  function tap(index: number) {
    if (lock || known.includes(index) || open.includes(index)) return;
    const next = [...open, index];
    setOpen(next);
    if (next.length === 2) {
      setLock(true);
      const [a, b] = next;
      window.setTimeout(() => {
        if (deck[a] === deck[b]) setKnown((k) => [...k, a, b]);
        setOpen([]);
        setLock(false);
      }, 650);
    }
  }

  return (
    <div>
      <p className="mb-3 text-center font-display text-xl">{known.length === 8 ? "Pairs found" : "Find the twins"}</p>
      <div className="grid grid-cols-4 gap-2">
        {deck.map((shape, index) => {
          const show = open.includes(index) || known.includes(index);
          return (
            <button
              key={index}
              type="button"
              onClick={() => tap(index)}
              className={`flex h-20 items-center justify-center rounded-2xl border-2 ${
                show ? "border-line bg-surface" : "border-teal bg-teal text-teal-ink"
              }`}
              aria-label={show ? shape : "hidden tile"}
            >
              {show ? <ShapeMark shape={shape} className={tone(SHAPES.indexOf(shape))} /> : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function shufflePairs(): Shape[] {
  const pair = [...SHAPES, ...SHAPES];
  for (let i = pair.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pair[i], pair[j]] = [pair[j], pair[i]];
  }
  return pair;
}

function HowMany({ onStar }: { onStar: () => void }) {
  const [round, setRound] = useState(() => makeRound());
  const [note, setNote] = useState("Tap the number");
  const awarded = useRef(false);
  const wins = useRef(0);

  function choose(n: number) {
    if (n === round.count) {
      wins.current += 1;
      if (wins.current >= 3 && !awarded.current) {
        awarded.current = true;
        onStar();
        setNote("Three right. Star earned.");
      } else {
        setNote("Yes");
      }
      setRound(makeRound());
    } else {
      setNote("Try again");
    }
  }

  return (
    <div className="text-center">
      <p className="mb-4 font-display text-xl">{note}</p>
      <div className="mb-6 flex min-h-28 flex-wrap items-center justify-center gap-3">
        {Array.from({ length: round.count }, (_, i) => (
          <ShapeMark key={i} shape={round.shape} className={tone(SHAPES.indexOf(round.shape))} />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-3">
        {round.choices.map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => choose(n)}
            className="h-16 rounded-2xl bg-surface font-display text-3xl text-ink shadow-sm ring-1 ring-line"
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
}

function makeRound() {
  const count = 2 + Math.floor(Math.random() * 6);
  const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
  const choices = new Set<number>([count]);
  while (choices.size < 3) choices.add(1 + Math.floor(Math.random() * 8));
  return { count, shape, choices: [...choices].sort(() => Math.random() - 0.5) };
}

const NOTES = [262, 294, 330, 349, 392, 440, 494, 523];

function ColorKeys({ onStar }: { onStar: () => void }) {
  const [played, setPlayed] = useState(0);
  const awarded = useRef(false);
  const ctx = useRef<AudioContext | null>(null);

  function play(freq: number) {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!ctx.current) ctx.current = new AudioCtx();
    const audio = ctx.current;
    const osc = audio.createOscillator();
    const gain = audio.createGain();
    osc.frequency.value = freq;
    osc.type = "triangle";
    gain.gain.setValueAtTime(0.0001, audio.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.2, audio.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + 0.45);
    osc.connect(gain);
    gain.connect(audio.destination);
    osc.start();
    osc.stop(audio.currentTime + 0.46);
    setPlayed((n) => {
      const next = n + 1;
      if (next >= 8 && !awarded.current) {
        awarded.current = true;
        onStar();
      }
      return next;
    });
  }

  const colors = ["bg-coral", "bg-sun", "bg-teal", "bg-coral", "bg-sun", "bg-teal", "bg-coral", "bg-sun"];

  return (
    <div>
      <p className="mb-3 text-center font-display text-xl">{played >= 8 ? "Nice tune" : "Tap eight keys"}</p>
      <div className="grid grid-cols-4 gap-2">
        {NOTES.map((freq, i) => (
          <button
            key={freq}
            type="button"
            aria-label={`key ${i + 1}`}
            onClick={() => play(freq)}
            className={`h-24 rounded-2xl ${colors[i]} active:scale-95`}
          />
        ))}
      </div>
    </div>
  );
}

function FingerPaint({ onStar }: { onStar: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawing = useRef(false);
  const awarded = useRef(false);
  const [color, setColor] = useState("#ef5b4c");

  useEffect(() => {
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

  function pos(e: React.PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current!;
    const r = canvas.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  }

  function down(e: React.PointerEvent<HTMLCanvasElement>) {
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

  function move(e: React.PointerEvent<HTMLCanvasElement>) {
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

  return (
    <div>
      <div className="mb-3 flex justify-center gap-2">
        {["#ef5b4c", "#1f8a70", "#f4b942", "#2a2118"].map((c) => (
          <button
            key={c}
            type="button"
            aria-label="paint color"
            onClick={() => setColor(c)}
            className="size-11 rounded-full ring-2 ring-surface"
            style={{ background: c, outline: color === c ? "3px solid #2a2118" : "none" }}
          />
        ))}
      </div>
      <canvas
        ref={canvasRef}
        className="h-72 w-full touch-none rounded-3xl ring-1 ring-line"
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={() => {
          drawing.current = false;
        }}
        onPointerLeave={() => {
          drawing.current = false;
        }}
      />
    </div>
  );
}

const NESTS = [
  { id: "coral", label: "Red", token: "bg-coral" },
  { id: "teal", label: "Green", token: "bg-teal" },
  { id: "sun", label: "Yellow", token: "bg-sun" },
] as const;

function ColorNests({ onStar }: { onStar: () => void }) {
  const [pieces, setPieces] = useState<{ id: string; nest: string }[]>(() =>
    NESTS.flatMap((n) => [
      { id: `${n.id}-a`, nest: n.id },
      { id: `${n.id}-b`, nest: n.id },
    ]).sort(() => Math.random() - 0.5),
  );
  const [held, setHeld] = useState<string | null>(null);
  const awarded = useRef(false);
  const placed = pieces.filter((p) => p.nest === "done").length;

  useEffect(() => {
    if (placed === 6 && !awarded.current) {
      awarded.current = true;
      onStar();
    }
  }, [placed, onStar]);

  return (
    <div>
      <p className="mb-3 text-center font-display text-xl">{placed === 6 ? "Sorted" : "Tap a shape, then its nest"}</p>
      <div className="mb-4 flex min-h-16 flex-wrap justify-center gap-2">
        {pieces
          .filter((p) => p.nest !== "done")
          .map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setHeld(p.id)}
              className={`size-14 rounded-2xl ${held === p.id ? "ring-4 ring-ink" : ""} ${
                NESTS.find((n) => n.id === p.nest)?.token
              }`}
              aria-label="shape"
            />
          ))}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {NESTS.map((n) => (
          <button
            key={n.id}
            type="button"
            onClick={() => {
              if (!held) return;
              setPieces((list) =>
                list.map((p) => (p.id === held && p.nest === n.id ? { ...p, nest: "done" } : p)),
              );
              setHeld(null);
            }}
            className={`flex h-24 items-end justify-center rounded-3xl pb-3 font-display ${n.token} ${
              n.id === "sun" ? "text-sun-ink" : "text-surface"
            }`}
          >
            {n.label}
          </button>
        ))}
      </div>
    </div>
  );
}
