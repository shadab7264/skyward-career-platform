import Card from '../common/Card';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function StatCard({ title, value, icon: Icon, trend, trendValue, colorClass }) {
  const isPositive = trend === 'up';

  return (
    <Card className="flex flex-col relative overflow-hidden group">
      <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-10 group-hover:scale-150 transition-transform duration-500 ${colorClass}`} />
      
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl ${colorClass} bg-opacity-10`}>
          <Icon className={`w-6 h-6 ${colorClass.replace('bg-', 'text-')}`} />
        </div>
        <div className={`flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-full ${isPositive ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20' : 'text-rose-600 bg-rose-50 dark:bg-rose-900/20'}`}>
          {isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
          {trendValue}
        </div>
      </div>
      
      <div>
        <h3 className="text-slate-500 dark:text-slate-400 font-medium text-sm mb-1">{title}</h3>
        <p className="text-3xl font-bold text-slate-900 dark:text-white">{value}</p>
      </div>
    </Card>
  );
}
