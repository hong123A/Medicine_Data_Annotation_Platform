
import React, { useState } from 'react';
import { generateMockTerms } from '../utils/mockGenerator';
import { Search, Download, Table as TableIcon, Filter, CheckCircle2, ArrowRight, Zap, RefreshCw } from 'lucide-react';
import MultimodalRetrieval from './MultimodalRetrieval';

const TCM_DATA = generateMockTerms(200, "中医");
const WEST_DATA = generateMockTerms(200, "西医");

// 模拟中西医对齐映射数据
const MOCK_ALIGNMENTS = [
  { tcm: "消渴病 (气阴两虚证)", west: "2型糖尿病 (Type 2 DM)", code: "E11.900", confidence: "98%", status: "已确认" },
  { tcm: "胸痹心痛 (气虚血瘀证)", west: "稳定性心绞痛 (Angina Pectoris)", code: "I20.900", confidence: "95%", status: "已确认" },
  { tcm: "中风 (中脏腑-闭证)", west: "急性脑梗死 (Acute Cerebral Infarction)", code: "I63.900", confidence: "92%", status: "待核对" },
  { tcm: "肺胀 (痰浊阻肺证)", west: "慢性阻塞性肺疾病 (COPD)", code: "J44.900", confidence: "96%", status: "已确认" },
  { tcm: "痹证 (风寒湿痹)", west: "类风湿性关节炎 (Rheumatoid Arthritis)", code: "M06.900", confidence: "89%", status: "已退回" },
  { tcm: "水肿 (肾阳衰微证)", west: "慢性肾衰竭 (Chronic Renal Failure)", code: "N18.900", confidence: "94%", status: "已确认" },
  { tcm: "肝气郁结证", west: "抑郁状态 (Depressive State)", code: "F32.900", confidence: "85%", status: "待核对" },
  { tcm: "脾胃虚寒证", west: "慢性萎缩性胃炎 (Chronic Gastritis)", code: "K29.400", confidence: "91%", status: "已确认" }
];

