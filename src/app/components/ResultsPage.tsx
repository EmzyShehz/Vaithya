import React from 'react';
import { Calendar, TrendingUp, TrendingDown, Minus, ArrowLeft, Share2 } from 'lucide-react';
import { BiomarkerTrendView } from './BiomarkerTrendView';

interface ResultsPageProps {
  setActiveTab: (tab: string) => void;
  testName?: string;
  testDate?: string;
}

export function ResultsPage({ setActiveTab, testName = 'Comprehensive Metabolic Panel', testDate = 'Jan 12, 2026' }: ResultsPageProps) {
  const [activeFilter, setActiveFilter] = React.useState<string>('all');
  const [activeCategory, setActiveCategory] = React.useState<string>('Blood');
  const [selectedBiomarker, setSelectedBiomarker] = React.useState<any>(null);

  const allBiomarkers = [
    { 
      name: 'Cholesterol', 
      category: 'Lipids',
      value: '195 mg/dL', 
      range: '< 200 mg/dL',
      status: 'optimal',
      trend: 'down',
      change: '-5%'
    },
    { 
      name: 'RBC', 
      category: 'Cardiovascular',
      value: '4.95 x10µL', 
      range: '< 120/80 mmHg',
      status: 'borderline',
      trend: 'up',
      change: '+3%'
    },
    { 
      name: 'Glucose', 
      category: 'Metabolic',
      value: '118 mg/dL', 
      range: '70-99 mg/dL',
      status: 'high',
      trend: 'up',
      change: '+8%'
    },
    { 
      name: 'HDL', 
      category: 'Lipids',
      value: '58 mg/dL', 
      range: '> 40 mg/dL',
      status: 'optimal',
      trend: 'stable',
      change: '0%'
    },
    { 
      name: 'LDL', 
      category: 'Lipids',
      value: '115 mg/dL', 
      range: '< 100 mg/dL',
      status: 'borderline',
      trend: 'down',
      change: '-2%'
    },
    { 
      name: 'Triglycerides', 
      category: 'Lipids',
      value: '142 mg/dL', 
      range: '< 150 mg/dL',
      status: 'optimal',
      trend: 'stable',
      change: '0%'
    },
    { 
      name: 'HbA1c', 
      category: 'Metabolic',
      value: '6.2%', 
      range: '< 5.7%',
      status: 'borderline',
      trend: 'up',
      change: '+0.3%'
    },
    { 
      name: 'Vitamin D', 
      category: 'Vitamins',
      value: '28 ng/mL', 
      range: '30-100 ng/mL',
      status: 'borderline',
      trend: 'down',
      change: '-4%'
    },
    { 
      name: 'Iron', 
      category: 'Minerals',
      value: '88 mcg/dL', 
      range: '60-170 mcg/dL',
      status: 'optimal',
      trend: 'stable',
      change: '0%'
    },
    { 
      name: 'TSH', 
      category: 'Thyroid',
      value: '2.8 mIU/L', 
      range: '0.4-4.0 mIU/L',
      status: 'optimal',
      trend: 'stable',
      change: '0%'
    },
  ];

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

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp size={16} />;
      case 'down':
        return <TrendingDown size={16} />;
      case 'stable':
        return <Minus size={16} />;
      default:
        return null;
    }
  };

  // Calculate counts
  const highCount = allBiomarkers.filter(b => b.status === 'high').length;
  const borderlineCount = allBiomarkers.filter(b => b.status === 'borderline').length;
  const optimalCount = allBiomarkers.filter(b => b.status === 'optimal').length;

  // Filter biomarkers based on active filter
  const filteredBiomarkers = activeFilter === 'all' 
    ? allBiomarkers 
    : allBiomarkers.filter(b => b.status === activeFilter);

  // If a biomarker is selected, show the trend view
  if (selectedBiomarker) {
    return (
      <BiomarkerTrendView 
        biomarker={selectedBiomarker} 
        onBack={() => setSelectedBiomarker(null)} 
      />
    );
  }

  return (
    <div className="bg-slate-50">
      <div className="max-w-md mx-auto px-3 py-6">
        {/* Page Header */}
        <div className="mb-6">
          {/* Top row: Back arrow, Title, Share */}
          <div className="flex items-center justify-between mb-4">
            <button 
              onClick={() => setActiveTab('history')}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              <ArrowLeft size={20} className="text-slate-700" />
            </button>
            <h2 className="text-lg font-semibold text-slate-900">My Results</h2>
            <button 
              onClick={() => {
                // Share functionality
                if (navigator.share) {
                  navigator.share({
                    title: 'Blood Test Results',
                    text: 'Check out my latest blood test results from ErythroLabs',
                  }).catch(() => {});
                }
              }}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              <Share2 size={20} className="text-slate-700" />
            </button>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center mb-4 bg-slate-100 rounded-xl p-1 gap-1 overflow-x-auto">
            <button 
              onClick={() => setActiveCategory('Blood')}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                activeCategory === 'Blood' 
                  ? 'bg-[#337e51] text-white' 
                  : 'bg-transparent text-slate-600 hover:bg-slate-200'
              }`}
            >
              Blood
            </button>
            <button 
              onClick={() => setActiveCategory('Activity')}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                activeCategory === 'Activity' 
                  ? 'bg-[#337e51] text-white' 
                  : 'bg-transparent text-slate-600 hover:bg-slate-200'
              }`}
            >
              Activity
            </button>
            <button 
              onClick={() => setActiveCategory('DNA')}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                activeCategory === 'DNA' 
                  ? 'bg-[#337e51] text-white' 
                  : 'bg-transparent text-slate-600 hover:bg-slate-200'
              }`}
            >
              DNA
            </button>
            <button 
              onClick={() => setActiveCategory('InnerAge')}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                activeCategory === 'InnerAge' 
                  ? 'bg-[#337e51] text-white' 
                  : 'bg-transparent text-slate-600 hover:bg-slate-200'
              }`}
            >
              InnerAge
            </button>
          </div>

          {/* Bottom row: Latest date and Time to re-test */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-slate-400" />
              <p className="text-slate-600 text-sm">{testDate}</p>
            </div>
            <div className="px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200">
              <p className="text-amber-700 text-xs font-medium">⏱ Time to re-test</p>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="bg-white rounded-3xl px-4 py-5 shadow-sm mb-6">
          <h3 className="text-slate-900 font-medium mb-4">Summary</h3>
          <div className="flex items-center gap-2 flex-wrap">
            <button 
              onClick={() => setActiveFilter(activeFilter === 'high' ? 'all' : 'high')}
              className={`px-3 py-1.5 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                activeFilter === 'high' 
                  ? 'bg-red-600 border border-red-600' 
                  : 'bg-red-500/10 border border-red-500/20 hover:bg-red-500/20'
              }`}
            >
              <span className={`text-sm font-medium leading-none ${
                activeFilter === 'high' ? 'text-white' : 'text-red-600'
              }`}>
                {highCount} High
              </span>
            </button>
            <button 
              onClick={() => setActiveFilter(activeFilter === 'borderline' ? 'all' : 'borderline')}
              className={`px-3 py-1.5 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                activeFilter === 'borderline' 
                  ? 'bg-orange-600 border border-orange-600' 
                  : 'bg-orange-500/10 border border-orange-500/20 hover:bg-orange-500/20'
              }`}
            >
              <span className={`text-sm font-medium leading-none ${
                activeFilter === 'borderline' ? 'text-white' : 'text-orange-600'
              }`}>
                {borderlineCount} Borderline
              </span>
            </button>
            <button 
              onClick={() => setActiveFilter(activeFilter === 'optimal' ? 'all' : 'optimal')}
              className={`px-3 py-1.5 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                activeFilter === 'optimal' 
                  ? 'bg-[#59b559] border border-[#59b559]' 
                  : 'bg-[#59b559]/10 border border-[#59b559]/20 hover:bg-[#59b559]/20'
              }`}
            >
              <span className={`text-sm font-medium leading-none ${
                activeFilter === 'optimal' ? 'text-white' : 'text-[#59b559]'
              }`}>
                {optimalCount} Optimal
              </span>
            </button>
          </div>
        </div>

        {/* All Biomarkers List */}
        <div className="space-y-3">
          {filteredBiomarkers.map((biomarker, index) => {
            const statusColors = getStatusColor(biomarker.status);
            return (
              <div 
                key={index} 
                className="bg-white rounded-2xl px-4 py-5 shadow-sm border-l-4 cursor-pointer hover:shadow-md transition-shadow"
                style={{
                  borderLeftColor: biomarker.status === 'optimal' ? '#59b559' : 
                                   biomarker.status === 'borderline' ? '#ea580c' : '#dc2626'
                }}
                onClick={() => setSelectedBiomarker(biomarker)}
              >
                {/* Top Row: Name and Value */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h4 className="text-slate-900 font-medium text-base mb-0.5 text-[18px]">{biomarker.name}</h4>
                    <p className="text-slate-500 text-sm">{biomarker.category}</p>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2">
                    <p className={`text-3xl font-bold ${statusColors.text}`}>
                      {biomarker.value.match(/[\d.\/]+/)?.[0]}
                      <span className="text-lg ml-1">{biomarker.value.replace(/[\d.\/]+\s*/, '')}</span>
                    </p>
                    <div className={`px-2.5 py-1 rounded-md ${statusColors.bg} border ${statusColors.border} flex items-center justify-center`}>
                      <span className={`${statusColors.text} text-xs font-medium leading-none capitalize`}>
                        {biomarker.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Range Bar */}
                <div className="mb-3">
                  <div className="relative h-2 bg-gradient-to-r from-[#43a047] via-[#ffbd44] to-[#ff5f5f] rounded-full">
                    {/* Indicator dot - positioned based on status */}
                    <div 
                      className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full border-2 border-slate-400"
                      style={{ 
                        left: biomarker.status === 'optimal' ? '25%' : 
                              biomarker.status === 'borderline' ? '60%' : '85%' 
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-slate-500">0</span>
                    <span className="text-xs text-slate-400">Reference range</span>
                    <span className="text-xs text-slate-500">190</span>
                  </div>
                </div>

                {/* Bottom Row: Trend and Tags */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                  <div className={`flex items-center gap-1 ${statusColors.text}`}>
                    {getTrendIcon(biomarker.trend)}
                    <span className="text-sm font-medium capitalize">{biomarker.trend}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">Heart health</span>
                    <span className="text-xs text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">{biomarker.category}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}