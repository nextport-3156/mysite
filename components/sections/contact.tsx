import { siteConfig } from "@/site.config";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/layout/section-header";
import { Button } from "@/components/ui/button";

/** 문의 섹션. 버튼(링크)은 site.config.ts 의 contact.links 에서 바꿉니다.
    첫 번째 링크는 진한 버튼, 나머지는 테두리 버튼으로 보입니다.
    아래 교환·반품 안내는 contact.returns 에서 바꿉니다. */
export function Contact() {
  const { contact } = siteConfig;
  const { returns } = contact;

  return (
    <section id="contact" className="scroll-mt-16 border-t py-28 md:py-36">
      <Container>
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <SectionHeader title={contact.title} description={contact.description} />
          <div className="flex flex-wrap gap-3">
            {contact.links.map((link, i) => (
              <Button key={link.href} asChild size="lg" variant={i === 0 ? "default" : "outline"}>
                <a href={link.href} target="_blank" rel="noreferrer">
                  {link.label}
                </a>
              </Button>
            ))}
          </div>
        </div>

        <div className="mt-16 border-t pt-10">
          <h3 className="text-xl">{returns.title}</h3>
          <div className="mt-6 grid gap-8 sm:grid-cols-2">
            {[returns.can, returns.cannot].map((group) => (
              <div key={group.title}>
                <p className="text-sm font-medium tracking-wide text-oak">{group.title}</p>
                <ul className="mt-3 space-y-2 text-base text-muted-foreground">
                  {group.list.map((line) => (
                    <li key={line} className="flex gap-3">
                      <span aria-hidden>·</span>
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
