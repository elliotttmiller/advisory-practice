import * as React from 'react';
import { cn } from '../utils/cn';

export interface PageHeaderProps {
  /** Main title of the page */
  title: string;
  /** Description or subtitle */
  description?: string;
  /** Actions to display on the right side */
  actions?: React.ReactNode;
  /** Breadcrumb or back navigation */
  breadcrumb?: React.ReactNode;
  /** Additional class names */
  className?: string;
}

/**
 * PageHeader component for consistent page titles and actions
 */
export function PageHeader({
  title,
  description,
  actions,
  breadcrumb,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn('mb-8', className)}>
      {breadcrumb && <div className="mb-4">{breadcrumb}</div>}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">{title}</h1>
          {description && (
            <p className="text-secondary-600 mt-1">{description}</p>
          )}
        </div>
        {actions && <div className="flex items-center gap-3">{actions}</div>}
      </div>
    </div>
  );
}
