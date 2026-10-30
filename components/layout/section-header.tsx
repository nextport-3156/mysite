import { cn } from "@/lib/utils";

/** 섹션 위쪽의 제목 + 설명. 모든 섹션이 같은 모양을 쓰도록 한 곳에 모아 둠.
    (eyebrow = 제목 위 작은 글씨. 필요할 때만 넣으세요) */
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
      {eyebrow ? <p className="text-sm font-medium text-primary">{eyebrow}</p> : null}
      <h2 className={cn("text-[2rem] leading-snug sm:text-[2.5rem]", eyebrow && "mt-3")}>{title}</h2>
      {description ? (
        <p className="mt-4 text-lg leading-[1.75] text-muted-foreground">{description}</p>
      ) : null}
    </div>
  );
}
