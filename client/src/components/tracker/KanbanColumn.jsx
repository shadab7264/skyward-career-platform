import { useDroppable } from '@dnd-kit/core';
import AppCard from './AppCard';

export default function KanbanColumn({ column, applications }) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });

  return (
    <div className="flex flex-col w-80 shrink-0 h-[calc(100vh-16rem)]">
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="flex items-center gap-2">
          <div 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: column.color }} 
          />
          <h3 className="font-semibold text-slate-900 dark:text-white">
            {column.title}
          </h3>
        </div>
        <div className="text-xs font-medium bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-1 rounded-full">
          {applications.length}
        </div>
      </div>

      <div
        ref={setNodeRef}
        className={`
          flex-1 bg-slate-100/50 dark:bg-slate-900/50 rounded-2xl p-3 overflow-y-auto border-2 border-transparent transition-colors
          ${isOver ? 'border-primary-500/50 bg-primary-50/50 dark:bg-primary-900/10' : ''}
        `}
      >
        {applications.map((app) => (
          <AppCard key={app.id} application={app} />
        ))}
      </div>
    </div>
  );
}
