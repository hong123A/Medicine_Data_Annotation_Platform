
import React, { useState } from 'react';
import { generateMockTasks } from '../utils/mockGenerator';
import { ChevronRight, Search, CheckCircle, XCircle, Clock } from 'lucide-react';

const MOCK_DATA = generateMockTasks(215);

const DataReview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'待审核' | '已退回' | '已通过'>('待审核');
  const filtered = MOCK_DATA.filter(t => t.status === activeTab);

  return (
    <div className="flex flex-col h-full bg-[#f8f9fb]">
      <div className="bg-white px-8 py-4 border-b border-slate-200 flex justify-between items-center shadow-sm">
        <h2 className="text-xl font-bold text-slate-800">数据质量审核</h2>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input type="text" placeholder="输入数据编号查询..." className="pl-9 pr-4 py-1.5 border border-slate-200 rounded text-sm w-64 outline-none focus:border-blue-500" />
          </div>
          <button className="bg-blue-600 text-white px-6 py-1.5 rounded text-sm font-bold">批量通过</button>
        </div>
      </div>

      <div className="bg-white px-8 border-b border-slate-100 flex gap-12">
        {['待审核', '已退回', '已通过'].map(t => (
          <button 
            key={t} 
            onClick={() => setActiveTab(t as any)}
            className={`py-4 text-sm font-bold relative transition-colors ${activeTab === t ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
          >
            {t} <span className="ml-1 text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-full">{MOCK_DATA.filter(x => x.status === t).length}</span>
            {activeTab === t && <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t" />}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="bg-white rounded border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left text-[13px]">
            <thead className="bg-[#fcfdfe] border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">数据编号 (Task ID)</th>
                <th className="px-6 py-4">标注任务</th>
                <th className="px-6 py-4">分配人</th>
                <th className="px-6 py-4">编辑人</th>
                <th className="px-6 py-4">提交日期</th>
                <th className="px-6 py-4 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.slice(0, 50).map(item => (
                <tr key={item.id} className="hover:bg-blue-50/20 transition-all group">
                  <td className="px-6 py-4 font-mono text-slate-400 text-xs">
                    <span className="bg-slate-50 px-2 py-1 rounded border border-slate-200 group-hover:bg-white">{item.id.slice(0, 12)}...{item.id.slice(-4)}</span>
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-700">{item.title}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-bold">
                        {item.assignee[0]}
                      </div>
                      <span>{item.assignee}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{item.editor}</td>
                  <td className="px-6 py-4 text-slate-400">{item.submitTime}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1 ml-auto">
                      去审核 <ChevronRight size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p-4 bg-slate-50/50 text-center text-xs text-slate-400">
            已显示前 50 条待审记录。库中共有 {MOCK_DATA.length} 条模拟数据。
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataReview;
