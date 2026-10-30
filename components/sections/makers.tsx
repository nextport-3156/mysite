import { siteConfig } from "@/site.config";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/layout/section-header";

/* 만드는 사람들 섹션 (스마트스토어 상세페이지 내용을 옮겨 온 섹션)
   - 글자는 모두 site.config.ts 의 makers 에서 바꿉니다.
   - 순서: 왜 우드앤모어인가(번호 4개) → 이야기 카드 2개 → 완판 기록 → 팀 소개 → 작가 소개 → 공방 안내
   - 목수 개인 이름은 넣지 않습니다(개인정보). 작가 송승원(유목) 님은 공개 허락을 받았습니다. */
export function Makers() {
  const { makers } = siteConfig;
  const { artist } = makers;

  return (
    <section id="makers" className="scroll-mt-16 py-28 md:py-36">
      <Container>
        <SectionHeader eyebrow={makers.eyebrow} title={makers.title} description={makers.description} />

        {/* 왜 우드앤모어 도마인가 */}
        <ol className="mt-16 grid gap-x-12 gap-y-10 md:grid-cols-2">
          {makers.reasons.map((reason, i) => (
            <li key={reason.title} className="flex gap-5">
              <span className="font-display text-3xl leading-none text-oak" aria-hidden>
                {i + 1}.
              </span>
              <div>
                <h3 className="text-xl leading-snug">{reason.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-muted-foreground">{reason.text}</p>
              </div>
            </li>
          ))}
        </ol>

        {/* 이야기 카드 2개 */}
        <div className="mt-20 grid gap-5 md:grid-cols-2">
          {makers.stories.map((story) => (
            <article key={story.title} className="flex bg-muted">
              <div className="flex-1 p-8 sm:p-10">
                <h3 className="text-xl">{story.title}</h3>
                <p className="mt-3 text-base leading-[1.85] text-muted-foreground">{story.text}</p>
              </div>
              <div className="louver w-6 shrink-0 sm:w-8" aria-hidden />
            </article>
          ))}
        </div>

        {/* 완판 기록 */}
        <div className="mt-20 flex flex-col gap-8 border-y py-10 md:flex-row md:items-center md:gap-14">
          <ul className="flex gap-12">
            {makers.records.map((record) => (
              <li key={record.label}>
                <p className="font-display text-[2.6rem] leading-none">{record.value}</p>
                <p className="mt-2 text-sm text-muted-foreground">{record.label}</p>
              </li>
            ))}
          </ul>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground">{makers.recordsNote}</p>
        </div>

        {/* 팀 소개 + 작가 소개 */}
        <div className="mt-20 grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {makers.team.map((member) => (
              <li key={member.role} className="border-t pt-5">
                <p className="font-brand text-sm tracking-[0.18em] text-oak">{member.role.toUpperCase()}</p>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">{member.text}</p>
              </li>
            ))}
          </ul>

          <aside className="bg-primary p-8 text-primary-foreground sm:p-10">
            <p className="text-sm text-primary-foreground/70">{artist.label}</p>
            <p className="mt-1 font-display text-3xl">
              {artist.name}
              <span className="ml-3 text-lg text-primary-foreground/70">호 {artist.penName}</span>
            </p>
            <p className="mt-1 font-brand text-sm tracking-[0.12em] text-primary-foreground/60">{artist.english}</p>

            <div className="mt-8 h-px w-10 bg-oak" aria-hidden />
            <p className="mt-6 text-sm text-primary-foreground/70">{artist.awardsTitle}</p>
            <ul className="mt-2 space-y-1 text-base">
              {artist.awards.map((award) => (
                <li key={award}>{award}</li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-primary-foreground/70">{artist.tvTitle}</p>
            <ul className="mt-2 space-y-1 text-base">
              {artist.tv.map((show) => (
                <li key={show}>{show}</li>
              ))}
            </ul>
          </aside>
        </div>

        <p className="mt-14 max-w-2xl text-base leading-relaxed text-muted-foreground">{makers.workshop}</p>
      </Container>
    </section>
  );
}
