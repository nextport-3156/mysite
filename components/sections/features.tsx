import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { siteConfig } from "@/site.config";
import { getItems } from "@/lib/data";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/layout/section-header";

/* 제품 섹션 (id 는 원래 이름 그대로 "features" — 관리자 페이지와 연결돼 있어서 바꾸지 않음)
   - 제목/설명: site.config.ts 의 features
   - 카드 목록: 관리자 페이지(/admin)에서 관리 (Supabase 연결 전에는 site.config.ts 의 예시 카드가 보임)
   - 사진이 없는 카드는 사진 자리에 은은한 나이테 무늬가 대신 보입니다 (3차시에 사진을 올리면 사라짐) */

/** 사진이 아직 없을 때 보이는 자리 표시: 통나무 단면의 나이테 */
function PhotoPlaceholder({ seed }: { seed: number }) {
  const corners = [
    { cx: 300, cy: 380 },
    { cx: 20, cy: 400 },
    { cx: 310, cy: 40 },
  ];
  const { cx, cy } = corners[seed % corners.length];
  const rings = Array.from({ length: 24 }, (_, i) => 14 + i * 14 + (i % 4) * 2);
  return (
    <svg viewBox="0 0 320 400" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden>
      {rings.map((r, i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          strokeWidth={i % 3 === 0 ? 1.6 : 0.9}
          style={{ stroke: "var(--wood-light-3)", strokeOpacity: i % 3 === 0 ? 0.35 : 0.2 }}
        />
      ))}
    </svg>
  );
}
export async function Features() {
  const { features } = siteConfig;
  const items = await getItems("features");

  return (
    <section id="features" className="scroll-mt-16 bg-muted py-28 md:py-36">
      <Container>
        <SectionHeader title={features.title} description={features.description} />

        {items.length === 0 ? (
          <p className="mt-12 text-muted-foreground">
            아직 등록된 제품이 없습니다. 관리자 페이지에서 제품을 추가하면 여기에 보입니다.
          </p>
        ) : (
          <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, index) => {
              const card = (
                <article className="group h-full">
                  <div className="relative aspect-square overflow-hidden rounded-md bg-muted">
                    {item.image_url ? (
                      <Image
                        src={item.image_url}
                        alt={item.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <PhotoPlaceholder seed={index} />
                    )}
                  </div>
                  <div className="pt-5">
                    <h3 className="flex items-start justify-between gap-3 text-[1.35rem] leading-snug">
                      {item.title}
                      {item.link_url ? (
                        <ArrowUpRight
                          aria-hidden
                          className="mt-1 size-5 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      ) : null}
                    </h3>
                    {item.description ? (
                      <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                    ) : null}
                  </div>
                </article>
              );

              return item.link_url ? (
                <a
                  key={item.id}
                  href={item.link_url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${item.title} — 스마트스토어에서 보기`}
                  className="rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                >
                  {card}
                </a>
              ) : (
                <div key={item.id}>{card}</div>
              );
            })}
          </div>
        )}

        {/* 도마 나무 · 크기 · 추가 옵션 (site.config.ts 의 features.woods / sizes / options) */}
        <div className="mt-24 grid gap-14 border-t pt-14 lg:grid-cols-2 lg:gap-16">
          <div>
            <h3 className="text-2xl">{features.woodsTitle}</h3>
            <ul className="mt-6 divide-y border-y">
              {features.woods.map((wood) => (
                <li key={wood.name} className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:gap-6">
                  <span className="w-24 shrink-0 font-display text-lg">{wood.name}</span>
                  <span className="text-base text-muted-foreground">{wood.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-2xl">{features.sizesTitle}</h3>
            <dl className="mt-6 divide-y border-y">
              {features.sizes.map((size) => (
                <div key={size.wood} className="flex flex-col gap-1 py-4 sm:flex-row sm:gap-6">
                  <dt className="shrink-0 text-base sm:w-48">{size.wood}</dt>
                  <dd className="flex flex-wrap gap-x-5 gap-y-1 font-brand text-base tracking-wide text-muted-foreground">
                    {size.list.map((s) => (
                      <span key={s}>{s}</span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-sm text-muted-foreground">{features.sizesNote}</p>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-2xl">{features.optionsTitle}</h3>
          <ul className="mt-6 grid gap-5 md:grid-cols-3">
            {features.options.map((option) => (
              <li key={option.name} className="rounded-md border bg-card p-6">
                <p className="font-display text-lg">{option.name}</p>
                <p className="mt-2 text-base leading-relaxed text-muted-foreground">{option.text}</p>
                <p className="mt-4 text-sm text-oak">{option.price}</p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
