import { motion } from 'framer-motion';
import { Users, FileText, Map, MessageSquare } from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';
import StatCard from '../components/admin/StatCard';
import Card from '../components/common/Card';

const userGrowthData = [
  { month: 'Jan', users: 4000 },
  { month: 'Feb', users: 5000 },
  { month: 'Mar', users: 8000 },
  { month: 'Apr', users: 15000 },
  { month: 'May', users: 28000 },
  { month: 'Jun', users: 50000 },
];

const moduleUsageData = [
  { name: 'ATS Analyzer', count: 100000 },
  { name: 'Roadmap', count: 25000 },
  { name: 'Interview Hub', count: 45000 },
  { name: 'Skill Gap', count: 15000 },
];

const recentActivity = [
  { user: 'Alex Chen', action: 'Generated a Career Roadmap', time: '2 mins ago', color: 'bg-emerald-500' },
  { user: 'Sarah Jenkins', action: 'Analyzed a Resume (Score: 85)', time: '5 mins ago', color: 'bg-blue-500' },
  { user: 'Michael Scott', action: 'Practiced 15 Interview Questions', time: '12 mins ago', color: 'bg-purple-500' },
  { user: 'Emily Wu', action: 'Created a new account', time: '20 mins ago', color: 'bg-amber-500' },
  { user: 'David Kim', action: 'Completed a skill gap analysis', time: '1 hour ago', color: 'bg-rose-500' },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Admin Dashboard</h1>
        <p className="text-slate-500 dark:text-slate-400">Platform analytics and user engagement overview.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <StatCard title="Total Users" value="50,234" icon={Users} trend="up" trendValue="+12.5%" colorClass="bg-blue-500" />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <StatCard title="Resumes Analyzed" value="105,430" icon={FileText} trend="up" trendValue="+24.2%" colorClass="bg-purple-500" />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <StatCard title="Roadmaps Created" value="25,812" icon={Map} trend="up" trendValue="+8.1%" colorClass="bg-emerald-500" />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <StatCard title="Interviews Prepped" value="45,900" icon={MessageSquare} trend="down" trendValue="-2.4%" colorClass="bg-rose-500" />
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-6">User Growth (Last 6 Months)</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={userGrowthData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0A66C2" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0A66C2" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Area type="monotone" dataKey="users" stroke="#0A66C2" strokeWidth={3} fillOpacity={1} fill="url(#colorUsers)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <h3 className="font-semibold text-slate-900 dark:text-white mb-6">Module Usage</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={moduleUsageData} layout="vertical" margin={{ top: 0, right: 10, left: 30, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} width={80} />
                <RechartsTooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="count" fill="#2563EB" radius={[0, 4, 4, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card>
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-semibold text-slate-900 dark:text-white">Recent Activity</h3>
          <button className="text-sm text-primary-500 hover:text-primary-600 font-medium">View All</button>
        </div>
        <div className="space-y-6">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="relative mt-1">
                <div className={`w-3 h-3 rounded-full ${activity.color} ring-4 ring-white dark:ring-slate-900 z-10 relative`} />
                {index !== recentActivity.length - 1 && (
                  <div className="absolute top-3 left-1.5 w-0.5 h-12 -ml-px bg-slate-200 dark:bg-slate-800" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  {activity.user}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {activity.action}
                </p>
              </div>
              <span className="text-xs text-slate-500 whitespace-nowrap">
                {activity.time}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
