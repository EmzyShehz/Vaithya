import React, { useState } from 'react';
import { ArrowLeft, ChevronRight } from 'lucide-react';

interface TestHistoryPageProps {
  setActiveTab: (tab: string) => void;
  setSelectedTestName: (name: string) => void;
}

export function TestHistoryPage({ setActiveTab, setSelectedTestName }: TestHistoryPageProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('All');
  
  const testHistory = [
    {
      date: 'January 12, 2026',
      testType: 'Comprehensive Metabolic Panel',
      statusDots: ['high', 'borderline', 'optimal'],
      biomarkerCount: 38
    },
    {
      date: 'October 8, 2025',
      testType: 'Annual Physical Panel',
      statusDots: ['borderline', 'optimal'],
      biomarkerCount: 35
    },
    {
      date: 'July 22, 2025',
      testType: 'Follow-up Lipid Panel',
      statusDots: ['optimal'],
      biomarkerCount: 12
    },
    {
      date: 'April 15, 2025',
      testType: 'Thyroid Function Test',
      statusDots: ['borderline', 'optimal'],
      biomarkerCount: 8
    },
    {
      date: 'January 5, 2025',
      testType: 'Comprehensive Metabolic Panel',
      statusDots: ['high', 'borderline', 'optimal'],
      biomarkerCount: 38
    },
    {
      date: 'October 18, 2024',
      testType: 'Annual Physical Panel',
      statusDots: ['high', 'borderline', 'optimal'],
      biomarkerCount: 35
    },
  ];

  const getDotColor = (status: string) => {
    switch (status) {
      case 'high':
        return 'bg-red-500';
      case 'borderline':
        return 'bg-orange-500';
      case 'optimal':
        return 'bg-[#59b559]';
      default:
        return 'bg-slate-300';
    }
  };

  const filterTestsByPeriod = () => {
    const now = new Date('January 19, 2026'); // Current date from system prompt
    
    return testHistory.filter((test) => {
      const testDate = new Date(test.date);
      const monthsDiff = (now.getFullYear() - testDate.getFullYear()) * 12 + 
                        (now.getMonth() - testDate.getMonth());
      
      switch (selectedPeriod) {
        case '1M':
          return monthsDiff <= 1;
        case '3M':
          return monthsDiff <= 3;
        case '6M':
          return monthsDiff <= 6;
        case '1Y':
          return monthsDiff <= 12;
        case 'All':
        default:
          return true;
      }
    });
  };

  const filteredTests = filterTestsByPeriod();
  const periods = ['All', '1M', '3M', '6M', '1Y'];

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="border-b border-slate-200 px-4 py-4 sticky top-0 z-10 bg-slate-50">
          <div className="flex gap-1 bg-slate-100 rounded-xl p-1">
            {periods.map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`flex-1 px-2 py-2.5 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${
                  selectedPeriod === period
                    ? 'bg-[#337e51] text-white'
                    : 'bg-transparent text-slate-600 hover:bg-slate-200'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>

        {/* Test History List */}
        <div className="px-4 py-4">
          <div className="space-y-3">
            {filteredTests.length === 0 ? (
              <div className="bg-white rounded-2xl px-4 py-12 shadow-sm text-center">
                <p className="text-slate-500">No tests found in this period</p>
              </div>
            ) : (
              filteredTests.map((test, index) => (
                <button
                  key={index}
                  className="w-full bg-white rounded-2xl px-4 py-4 shadow-sm hover:shadow-md transition-all border border-slate-100 hover:border-[#337e51]"
                  onClick={() => {
                    // Navigate to results page when clicked
                    setActiveTab('results');
                    setSelectedTestName(test.testType);
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 text-left">
                      <h3 className="text-slate-900 font-medium text-base mb-1">
                        {test.date}
                      </h3>
                      <p className="text-slate-500 text-sm">
                        {test.testType}
                      </p>
                      <p className="text-slate-400 text-xs mt-1">
                        {test.biomarkerCount} biomarkers tested
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      {/* Status Dots */}
                      <div className="flex items-center gap-1.5">
                        {test.statusDots.map((status, dotIndex) => (
                          <div
                            key={dotIndex}
                            className={`w-2.5 h-2.5 rounded-full ${getDotColor(status)}`}
                          />
                        ))}
                      </div>
                      
                      {/* Arrow */}
                      <ChevronRight size={20} className="text-slate-400" />
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}