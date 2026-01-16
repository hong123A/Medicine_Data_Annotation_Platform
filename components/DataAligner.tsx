
import React from 'react';
import { Shuffle, ArrowRight, FileText, Activity, AlertCircle } from 'lucide-react';

const DataAligner: React.FC = () => {
  return (
    <div className="p-6 bg-slate-50 min-h-full">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Shuffle className="text-cyan-600" size={24} />
          多模态数据对齐 (TCM-Western Alignment)
        </h2>
        <p className="text-sm text-slate-500 mt-1">跨语言、跨标准的中西医临床数据映射与对齐工具</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {/* Source: TCM Data */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-orange-600 font-bold">
              <FileText size={20} />
              <span>源数据: 中医临床记录</span>
            </div>
            <span className="text-xs text-slate-400">JSON/XML/Text</span>
          </div>
          <div className="flex-1 bg-slate-50 rounded-lg p-4 font-mono text-xs text-slate-600 border border-slate-100 overflow-auto whitespace-pre">
{`{
  "patient_id": "TCM_00129",
  "chief_complaint": "反复咳嗽咳痰2年，加重3天。",
  "diagnosis": "肺胀 (痰浊阻肺证)",
  "tongue": "舌质暗红，苔白腻",
  "pulse": "脉滑"
}`}
          </div>
          <button className="mt-4 w-full border border-dashed border-slate-300 py-3 rounded-lg text-slate-400 hover:text-blue-500 hover:border-blue-500 transition-all text-sm">
            + 点击或拖拽上传源数据
          </button>
        </div>

        {/* Target: Western Data */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col relative">
          <div className="absolute left-[-28px] top-1/2 -translate-y-1/2 z-10 hidden md:block">
            <div className="bg-blue-600 text-white p-2 rounded-full shadow-lg">
              <ArrowRight size={20} />
            </div>
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-blue-600 font-bold">
              <Activity size={20} />
              <span>目标数据: 西医临床诊断</span>
            </div>
            <span className="text-xs text-slate-400">FHIR/HL7/DICOM</span>
          </div>
          <div className="flex-1 bg-slate-50 rounded-lg p-4 font-mono text-xs text-slate-600 border border-slate-100 overflow-auto whitespace-pre">
{`{
  "encounter_id": "W_9982",
  "icd_10_code": "J44.9",
  "diagnosis": "Chronic obstructive pulmonary disease",
  "vitals": {
    "spo2": "94%",
    "respiratory_rate": 22
  }
}`}
          </div>
          <button className="mt-4 w-full border border-dashed border-slate-300 py-3 rounded-lg text-slate-400 hover:text-blue-500 hover:border-blue-500 transition-all text-sm">
            + 选择映射标准 (ICD-11/SNOMED)
          </button>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-sm font-bold text-slate-800 mb-4">推荐对齐映射 (AI-Powered)</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-4 bg-emerald-50 border border-emerald-100 p-4 rounded-lg">
            <div className="flex-1">
              <span className="text-[10px] uppercase font-bold text-emerald-600 bg-emerald-100 px-1.5 py-0.5 rounded">SYNDROME MAPPING</span>
              <div className="flex items-center gap-3 mt-1">
                <span className="font-bold text-slate-800">肺胀 (痰浊阻肺)</span>
                <ArrowRight size={14} className="text-slate-400" />
                <span className="font-bold text-slate-800">COPD with Acute Exacerbation</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-emerald-600 font-bold">98%</div>
              <div className="text-[10px] text-emerald-400 uppercase font-bold">置信度</div>
            </div>
            <button className="bg-emerald-600 text-white px-4 py-1.5 rounded-md text-xs font-bold">确认</button>
          </div>
          <div className="flex items-center gap-4 bg-orange-50 border border-orange-100 p-4 rounded-lg">
            <div className="flex-1">
              <span className="text-[10px] uppercase font-bold text-orange-600 bg-orange-100 px-1.5 py-0.5 rounded">SYMPTOM ALIGNMENT</span>
              <div className="flex items-center gap-3 mt-1">
                <span className="font-bold text-slate-800">舌质暗红 (Stagnation)</span>
                <ArrowRight size={14} className="text-slate-400" />
                <span className="font-bold text-slate-800">Abnormal Microcirculation</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-orange-600 font-bold">72%</div>
              <div className="text-[10px] text-orange-400 uppercase font-bold">置信度</div>
            </div>
            <button className="bg-orange-600 text-white px-4 py-1.5 rounded-md text-xs font-bold">确认</button>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
          <AlertCircle size={14} />
          AI 正在分析模态间的语义关联，建议由临床专家进行二次确认。
        </div>
      </div>
    </div>
  );
};

export default DataAligner;
