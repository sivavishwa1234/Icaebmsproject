import { ReactNode, useState } from "react";
import { cn } from "@/lib/utils";

/** Infinite, pause-on-hover, draggable horizontal marquee */
interface Props {
  children: ReactNode;
  speed?: number; // seconds for one loop
  className?: string;
}

const AutoMarquee = ({ children, speed = 40, className }: Props) => {
  const [paused, setPaused] = useState(false);
  return (
    <div
      className={cn("relative w-full overflow-hidden group", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 z-10 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 z-10 bg-gradient-to-l from-background to-transparent" />
      <div
        className="flex w-max gap-6 animate-marquee-x"
        style={{ animationDuration: `${speed}s`, animationPlayState: paused ? "paused" : "running" }}
      >
        <div className="flex gap-6 shrink-0">{children}</div>
        <div className="flex gap-6 shrink-0" aria-hidden="true">{children}</div>
      </div>
    </div>
  );
};

export default AutoMarquee;
