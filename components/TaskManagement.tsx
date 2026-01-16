
import React from 'react';
import { ClipboardList, TrendingUp, Users, Clock, ArrowUpRight } from 'lucide-react';
import { generateMockTasks } from '../utils/mockGenerator';

const MOCK_TASKS = generateMockTasks(220);

const TaskManagement: React.FC = () => {
  return (
    <div className="p-6 bg-slate-50 min-h-full space-y-6 overflow-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <ClipboardList className="text-indigo-600" size={28} />
          标注任务管理
        </h2>
        <div className="flex gap-4">
          <StatCard icon={<TrendingUp size={16}/>} label="总任务" value={MOCK_TASKS.length} color="blue" />
          {/* Fixed status comparison to '待审核' to match AnnotationTask status type */}
          <StatCard icon={<Clock size={16}/>} label="进行中" value={MOCK_TASKS.filter(t => t.status === '待审核').length} color="orange" />
          <StatCard icon={<Users size={16}/>} label="活跃人员" value="12" color="emerald" />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between">
          <h3 className="font-bold text-slate-700 text-sm">任务队列实时进度 (TOP 200)</h3>
          <button className="text-xs text-blue-600 font-bold hover:underline">批量操作</button>
        </div>
        <div className="divide-y divide-slate-100">
          {MOCK_TASKS.slice(0, 100).map((task) => (
            <div key={task.id} className="p-4 flex items-center gap-6 hover:bg-slate-50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 shrink-0 border border-slate-200 font-mono text-xs">
                {task.id.split('-')[1]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <h4 className="font-bold text-slate-800 truncate">{task.title}</h4>
                  {/* Fixed status comparisons to Chinese values '已通过' and '已退回' */}
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                    task.status === '已通过' ? 'bg-green-100 text-green-700' :
                    task.status === '已退回' ? 'bg-red-100 text-red-700' :
                    'bg-amber-100 text-amber-700'
                  }`}>
                    {task.status === '已通过' ? '已归档' : task.status === '已退回' ? '需重标注' : '标注中'}
                  </span>
                </div>
                <div className="flex items-center gap-4 mt-1.5 text-xs text-slate-500">
                  <span className="flex items-center gap-1 font-medium text-slate-700"><Users size={12}/> {task.editor}</span>
                  <span className="w-px h-3 bg-slate-200"></span>
                  <span>截止: 2024-12-31</span>
                </div>
              </div>
              <div className="w-48 hidden md:block">
                <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 mb-1 uppercase">
                  <span>进度</span>
                  <span>{task.progress}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-1000 ${task.progress > 80 ? 'bg-emerald-500' : task.progress > 40 ? 'bg-blue-500' : 'bg-amber-500'}`} style={{ width: `${task.progress}%` }}></div>
                </div>
              </div>
              <button className="p-2 text-slate-300 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                <ArrowUpRight size={20} />
              </button>
            </div>
          ))}
        </div>
        <div className="p-6 bg-slate-50 border-t border-slate-200 text-center text-sm text-slate-400 italic">
          由于性能原因，仅展示前 100 条实时活跃任务。完整 220 条数据可通过导出功能查看。
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, color }: any) => {
  const colors: any = {
    blue: 'text-blue-600 bg-blue-50',
    orange: 'text-orange-600 bg-orange-50',
    emerald: 'text-emerald-600 bg-emerald-50'
  };
  return (
    <div className={`px-4 py-2 rounded-xl flex items-center gap-3 border border-slate-200 shadow-sm bg-white`}>
      <div className={`p-2 rounded-lg ${colors[color]}`}>{icon}</div>
      <div>
        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{label}</div>
        <div className="text-lg font-bold text-slate-800 leading-tight">{value}</div>
      </div>
    </div>
  );
};

export default TaskManagement;
