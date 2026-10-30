import { siteConfig } from "@/site.config";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { EndGrainBoard } from "@/components/ui/end-grain-board";

/* 첫 화면(히어로).
   - 글자는 site.config.ts 의 hero 에서 바꿉니다.
   - 오른쪽 도마 그림은 components/ui/end-grain-board.tsx (사진이 아니라 코드로 그린 그림)
     → 실제 도마 사진으로 바꾸고 싶으면 Claude에게 "히어로 오른쪽 도마 그림을 public 폴더의 ○○.jpg 사진으로 바꿔줘"
   - 재팬디 분위기: 도마 그림을 벽에 건 액자처럼 베이지 판 위에 두고, 옆에 세로 원목 루버(가는 세로줄)를 깔았습니다. */
export function Hero() {
  const { hero } = siteConfig;

  return (
    <section id="top" className="relative overflow-hidden">
      <Container className="grid min-h-[88svh] items-center gap-14 py-20 md:grid-cols-[1.1fr_0.9fr] md:gap-20 md:py-28">
        <div>
          <div className="mb-8 h-px w-12 bg-oak" aria-hidden />
          <h1 className="whitespace-pre-line text-[2.4rem] leading-[1.35] tracking-[0.01em] sm:text-[3.1rem] lg:text-[3.5rem]">
            {hero.title}
          </h1>
          <p className="mt-8 max-w-[34rem] text-lg leading-[1.9] text-muted-foreground">
            {hero.description}
          </p>
          <div className="mt-12 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href={hero.primaryCta.href} target="_blank" rel="noreferrer">
                {hero.primaryCta.label}
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={hero.secondaryCta.href}>{hero.secondaryCta.label}</a>
            </Button>
          </div>
        </div>

        <figure className="mx-auto w-full max-w-[28rem] md:max-w-none">
          <div className="relative flex bg-muted">
            <div className="flex-1 p-8 sm:p-12">
              <EndGrainBoard
                cols={8}
                rows={10}
                seed={11}
                animate
                edge
                label="엔드그레인 도마 그림: 어두운 나무 조각과 밝은 나무 조각이 바둑판처럼 엇갈려 있고 조각마다 나이테가 보입니다"
                className="h-auto w-full drop-shadow-[0_14px_22px_color-mix(in_srgb,var(--wood-ring)_22%,transparent)]"
              />
            </div>
            <div className="louver w-10 shrink-0 sm:w-16" aria-hidden />
          </div>
          <figcaption className="mt-5 text-sm leading-relaxed text-muted-foreground">
            {hero.caption}
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}
