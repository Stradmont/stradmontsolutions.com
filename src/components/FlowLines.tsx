/**
 * Ambient background: a bundle of hairline curves sweeping from the upper-left,
 * pinching through a single node on the right, then fanning out again.
 * Purely decorative — drawn with design-system colors only.
 */

const W = 1600;
const H = 1000;

// The pinch point the whole bundle passes through.
const NODE = { x: 1170, y: 600 };

const COUNT = 22;

function buildPath(i: number) {
  const t = i / (COUNT - 1); // 0 -> 1

  // Origins spread along the top and left edges.
  const sx = -180 + t * 900;
  const sy = -140 + t * 250;

  // Control points bend the incoming stroke gently downward.
  const c1x = sx + 380;
  const c1y = sy + 190 + t * 60;
  const c2x = NODE.x - 420;
  const c2y = NODE.y - 190 + t * 150;

  // Outgoing fan: spreads wider the further along the bundle the line sits.
  const spread = (t - 0.5) * 2; // -1 -> 1
  const ex = W + 260;
  const ey = NODE.y + 40 + spread * 520 + t * 180;

  const o1x = NODE.x + 150;
  const o1y = NODE.y + spread * 60;
  const o2x = NODE.x + 340;
  const o2y = NODE.y + spread * 300 + 60;

  return (
    `M ${sx} ${sy} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${NODE.x} ${NODE.y} ` +
    `C ${o1x} ${o1y}, ${o2x} ${o2y}, ${ex} ${ey}`
  );
}

export function FlowLines({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    >
      <defs>
        <linearGradient id="strandFade" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--color-electric)" stopOpacity="0.05" />
          <stop offset="45%" stopColor="var(--color-electric)" stopOpacity="0.42" />
          <stop offset="100%" stopColor="var(--color-electric)" stopOpacity="0.06" />
        </linearGradient>
        <radialGradient id="nodeGlow">
          <stop offset="0%" stopColor="var(--color-electric)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="var(--color-electric)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <g fill="none" stroke="url(#strandFade)" strokeWidth="1">
        {Array.from({ length: COUNT }, (_, i) => (
          <path
            key={i}
            d={buildPath(i)}
            strokeWidth={i % 5 === 0 ? 1.4 : 0.8}
            opacity={0.55 + (i % 4) * 0.12}
          />
        ))}
      </g>

      {/* Two brighter travelling strands for a hint of life */}
      <g fill="none" stroke="var(--color-electric)" strokeOpacity="0.5" strokeWidth="1.2">
        <path
          d={buildPath(7)}
          strokeDasharray="120 2400"
          style={{ animation: "stradmont-drift 14s linear infinite" }}
        />
        <path
          d={buildPath(15)}
          strokeDasharray="90 2400"
          style={{ animation: "stradmont-drift 19s linear infinite" }}
        />
      </g>

      <circle cx={NODE.x} cy={NODE.y} r="120" fill="url(#nodeGlow)" />
      <circle cx={NODE.x} cy={NODE.y} r="3" fill="var(--color-electric)" opacity="0.7" />
    </svg>
  );
}
