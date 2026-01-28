import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Plus } from 'lucide-react';

export function HealthScore() {
  const score = 74;
  const data = [
    { name: 'Elevated', value: 15, color: '#ef4444', count: 15 },
    { name: 'Borderline', value: 25, color: '#f59e0b', count: 25 },
    { name: 'Optimal', value: 60, color: '#10b981', count: 54 },
  ];

  const [selectedSegment, setSelectedSegment] = useState<number | null>(null);

  const handleSegmentClick = (index: number) => {
    setSelectedSegment(selectedSegment === index ? null : index);
  };

  const displayData = selectedSegment !== null 
    ? { value: data[selectedSegment].count, label: data[selectedSegment].name }
    : { value: score, label: 'Good' };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-slate-900">Health Score</h2>
          <p className="text-slate-500 text-sm mt-1">Based on latest results</p>
        </div>
      </div>

      {/* Circular Chart */}
      <div className="relative w-48 h-48 mx-auto my-6">
        <div className="w-full h-full">
          <ResponsiveContainer width="100%" height={192}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
                startAngle={90}
                endAngle={450}
                onClick={(_, index) => handleSegmentClick(index)}
                style={{ cursor: 'pointer' }}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color}
                    opacity={selectedSegment === null || selectedSegment === index ? 1 : 0.3}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {/* Center Score */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <div className="text-5xl font-semibold text-slate-900">{displayData.value}</div>
          <div className="text-sm text-slate-500 mt-1">{displayData.label}</div>
        </div>
      </div>

      {/* CTA Button */}
      <button className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white py-3.5 rounded-2xl flex items-center justify-center gap-2 hover:shadow-lg transition-shadow">
        <Plus size={20} />
        <span>Book New Test</span>
      </button>
    </div>
  );
}