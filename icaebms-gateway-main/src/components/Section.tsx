import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SectionProps {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  align?: "left" | "center";
}

const Section = ({ id, eyebrow, title, subtitle, children, className, containerClassName, align = "center" }: SectionProps) => (
  <section id={id} className={cn("py-20 md:py-28 scroll-mt-20", className)}>
    <div className={cn("container", containerClassName)}>
      {(eyebrow || title || subtitle) && (
        <div className={cn("max-w-3xl mb-14", align === "center" && "mx-auto text-center")}>
          {eyebrow && (
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-4">
              {eyebrow}
            </span>
          )}
          {title && <h2 className="text-3xl md:text-5xl font-bold text-primary text-balance">{title}</h2>}
          {subtitle && <p className="mt-5 text-lg text-muted-foreground leading-relaxed">{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  </section>
);

export default Section;
