import React from 'react';
import { ArrowLeft, Calendar, Ruler } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

interface BiomarkerTrendViewProps {
  biomarker: {
    name: string;
    category: string;
    value: string;
    range: string;
    status: 'optimal' | 'borderline' | 'high';
    trend: string;
    change: string;
  };
  onBack: () => void;
}

export function BiomarkerTrendView({ biomarker, onBack }: BiomarkerTrendViewProps) {
  const [selectedPeriod, setSelectedPeriod] = React.useState<string>('6M');

  // Mock historical data
  const generateHistoricalData = () => {
    const currentValue = parseFloat(biomarker.value.match(/[\d.]+/)?.[0] || '0');
    
    if (selectedPeriod === '6M') {
      return [
        { date: 'Aug', value: currentValue - 22, status: 'optimal' },
        { date: 'Sep', value: currentValue - 18, status: 'optimal' },
        { date: 'Oct', value: currentValue - 14, status: 'optimal' },
        { date: 'Nov', value: currentValue - 9, status: 'borderline' },
        { date: 'Dec', value: currentValue - 4, status: 'borderline' },
        { date: 'Jan', value: currentValue, status: biomarker.status },
      ];
    } else if (selectedPeriod === '1Y') {
      return [
        { date: 'Feb', value: currentValue - 28, status: 'optimal' },
        { date: 'Apr', value: currentValue - 24, status: 'optimal' },
        { date: 'Jun', value: currentValue - 20, status: 'optimal' },
        { date: 'Aug', value: currentValue - 16, status: 'optimal' },
        { date: 'Oct', value: currentValue - 10, status: 'borderline' },
        { date: 'Dec', value: currentValue - 5, status: 'borderline' },
        { date: 'Jan', value: currentValue, status: biomarker.status },
      ];
    } else if (selectedPeriod === '5Y') {
      return [
        { date: '2021', value: currentValue - 35, status: 'optimal' },
        { date: '2022', value: currentValue - 28, status: 'optimal' },
        { date: '2023', value: currentValue - 20, status: 'optimal' },
        { date: '2024', value: currentValue - 12, status: 'borderline' },
        { date: '2025', value: currentValue - 5, status: 'borderline' },
        { date: '2026', value: currentValue, status: biomarker.status },
      ];
    } else {
      // ALL
      return [
        { date: '2020', value: currentValue - 40, status: 'optimal' },
        { date: '2021', value: currentValue - 32, status: 'optimal' },
        { date: '2022', value: currentValue - 26, status: 'optimal' },
        { date: '2023', value: currentValue - 18, status: 'optimal' },
        { date: '2024', value: currentValue - 10, status: 'borderline' },
        { date: '2025', value: currentValue - 4, status: 'borderline' },
        { date: '2026', value: currentValue, status: biomarker.status },
      ];
    }
  };

  const chartData = generateHistoricalData();
  
  // Extract reference range values
  const referenceMax = parseFloat(biomarker.range.match(/[\d.]+/)?.[0] || '200');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal':
        return { bg: 'bg-[#59b559]/10', border: 'border-[#59b559]/20', text: 'text-[#59b559]' };
      case 'borderline':
        return { bg: 'bg-orange-500/10', border: 'border-orange-500/20', text: 'text-orange-600' };
      case 'high':
        return { bg: 'bg-red-500/10', border: 'border-red-500/20', text: 'text-red-600' };
      default:
        return { bg: 'bg-slate-100', border: 'border-slate-200', text: 'text-slate-600' };
    }
  };

  const statusColors = getStatusColor(biomarker.status);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const colors = getStatusColor(data.status);
      return (
        <div className="bg-white px-3 py-2 rounded-lg shadow-lg border border-slate-200">
          <p className="text-sm font-medium text-slate-900">{data.date}</p>
          <p className={`text-lg font-bold ${colors.text}`}>
            {data.value.toFixed(1)} {biomarker.value.replace(/[\d.\/]+\s*/, '')}
          </p>
          <p className={`text-xs capitalize ${colors.text}`}>{data.status}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-md mx-auto px-3 py-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              <ArrowLeft size={20} className="text-slate-700" />
            </button>
            <h2 className="text-lg font-semibold text-slate-900">Trend Analysis</h2>
            <div className="w-9"></div> {/* Spacer for alignment */}
          </div>
        </div>

        {/* Biomarker Info Card */}
        <div className="bg-white rounded-2xl px-5 py-4 shadow-sm mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-900 font-semibold text-[30px] leading-none">{biomarker.name}</h3>
            <div className={`px-4 py-2 rounded-full ${statusColors.bg} border ${statusColors.border} flex items-center justify-center shrink-0 mt-1`}>
              <span className={`${statusColors.text} text-sm font-semibold capitalize leading-none`}>
                {biomarker.status}
              </span>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-baseline gap-1.5">
              <span className={`text-5xl font-bold ${statusColors.text} leading-none`}>
                {biomarker.value.match(/[\d.\/]+/)?.[0]}
              </span>
              <span className="text-xl text-slate-400 font-medium">
                {biomarker.value.replace(/[\d.\/]+\s*/, '')}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 pt-3 border-t border-slate-200">
            <div className="flex items-center gap-1.5">
              <Calendar size={14} className="text-slate-500" />
              <span className="text-slate-900 font-semibold text-sm">Jan 12, 2026</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Ruler size={14} className="text-slate-500" />
              <span className="text-slate-900 font-semibold text-sm">{biomarker.range}</span>
            </div>
          </div>
        </div>

        {/* Time Period Filter Pills */}
        <div className="flex items-center mb-6 bg-slate-100 rounded-xl p-1 gap-1">
          <button 
            onClick={() => setSelectedPeriod('6M')}
            className={`flex-1 px-3 py-2.5 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors ${
              selectedPeriod === '6M' 
                ? 'bg-[#337e51] text-white' 
                : 'bg-transparent text-slate-600 hover:bg-slate-200'
            }`}
          >
            6M
          </button>
          <button 
            onClick={() => setSelectedPeriod('1Y')}
            className={`flex-1 px-3 py-2.5 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors ${
              selectedPeriod === '1Y' 
                ? 'bg-[#337e51] text-white' 
                : 'bg-transparent text-slate-600 hover:bg-slate-200'
            }`}
          >
            1Y
          </button>
          <button 
            onClick={() => setSelectedPeriod('5Y')}
            className={`flex-1 px-3 py-2.5 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors ${
              selectedPeriod === '5Y' 
                ? 'bg-[#337e51] text-white' 
                : 'bg-transparent text-slate-600 hover:bg-slate-200'
            }`}
          >
            5Y
          </button>
          <button 
            onClick={() => setSelectedPeriod('ALL')}
            className={`flex-1 px-3 py-2.5 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors ${
              selectedPeriod === 'ALL' 
                ? 'bg-[#337e51] text-white' 
                : 'bg-transparent text-slate-600 hover:bg-slate-200'
            }`}
          >
            ALL
          </button>
        </div>

        {/* Chart */}
        <div className="bg-white rounded-2xl px-4 py-5 shadow-sm mb-6">
          <h3 className="text-slate-900 font-medium mb-4">History</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  tickLine={false}
                  axisLine={{ stroke: '#e2e8f0' }}
                />
                <YAxis 
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  tickLine={false}
                  axisLine={{ stroke: '#e2e8f0' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine 
                  y={referenceMax} 
                  stroke="#ea580c" 
                  strokeDasharray="5 5" 
                  label={{ 
                    value: 'Upper limit', 
                    position: 'insideTopRight',
                    fill: '#ea580c',
                    fontSize: 11
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#59b559" 
                  strokeWidth={3}
                  dot={{ fill: '#59b559', r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Statistics Summary */}
        <div className="bg-white rounded-2xl px-4 py-4 shadow-sm mb-6">
          <div className="grid grid-cols-3 gap-4">
            {/* High */}
            <div className="text-center">
              <div className="text-xs text-slate-500 font-medium mb-1.5">High</div>
              <div className="text-2xl font-bold text-red-500">
                {Math.max(...chartData.map(d => d.value)).toFixed(1)}
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                {biomarker.value.replace(/[\d.\/]+\s*/, '')}
              </div>
            </div>
            
            {/* Average */}
            <div className="text-center border-x border-slate-200">
              <div className="text-xs text-slate-500 font-medium mb-1.5">Average</div>
              <div className="text-2xl font-bold text-slate-700">
                {(chartData.reduce((sum, d) => sum + d.value, 0) / chartData.length).toFixed(1)}
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                {biomarker.value.replace(/[\d.\/]+\s*/, '')}
              </div>
            </div>
            
            {/* Low */}
            <div className="text-center">
              <div className="text-xs text-slate-500 font-medium mb-1.5">Low</div>
              <div className="text-2xl font-bold text-[#59b559]">
                {Math.min(...chartData.map(d => d.value)).toFixed(1)}
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                {biomarker.value.replace(/[\d.\/]+\s*/, '')}
              </div>
            </div>
          </div>
        </div>

        {/* Insights */}
        <div className="bg-white rounded-2xl px-4 py-5 shadow-sm">
          <h3 className="text-slate-900 font-medium mb-3">Insights</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#59b559] mt-2"></div>
              <p className="text-slate-600 text-sm flex-1">
                Your {biomarker.name.toLowerCase()} levels have {biomarker.trend === 'up' ? 'increased' : biomarker.trend === 'down' ? 'decreased' : 'remained stable'} by {biomarker.change} over the selected period.
              </p>
            </div>
            
            {biomarker.status === 'high' && (
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2"></div>
                <p className="text-slate-600 text-sm flex-1">
                  Current levels are above the recommended range. Consider consulting with your healthcare provider.
                </p>
              </div>
            )}
            
            {biomarker.status === 'borderline' && (
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2"></div>
                <p className="text-slate-600 text-sm flex-1">
                  Your levels are in the borderline range. Lifestyle modifications may help improve your results.
                </p>
              </div>
            )}
            
            {biomarker.status === 'optimal' && (
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#59b559] mt-2"></div>
                <p className="text-slate-600 text-sm flex-1">
                  Your levels are within the optimal range. Keep up the good work!
                </p>
              </div>
            )}
            
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2"></div>
              <p className="text-slate-600 text-sm flex-1">
                Regular monitoring helps track your progress and identify trends early.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}