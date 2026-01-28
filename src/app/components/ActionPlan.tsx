import React from 'react';
import { Utensils, Dumbbell, Leaf, Pill, ChevronRight, Plus, Target } from 'lucide-react';

interface ActionItem {
  id: string;
  category: 'diet' | 'exercise' | 'lifestyle' | 'supplements';
  title: string;
  description: string;
  completed: boolean;
}

interface Goal {
  id: string;
  biomarker: string;
  initialValue: number;
  current: number;
  target: number;
  unit: string;
  deadline: string;
  progress: number;
  actionPlan: ActionItem[];
}

interface ActionPlanProps {
  setActiveTab?: (tab: string) => void;
}

export function ActionPlan({ setActiveTab }: ActionPlanProps) {
  // Mock existing goals (matching CoachingPage structure)
  const activeGoals: Goal[] = [
    {
      id: '1',
      biomarker: 'Glucose',
      initialValue: 118,
      current: 118,
      target: 95,
      unit: 'mg/dL',
      deadline: 'Mar 15, 2026',
      progress: 0,
      actionPlan: [
        { id: '1', category: 'diet', title: 'Reduce Sugar Intake', description: 'Limit added sugars to 25g/day', completed: true },
        { id: '2', category: 'exercise', title: 'Cardio 3x Weekly', description: '30 minutes of moderate cardio', completed: false },
        { id: '3', category: 'lifestyle', title: 'Monitor Blood Sugar', description: 'Check levels before meals', completed: false },
      ],
    },
    {
      id: '2',
      biomarker: 'LDL Cholesterol',
      initialValue: 115,
      current: 108,
      target: 95,
      unit: 'mg/dL',
      deadline: 'Apr 20, 2026',
      progress: 35,
      actionPlan: [
        { id: '1', category: 'diet', title: 'Reduce Saturated Fat', description: 'Limit to less than 7% of daily calories', completed: true },
        { id: '2', category: 'diet', title: 'Increase Omega-3', description: 'Fatty fish 2-3x per week', completed: false },
        { id: '3', category: 'exercise', title: 'Aerobic Activity', description: '150 minutes per week', completed: false },
      ],
    },
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'diet':
        return <Utensils className="w-4 h-4" />;
      case 'exercise':
        return <Dumbbell className="w-4 h-4" />;
      case 'lifestyle':
        return <Leaf className="w-4 h-4" />;
      case 'supplements':
        return <Pill className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getCategoryCounts = (actionPlan: ActionItem[]) => {
    const counts: { [key: string]: number } = {};
    actionPlan.forEach(action => {
      counts[action.category] = (counts[action.category] || 0) + 1;
    });
    return counts;
  };

  return (
    <div className="bg-white rounded-3xl px-3 py-6 shadow-sm">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-slate-900 font-medium">
          Health Goals
        </h3>
        <button 
          onClick={() => setActiveTab?.('coaching')}
          className="text-teal-500 text-sm font-medium hover:text-teal-600 transition-colors flex items-center gap-1"
        >
          <Plus size={14} />
          New Goal
        </button>
      </div>

      {/* Goals Display */}
      {activeGoals.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Target className="w-8 h-8 text-slate-400" />
          </div>
          <p className="text-slate-600 text-sm mb-4">No active goals yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {activeGoals.map((goal) => {
            const categoryCounts = getCategoryCounts(goal.actionPlan);
            const completedActions = goal.actionPlan.filter(a => a.completed).length;
            const totalActions = goal.actionPlan.length;
            
            return (
              <button
                key={goal.id}
                onClick={() => setActiveTab?.('coaching')}
                className="w-full border border-slate-200 rounded-2xl p-5 hover:border-[#59b559] hover:shadow-md transition-all text-left relative"
              >
                {/* Goal Header */}
                <div className="mb-6 space-y-2">
                  {/* Title */}
                  <div>
                    <h2 className="font-bold text-slate-900 text-lg mb-1">
                      Improve {goal.biomarker}
                    </h2>
                    <p className="text-sm text-slate-700">
                      Reach <span className="font-bold text-slate-900">{goal.target} {goal.unit}</span> by <span className="font-bold text-slate-900">{new Date(goal.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </p>
                  </div>
                </div>

                {/* Horizontal Progress Bar */}
                <div className="pb-5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-slate-700">{goal.initialValue}</span>
                    <div className="flex-1 h-2.5 bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          goal.progress === 0 
                            ? 'bg-slate-400' 
                            : Math.abs(goal.current - goal.target) < Math.abs(goal.initialValue - goal.target)
                              ? 'bg-[#59b559]'
                              : 'bg-red-500'
                        }`}
                        style={{ width: `${goal.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold text-slate-700">{goal.target}</span>
                  </div>
                </div>

                {/* Category Summary */}
                <div className="flex items-center gap-2 pt-2">
                  {(() => {
                    const categories = Object.entries(categoryCounts);
                    const firstCategory = categories[0];
                    const secondCategory = categories[1];
                    const remainingCount = categories.length - 2;
                    
                    return (
                      <>
                        {firstCategory && (
                          <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-50 rounded-lg whitespace-nowrap flex-shrink-0">
                            <div className="w-4 h-4 text-[#59b559] flex items-center justify-center flex-shrink-0">
                              {getCategoryIcon(firstCategory[0])}
                            </div>
                            <span className="text-sm font-medium text-slate-700">
                              {firstCategory[1]} {firstCategory[0]}
                            </span>
                          </div>
                        )}
                        {secondCategory && (
                          <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-50 rounded-lg whitespace-nowrap flex-shrink-0">
                            <div className="w-4 h-4 text-[#59b559] flex items-center justify-center flex-shrink-0">
                              {getCategoryIcon(secondCategory[0])}
                            </div>
                            <span className="text-sm font-medium text-slate-700">
                              {secondCategory[1]} {secondCategory[0]}
                            </span>
                          </div>
                        )}
                        {remainingCount > 0 && (
                          <div className="px-3 py-2 bg-slate-50 rounded-lg flex-shrink-0">
                            <span className="text-sm font-medium text-slate-700">
                              +{remainingCount}
                            </span>
                          </div>
                        )}
                      </>
                    );
                  })()}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}