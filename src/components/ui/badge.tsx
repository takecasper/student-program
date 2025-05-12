import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary/10 text-primary',
        success: 'text-[#33333399] font-semibold flex items-center gap-1.5',
        pending: 'border-transparent bg-[#FFF8E5] text-[#33333399]',
        rejected: 'border-transparent bg-[#FEF3F2] text-[#33333399]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      {variant === 'success' && (
        <div className="w-4 h-4 rounded-full bg-[#70C0B8] flex items-center justify-center">
          <Check className="w-3 h-3 text-white" />
        </div>
      )}
      {props.children}
    </div>
  );
}

export { Badge, badgeVariants };
