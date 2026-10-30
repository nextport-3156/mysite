import Image from "next/image";

import { siteConfig } from "@/site.config";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/layout/section-header";

/* 만드는 과정 섹션 (2차시에 새로 만든 섹션)
   - 글자와 사진 경로는 site.config.ts 의 process 에서 바꿉니다. steps 에 줄을 추가하면 단계가 늘어납니다.
   - 사진 파일은 public/images/process 폴더에 있습니다.
   - 순서가 있는 내용이라 번호(1~6)를 붙였습니다. */
export function Process() {
  const { process } = siteConfig;

  return (
    <section id="process" className="scroll-mt-16 border-t py-28 md:py-36">
      <Container>
        <SectionHeader title={process.title} description={process.description} />

        <ol className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {process.steps.map((step, i) => (
            <li key={step.title}>
              <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-muted">
                <Image
                  src={step.image}
                  alt={`${i + 1}단계 ${step.title}`}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="mt-5 flex items-baseline gap-3">
                <span className="font-brand text-2xl font-medium text-primary" aria-hidden>
                  {i + 1}
                </span>
                <h3 className="text-xl">{step.title}</h3>
              </div>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground">{step.text}</p>
            </li>
          ))}
        </ol>

        {/* 단계 아래 덧붙이는 약속 (site.config.ts 의 process.notes) */}
        <ul className="mt-14 flex flex-col gap-3 border-t pt-8 sm:flex-row sm:gap-10">
          {process.notes.map((note) => (
            <li key={note} className="flex items-baseline gap-3 text-base text-muted-foreground">
              <span className="h-px w-5 shrink-0 translate-y-[-0.3em] bg-oak" aria-hidden />
              {note}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
