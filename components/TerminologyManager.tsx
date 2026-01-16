
import React, { useState } from 'react';
import { Search, Plus, Filter, Book, Download, Upload } from 'lucide-react';
import { Term } from '../types';

const MOCK_TERMS: Term[] = [
  // Added status property to satisfy the Term interface
  { id: '1', name: '气虚证', category: 'Syndrome', description: '脏腑功能衰退，气量不足的证候', westernEquivalent: 'Fatigue Syndrome', source: 'GB/T 16751.2', status: '已发布' },
  { id: '2', name: '血瘀证', category: 'Syndrome', description: '血液运行不畅，甚至停滞的证候', westernEquivalent: 'Microcirculation Disorder', source: 'GB/T 16751.2', status: '已发布' },
  { id: '3', name: '茯苓', category: 'Herb', description: '利水渗湿，健脾，宁心', westernEquivalent: 'Poria Cocos', source: '中国药典2020', status: '已发布' },
  { id: '4', name: '足三里', category: 'Acupoint', description: '胃经要穴，主治胃肠疾病', westernEquivalent: 'ST36', source: 'WHO标准', status: '已发布' },
];

const TerminologyManager: React.FC = () => {
  const [terms] = useState<Term[]>(MOCK_TERMS);

  return (
    <div className="p-6 bg-slate-50 min-h-full">
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Book className="text-blue-600" size={24} />
            术语库管理 (中医与中西医结合)
          </h2>
          <div className="flex gap-3">
            <button className="bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors flex items-center gap-2">
              <Upload size={16} /> 批量导入
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all flex items-center gap-2">
              <Plus size={16} /> 新增术语
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="relative col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="搜索中医证候、方剂、草药..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>
          <select className="bg-slate-50 border border-slate-200 px-4 py-2 rounded-lg text-sm text-slate-600 focus:ring-2 focus:ring-blue-500 outline-none">
            <option>全部类目</option>
            <option>证候 (Syndrome)</option>
            <option>草药 (Herb)</option>
            <option>穴位 (Acupoint)</option>
          </select>
          <button className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm transition-all">
            <Filter size={16} /> 高级筛选
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="text-left py-4 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">名称</th>
                <th className="text-left py-4 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">类目</th>
                <th className="text-left py-4 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">描述</th>
                <th className="text-left py-4 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">中西医对应</th>
                <th className="text-left py-4 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">标准来源</th>
                <th className="text-right py-4 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody>
              {terms.map((term) => (
                <tr key={term.id} className="border-b border-slate-50 hover:bg-blue-50/30 transition-colors group">
                  <td className="py-4 px-4 font-medium text-slate-800">{term.name}</td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${
                      term.category === 'Syndrome' ? 'bg-orange-100 text-orange-600' :
                      term.category === 'Herb' ? 'bg-emerald-100 text-emerald-600' :
                      'bg-purple-100 text-purple-600'
                    }`}>
                      {term.category}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-slate-600 text-sm max-w-xs truncate">{term.description}</td>
                  <td className="py-4 px-4 italic text-slate-500 text-sm">{term.westernEquivalent || '--'}</td>
                  <td className="py-4 px-4 text-xs text-slate-400 font-mono">{term.source}</td>
                  <td className="py-4 px-4 text-right">
                    <button className="text-blue-600 hover:text-blue-800 text-xs font-semibold underline">编辑</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TerminologyManager;