import { siteConfig } from "@/site.config";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { EndGrainBoard } from "@/components/ui/end-grain-board";

/* 첫 화면(히어로).
   - 글자는 site.config.ts 의 hero 에서 바꿉니다.
   - 오른쪽 도마 그림은 components/ui/end-grain-board.tsx (사진이 아니라 코드로 그린 그림)
     → 실제 도마 사진으로 바꾸고 싶으면 Claude에게 "히어로 오른쪽 도마 그림을 public 폴더의 ○○.jpg 사진으로 바꿔줘" */
export function Hero() {
  const { hero } = siteConfig;

  return (
    <section id="top" className="relative overflow-hidden">
      <Container className="grid min-h-[86svh] items-center gap-12 py-16 md:grid-cols-[1.15fr_0.85fr] md:gap-16 md:py-24">
        <div>
          <h1 className="whitespace-pre-line text-[2.5rem] leading-[1.25] tracking-[-0.01em] sm:text-[3.25rem] lg:text-[3.6rem]">
            {hero.title}
          </h1>
          <p className="mt-7 max-w-[34rem] text-lg leading-[1.8] text-muted-foreground">
            {hero.description}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
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

        <figure className="mx-auto w-full max-w-[26rem] md:max-w-none">
          <EndGrainBoard
            cols={8}
            rows={10}
            seed={11}
            animate
            edge
            label="엔드그레인 도마 그림: 어두운 나무 조각과 밝은 나무 조각이 바둑판처럼 엇갈려 있고 조각마다 나이테가 보입니다"
            className="h-auto w-full drop-shadow-[0_18px_28px_color-mix(in_srgb,var(--wood-ring)_30%,transparent)]"
          />
          <figcaption className="mt-5 text-sm leading-relaxed text-muted-foreground">
            {hero.caption}
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}
