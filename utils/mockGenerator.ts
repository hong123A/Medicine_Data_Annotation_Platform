
import { Term, AnnotationTask, DBConnection } from '../types';

// 真实中医术语库
const REAL_TCM_TERMS = [
  "气血两虚证", "肝阳上亢证", "脾胃虚寒证", "心肾不交证", "半夏泻心汤", "补中益气丸", "六味地黄丸", "龙胆泻肝汤",
  "足三里", "合谷穴", "内关穴", "太冲穴", "中风（脱证）", "消渴病", "胸痹心痛", "痹证（风寒湿痹）",
  "肺胀（痰热郁肺）", "肝气郁结证", "肾精亏损证", "大肠湿热证", "桂枝茯苓丸", "银翘散", "藿香正气水", "小柴胡颗粒",
  "曲池穴", "三阴交", "涌泉穴", "百会穴", "血府逐瘀汤", "十全大补汤", "归脾汤", "消风散", "风湿热", "湿热蕴脾"
];

// 真实西医术语库
const REAL_WESTERN_TERMS = [
  "原发性高血压", "2型糖尿病", "慢性阻塞性肺疾病 (COPD)", "冠状动脉粥样硬化性心脏病", "心房颤动", "系统性红斑狼疮",
  "缺铁性贫血", "类风湿性关节炎", "阿司匹林肠溶片", "二甲双胍", "硝苯地平控释片", "阿托伐定钙片",
  "脑梗死", "高脂血症", "慢性乙型肝炎", "支气管哮喘", "甲状腺功能亢进症", "幽门螺杆菌感染", "胃食管反流病",
  "心力衰竭 (NYHA IV级)", "尿路感染", "过敏性鼻炎", "骨质疏松症", "痛风性关节炎", "重症肌无力", "带状疱疹"
];

export const generateMockTerms = (count: number, prefix: string = "中医"): Term[] => {
  const sourcePool = prefix === '中医' ? REAL_TCM_TERMS : REAL_WESTERN_TERMS;
  const categories = prefix === '中医' ? ['证候', '方剂', '穴位', '疾病'] : ['临床疾病', '药物', '病理状态'];
  
  return Array.from({ length: count }, (_, i) => {
    const nameBase = sourcePool[i % sourcePool.length];
    const uniqueSuffix = i >= sourcePool.length ? `-${Math.floor(i / sourcePool.length)}` : "";
    return {
      id: `${prefix === '中医' ? 'TCM' : 'WM'}-${1000 + i}`,
      name: `${nameBase}${uniqueSuffix}`,
      category: categories[i % categories.length],
      description: `这是关于 ${nameBase} 的医学定义、临床表现及诊断标准说明。`,
      westernEquivalent: prefix === '中医' ? `ICD-Ref-${i}` : undefined,
      source: i % 2 === 0 ? '国家卫生健康委员会标准' : '中国药典 / 临床诊疗指南',
      status: '已发布'
    };
  });
};

export const generateMockTasks = (count: number): AnnotationTask[] => {
  const statuses: ('加工中' | '待审核' | '已退回' | '已通过')[] = ['加工中', '待审核', '已退回', '已通过'];
  const names = ['王佳丽', '万虹', '李明', '张华', '赵晓东', '孙利'];
  const titles = [
    '《中医临床诊疗规范》文本抽取', 
    '中医舌象特征点标注任务', 
    '脉图波形自动识别标注', 
    '中西医对齐映射核对', 
    '经典医案结构化标注',
    '糖尿病足创面愈合图像分类'
  ];
  
  const tcmImageSeeds = ['tongue', 'pulse', 'herb', 'acupoint', 'treatment', 'moxibustion'];

  return Array.from({ length: count }, (_, i) => ({
    id: `66${Math.random().toString(16).slice(2, 10)}${Math.random().toString(16).slice(2, 10)}`,
    title: titles[i % titles.length] + (i >= titles.length ? `-${Math.floor(i / titles.length)}` : ""),
    subTaskName: `66${Math.random().toString(16).slice(2, 22)}`,
    status: statuses[i % 4],
    returnCount: Math.floor(Math.random() * 3),
    assignee: names[i % names.length],
    assignTime: `2026-01-14 15:58:${(i % 60).toString().padStart(2, '0')}`,
    editor: i % 2 === 0 ? '万虹' : '李明',
    submitTime: i % 4 === 0 ? '——' : `2026-02-10 10:20:00`,
    reviewer: '万虹',
    reviewTime: i % 4 === 0 ? '——' : `2026-02-12 14:30:00`,
    progress: Math.floor(Math.random() * 100),
    priority: i % 3 === 0 ? '高' : '中',
    type: i % 2 === 0 ? 'text' : 'image',
    imageUrl: i % 2 === 0 ? undefined : `https://picsum.photos/seed/med-${i}/800/600`
  }));
};

export const generateMockDBConnections = (count: number): DBConnection[] => {
  const dbNames = ['中医科学院中心库', '各省临床共享库', '名老医案历史库', '中药成分数据库'];
  return Array.from({ length: count }, (_, i) => ({
    id: `${i + 1}`,
    name: `${dbNames[i % dbNames.length]}-${i + 1}`,
    address: `10.254.${i % 255}.${100 + (i % 150)}:5432/med_clinical_v2`,
    status: i % 20 === 0 ? '连接异常' : '已连接'
  }));
};
