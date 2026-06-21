import { useState } from 'react';
import { 
  DndContext, 
  DragOverlay, 
  closestCorners, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors 
} from '@dnd-kit/core';
import { Plus, Search, Filter } from 'lucide-react';
import { TRACKER_COLUMNS } from '../utils/constants';
import KanbanColumn from '../components/tracker/KanbanColumn';
import AppCard from '../components/tracker/AppCard';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Modal from '../components/common/Modal';

const initialApps = [
  { id: '1', position: 'Frontend Developer', company: 'TechCorp', location: 'Remote', salary: '$120k', status: 'applied', appliedDate: '2026-06-15' },
  { id: '2', position: 'React Engineer', company: 'StartupX', location: 'New York, NY', salary: '$130k', status: 'assessment', appliedDate: '2026-06-10' },
  { id: '3', position: 'Senior UI Developer', company: 'DesignHub', location: 'San Francisco, CA', salary: '$150k', status: 'interview', appliedDate: '2026-06-05' },
  { id: '4', position: 'Software Engineer', company: 'BigBank', location: 'Chicago, IL', status: 'rejected', appliedDate: '2026-06-01' },
];

export default function JobTrackerPage() {
  const [applications, setApplications] = useState(initialApps);
  const [activeId, setActiveId] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor)
  );

  const activeApp = activeId ? applications.find(app => app.id === activeId) : null;

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);

    if (over && active.id !== over.id) {
      const activeApp = applications.find(app => app.id === active.id);
      const newStatus = over.id; // The column ID

      if (activeApp && activeApp.status !== newStatus) {
        setApplications(apps => apps.map(app => 
          app.id === active.id ? { ...app, status: newStatus } : app
        ));
      }
    }
  };

  const filteredApps = applications.filter(app => 
    app.position.toLowerCase().includes(searchTerm.toLowerCase()) || 
    app.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Job Application Tracker</h1>
          <p className="text-slate-500 dark:text-slate-400">Manage your job hunt from application to offer.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <Input 
              placeholder="Search jobs..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full !pl-10"
            />
          </div>
          <Button variant="outline" icon={Filter}>Filter</Button>
          <Button icon={Plus} onClick={() => setIsAddModalOpen(true)}>Add Job</Button>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto pb-4 custom-scrollbar">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-6 h-full min-w-max">
            {TRACKER_COLUMNS.map(col => (
              <KanbanColumn 
                key={col.id} 
                column={col} 
                applications={filteredApps.filter(app => app.status === col.id)} 
              />
            ))}
          </div>

          <DragOverlay>
            {activeApp ? <AppCard application={activeApp} /> : null}
          </DragOverlay>
        </DndContext>
      </div>

      <Modal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)}
        title="Add Job Application"
      >
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsAddModalOpen(false); }}>
          <Input label="Job Title / Position" placeholder="e.g. Senior Frontend Engineer" required />
          <Input label="Company Name" placeholder="e.g. Google" required />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Location" placeholder="e.g. Remote, San Francisco" />
            <Input label="Salary Range" placeholder="e.g. $120k - $150k" />
          </div>
          <Input label="Job Posting URL" type="url" placeholder="https://..." />
          <div className="pt-4 flex justify-end gap-3">
            <Button variant="ghost" type="button" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button type="submit">Save Application</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
