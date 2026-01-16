
import React, { useState } from 'react';
import { Search, Filter, Plus, ChevronRight, Layout, ImageIcon, FileText, ArrowLeft, Tags, ZoomIn, Save } from 'lucide-react';
import { generateMockTasks } from '../utils/mockGenerator';
import { AnnotationTask } from '../types';

const ALL_DATA = generateMockTasks(210);

const DataEditing: React.FC = () => {
  const [tab, setTab] = useState<'text' | 'image'>('text');
  const [editingItem, setEditingItem] = useState<AnnotationTask | null>(null);
  const [page, setPage] = useState(1);
  const itemsPerPage = 15;

  const filtered = ALL_DATA.filter(d => d.type === tab);
  const total = filtered.length;
  const list = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  if (editingItem) {
    return <AnnotationInterface item={editingItem} onBack={() => setEditingItem(null)} />;
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* 路径导航 */}
      <div className="bg-white px-6 py-2 border-b border-slate-200 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center space-x-2">
          <span>数据编辑</span>
          <ChevronRight size={14} />
          <span>{tab === 'text' ? '文本标注' : '图片标注'}</span>
          <ChevronRight size={14} />
          <span className="text-slate-900 font-medium">任务列表</span>
        </div>
        <div className="flex items-center gap-2 text-blue-600 font-medium cursor-pointer hover:underline">
          <Layout size={14} />
          <span>工作台</span>
        </div>
      </div>

      {/* 筛选区域 - 参照截图1 */}
      <div className="bg-white p-6 shadow-sm flex flex-wrap gap-y-4 gap-x-8 border-b border-slate-100">
        <FilterInput label="任务名称" placeholder="请输入任务名称" />
        <FilterInput label="子任务名称" placeholder="请输入子任务名称" />
        <FilterInput label="分配人" placeholder="请输入分配人" />
        <FilterInput label="审核人" placeholder="请输入审核人" />
        <div className="space-y-1">
          <label className="text-xs text-slate-400 block">分配日期</label>
          <div className="flex items-center gap-2">
            <input type="date" className="border border-slate-200 rounded px-2 py-1 text-xs outline-none focus:border-blue-500" />
            <span className="text-slate-300">~</span>
            <input type="date" className="border border-slate-200 rounded px-2 py-1 text-xs outline-none focus:border-blue-500" />
          </div>
        </div>
        <div className="flex items-end gap-3 ml-auto">
          <button className="bg-blue-600 text-white px-6 py-1.5 rounded text-sm font-medium hover:bg-blue-700 transition-colors">筛选</button>
          <button className="bg-slate-100 text-slate-600 px-6 py-1.5 rounded text-sm font-medium hover:bg-slate-200 transition-colors">重置</button>
        </div>
      </div>

      {/* 标签页切换 */}
      <div className="px-6 bg-white border-b border-slate-100 flex items-center justify-between">
        <div className="flex space-x-12">
          <button 
            onClick={() => { setTab('text'); setPage(1); }}
            className={`py-4 text-sm font-bold flex items-center gap-2 relative ${tab === 'text' ? 'text-blue-600' : 'text-slate-400'}`}
          >
            <FileText size={16} /> 文本标注
            {tab === 'text' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t" />}
          </button>
          <button 
            onClick={() => { setTab('image'); setPage(1); }}
            className={`py-4 text-sm font-bold flex items-center gap-2 relative ${tab === 'image' ? 'text-blue-600' : 'text-slate-400'}`}
          >
            <ImageIcon size={16} /> 图片标注
            {tab === 'image' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t" />}
          </button>
        </div>
        <div className="flex gap-4 text-xs font-bold">
          <span className="text-orange-500 cursor-pointer">未确认异常</span>
          <span className="text-red-600 cursor-pointer">已确认异常</span>
        </div>
      </div>

      {/* 列表主体 - 参照截图1 */}
      <div className="flex-1 overflow-auto p-4 bg-slate-50/30">
        <div className="bg-white rounded border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left text-[13px] whitespace-nowrap">
            <thead className="bg-[#f8f9fb] border-b border-slate-200 text-slate-500 font-bold">
              <tr>
                <th className="px-4 py-3 w-12 text-center">序号</th>
                <th className="px-4 py-3">任务名称</th>
                <th className="px-4 py-3">子任务名称</th>
                <th className="px-4 py-3">状态</th>
                <th className="px-4 py-3 text-center">退回次数</th>
                <th className="px-4 py-3">分配人</th>
                <th className="px-4 py-3">分配时间</th>
                <th className="px-4 py-3">编辑人</th>
                <th className="px-4 py-3">提交时间</th>
                <th className="px-4 py-3">审核人</th>
                <th className="px-4 py-3">审核时间</th>
                <th className="px-4 py-3 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {list.map((item, idx) => (
                <tr key={item.id} className="hover:bg-blue-50/30 transition-colors group">
                  <td className="px-4 py-4 text-center text-slate-400">{(page-1)*itemsPerPage + idx + 1}</td>
                  <td className="px-4 py-4 font-medium text-slate-700">{item.title}</td>
                  <td className="px-4 py-4 text-blue-600 font-mono text-xs hover:underline cursor-pointer">{item.subTaskName}</td>
                  <td className="px-4 py-4">
                    <span className={`${
                      item.status === '加工中' ? 'text-orange-500' : 
                      item.status === '已通过' ? 'text-green-600' : 
                      item.status === '待审核' ? 'text-blue-500' : 'text-red-500'
                    } font-bold`}>{item.status}</span>
                  </td>
                  <td className="px-4 py-4 text-center">{item.returnCount}</td>
                  <td className="px-4 py-4">{item.assignee}</td>
                  <td className="px-4 py-4 text-slate-400 text-xs">{item.assignTime}</td>
                  <td className="px-4 py-4">{item.editor}</td>
                  <td className="px-4 py-4 text-slate-400 text-xs">{item.submitTime}</td>
                  <td className="px-4 py-4">{item.reviewer}</td>
                  <td className="px-4 py-4 text-slate-400 text-xs">{item.reviewTime}</td>
                  <td className="px-4 py-4 text-right">
                    <button 
                      onClick={() => setEditingItem(item)}
                      className="text-cyan-600 hover:text-cyan-800 font-bold transition-colors"
                    >
                      查看
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 分页器 */}
      <div className="bg-white px-6 py-3 border-t border-slate-200 flex justify-between items-center text-xs text-slate-500">
        <div>共 {total} 条记录</div>
        <div className="flex items-center space-x-2">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} className="px-2 py-1 border border-slate-200 rounded hover:bg-slate-50">上一页</button>
          {[1, 2, 3].map(p => (
            <button key={p} onClick={() => setPage(p)} className={`w-8 h-8 rounded border ${page === p ? 'bg-blue-600 text-white border-blue-600' : 'border-slate-200 hover:bg-slate-100'}`}>{p}</button>
          ))}
          <span className="px-2">...</span>
          <button onClick={() => setPage(p => Math.min(Math.ceil(total/itemsPerPage), p + 1))} className="px-2 py-1 border border-slate-200 rounded hover:bg-slate-50">下一页</button>
          <select className="border border-slate-200 rounded px-2 py-1 ml-4 outline-none">
            <option>15 条/页</option>
            <option>30 条/页</option>
          </select>
        </div>
      </div>
    </div>
  );
};

