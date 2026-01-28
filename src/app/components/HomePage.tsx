import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Calendar } from 'lucide-react';
import { LatestResults } from './LatestResults';
import { BiomarkersFocus } from './BiomarkersFocus';
import { HealthGoals, Goal } from './HealthGoals';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

interface HomePageProps {
  setActiveTab: (tab: string) => void;
  goals: Goal[];
  onUpdateGoals: (goals: Goal[]) => void;
  onViewGoal: (goal: Goal) => void;
}

export function HomePage({ setActiveTab, goals, onUpdateGoals, onViewGoal }: HomePageProps) {
  // Data for the chart score
  const chartData = {
    score: 75.5,
    previousScore: 72.3 // Previous score for comparison
  };

  // Calculate the score difference
  const scoreDifference = chartData.score - chartData.previousScore;
  const formattedDifference = scoreDifference > 0 
    ? `+${scoreDifference.toFixed(1)}` 
    : scoreDifference.toFixed(1);

  // Chart.js configuration mapped from Graph.html
  const data = {
    labels: ['Red', 'Orange', 'Yellow', 'Green', 'Empty'],
    datasets: [{
      data: [15, 25, 25, 15, 20], // Arc segment lengths
      backgroundColor: [
        '#ff5f5f', // Red
        '#ffbd44', // Orange
        '#d4e157', // Yellow
        '#43a047', // Green
        '#eeeeee'  // Gray (Empty part)
      ],
      borderWidth: 6, // Creates the visual "gap" between colors
      borderColor: '#f8fafc', // Match the background color (slate-50)
      cutout: '85%', // Thickness of the ring
      borderRadius: 10, // Rounded edges for segments
    }]
  };

  // Chart configuration options from Graph.html
  const options = {
    rotation: 225, // Start point of the gauge
    circumference: 270, // Total sweep of the gauge
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false }
    },
    aspectRatio: 1.5,
    responsive: true,
    maintainAspectRatio: false
  };

  return (
    <>
      {/* Header Section */}
      <div className="bg-slate-50">
        <div className="max-w-md mx-auto px-3 py-6">
          {/* Circular Health Score Chart Container */}
          <div className="flex justify-center">
            <div className="relative w-[300px] h-[200px]">
              
              {/* Chart.js Implementation */}
              <Doughnut data={data} options={options} />
              
              {/* Central Score and Label Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
                <div className="flex items-center gap-2">
                  <div className="text-[56px] font-bold leading-[100%]" style={{ color: '#333333' }}>
                    {chartData.score}
                  </div>
                  
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[20px] font-medium" style={{ color: '#666666' }}>Very good</span>
                  <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ border: '1px solid #94A3B8' }}>
                    <span className="text-xs font-bold" style={{ color: '#94A3B8' }}>?</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Metadata Text */}
          <div className="text-center mt-6 space-y-2">
            <p className="text-slate-700 text-base font-medium text-[18px] font-bold">Last updated January 12, 2026</p>
            <p className="text-slate-600 leading-relaxed text-[15px] text-center">
              74 for 20 years old, 76 for men of similar age and gender.{' '}
              <span 
                className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold"
                style={{ 
                  backgroundColor: scoreDifference > 0 ? '#e8f5ee' : '#fee2e2',
                  color: scoreDifference > 0 ? '#337e51' : '#dc2626'
                }}
              >
                {formattedDifference}
              </span>{' '}
              from last test.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="max-w-md mx-auto px-3 py-6 space-y-6">
        <LatestResults onViewAll={() => setActiveTab('results')} />
        <BiomarkersFocus />
        <HealthGoals goals={goals} onUpdateGoals={onUpdateGoals} onViewGoal={onViewGoal} />
      </div>
    </>
  );
}