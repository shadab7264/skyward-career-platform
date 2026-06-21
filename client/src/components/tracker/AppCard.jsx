import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Building2, MapPin, DollarSign, ExternalLink } from 'lucide-react';
import Card from '../common/Card';

export default function AppCard({ application }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: application.id,
    data: application,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 50 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="cursor-grab active:cursor-grabbing mb-3"
    >
      <Card padding="p-4" className="hover:border-primary-500/50 transition-colors">
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-semibold text-slate-900 dark:text-white line-clamp-1">
            {application.position}
          </h4>
        </div>
        
        <div className="space-y-2 mb-3">
          <div className="flex items-center text-sm text-slate-600 dark:text-slate-400 gap-2">
            <Building2 className="w-3.5 h-3.5" />
            <span className="line-clamp-1">{application.company}</span>
          </div>
          {application.location && (
            <div className="flex items-center text-sm text-slate-500 dark:text-slate-500 gap-2">
              <MapPin className="w-3.5 h-3.5" />
              <span className="line-clamp-1">{application.location}</span>
            </div>
          )}
          {application.salary && (
            <div className="flex items-center text-sm text-emerald-600 dark:text-emerald-500 gap-2">
              <DollarSign className="w-3.5 h-3.5" />
              <span>{application.salary}</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
          <span className="text-xs font-medium text-slate-500">
            {new Date(application.appliedDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
          </span>
          {application.url && (
            <a 
              href={application.url} 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-primary-500 hover:text-primary-600"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </Card>
    </div>
  );
}