const FilterInput = ({ label, placeholder }: any) => (
  <div className="space-y-1">
    <label className="text-xs text-slate-400 block">{label}</label>
    <input type="text" placeholder={placeholder} className="w-44 border border-slate-200 rounded px-2 py-1 text-sm outline-none focus:border-blue-500" />
  </div>
);

// 模拟编辑界面
const AnnotationInterface = ({ item, onBack }: { item: AnnotationTask, onBack: () => void }) => {
  return (
    <div className="h-full flex flex-col bg-slate-50">
      <div className="bg-white h-12 border-b border-slate-200 px-6 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-1 hover:bg-slate-100 rounded text-slate-500">
            <ArrowLeft size={18} />
          </button>
          <h3 className="font-bold text-slate-800">正在标注：{item.title}</h3>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-1.5 bg-slate-100 text-slate-600 rounded text-sm font-bold">暂存</button>
          <button className="px-4 py-1.5 bg-blue-600 text-white rounded text-sm font-bold flex items-center gap-1.5">
            <Save size={16} /> 提交标注
          </button>
        </div>
      </div>
      <div className="flex-1 flex overflow-hidden">
        {/* 左侧标注内容 */}
        <div className="flex-1 overflow-auto p-6 flex flex-col items-center justify-center">
          {item.type === 'image' ? (
            <div className="bg-white p-4 rounded-xl shadow-lg border border-slate-200 relative group">
              <img src={item.imageUrl} alt="TCM clinical" className="max-w-full max-h-[70vh] rounded shadow-sm" />
              <div className="absolute top-8 right-8 flex flex-col gap-2">
                <button className="p-2 bg-white/80 backdrop-blur rounded shadow hover:bg-white"><ZoomIn size={20}/></button>
              </div>
            </div>
          ) : (
            <div className="bg-white p-10 rounded-xl shadow-lg border border-slate-200 max-w-3xl w-full">
              <h4 className="text-lg font-bold text-slate-900 mb-6 border-b pb-4">中医电子病历记录</h4>
              <p className="text-slate-700 leading-relaxed text-lg mb-8">
                患者主诉反复咳嗽咳痰2年，加重3天。现症见：咳嗽痰多，色白质稀，畏寒肢冷，神疲乏力。
                舌质淡胖，苔白滑，脉细弱。初步诊断：肺胀（阳虚水泛证）。建议予以补肺纳气、利水消肿之法。
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full border border-blue-100 text-xs font-bold">主诉识别</span>
                <span className="px-3 py-1 bg-orange-50 text-orange-600 rounded-full border border-orange-100 text-xs font-bold">辨证标注</span>
              </div>
            </div>
          )}
        </div>
        {/* 右侧标注工具栏 */}
        <div className="w-80 bg-white border-l border-slate-200 p-6 shadow-[-4px_0_12px_rgba(0,0,0,0.02)] overflow-auto">
          <h4 className="font-bold text-slate-800 mb-6 flex items-center gap-2 border-b pb-4">
            <Tags size={18} className="text-blue-600" />
            标注属性集
          </h4>
          <div className="space-y-6">
            <AnnotationField label="证候类型" options={['气虚证', '血瘀证', '阴虚火旺', '阳虚水泛', '痰热蕴肺']} />
            <AnnotationField label="主要症状" options={['咳嗽', '咳痰', '胸闷', '心悸', '水肿']} />
            <AnnotationField label="涉及经脉" options={['肺经', '脾经', '肾经', '心经']} />
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500">备注说明</label>
              <textarea placeholder="输入标注备注..." className="w-full h-24 border border-slate-200 rounded p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AnnotationField = ({ label, options }: any) => (
  <div className="space-y-2">
    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{label}</label>
    <div className="flex flex-wrap gap-2">
      {options.map((opt: string) => (
        <button key={opt} className="px-2.5 py-1 bg-slate-50 text-slate-600 border border-slate-200 rounded text-xs hover:border-blue-400 hover:text-blue-600 transition-all">
          {opt}
        </button>
      ))}
    </div>
  </div>
);

export default DataEditing;
