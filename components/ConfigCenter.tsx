
import React from 'react';
import { generateMockDBConnections } from '../utils/mockGenerator';
import { ChevronRight, Database, Plus, Search, Terminal, Settings } from 'lucide-react';

const DB_DATA = generateMockDBConnections(205);

const ConfigCenter: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-[#f8f9fb]">
      {/* 顶部面包屑 - 参照截图2 */}
      <div className="bg-white px-6 py-2 border-b border-slate-200 text-xs text-slate-400 flex items-center gap-2">
        <Settings size={14} />
        <span>配置中心</span>
        <ChevronRight size={14} />
        <span className="text-slate-800 font-medium">连接数据库</span>
      </div>

      {/* 系统列表标题区 - 参照截图2 */}
      <div className="bg-white px-8 py-6 flex justify-between items-center shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 border-l-4 border-blue-600 pl-4">系统列表</h2>
        <button className="bg-blue-600 text-white px-8 py-2 rounded text-sm font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-100 flex items-center gap-2">
          <Plus size={16} /> 新增
        </button>
      </div>

      {/* 表格主体 - 参照截图2 */}
      <div className="flex-1 p-8 overflow-auto">
        <div className="bg-white rounded border border-slate-200 overflow-hidden shadow-sm">
          <table className="w-full text-left text-[13px] border-collapse">
            <thead className="bg-[#f8f9fb] border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 w-24 text-center">序号</th>
                <th className="px-6 py-4 border-l border-slate-100">系统名称</th>
                <th className="px-6 py-4 border-l border-slate-100">数据库连接地址</th>
                <th className="px-6 py-4 border-l border-slate-100">连接状态</th>
                <th className="px-6 py-4 border-l border-slate-100 text-center">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {DB_DATA.slice(0, 100).map((db, idx) => (
                <tr key={db.id} className="hover:bg-blue-50/10 transition-colors group">
                  <td className="px-6 py-5 text-center text-slate-400 font-mono text-xs">{idx + 1}</td>
                  <td className="px-6 py-5 border-l border-slate-50 font-bold text-slate-700">{db.name}</td>
                  <td className="px-6 py-5 border-l border-slate-50 font-mono text-slate-500">{db.address}</td>
                  <td className="px-6 py-5 border-l border-slate-50">
                    <span className={`flex items-center gap-2 font-bold ${
                      db.status === '已连接' ? 'text-green-600' : 'text-red-500'
                    }`}>
                      <div className={`w-2 h-2 rounded-full ${db.status === '已连接' ? 'bg-green-500' : 'bg-red-500 animate-pulse'}`} />
                      {db.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 border-l border-slate-50 text-center">
                    <div className="flex items-center justify-center space-x-6">
                      <button className="text-blue-600 hover:text-blue-800 font-bold transition-colors">编辑</button>
                      <button className="text-slate-300 hover:text-red-500 font-bold transition-colors">删除</button>
                    </div>
                  </td>
                </tr>
              ))}
              {DB_DATA.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-32 text-center">
                    <div className="flex flex-col items-center justify-center text-slate-300">
                      <Database size={56} className="mb-4 text-slate-100" />
                      <p className="text-sm font-medium">暂无已配置的数据库</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex justify-between items-center px-8 text-xs text-slate-400">
            <span>当前显示 1-100 条连接配置 (共 {DB_DATA.length} 条)</span>
            <div className="flex gap-2">
              <button className="p-1 hover:bg-slate-200 rounded">{'<'}</button>
              <button className="p-1 hover:bg-slate-200 rounded">{'>'}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigCenter;