const DataTableSection: React.FC = () => {
  const [tab, setTab] = useState<'tcm' | 'west' | 'align' | 'search'>('tcm');

  return (
    <div className="flex flex-col h-full bg-[#f8f9fb]">
      <div className="bg-white px-8 pt-4 border-b border-slate-200 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-4">
          <TableIcon className="text-blue-600" size={24} />
          数据资源库 (TCM & WM Repository)
        </h2>
        <div className="flex space-x-12">
          <SubTabBtn active={tab === 'tcm'} onClick={() => setTab('tcm')} label="中医术语库" />
          <SubTabBtn active={tab === 'west'} onClick={() => setTab('west')} label="西医术语库" />
          <SubTabBtn active={tab === 'align'} onClick={() => setTab('align')} label="中西医数据对齐" />
          <SubTabBtn active={tab === 'search'} onClick={() => setTab('search')} label="多模态检索中心" />
        </div>
      </div>

      <div className="flex-1 overflow-hidden p-6">
        {tab === 'search' ? (
          <MultimodalRetrieval />
        ) : tab === 'align' ? (
          <AlignmentInterface />
        ) : (
          <div className="bg-white rounded border border-slate-200 h-full flex flex-col shadow-sm overflow-hidden">
            <div className="p-4 bg-slate-50/50 border-b border-slate-100 flex justify-between items-center">
              <div className="relative max-w-md w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input type="text" placeholder={`搜索${tab === 'tcm' ? '中医' : '西医'}标准术语...`} className="w-full pl-9 pr-4 py-1.5 border border-slate-200 rounded text-sm outline-none focus:border-blue-500" />
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-1.5 border border-slate-200 rounded text-sm font-medium hover:bg-slate-50 flex items-center gap-2"><Filter size={14}/> 筛选</button>
                <button className="px-4 py-1.5 bg-blue-600 text-white rounded text-sm font-bold flex items-center gap-2 shadow-md shadow-blue-100"><Download size={14}/> 导出术语表</button>
              </div>
            </div>
            <div className="flex-1 overflow-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#fcfdfe] text-slate-500 font-bold border-b border-slate-100 sticky top-0 z-10 shadow-sm">
                  <tr>
                    <th className="px-6 py-4">序号</th>
                    <th className="px-6 py-4">标准术语名称</th>
                    <th className="px-6 py-4">专业分类</th>
                    <th className="px-6 py-4">引用标准库</th>
                    <th className="px-6 py-4">同步状态</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {(tab === 'tcm' ? TCM_DATA : WEST_DATA).map((term, i) => (
                    <tr key={term.id} className="hover:bg-blue-50/10 transition-colors">
                      <td className="px-6 py-4 font-mono text-xs text-slate-400">{i + 1}</td>
                      <td className="px-6 py-4 font-bold text-slate-700">{term.name}</td>
                      <td className="px-6 py-4">
                        <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider">{term.category}</span>
                      </td>
                      <td className="px-6 py-4 text-slate-500">{term.source}</td>
                      <td className="px-6 py-4"><CheckCircle2 size={16} className="text-green-500" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const AlignmentInterface = () => {
  const [data, setData] = useState(MOCK_ALIGNMENTS);

  return (
    <div className="bg-white rounded border border-slate-200 h-full flex flex-col shadow-sm overflow-hidden">
      <div className="p-4 bg-slate-50/50 border-b border-slate-100 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h3 className="font-bold text-slate-800">中西医术语映射表 (TCM-WM Mapping Table)</h3>
          <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase">AI 建议引擎已开启</span>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-1.5 border border-slate-200 rounded text-sm font-medium hover:bg-slate-50 flex items-center gap-2 text-slate-600"><RefreshCw size={14}/> 重新分析</button>
          <button className="px-4 py-1.5 bg-blue-600 text-white rounded text-sm font-bold flex items-center gap-2 shadow-md shadow-blue-100"><Zap size={14}/> 导出映射字典</button>
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#fcfdfe] text-slate-500 font-bold border-b border-slate-100 sticky top-0 z-10 shadow-sm">
            <tr>
              <th className="px-6 py-4">中医术语 (源)</th>
              <th className="px-6 py-4 text-center w-12"><ArrowRight size={14} className="inline" /></th>
              <th className="px-6 py-4">西医对照 (目标)</th>
              <th className="px-6 py-4">ICD-10/11 编码</th>
              <th className="px-6 py-4">对齐置信度</th>
              <th className="px-6 py-4">审核状态</th>
              <th className="px-6 py-4 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {data.concat(Array.from({length: 192}, (_, i) => ({
              tcm: `中医模拟项-${i + 1}`,
              west: `西医模拟对照-${i + 1}`,
              code: `C${100+i}.00`,
              confidence: `${80 + Math.floor(Math.random() * 20)}%`,
              status: i % 5 === 0 ? "待核对" : "已确认"
            }))).map((row, i) => (
              <tr key={i} className="hover:bg-indigo-50/30 transition-colors">
                <td className="px-6 py-4 font-bold text-slate-800">{row.tcm}</td>
                <td className="px-6 py-4 text-center text-slate-300">→</td>
                <td className="px-6 py-4 font-medium text-slate-700">{row.west}</td>
                <td className="px-6 py-4 font-mono text-xs text-blue-600">{row.code}</td>
                <td className="px-6 py-4">
                   <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-slate-100 rounded-full w-12 overflow-hidden">
                        <div className="h-full bg-emerald-500" style={{ width: row.confidence }} />
                      </div>
                      <span className="text-[10px] font-bold text-slate-500">{row.confidence}</span>
                   </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    row.status === '已确认' ? 'bg-green-50 text-green-600' :
                    row.status === '待核对' ? 'bg-orange-50 text-orange-600' :
                    'bg-red-50 text-red-600'
                  }`}>
                    {row.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-blue-600 hover:text-blue-800 font-bold">详情</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const SubTabBtn = ({ active, onClick, label }: any) => (
  <button onClick={onClick} className={`pb-4 px-2 text-sm font-bold relative transition-all ${active ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}>
    {label}
    {active && <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t" />}
  </button>
);

export default DataTableSection;
