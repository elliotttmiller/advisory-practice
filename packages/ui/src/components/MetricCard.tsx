import * as React from 'react';
import { cn } from '../utils/cn';
import { Card } from './Card';
import { Badge } from './Badge';

export interface MetricCardProps {
  /** Title/label for the metric */
  title: string;
  /** The main value to display */
  value: string | number;
  /** Change indicator text (e.g., "+12 this month") */
  change?: string;
  /** Type of change for styling */
  changeType?: 'positive' | 'negative' | 'neutral';
  /** Icon to display */
  icon?: React.ReactNode;
  /** Additional class names */
  className?: string;
}

/**
 * MetricCard component for displaying KPIs and metrics on dashboards
 */
export function MetricCard({
  title,
  value,
  change,
  changeType = 'neutral',
  icon,
  className,
}: MetricCardProps) {
  const changeVariant =
    changeType === 'positive'
      ? 'success'
      : changeType === 'negative'
        ? 'error'
        : 'default';

  return (
    <Card className={cn('', className)}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-secondary-600">{title}</p>
          <p className="text-2xl font-bold text-secondary-900 mt-1">{value}</p>
          {change && (
            <Badge variant={changeVariant} className="mt-2">
              {change}
            </Badge>
          )}
        </div>
        {icon && (
          <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}
