import { cn } from '../utils/cn';
import { Badge, type BadgeProps } from './Badge';

export interface StatusBadgeProps extends Omit<BadgeProps, 'variant'> {
  /** Status type to display */
  status: 'pending' | 'approved' | 'rejected' | 'escalated' | 'active' | 'inactive' | 'draft';
}

const statusVariants: Record<StatusBadgeProps['status'], NonNullable<BadgeProps['variant']>> = {
  pending: 'warning',
  approved: 'success',
  rejected: 'error',
  escalated: 'info',
  active: 'success',
  inactive: 'default',
  draft: 'default',
};

const statusLabels: Record<StatusBadgeProps['status'], string> = {
  pending: 'Pending',
  approved: 'Approved',
  rejected: 'Rejected',
  escalated: 'Escalated',
  active: 'Active',
  inactive: 'Inactive',
  draft: 'Draft',
};

/**
 * StatusBadge component for displaying workflow/approval statuses
 */
export function StatusBadge({ status, className, children, ...props }: StatusBadgeProps) {
  return (
    <Badge
      variant={statusVariants[status]}
      className={cn('capitalize', className)}
      {...props}
    >
      {children || statusLabels[status]}
    </Badge>
  );
}
