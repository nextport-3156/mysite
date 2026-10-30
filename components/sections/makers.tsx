import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";

import { siteConfig } from "@/site.config";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/layout/section-header";

/* 만드는 사람들 섹션 (스마트스토어 상세페이지 내용을 옮겨 온 섹션)
   - 글자는 모두 site.config.ts 의 makers 에서 바꿉니다.
   - 순서: 왜 우드앤모어인가(번호 4개) → 이야기 카드 2개 → 백화점 팝업 사진 → 완판 기록 → 팀 소개(사진 + 프로필 4명) → 공방 안내
   - 팝업 사진은 public/images/popup 폴더에 있습니다.
   - 목수 개인 이름은 넣지 않습니다(개인정보). 작가 송승원(유목) 님은 공개 허락을 받았습니다.
   - 팀 사진은 public/images/team 폴더에 넣습니다. 파일이 아직 없으면 나무 무늬가 대신 보입니다. */

/** public 폴더에 사진 파일이 실제로 있는지 확인 (없으면 깨진 그림 대신 나무 무늬를 보여 주려고) */
function photoExists(src: string) {
  return existsSync(path.join(process.cwd(), "public", src));
}

export function Makers() {
  const { makers } = siteConfig;

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

        {/* 백화점 팝업 사진 (실제 참여 사진) */}
        <div className="mt-24">
          <p className="font-brand text-sm tracking-[0.18em] text-oak">{makers.popup.eyebrow}</p>
          <h3 className="mt-3 text-2xl sm:text-[1.75rem]">{makers.popup.title}</h3>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">{makers.popup.text}</p>
          <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {makers.popup.photos.map((photo) => (
              <li
                key={photo.src}
                className={`relative overflow-hidden bg-muted ${photo.wide ? "col-span-2 aspect-[4/3]" : "aspect-[3/4]"}`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes={photo.wide ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
                  className="object-cover"
                />
              </li>
            ))}
          </ul>
        </div>

        {/* 완판 기록 */}
        <div className="mt-12 flex flex-col gap-8 border-y py-10 md:flex-row md:items-center md:gap-14">
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

        {/* 팀 소개 4명: 사진 + 역할 + 소개 (Wood Artist 는 이름과 경력까지) */}
        <ul className="mt-20 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {makers.team.map((member) => (
            <li key={member.role}>
              <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                {photoExists(member.image) ? (
                  <Image
                    src={member.image}
                    alt={member.name ? `${member.role} ${member.name}` : member.role}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover object-top"
                  />
                ) : (
                  <div className="louver absolute inset-0 opacity-60" aria-hidden />
                )}
              </div>

              <p className="mt-5 font-brand text-sm tracking-[0.18em] text-oak">{member.role.toUpperCase()}</p>
              {member.name ? (
                <h3 className="mt-2 text-2xl">
                  {member.name}
                  {member.penName ? (
                    <span className="ml-2 text-base font-normal text-muted-foreground">호 {member.penName}</span>
                  ) : null}
                </h3>
              ) : null}
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">{member.text}</p>

              {member.career?.map((group) => (
                <div key={group.title} className="mt-5 border-t pt-4">
                  <p className="text-sm text-oak">{group.title}</p>
                  <ul className="mt-2 space-y-1 text-[0.95rem] text-foreground">
                    {group.list.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </li>
          ))}
        </ul>

        <p className="mt-14 max-w-2xl text-base leading-relaxed text-muted-foreground">{makers.workshop}</p>
      </Container>
    </section>
  );
}
