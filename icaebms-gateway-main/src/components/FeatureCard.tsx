import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  className?: string;
}

const FeatureCard = ({ icon: Icon, title, description, className }: FeatureCardProps) => (
  <div
    className={cn(
      "group relative bg-card border border-border rounded-2xl p-7 shadow-card hover:shadow-elegant hover:-translate-y-1 transition-all duration-300 overflow-hidden",
      className
    )}
  >
    <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-accent/10 group-hover:bg-accent/20 transition-colors" />
    <div className="relative">
      <div className="w-12 h-12 rounded-xl bg-accent-gradient flex items-center justify-center mb-5 shadow-glow">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <h3 className="font-display font-bold text-lg text-primary mb-2">{title}</h3>
      {description && <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>}
    </div>
  </div>
);

export default FeatureCard;
