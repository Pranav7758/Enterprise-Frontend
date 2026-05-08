import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  glow?: 'purple' | 'cyan' | 'green' | 'amber' | 'red' | 'none';
  hover?: boolean;
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, glow = 'none', hover = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "glass-card rounded-2xl p-5 transition-all duration-300",
          hover && "cursor-pointer hover:-translate-y-0.5",
          glow === 'purple' && "hover:glow-purple hover:border-purple-500/30",
          glow === 'cyan' && "hover:glow-cyan hover:border-cyan-500/30",
          glow === 'green' && "hover:glow-green hover:border-green-500/30",
          glow === 'amber' && "hover:glow-amber hover:border-amber-500/30",
          glow === 'red' && "hover:glow-red hover:border-red-500/30",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassCard.displayName = "GlassCard";

export { GlassCard };
