import React from 'react';
import { Calendar, ChevronRight, ArrowRight, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface LatestResultsProps {
  onViewAll?: () => void;
}

export function LatestResults({ onViewAll }: LatestResultsProps = {}) {
  const biomarkers = [
    { 
      name: 'Cholesterol', 
      value: '195 mg/dL', 
      status: 'optimal',
      trend: 'down',
      change: '-5%'
    },
    { 
      name: 'Blood Pressure', 
      value: '138/88 mmHg', 
      status: 'borderline',
      trend: 'up',
      change: '+3%'
    },
    { 
      name: 'Glucose', 
      value: '118 mg/dL', 
      status: 'high',
      trend: 'up',
      change: '+8%'
    },
    { 
      name: 'HDL', 
      value: '58 mg/dL', 
      status: 'optimal',
      trend: 'stable',
      change: '0%'
    },
  ];

  return (
    <div className="bg-white rounded-3xl px-3 py-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-slate-900 font-medium">Latest Results</h3>
          <div className="flex items-center gap-2 mt-1">
            <Calendar size={14} className="text-slate-400" />
            <p className="text-slate-500 text-sm">Jan 12, 2026</p>
          </div>
        </div>
        <button className="text-[#337e51] text-sm font-medium hover:text-[#2a6742] transition-colors flex items-center gap-1" onClick={onViewAll}>
          View All
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Subtle Divider */}
      <div className="border-t border-slate-200 my-4"></div>

      {/* Status Pills */}
      <div className="flex items-center gap-2">
        <div className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
          <span className="text-red-600 text-xs font-medium leading-none">3 High</span>
        </div>
        <div className="px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
          <span className="text-orange-600 text-xs font-medium leading-none">12 Borderline</span>
        </div>
        <div className="px-3 py-1 rounded-full bg-[#59b559]/10 border border-[#59b559]/20 flex items-center justify-center">
          <span className="text-[#59b559] text-xs font-medium leading-none">23 Optimal</span>
        </div>
      </div>
    </div>
  );
}