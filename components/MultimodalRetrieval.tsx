
import React, { useState, useEffect } from 'react';
import { Search, Image as ImageIcon, FileText, Activity, Zap, History, ChevronRight, ExternalLink, Info, Filter, ArrowRight, Share2, Bookmark, Upload, RefreshCw } from 'lucide-react';

type SearchMode = 'global' | 'image' | 'pulse';

// --- 数据接口定义 ---
interface GlobalResult {
  id: string;
  type: 'syndrome' | 'formula' | 'acupoint' | 'disease';
  title: string;
  tags: string[];
  description: string;
  alignment: string;
  confidence: string;
  source: string;
}

interface ImageResult {
  id: string;
  label: string;
  category: string;
  matchScore: string;
  syndrome: string;
  description: string;
  seed: string;
  clinicalSigns: string[];
}

interface PulseResult {
  id: string;
  type: string;
  state: string;
  desc: string;
  points: string;
  metrics: { label: string; value: string; unit?: string }[];
  clinicalSignificance: string;
}

// --- 模拟数据集 ---
const GLOBAL_RESULTS: GlobalResult[] = [
  { id: 'G-001', type: 'syndrome', title: '脾虚湿困证', tags: ['中医证候', '消化系统'], description: '脘腹胀满，食少便溏，头重如裹，身重困倦。舌苔白腻，脉濡缓。', alignment: 'K29.500 慢性萎缩性胃炎', confidence: '98%', source: '《中医内科学》' },
  { id: 'G-002', type: 'formula', title: '补中益气汤', tags: ['名方', '补益剂'], description: '主治脾胃气虚，气陷证。组成：黄芪、甘草、人参、当归、陈皮、升麻等。', alignment: '慢性疲劳综合征 (CFS)', confidence: '95%', source: '《医方集解》' },
  { id: 'G-003', type: 'acupoint', title: '足三里 (ST36)', tags: ['胃经', '保健要穴'], description: '犊鼻下3寸。主治胃痛、呕吐、泄泻。具有极强的免疫调节作用。', alignment: '神经调节 / 胃肠动力调节', confidence: '92%', source: '《针灸学》' },
  { id: 'G-004', type: 'disease', title: '消渴病 (2型糖尿病)', tags: ['代谢疾病', '中西医结合'], description: '中医辨证多属气阴两虚。西医以胰岛素抵抗为核心特征。', alignment: 'E11.900 Type 2 Diabetes', confidence: '99%', source: '《中西医结合内科学》' },
];

const IMAGE_RESULTS: ImageResult[] = [
  { id: 'IMG-01', label: '黄腻苔 (湿热内蕴)', category: '舌诊', matchScore: '96.5%', syndrome: '肝胆湿热 / 胃肠湿热', description: '舌质红，苔黄而厚腻，颗粒细腻。', clinicalSigns: ['口苦', '尿黄', '腹胀'], seed: 'tongue-yellow-1' },
  { id: 'IMG-02', label: '齿痕舌 (脾虚湿盛)', category: '舌诊', matchScore: '92.1%', syndrome: '脾气虚证 / 水湿内停', description: '舌体胖大，边缘受牙齿挤压形成凹陷。', clinicalSigns: ['乏力', '便溏', '浮肿'], seed: 'tongue-marks-2' },
  { id: 'IMG-03', label: '面色黧黑 (血瘀证)', category: '面诊', matchScore: '88.4%', syndrome: '肾精亏损 / 瘀血阻络', description: '面色晦暗无华，眼眶周围青黑明显。', clinicalSigns: ['刺痛', '舌暗', '脉涩'], seed: 'face-dark-3' },
];

