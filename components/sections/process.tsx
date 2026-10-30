import { siteConfig } from "@/site.config";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/layout/section-header";

/* 만드는 과정 섹션 (2차시에 새로 만든 섹션)
   - 글자는 site.config.ts 의 process 에서 바꿉니다. steps 에 줄을 추가하면 단계가 늘어납니다.
   - 순서가 있는 내용이라 번호(1, 2, 3, 4)를 붙였습니다. */
export function Process() {
  const { process } = siteConfig;

  return (
    <section id="process" className="scroll-mt-16 border-t py-24">
      <Container>
        <SectionHeader title={process.title} description={process.description} />

        <ol className="mt-14 grid gap-10 md:grid-cols-4 md:gap-8">
          {process.steps.map((step, i) => (
            <li key={step.title} className="relative border-l-2 border-primary/25 pl-6 md:border-l-0 md:border-t-2 md:pl-0 md:pt-6">
              <span className="font-brand text-3xl font-medium text-primary" aria-hidden>
                {i + 1}
              </span>
              <h3 className="mt-2 text-xl">{step.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground">{step.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
