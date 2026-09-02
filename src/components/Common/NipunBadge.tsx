import React from 'react';
import { Award } from 'lucide-react';

interface NipunBadgeProps {
  code: string;
  description?: string;
  size?: 'sm' | 'md';
}

export const NipunBadge: React.FC<NipunBadgeProps> = ({ code, description, size = 'sm' }) => {
  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-md border font-medium transition-colors ${
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-sm'
      } bg-gov-saffron-subtle/50 text-gov-saffron-dark border-gov-saffron/30`}
      title={description || `NIPUN Bharat Competency: ${code}`}
    >
      <Award className={size === 'sm' ? 'w-3 h-3 text-gov-saffron' : 'w-4 h-4 text-gov-saffron'} />
      <span className="font-semibold tracking-tight">{code}</span>
      {description && <span className="hidden md:inline text-gov-slate-muted font-normal">• {description}</span>}
    </div>
  );
};
