import { siteConfig } from "@/site.config";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/layout/section-header";

/* 이야기(소개) 섹션.
   - 글자는 site.config.ts 의 about 에서 바꿉니다.
   - 오른쪽 그림: 도마를 옆에서 자른 단면. 칼날이 나무 섬유를 끊는지(누운 결),
     섬유 사이로 들어가는지(세운 결)를 비교합니다. 코드로 그린 그림이라 사진이 필요 없습니다. */

const BOARD = { x: 10, y: 66, w: 220, h: 64 };
const TIP = { x: 120, y: 96 }; // 칼끝 위치

/** 칼날 단면 (위에서 내려오는 얇은 쐐기 모양) */
function Blade() {
  return (
    <polygon
      points={`${TIP.x - 9},6 ${TIP.x + 9},6 ${TIP.x},${TIP.y}`}
      className="fill-foreground/85"
    />
  );
}

/** 누운 결: 섬유가 가로로 누워 있고, 칼날 아래 섬유가 끊어짐 */
function FlatGrain() {
  const lines = Array.from({ length: 7 }, (_, i) => BOARD.y + 8 + i * 8);
  return (
    <svg viewBox="0 0 240 140" className="h-auto w-full" aria-hidden>
      <rect {...{ x: BOARD.x, y: BOARD.y, width: BOARD.w, height: BOARD.h }} rx={3} style={{ fill: "var(--wood-light-2)" }} />
      {lines.map((y) =>
        y < TIP.y ? (
          <g key={y} style={{ stroke: "var(--wood-ring)", strokeOpacity: 0.45 }} strokeWidth={1.4}>
            <line x1={BOARD.x + 2} y1={y} x2={TIP.x - 5} y2={y} />
            <line x1={TIP.x + 5} y1={y} x2={BOARD.x + BOARD.w - 2} y2={y} />
          </g>
        ) : (
          <line
            key={y}
            x1={BOARD.x + 2}
            y1={y}
            x2={BOARD.x + BOARD.w - 2}
            y2={y}
            strokeWidth={1.4}
            style={{ stroke: "var(--wood-ring)", strokeOpacity: 0.45 }}
          />
        ),
      )}
      <Blade />
    </svg>
  );
}

/** 세운 결: 섬유가 세로로 서 있고, 칼날이 섬유 사이를 벌리며 들어감 */
function EndGrain() {
  const xs = Array.from({ length: 30 }, (_, i) => BOARD.x + 6.5 + i * 7.25);
  return (
    <svg viewBox="0 0 240 140" className="h-auto w-full" aria-hidden>
      <rect {...{ x: BOARD.x, y: BOARD.y, width: BOARD.w, height: BOARD.h }} rx={3} style={{ fill: "var(--wood-dark-2)" }} />
      {xs.map((x) => {
        const d = x - TIP.x;
        const near = Math.abs(d) < 16;
        const push = near ? Math.sign(d) * (16 - Math.abs(d)) * 0.55 : 0;
        const path = `M ${x} ${BOARD.y + 3} Q ${x + push} ${BOARD.y + 18} ${x + push * 0.4} ${TIP.y + 4} L ${x} ${BOARD.y + BOARD.h - 3}`;
        return (
          <path
            key={x}
            d={path}
            fill="none"
            strokeWidth={1.6}
            style={{ stroke: "var(--wood-light-1)", strokeOpacity: 0.6 }}
          />
        );
      })}
      <Blade />
    </svg>
  );
}

export function About() {
  const { about } = siteConfig;

  return (
    <section id="about" className="scroll-mt-16 bg-muted py-28 md:py-36">
      <Container className="grid gap-14 md:grid-cols-[0.95fr_1.05fr] md:items-center">
        <div>
          <SectionHeader title={about.title} />
          <div className="mt-6 max-w-[34rem] space-y-4 text-lg leading-[1.8] text-muted-foreground">
            {about.paragraphs.map((text, i) => (
              <p key={i}>{text}</p>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5 sm:gap-8">
          <figure>
            <FlatGrain />
            <figcaption className="mt-3">
              <p className="text-base font-semibold text-foreground">{about.compare.flat.title}</p>
              <p className="mt-1 text-[0.95rem] leading-relaxed text-muted-foreground">
                {about.compare.flat.text}
              </p>
            </figcaption>
          </figure>
          <figure>
            <EndGrain />
            <figcaption className="mt-3">
              <p className="text-base font-semibold text-foreground">{about.compare.end.title}</p>
              <p className="mt-1 text-[0.95rem] leading-relaxed text-muted-foreground">
                {about.compare.end.text}
              </p>
            </figcaption>
          </figure>
        </div>
      </Container>

      {/* 엔드그레인 도마의 좋은 점 4가지 + 셰프의 한마디 (site.config.ts 의 about.benefits, about.quote) */}
      <Container className="mt-20">
        <ol className="grid gap-x-10 gap-y-8 border-t pt-12 sm:grid-cols-2 lg:grid-cols-4">
          {about.benefits.map((b, i) => (
            <li key={b.title}>
              <span className="font-brand text-sm tracking-[0.2em] text-oak" aria-hidden>
                0{i + 1}
              </span>
              <h3 className="mt-2 text-xl">{b.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground">{b.text}</p>
            </li>
          ))}
        </ol>
        <figure className="mt-16 text-center">
          <blockquote className="font-display text-[1.45rem] leading-relaxed sm:text-[1.7rem]">
            “{about.quote}”
          </blockquote>
          <figcaption className="mt-3 text-sm text-muted-foreground">— {about.quoteBy}</figcaption>
        </figure>
      </Container>
    </section>
  );
}
