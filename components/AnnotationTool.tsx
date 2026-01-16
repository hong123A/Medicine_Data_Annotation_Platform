
import React, { useState } from 'react';
import { ChevronRight, LayoutGrid, Search, Filter, RotateCcw, CheckCircle2, XCircle, MoreVertical } from 'lucide-react';
import { AnnotationTask } from '../types';

const MOCK_TASKS: AnnotationTask[] = [
  // Fixed status and priority to match Chinese types in AnnotationTask interface and added missing properties
  { id: '1', title: '舌苔分析任务-202405', subTaskName: 'Sub-1', status: '待审核', returnCount: 0, assignTime: '2024-05-15', reviewer: '林主任', reviewTime: '', type: 'image', assignee: '张医生', editor: '王标注员', submitTime: '2024-05-20 10:20', imageUrl: 'https://picsum.photos/seed/tongue1/400/300', progress: 45, priority: '高' },
  { id: '2', title: '脉搏波形标注-HK', subTaskName: 'Sub-2', status: '待审核', returnCount: 0, assignTime: '2024-05-16', reviewer: '林主任', reviewTime: '', type: 'image', assignee: '李主任', editor: '赵标注员', submitTime: '2024-05-21 09:15', imageUrl: 'https://picsum.photos/seed/pulse1/400/300', progress: 12, priority: '中' },
  { id: '3', title: '中医处方规范化', subTaskName: 'Sub-3', status: '已通过', returnCount: 0, assignTime: '2024-05-10', reviewer: '林主任', reviewTime: '2024-05-18', type: 'text', assignee: '王教授', editor: '孙标注员', submitTime: '2024-05-18 14:40', progress: 100, priority: '低' },
  { id: '4', title: '影像中西医结合分析', subTaskName: 'Sub-4', status: '已退回', returnCount: 1, assignTime: '2024-05-12', reviewer: '林主任', reviewTime: '2024-05-19', type: 'image', assignee: '刘医生', editor: '周标注员', submitTime: '2024-05-19 16:00', progress: 85, priority: '高' },
];

const AnnotationTool: React.FC = () => {
  // Fixed type and initial value for activeTab to match Chinese status values
  const [activeTab, setActiveTab] = useState<'全部' | '待审核' | '已退回' | '已通过'>('待审核');

  return (
    <div className="flex flex-col h-full bg-[#f0f2f5]">
      {/* Breadcrumb Area */}
      <div className="bg-white px-6 py-2 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center text-xs text-slate-500 space-x-2">
          <span>数据审核</span>
          <ChevronRight size={14} />
          <span className="text-slate-900 font-medium">模板任务</span>
        </div>
        <button className="flex items-center gap-1.5 text-blue-600 font-medium text-xs hover:bg-blue-50 px-2 py-1 rounded transition-colors">
          <LayoutGrid size={14} />
          <span>工作台</span>
        </button>
      </div>

      {/* Filter Bar (Style from reference image) */}
      <div className="bg-white p-6 shadow-sm">
        <div className="grid grid-cols-5 gap-6">
          <div className="space-y-1.5">
            <label className="text-xs text-slate-500">任务名称</label>
            <input type="text" placeholder="请输入任务名称" className="w-full border border-slate-200 rounded px-3 py-1.5 text-sm outline-none focus:border-blue-500" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-slate-500">子任务名称</label>
            <input type="text" placeholder="请输入子任务名称" className="w-full border border-slate-200 rounded px-3 py-1.5 text-sm outline-none focus:border-blue-500" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-slate-500">分配人</label>
            <input type="text" placeholder="请输入分配人" className="w-full border border-slate-200 rounded px-3 py-1.5 text-sm outline-none focus:border-blue-500" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-slate-500">编辑人</label>
            <input type="text" placeholder="请输入编辑人" className="w-full border border-slate-200 rounded px-3 py-1.5 text-sm outline-none focus:border-blue-500" />
          </div>
          <div className="flex items-end space-x-2">
            <button className="bg-blue-600 text-white px-6 py-1.5 rounded text-sm hover:bg-blue-700 transition-colors">筛选</button>
            <button className="bg-slate-100 text-slate-600 px-6 py-1.5 rounded text-sm hover:bg-slate-200 transition-colors">重置</button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white px-6 border-b border-slate-200 mt-0.5">
        <div className="flex space-x-8">
          {[
            { id: '全部', label: '全部' },
            { id: '待审核', label: '待审核' },
            { id: '已退回', label: '已退回' },
            { id: '已通过', label: '已通过' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3 px-1 text-sm font-medium transition-all relative ${
                activeTab === tab.id ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area - Data Table */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="bg-white rounded border border-slate-200 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-[#f8f9fb] border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 text-xs font-semibold text-slate-600 uppercase">序号</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-600 uppercase">任务名称</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-600 uppercase">状态</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-600 uppercase">分配人</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-600 uppercase">提交时间</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-600 uppercase">预览</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-600 uppercase text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {/* Fixed filter comparison to use '全部' */}
              {MOCK_TASKS.filter(t => activeTab === '全部' || t.status === activeTab).map((task, idx) => (
                <tr key={task.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-4 py-4 text-sm text-slate-500">{idx + 1}</td>
                  <td className="px-4 py-4">
                    <div className="text-sm font-medium text-slate-900">{task.title}</div>
                    <div className="text-[10px] text-slate-400">ID: {task.id}</div>
                  </td>
                  <td className="px-4 py-4">
                    {/* Fixed status comparisons and removed English toUpperCase on Chinese strings */}
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold inline-flex items-center gap-1 ${
                      task.status === '已通过' ? 'bg-green-50 text-green-600' :
                      task.status === '已退回' ? 'bg-red-50 text-red-600' :
                      'bg-orange-50 text-orange-600'
                    }`}>
                      {task.status === '已通过' ? <CheckCircle2 size={10} /> : 
                       task.status === '已退回' ? <XCircle size={10} /> : 
                       <RotateCcw size={10} />}
                      {task.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-600">{task.assignee}</td>
                  <td className="px-4 py-4 text-sm text-slate-500">{task.submitTime}</td>
                  <td className="px-4 py-4">
                    {task.imageUrl ? (
                      <div className="w-12 h-8 rounded bg-slate-100 border border-slate-200 overflow-hidden cursor-pointer hover:border-blue-400">
                        <img src={task.imageUrl} alt="preview" className="w-full h-full object-cover" />
                      </div>
                    ) : <span className="text-slate-300 text-xs">-</span>}
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex items-center justify-end space-x-3">
                      <button className="text-blue-600 hover:text-blue-800 text-xs font-medium">去审核</button>
                      <button className="text-slate-400 hover:text-slate-600"><MoreVertical size={14}/></button>
                    </div>
                  </td>
                </tr>
              ))}
              {/* Fixed filter comparison to use '全部' */}
              {MOCK_TASKS.filter(t => activeTab === '全部' || t.status === activeTab).length === 0 && (
                <tr>
                  <td colSpan={7} className="py-20 text-center">
                    <div className="flex flex-col items-center justify-center text-slate-400">
                      <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-3">
                        <Search size={32} />
                      </div>
                      <p className="text-sm">暂无数据</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AnnotationTool;
