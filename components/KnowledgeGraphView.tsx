
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { Network, ZoomIn, ZoomOut, Maximize2, Share2, Info } from 'lucide-react';
// Fixed incorrect type imports from '../types'
import { KnowledgeNode as Node, KnowledgeLink as Link } from '../types';

const INITIAL_DATA: { nodes: Node[]; links: Link[] } = {
  nodes: [
    { id: '1', label: '脾虚证', type: 'Syndrome', color: '#f97316' },
    { id: '2', label: '气短乏力', type: 'Symptom', color: '#3b82f6' },
    { id: '3', label: '食少便溏', type: 'Symptom', color: '#3b82f6' },
    { id: '4', label: '茯苓', type: 'Herb', color: '#10b981' },
    { id: '5', label: '白术', type: 'Herb', color: '#10b981' },
    { id: '6', label: '四君子汤', type: 'Formula', color: '#8b5cf6' },
    { id: '7', label: '慢阻肺 (COPD)', type: 'WesternDisease', color: '#ef4444' },
  ],
  links: [
    { source: '1', target: '2', relation: '表现' },
    { source: '1', target: '3', relation: '表现' },
    { source: '6', target: '1', relation: '主治' },
    { source: '6', target: '4', relation: '含' },
    { source: '6', target: '5', relation: '含' },
    { source: '1', target: '7', relation: '常见证候' },
  ]
};

const KnowledgeGraphView: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = svgRef.current.clientWidth;
    const height = 600;

    const svg = d3.select(svgRef.current)
      .attr('viewBox', `0 0 ${width} ${height}`);
    
    svg.selectAll('*').remove();

    const simulation = d3.forceSimulation(INITIAL_DATA.nodes as any)
      .force('link', d3.forceLink(INITIAL_DATA.links as any).id((d: any) => d.id).distance(150))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2));

    const link = svg.append('g')
      .selectAll('line')
      .data(INITIAL_DATA.links)
      .enter().append('line')
      .attr('stroke', '#cbd5e1')
      .attr('stroke-width', 1.5);

    const linkText = svg.append('g')
      .selectAll('text')
      .data(INITIAL_DATA.links)
      .enter().append('text')
      .attr('font-size', '8px')
      .attr('fill', '#94a3b8')
      .attr('text-anchor', 'middle')
      .text(d => d.relation);

    const node = svg.append('g')
      .selectAll('g')
      .data(INITIAL_DATA.nodes)
      .enter().append('g')
      .call(d3.drag<SVGGElement, any>()
        .on('start', (event, d) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on('drag', (event, d) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on('end', (event, d) => {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        })
      )
      .on('click', (event, d) => setSelectedNode(d));

    node.append('circle')
      .attr('r', 25)
      .attr('fill', d => d.color || '#94a3b8')
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .attr('class', 'shadow-sm');

    node.append('text')
      .attr('dy', 35)
      .attr('text-anchor', 'middle')
      .attr('font-size', '10px')
      .attr('font-weight', 'bold')
      .attr('fill', '#334155')
      .text(d => d.label);

    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      linkText
        .attr('x', (d: any) => (d.source.x + d.target.x) / 2)
        .attr('y', (d: any) => (d.source.y + d.target.y) / 2);

      node.attr('transform', (d: any) => `translate(${d.x},${d.y})`);
    });

  }, []);

  return (
    <div className="p-6 bg-slate-50 min-h-full flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Network className="text-indigo-600" size={24} />
            中医知识图谱可视化
          </h2>
          <p className="text-sm text-slate-500 mt-1">支持证候-中药-西医疾病多维关系管理</p>
        </div>
        <div className="flex gap-2">
          <button className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-sm"><Share2 size={18}/></button>
          <button className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-sm"><Maximize2 size={18}/></button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1">
        <div className="lg:col-span-3 bg-white rounded-xl shadow-sm border border-slate-200 relative overflow-hidden flex flex-col">
          <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
            <button className="p-2 bg-white/80 backdrop-blur rounded-lg border border-slate-200 shadow-sm hover:bg-white"><ZoomIn size={16}/></button>
            <button className="p-2 bg-white/80 backdrop-blur rounded-lg border border-slate-200 shadow-sm hover:bg-white"><ZoomOut size={16}/></button>
          </div>
          <div className="flex-1 w-full min-h-[500px]">
            <svg ref={svgRef} className="w-full h-full" />
          </div>
          <div className="p-3 bg-slate-50 border-t border-slate-200 flex gap-4 text-[10px] font-bold uppercase tracking-wider overflow-x-auto">
            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-orange-500"/> 证候</span>
            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500"/> 症状</span>
            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-500"/> 草药</span>
            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-purple-500"/> 方剂</span>
            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-500"/> 西医疾病</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-4 mb-4 flex items-center gap-2">
            <Info size={16} className="text-blue-500" />
            节点属性详情
          </h3>
          {selectedNode ? (
            <div className="space-y-4">
              <div>
                <label className="text-xs text-slate-400">名称</label>
                <div className="font-bold text-slate-800 text-lg">{selectedNode.label}</div>
              </div>
              <div>
                <label className="text-xs text-slate-400">类别</label>
                <div className="mt-1">
                  <span className="px-2 py-1 rounded-md text-[10px] font-bold bg-slate-100 text-slate-600 uppercase">
                    {selectedNode.type}
                  </span>
                </div>
              </div>
              <div>
                <label className="text-xs text-slate-400">关联统计</label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div className="bg-blue-50 p-2 rounded text-center">
                    <div className="text-blue-600 font-bold">12</div>
                    <div className="text-[10px] text-blue-400 uppercase">入边</div>
                  </div>
                  <div className="bg-emerald-50 p-2 rounded text-center">
                    <div className="text-emerald-600 font-bold">8</div>
                    <div className="text-[10px] text-emerald-400 uppercase">出边</div>
                  </div>
                </div>
              </div>
              <button className="w-full mt-4 bg-slate-900 text-white py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors">
                编辑节点数据
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400 italic text-sm text-center">
              点击画布中的节点<br/>查看详细关联信息
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KnowledgeGraphView;