import React from 'react';
import { TrendingUp, TrendingDown, Minus, ChevronRight } from 'lucide-react';

export function BiomarkersFocus() {
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
      <div className="mb-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-slate-900 font-medium">Biomarkers in Focus</h3>
            <p className="text-slate-500 text-sm mt-1">Key metrics from your latest test</p>
          </div>
          <button className="text-[#337e51] text-sm font-medium hover:text-[#2a6742] transition-colors flex items-center gap-1">
            View All
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {biomarkers.map((marker, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors"
          >
            <div className="flex items-center gap-4">
              {/* Status Indicator */}
              <div className={`w-2 h-2 rounded-full ${
                marker.status === 'optimal' ? 'bg-[#59b559]' :
                marker.status === 'borderline' ? 'bg-orange-500' :
                'bg-red-500'
              }`} />
              
              <div>
                <h4 className="text-slate-900 font-medium text-sm">{marker.name}</h4>
                <p className="text-slate-500 text-xs mt-0.5">{marker.value}</p>
              </div>
            </div>

            {/* Trend Badge */}
            <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${
              marker.trend === 'up' ? 'bg-red-50' :
              marker.trend === 'down' ? 'bg-green-50' :
              'bg-slate-100'
            }`}>
              {marker.trend === 'up' && <TrendingUp size={12} className="text-red-600" />}
              {marker.trend === 'down' && <TrendingDown size={12} className="text-green-600" />}
              {marker.trend === 'stable' && <Minus size={12} className="text-slate-500" />}
              <span className={`text-xs font-medium ${
                marker.trend === 'up' ? 'text-red-600' :
                marker.trend === 'down' ? 'text-green-600' :
                'text-slate-500'
              }`}>
                {marker.change}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}