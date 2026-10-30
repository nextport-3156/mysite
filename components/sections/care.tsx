import { siteConfig } from "@/site.config";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/layout/section-header";

/* 관리 방법 · 평생 관리 약속 · 자주 묻는 질문 섹션 (스마트스토어 상세페이지 내용)
   - 글자는 모두 site.config.ts 의 care 에서 바꿉니다.
   - 자주 묻는 질문은 누르면 펼쳐지는 목록입니다. */
export function Care() {
  const { care } = siteConfig;
  const { promise } = care;

  return (
    <section id="care" className="scroll-mt-16 bg-muted py-28 md:py-36">
      <Container>
        <SectionHeader eyebrow={care.eyebrow} title={care.title} description={care.description} />

        {/* 관리 방법 4가지 */}
        <ol className="mt-14 grid gap-5 sm:grid-cols-2">
          {care.tips.map((tip, i) => (
            <li key={tip.title} className="bg-card p-7 sm:p-8">
              <span className="font-brand text-sm tracking-[0.2em] text-oak" aria-hidden>
                0{i + 1}
              </span>
              <h3 className="mt-2 text-xl">{tip.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground">{tip.text}</p>
            </li>
          ))}
        </ol>
        <p className="mt-8 text-base text-muted-foreground">{care.closing}</p>

        <div className="mt-24 grid gap-14 lg:grid-cols-2 lg:gap-16">
          {/* 평생 관리 약속 */}
          <div className="flex bg-background">
            <div className="flex-1 p-8 sm:p-10">
              <p className="font-brand text-sm tracking-[0.18em] text-oak">{promise.eyebrow}</p>
              <h3 className="mt-3 text-2xl leading-snug">{promise.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">{promise.text}</p>
              <ul className="mt-8 space-y-6">
                {promise.points.map((point) => (
                  <li key={point.title} className="border-t pt-5">
                    <p className="text-lg">{point.title}</p>
                    <p className="mt-1 text-base leading-relaxed text-muted-foreground">{point.text}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="louver w-6 shrink-0 sm:w-10" aria-hidden />
          </div>

          {/* 자주 묻는 질문 (누르면 펼쳐짐) */}
          <div>
            <h3 className="text-2xl">{care.faqTitle}</h3>
            <div className="mt-6 divide-y border-y">
              {care.faq.map((item) => (
                <details key={item.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-lg [&::-webkit-details-marker]:hidden">
                    <span>
                      <span className="mr-2 font-brand text-oak" aria-hidden>
                        Q
                      </span>
                      {item.q}
                    </span>
                    <span
                      className="mt-1 inline-block text-xl leading-none text-muted-foreground transition-transform group-open:rotate-45"
                      aria-hidden
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-3 pl-6 text-base leading-relaxed text-muted-foreground">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
