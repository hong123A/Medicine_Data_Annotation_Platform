
export enum ModuleType {
  Editing = 'editing',
  Review = 'review',
  TaskManagement = 'task',
  DataTable = 'table',
  Graph = 'graph',
  Config = 'config'
}

export interface Term {
  id: string;
  name: string;
  category: string;
  description: string;
  westernEquivalent?: string;
  source: string;
  status: string;
}

export interface AnnotationTask {
  id: string;
  title: string;
  subTaskName: string;
  status: '加工中' | '待审核' | '已退回' | '已通过';
  returnCount: number;
  assignee: string; // 分配人
  assignTime: string;
  editor: string; // 编辑人
  submitTime: string;
  reviewer: string; // 审核人
  reviewTime: string;
  progress: number;
  priority: '高' | '中' | '低';
  imageUrl?: string;
  type: 'text' | 'image';
}

export interface DBConnection {
  id: string;
  name: string;
  address: string;
  status: '已连接' | '未连接' | '连接异常';
}

export interface KnowledgeNode {
  id: string;
  label: string;
  type: string;
  color?: string;
}

export interface KnowledgeLink {
  source: string;
  target: string;
  relation: string;
}
