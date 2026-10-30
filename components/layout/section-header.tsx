import { cn } from "@/lib/utils";

/** 섹션 위쪽의 제목 + 설명. 모든 섹션이 같은 모양을 쓰도록 한 곳에 모아 둠.
    (eyebrow = 제목 위 작은 글씨. 필요할 때만 넣으세요)
    제목 위의 짧은 오크색 선은 재팬디 분위기의 장식입니다. */
export function SectionHeader({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <div className="mb-6 h-px w-10 bg-oak" aria-hidden />
      {eyebrow ? <p className="text-sm font-medium tracking-[0.12em] text-oak">{eyebrow}</p> : null}
      <h2 className={cn("text-[1.9rem] leading-[1.45] tracking-[0.01em] sm:text-[2.35rem]", eyebrow && "mt-3")}>
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-lg leading-[1.85] text-muted-foreground">{description}</p>
      ) : null}
    </div>
  );
}
