import { cn } from "@/lib/utils";

/* 엔드그레인 도마 그림 (사진 없이 코드로 그린 그림)
   - 나무 조각(타일)을 바둑판처럼 엇갈려 놓고, 조각마다 나이테 선을 그립니다.
   - 색은 app/globals.css 의 --wood-dark-1 ~ --wood-light-3, --wood-ring 에서 바꿉니다.
   - seed 숫자를 바꾸면 나이테 위치가 달라져 다른 도마처럼 보입니다.
   사용 예) <EndGrainBoard cols={8} rows={10} seed={7} animate edge /> */

const DARK = ["var(--wood-dark-1)", "var(--wood-dark-2)", "var(--wood-dark-3)"];
const LIGHT = ["var(--wood-light-1)", "var(--wood-light-2)", "var(--wood-light-3)"];
const TILE = 40;
const EDGE = 16; // 도마 두께(옆면) 높이

/** 같은 seed 면 항상 같은 무늬가 나오는 간단한 난수 */
function makeRandom(seed: number) {
  let s = Math.max(1, Math.floor(seed)) % 2147483647;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

type Tile = { x: number; y: number; fill: string; cx: number; cy: number; rings: number[]; delay: number };

function buildTiles(cols: number, rows: number, seed: number): Tile[] {
  const rand = makeRandom(seed);
  const tiles: Tile[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const palette = (r + c) % 2 === 0 ? DARK : LIGHT;
      const fill = palette[Math.floor(rand() * palette.length)];
      // 나이테 중심: 조각의 바깥 모서리 근처 (실제 엔드그레인처럼 호 모양이 보이게)
      const cx = rand() < 0.5 ? -TILE * (0.2 + rand() * 0.6) : TILE * (1.2 + rand() * 0.6);
      const cy = rand() < 0.5 ? -TILE * (0.2 + rand() * 0.6) : TILE * (1.2 + rand() * 0.6);
      const gap = 4 + rand() * 3;
      const start = 6 + rand() * 6;
      const rings = Array.from({ length: 14 }, (_, i) => start + i * gap);
      tiles.push({ x: c * TILE, y: r * TILE, fill, cx, cy, rings, delay: (r + c) * 28 });
    }
  }
  return tiles;
}

export function EndGrainBoard({
  cols = 8,
  rows = 10,
  seed = 7,
  animate = false,
  edge = false,
  slice = false,
  className,
  label,
}: {
  cols?: number;
  rows?: number;
  seed?: number;
  /** 첫 화면용: 조각이 하나씩 놓이는 효과 */
  animate?: boolean;
  /** 아래쪽에 도마 두께(옆면)를 그림 */
  edge?: boolean;
  /** 상자를 꽉 채우게 (카드 사진 자리용) */
  slice?: boolean;
  className?: string;
  /** 화면 읽기 프로그램용 설명. 없으면 장식 그림으로 처리 */
  label?: string;
}) {
  const tiles = buildTiles(cols, rows, seed);
  const width = cols * TILE;
  const faceHeight = rows * TILE;
  const height = faceHeight + (edge ? EDGE : 0);
  const clipId = `eg-clip-${seed}-${cols}x${rows}`;
  const bottomRow = tiles.slice((rows - 1) * cols);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio={slice ? "xMidYMid slice" : "xMidYMid meet"}
      className={cn("block", animate && "eg-animate", className)}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <defs>
        <clipPath id={clipId}>
          <rect width={width} height={height} rx={edge ? 10 : 0} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        {/* 도마 윗면: 나무 조각들 */}
        {tiles.map((t, i) => (
          <g
            key={i}
            className="eg-tile"
            style={animate ? { animationDelay: `${t.delay}ms` } : undefined}
          >
            <svg x={t.x} y={t.y} width={TILE} height={TILE} overflow="hidden">
              <rect width={TILE} height={TILE} style={{ fill: t.fill }} />
              {t.rings.map((radius, j) => (
                <circle
                  key={j}
                  cx={t.cx}
                  cy={t.cy}
                  r={radius}
                  fill="none"
                  strokeWidth={j % 3 === 0 ? 1.4 : 0.7}
                  style={{ stroke: "var(--wood-ring)", strokeOpacity: j % 3 === 0 ? 0.32 : 0.18 }}
                />
              ))}
              {/* 조각 사이 이음선 */}
              <rect
                width={TILE}
                height={TILE}
                fill="none"
                strokeWidth={0.8}
                style={{ stroke: "var(--wood-ring)", strokeOpacity: 0.22 }}
              />
            </svg>
          </g>
        ))}

        {/* 도마 옆면(두께): 맨 아래 줄 조각 색을 이어 받고 살짝 어둡게 */}
        {edge
          ? bottomRow.map((t, i) => (
              <g key={`edge-${i}`}>
                <rect x={t.x} y={faceHeight} width={TILE} height={EDGE} style={{ fill: t.fill }} />
                <rect
                  x={t.x}
                  y={faceHeight}
                  width={TILE}
                  height={EDGE}
                  style={{ fill: "var(--wood-ring)", fillOpacity: 0.5 }}
                />
              </g>
            ))
          : null}
        {/* 윗면과 옆면 사이 모서리 빛 */}
        {edge ? (
          <rect x={0} y={faceHeight - 1} width={width} height={1.5} style={{ fill: "var(--wood-light-2)", fillOpacity: 0.5 }} />
        ) : null}
      </g>
    </svg>
  );
}
