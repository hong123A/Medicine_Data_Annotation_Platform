
import React, { useState } from 'react';
import { 
  Database, 
  Edit3,
  CheckSquare,
  ClipboardList,
  Table as TableIcon,
  Network,
  Cog,
  User
} from 'lucide-react';
import DataEditing from './components/DataEditing';
import DataReview from './components/DataReview';
import TaskManagement from './components/TaskManagement';
import DataTableSection from './components/DataTableSection';
import KnowledgeGraphView from './components/KnowledgeGraphView';
import ConfigCenter from './components/ConfigCenter';
import { ModuleType } from './types';

const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState<ModuleType>(ModuleType.Editing);

  const renderModule = () => {
    switch (activeModule) {
      case ModuleType.Editing: return <DataEditing />;
      case ModuleType.Review: return <DataReview />;
      case ModuleType.TaskManagement: return <TaskManagement />;
      case ModuleType.DataTable: return <DataTableSection />;
      case ModuleType.Graph: return <KnowledgeGraphView />;
      case ModuleType.Config: return <ConfigCenter />;
      default: return <DataEditing />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* 顶部导航栏 - 参考图2风格 */}
      <header className="bg-[#1e3a8a] text-white px-6 h-16 flex items-center justify-between shadow-lg z-50">
        <div className="flex items-center space-x-12">
          <div className="flex items-center space-x-2">
            <div className="bg-white/20 p-1.5 rounded-lg shadow-inner">
              <Database size={24} className="text-cyan-400" />
            </div>
            <span className="text-2xl font-bold tracking-tight">碳氢·<span className="text-cyan-400">云注</span></span>
          </div>
          
          <nav className="flex items-center h-full">
            <NavItem active={activeModule === ModuleType.Editing} onClick={() => setActiveModule(ModuleType.Editing)} label="数据编辑" />
            <NavItem active={activeModule === ModuleType.Review} onClick={() => setActiveModule(ModuleType.Review)} label="数据审核" />
            <NavItem active={activeModule === ModuleType.TaskManagement} onClick={() => setActiveModule(ModuleType.TaskManagement)} label="任务管理" />
            <NavItem active={activeModule === ModuleType.DataTable} onClick={() => setActiveModule(ModuleType.DataTable)} label="数据表" />
            <NavItem active={activeModule === ModuleType.Graph} onClick={() => setActiveModule(ModuleType.Graph)} label="知识图谱" />
            <NavItem active={activeModule === ModuleType.Config} onClick={() => setActiveModule(ModuleType.Config)} label="配置中心" />
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <div className="bg-white/10 px-4 py-1.5 rounded flex items-center gap-2 border border-white/5 cursor-pointer hover:bg-white/20 transition-all">
            <span className="text-sm font-medium">万虹</span>
            <div className="w-8 h-8 bg-cyan-500 rounded flex items-center justify-center font-bold text-xs shadow-inner">虹</div>
          </div>
        </div>
      </header>

      {/* 主内容区 */}
      <main className="flex-1 overflow-hidden">
        {renderModule()}
      </main>
    </div>
  );
};

const NavItem = ({ active, onClick, label }: any) => (
  <button 
    onClick={onClick}
    className={`h-16 px-6 flex items-center transition-all relative font-medium text-base ${
      active 
        ? 'text-white' 
        : 'text-white/70 hover:text-white'
    }`}
  >
    {label}
    {active && <div className="absolute bottom-0 left-6 right-6 h-1 bg-cyan-400 rounded-t-full shadow-[0_-2px_6px_rgba(34,211,238,0.5)]" />}
  </button>
);

export default App;