const PULSE_RESULTS: PulseResult[] = [
  { id: 'P-01', type: '弦脉', state: 'Wiry', desc: '脉位端直，如按琴弦。', points: '0,25 10,24 20,26 30,23 40,25 50,24 60,26', metrics: [{label:'心率',value:'78',unit:'bpm'},{label:'紧张度',value:'高'},{label:'流利度',value:'一般'}], clinicalSignificance: '主肝胆病、痛证、痰饮。常见于高血压、急慢性肝炎。' },
  { id: 'P-02', type: '滑脉', state: 'Slippery', desc: '往来流利，如盘走珠。', points: '0,30 10,10 20,30 30,12 40,30 50,11 60,30', metrics: [{label:'心率',value:'82',unit:'bpm'},{label:'紧张度',value:'中'},{label:'流利度',value:'极高'}], clinicalSignificance: '主痰饮、食滞、实热。常见于消化不良、感染性疾病。' },
  { id: 'P-03', type: '细数脉', state: 'Fine-Rapid', desc: '脉细如线，频率较快。', points: '0,35 5,20 10,35 15,18 20,35 25,20 30,35 35,18 40,35 45,20 50,35 55,18 60,35', metrics: [{label:'心率',value:'95',unit:'bpm'},{label:'紧张度',value:'低'},{label:'流利度',value:'一般'}], clinicalSignificance: '主阴虚火旺、血虚。常见于自主神经功能紊乱、慢性消耗。' },
];

