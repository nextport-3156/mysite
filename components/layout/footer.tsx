import Link from "next/link";

import { siteConfig } from "@/site.config";
import { Container } from "@/components/layout/container";

/** 맨 아래 영역. 오른쪽 끝의 작은 점(•)이 관리자 페이지로 가는 숨은 버튼입니다. */
export function Footer() {
  return (
    <footer className="bg-primary py-12 text-primary-foreground">
      <Container className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
        {/* 글자 로고: 스마트스토어 로고와 같은 구성 (이름 / 선 / 영문 소개 / 연도) */}
        <div className="font-brand">
          <p className="text-lg font-medium tracking-[0.32em]">{siteConfig.name}</p>
          <div className="mt-2 h-px w-full bg-primary-foreground/50" />
          <p className="mt-2 text-xs tracking-[0.24em] text-primary-foreground/80">
            {siteConfig.tagline}
          </p>
          <p className="mt-1 text-xs tracking-[0.24em] text-primary-foreground/80">
            {siteConfig.since}
          </p>
        </div>

        <div className="flex flex-col items-start gap-4 text-sm sm:items-end">
          <div className="flex flex-wrap items-center gap-6">
            {siteConfig.nav.map((item) => (
              <a key={item.href} href={item.href} className="text-primary-foreground/80 hover:text-primary-foreground">
                {item.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-4 text-primary-foreground/70">
            <p>{siteConfig.footer.copyright}</p>
            {/* 숨은 관리자 버튼 */}
            <Link
              href="/admin"
              aria-label="관리자"
              className="opacity-40 transition-opacity hover:opacity-100"
            >
              •
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
