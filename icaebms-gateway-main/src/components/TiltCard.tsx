import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";
import { cn } from "@/lib/utils";

/** 3D tilt + light reflection card wrapper */
const TiltCard = ({ children, className }: { children: ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const sx = useSpring(x, { stiffness: 150, damping: 18 });
  const sy = useSpring(y, { stiffness: 150, damping: 18 });
  const rotateY = useTransform(sx, [0, 1], [10, -10]);
  const rotateX = useTransform(sy, [0, 1], [-8, 8]);
  const lightX = useTransform(sx, [0, 1], ["0%", "100%"]);
  const lightY = useTransform(sy, [0, 1], ["0%", "100%"]);

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width);
    y.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => { x.set(0.5); y.set(0.5); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={cn("relative will-change-transform", className)}
    >
      {children}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          background: useTransform(
            [lightX, lightY] as any,
            ([lx, ly]: any) => `radial-gradient(400px circle at ${lx} ${ly}, rgba(255,255,255,0.18), transparent 40%)`
          ),
        }}
      />
    </motion.div>
  );
};

export default TiltCard;