const MultimodalRetrieval: React.FC = () => {
  const [mode, setMode] = useState<SearchMode>('global');
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // 搜索处理
  const handleSearch = (customQuery?: string) => {
    if (customQuery) setQuery(customQuery);
    setIsSearching(true);
    setShowResults(false);
    
    // 模拟AI分析过程
    setTimeout(() => {
      setIsSearching(false);
      setShowResults(true);
    }, 800);
  };

  return (
    <div className="p-6 bg-[#f8fafc] min-h-full">
      <div className="max-w-7xl mx-auto space-y-8 py-6">
        {/* 标题 */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-blue-100 shadow-sm">
            <Zap size={14} className="animate-pulse" /> Advanced Multi-modal Retrieval
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">中西医多模态路径检索中心</h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            基于语义关联、视觉匹配与生理波形聚类的全栈式辅助诊断决策系统
          </p>
        </div>

        {/* 搜索控制台 */}
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-slate-100 overflow-hidden">
          <div className="flex bg-slate-50/80 p-2 gap-2">
            <ModeTab active={mode === 'global'} onClick={() => { setMode('global'); setShowResults(false); }} icon={<Zap size={18} />} label="全局混合检索" />
            <ModeTab active={mode === 'image'} onClick={() => { setMode('image'); setShowResults(false); }} icon={<ImageIcon size={18} />} label="以图搜证 (舌/面象)" />
            <ModeTab active={mode === 'pulse'} onClick={() => { setMode('pulse'); setShowResults(false); }} icon={<Activity size={18} />} label="脉图特征检索" />
          </div>

          <div className="p-10 space-y-6">
            <div className="relative group">
              <Search className={`absolute left-6 top-1/2 -translate-y-1/2 transition-colors ${isSearching ? 'text-blue-500' : 'text-slate-300'}`} size={28} />
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder={getPlaceholder(mode)} 
                className="w-full pl-16 pr-44 py-6 bg-slate-50 border-2 border-slate-100 rounded-3xl focus:border-blue-500 focus:bg-white transition-all text-xl outline-none shadow-inner group-hover:border-slate-200"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2">
                {mode === 'image' && (
                  <button className="p-4 bg-slate-100 text-slate-500 rounded-2xl hover:bg-slate-200 transition-all shadow-sm">
                    <Upload size={20} />
                  </button>
                )}
                <button 
                  onClick={() => handleSearch()}
                  disabled={isSearching}
                  className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  {isSearching ? <RefreshCw size={20} className="animate-spin" /> : <Search size={20} />}
                  {isSearching ? '正在分析...' : '检索'}
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 items-center text-sm">
              <span className="text-slate-400 flex items-center gap-1.5 font-bold mr-2"><History size={16}/> 检索范例:</span>
              {getModeSamples(mode).map((sample, idx) => (
                <button 
                  key={idx} 
                  onClick={() => handleSearch(sample)}
                  className="px-5 py-2 bg-white text-slate-600 rounded-xl border border-slate-200 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all text-xs font-bold shadow-sm"
                >
                  {sample}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 结果展示区 */}
        {isSearching && (
          <div className="py-20 flex flex-col items-center justify-center space-y-4">
             <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
             <p className="text-slate-500 font-bold animate-pulse">正在进行多模态知识对齐与路径映射...</p>
          </div>
        )}

        {showResults && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between px-4">
              <h3 className="text-2xl font-black text-slate-800 flex items-center gap-3">
                <div className="w-2.5 h-8 bg-blue-600 rounded-full shadow-lg shadow-blue-100" />
                检索结果发现
              </h3>
              <div className="flex items-center gap-4 text-xs font-black text-slate-400">
                <button className="flex items-center gap-1.5 hover:text-blue-600 transition-colors bg-white px-3 py-1.5 rounded-lg border border-slate-100 shadow-sm"><Filter size={14}/> 置信度排序</button>
                <button className="flex items-center gap-1.5 hover:text-blue-600 transition-colors bg-white px-3 py-1.5 rounded-lg border border-slate-100 shadow-sm"><Share2 size={14}/> 报告导出</button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {renderResults(mode)}
            </div>
          </div>
        )}

        {!showResults && !isSearching && (
          <div className="py-32 flex flex-col items-center justify-center bg-slate-50/50 rounded-[3rem] border-2 border-dashed border-slate-200 opacity-60">
             <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-300 mb-6">
                {mode === 'global' ? <Zap size={40} /> : mode === 'image' ? <ImageIcon size={40} /> : <Activity size={40} />}
             </div>
             <p className="text-slate-400 font-bold text-lg">请输入检索内容或点击范例查看多模态关联结果</p>
          </div>
        )}
      </div>
    </div>
  );
};

// --- 子组件与辅助函数 ---

const ModeTab = ({ active, onClick, icon, label }: any) => (
  <button 
    onClick={onClick}
    className={`flex-1 py-4 text-sm font-black transition-all flex items-center justify-center gap-3 rounded-2xl ${
      active ? 'bg-white text-blue-600 shadow-xl shadow-blue-900/5 border border-slate-100' : 'text-slate-400 hover:text-slate-600'
    }`}
  >
    {icon}
    {label}
  </button>
);

const getPlaceholder = (mode: SearchMode) => {
  switch (mode) {
    case 'global': return "输入证候、方剂或西医诊断，系统将自动映射关联路径...";
    case 'image': return "上传舌象、面象图片，系统将自动提取临床特征并搜索病例库...";
    case 'pulse': return "上传或搜索脉图波形特征（如频率、力度、流利度参数）...";
  }
};

const getModeSamples = (mode: SearchMode) => {
  switch (mode) {
    case 'global': return ['脾虚湿困 方剂', '2型糖尿病 ICD对照', '心肾不交 针灸穴位', '肝阳上亢 核心证候'];
    case 'image': return ['黄腻苔 湿热对照', '齿痕舌 相似病例', '面色黧黑 特征分析'];
    case 'pulse': return ['弦脉 深度检索', '滑脉 波形对比', '细数脉 临床意义'];
  }
};

const renderResults = (mode: SearchMode) => {
  if (mode === 'global') {
    return GLOBAL_RESULTS.map(item => (
      <div key={item.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 hover:border-blue-300 hover:shadow-2xl hover:shadow-blue-500/10 transition-all group relative overflow-hidden flex flex-col">
        <div className="flex justify-between items-start mb-6">
          <span className={`px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest border ${
            item.type === 'syndrome' ? 'bg-orange-50 text-orange-600 border-orange-100' :
            item.type === 'formula' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' :
            'bg-emerald-50 text-emerald-600 border-emerald-100'
          }`}>
            {item.type === 'syndrome' ? '中医证候' : item.type === 'formula' ? '经典方剂' : '医疗路径'}
          </span>
          <span className="text-[10px] font-black text-blue-500 bg-blue-50 px-2 py-0.5 rounded-lg border border-blue-100">{item.confidence} Match</span>
        </div>
        <h4 className="text-2xl font-black text-slate-800 mb-4 group-hover:text-blue-600 transition-colors">{item.title}</h4>
        <p className="text-sm text-slate-500 leading-relaxed mb-6 line-clamp-3">{item.description}</p>
        <div className="mt-auto pt-6 border-t border-slate-50">
          <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-100 mb-4">
             <div className="text-[10px] font-black text-slate-400 uppercase mb-2">ICD/西医对齐映射</div>
             <div className="text-sm font-bold text-slate-700">{item.alignment}</div>
          </div>
          <button className="w-full py-3 bg-slate-900 text-white rounded-2xl text-xs font-bold hover:bg-blue-600 transition-all shadow-lg shadow-slate-200">查看关联知识图谱</button>
        </div>
      </div>
    ));
  }

  if (mode === 'image') {
    return IMAGE_RESULTS.map(item => (
      <div key={item.id} className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden hover:shadow-2xl transition-all shadow-sm group">
        <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden">
          <img src={`https://picsum.photos/seed/${item.seed}/800/600`} alt={item.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black text-slate-800 border border-slate-200 shadow-sm">{item.category}</div>
          <div className="absolute bottom-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-[10px] font-black shadow-lg">相似度 {item.matchScore}</div>
        </div>
        <div className="p-8">
          <h4 className="text-xl font-black text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">{item.label}</h4>
          <p className="text-sm font-bold text-orange-600 mb-4 flex items-center gap-1"><Zap size={14}/> 核心关联证候: {item.syndrome}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {item.clinicalSigns.map(sign => <span key={sign} className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-bold rounded-lg border border-slate-200">#{sign}</span>)}
          </div>
          <button className="w-full py-3 bg-white border-2 border-slate-100 text-slate-700 rounded-2xl text-xs font-bold hover:border-blue-500 hover:text-blue-600 transition-all">查看临床证据包</button>
        </div>
      </div>
    ));
  }

  if (mode === 'pulse') {
    return PULSE_RESULTS.map(item => (
      <div key={item.id} className="bg-slate-900 rounded-[2.5rem] p-8 border border-slate-800 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all flex flex-col group">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h4 className="text-2xl font-black text-white group-hover:text-blue-400 transition-colors">{item.type} <span className="text-blue-500/50 text-xs ml-2 font-mono">{item.state}</span></h4>
            <div className="text-[10px] text-slate-500 font-bold uppercase mt-1 tracking-widest">Digital Pulse Record: {item.id}</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/20 group-hover:animate-pulse">
             <Activity size={20} />
          </div>
        </div>
        
        <div className="h-32 bg-black/40 rounded-3xl border border-slate-800/50 mb-8 relative overflow-hidden">
           <svg className="w-full h-full p-6" viewBox="0 0 60 40" preserveAspectRatio="none">
              <polyline fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" points={item.points} className="drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
           </svg>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-8">
          {item.metrics.map(m => (
            <div key={m.label} className="bg-slate-800/50 p-3 rounded-2xl text-center border border-white/5">
              <div className="text-[9px] text-slate-500 font-black uppercase mb-1">{m.label}</div>
              <div className="text-sm font-black text-white">{m.value}<span className="text-[9px] ml-0.5 text-slate-500">{m.unit}</span></div>
            </div>
          ))}
        </div>

        <div className="bg-blue-500/5 border border-blue-500/20 p-4 rounded-2xl mb-6">
          <div className="text-[10px] font-black text-blue-400 uppercase mb-1">临床意义预测</div>
          <p className="text-xs text-slate-400 leading-relaxed font-medium">{item.clinicalSignificance}</p>
        </div>

        <button className="w-full py-3 bg-white/5 border border-white/10 text-slate-400 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all mt-auto">波形比对分析</button>
      </div>
    ));
  }
};

export default MultimodalRetrieval;
