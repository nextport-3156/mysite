"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { siteConfig } from "@/site.config";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** 상단 메뉴. 메뉴 항목은 site.config.ts 의 nav 에서 바꿉니다. 모바일에서는 햄버거 버튼으로 열림.
    왼쪽 글자 로고(WOOD & MORE)는 스마트스토어 로고처럼 글자 사이를 넓게 띄웠습니다. */
export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          className="font-brand text-[1.05rem] font-medium tracking-[0.32em] text-foreground"
        >
          {siteConfig.name}
        </Link>

        {/* 데스크톱 메뉴 */}
        {/* 메뉴가 6개라 노트북 너비(lg, 1024px) 이상에서만 펼쳐 보이고, 그보다 좁으면 햄버거 버튼으로 엽니다 */}
        <div className="hidden items-center gap-8 lg:flex">
          <nav className="flex items-center gap-7">
            {siteConfig.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[0.95rem] text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild size="sm">
              <a href={siteConfig.store.href} target="_blank" rel="noreferrer">
                {siteConfig.store.label}
              </a>
            </Button>
            <Button asChild size="sm" variant="outline">
              <Link href={siteConfig.admin.href}>{siteConfig.admin.label}</Link>
            </Button>
          </div>
        </div>

        {/* 모바일 메뉴 버튼 */}
        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-md lg:hidden"
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </Container>

      {/* 모바일 메뉴 펼침 */}
      <nav className={cn("border-t border-border/70 lg:hidden", open ? "block" : "hidden")}>
        <Container className="flex flex-col py-2">
          {siteConfig.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="py-3 text-base text-muted-foreground hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
          <a
            href={siteConfig.store.href}
            target="_blank"
            rel="noreferrer"
            className="py-3 text-base font-medium text-primary"
          >
            {siteConfig.store.label}
          </a>
          <Link
            href={siteConfig.admin.href}
            onClick={() => setOpen(false)}
            className="py-3 text-base text-muted-foreground hover:text-foreground"
          >
            {siteConfig.admin.label}
          </Link>
        </Container>
      </nav>
    </header>
  );
}
