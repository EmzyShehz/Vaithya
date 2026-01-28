import React, { useState } from 'react';
import { Target, Plus, PlusCircle, ChevronRight, ChevronLeft, Utensils, Dumbbell, Leaf, Pill } from 'lucide-react';

interface Biomarker {
  id: string;
  name: string;
  current: number;
  unit: string;
  optimalRange: string;
  status: 'high' | 'borderline' | 'optimal';
}

interface ActionItem {
  id: string;
  category: 'diet' | 'exercise' | 'lifestyle' | 'supplements';
  title: string;
  description: string;
  completed: boolean;
}

export interface Goal {
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

interface HealthGoalsProps {
  onViewGoal?: (goal: Goal) => void;
  goals: Goal[];
  onUpdateGoals: (goals: Goal[]) => void;
}

export function HealthGoals({ onViewGoal, goals, onUpdateGoals }: HealthGoalsProps) {
  const [creatingGoal, setCreatingGoal] = useState(false);
  const [goalStep, setGoalStep] = useState(1);
  const [selectedBiomarker, setSelectedBiomarker] = useState<Biomarker | null>(null);
  const [targetValue, setTargetValue] = useState('');
  const [targetDuration, setTargetDuration] = useState<'1' | '3' | '6' | '9' | '12'>('3');

  // Mock data for biomarkers from test results that need attention
  const biomarkersNeedingAttention: Biomarker[] = [
    { id: '1', name: 'Glucose', current: 118, unit: 'mg/dL', optimalRange: '70-99', status: 'high' },
    { id: '2', name: 'LDL Cholesterol', current: 115, unit: 'mg/dL', optimalRange: '< 100', status: 'borderline' },
    { id: '3', name: 'Vitamin D', current: 28, unit: 'ng/mL', optimalRange: '30-100', status: 'borderline' },
    { id: '4', name: 'HbA1c', current: 6.2, unit: '%', optimalRange: '< 5.7', status: 'borderline' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'high':
        return { bg: 'bg-red-500/10', border: 'border-red-500/20', text: 'text-red-600' };
      case 'borderline':
        return { bg: 'bg-orange-500/10', border: 'border-orange-500/20', text: 'text-orange-600' };
      default:
        return { bg: 'bg-[#59b559]/10', border: 'border-[#59b559]/20', text: 'text-[#59b559]' };
    }
  };

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

  const generateActionPlan = (biomarker: Biomarker): ActionItem[] => {
    const plans: { [key: string]: ActionItem[] } = {
      'Glucose': [
        { id: '1', category: 'diet', title: 'Reduce Sugar Intake', description: 'Limit added sugars to 25g/day', completed: false },
        { id: '2', category: 'diet', title: 'Increase Fiber', description: 'Aim for 30g of fiber daily', completed: false },
        { id: '3', category: 'exercise', title: 'Cardio Exercise', description: '30 minutes moderate cardio, 3x weekly', completed: false },
        { id: '4', category: 'lifestyle', title: 'Monitor Blood Sugar', description: 'Check levels before meals daily', completed: false },
      ],
      'LDL Cholesterol': [
        { id: '1', category: 'diet', title: 'Reduce Saturated Fat', description: 'Limit to less than 7% of daily calories', completed: false },
        { id: '2', category: 'diet', title: 'Increase Omega-3', description: 'Fatty fish 2-3x per week', completed: false },
        { id: '3', category: 'exercise', title: 'Aerobic Activity', description: '150 minutes per week', completed: false },
        { id: '4', category: 'supplements', title: 'Consider Plant Sterols', description: '2g daily with meals', completed: false },
      ],
      'Vitamin D': [
        { id: '1', category: 'supplements', title: 'Vitamin D3', description: 'Take 2,000 IU daily', completed: false },
        { id: '2', category: 'lifestyle', title: 'Sun Exposure', description: '15-20 minutes daily, arms/legs exposed', completed: false },
        { id: '3', category: 'diet', title: 'Vitamin D Foods', description: 'Fatty fish, egg yolks, fortified foods', completed: false },
      ],
      'HbA1c': [
        { id: '1', category: 'diet', title: 'Carb Control', description: 'Monitor carbohydrate portions', completed: false },
        { id: '2', category: 'exercise', title: 'Strength Training', description: '2x weekly for insulin sensitivity', completed: false },
        { id: '3', category: 'lifestyle', title: 'Sleep Quality', description: '7-8 hours nightly', completed: false },
        { id: '4', category: 'lifestyle', title: 'Stress Management', description: 'Daily relaxation practice', completed: false },
      ],
    };
    return plans[biomarker.name] || [];
  };

  const handleCreateGoal = () => {
    if (!selectedBiomarker || !targetValue || !targetDuration) return;

    const newGoal: Goal = {
      id: Date.now().toString(),
      biomarker: selectedBiomarker.name,
      initialValue: selectedBiomarker.current,
      current: selectedBiomarker.current,
      target: parseFloat(targetValue),
      unit: selectedBiomarker.unit,
      deadline: new Date(new Date().setMonth(new Date().getMonth() + parseInt(targetDuration))).toISOString().split('T')[0],
      progress: 0,
      actionPlan: generateActionPlan(selectedBiomarker),
    };

    onUpdateGoals([...goals, newGoal]);
    setCreatingGoal(false);
    setGoalStep(1);
    setSelectedBiomarker(null);
    setTargetValue('');
    setTargetDuration('3');
  };

  const getCategoryCounts = (actionPlan: ActionItem[]) => {
    const counts: { [key: string]: number } = {};
    actionPlan.forEach(action => {
      counts[action.category] = (counts[action.category] || 0) + 1;
    });
    return counts;
  };

  const renderGoalCreationFlow = () => {
    if (goalStep === 1) {
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900">Select a Biomarker to Improve</h3>
            <button
              onClick={() => {
                setCreatingGoal(false);
                setGoalStep(1);
                setSelectedBiomarker(null);
              }}
              className="text-slate-500 hover:text-slate-700"
            >
              Cancel
            </button>
          </div>
          <p className="text-sm text-slate-600 mb-4">Based on your latest test results, these biomarkers need attention:</p>
          <div className="grid grid-cols-2 gap-3">
            {biomarkersNeedingAttention.map((biomarker) => {
              const colors = getStatusColor(biomarker.status);
              return (
                <button
                  key={biomarker.id}
                  onClick={() => {
                    setSelectedBiomarker(biomarker);
                    setGoalStep(2);
                  }}
                  className="border border-slate-200 rounded-2xl hover:border-[#337e51] hover:shadow-md transition-all text-left overflow-hidden flex flex-col"
                >
                  <div className="p-4 flex-1 flex flex-col">
                    <div className="space-y-3 flex-1">
                      {/* Biomarker Name */}
                      <h4 className="font-bold text-slate-900 text-base leading-tight min-h-[2.5rem] flex items-start">{biomarker.name}</h4>
                      
                      {/* Current Value - Emphasized */}
                      <div className="bg-slate-50 rounded-xl p-3 text-center">
                        <div className={`text-2xl font-bold ${colors.text} mb-0.5`}>
                          {biomarker.current}
                        </div>
                        <div className={`text-xs ${colors.text} opacity-70`}>
                          {biomarker.unit}
                        </div>
                      </div>
                      
                      {/* Optimal Range */}
                      <div className="space-y-1 text-center">
                        <div className="text-xs text-slate-400 uppercase tracking-wide">Target Range</div>
                        <div className="text-base font-bold text-slate-900">
                          {biomarker.optimalRange}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Status Bar - Full Width at Bottom */}
                  <div className={`${colors.bg} ${colors.border} border-t py-2`}>
                    <span className={`${colors.text} text-xs font-medium capitalize block text-center`}>{biomarker.status}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      );
    } else if (goalStep === 2 && selectedBiomarker) {
      return (
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => setGoalStep(1)}
              className="p-1 hover:bg-slate-100 rounded-full"
            >
              <ChevronLeft className="w-5 h-5 text-slate-600" />
            </button>
            <h3 className="text-lg font-semibold text-slate-900">Set Your Target</h3>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-600">Biomarker</span>
              <span className="font-semibold text-slate-900">{selectedBiomarker.name}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Current Value</span>
              <span className="font-semibold text-slate-900">{selectedBiomarker.current} {selectedBiomarker.unit}</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Target Value ({selectedBiomarker.unit})
            </label>
            <input
              type="number"
              value={targetValue}
              onChange={(e) => setTargetValue(e.target.value)}
              placeholder={`Enter target (Optimal: ${selectedBiomarker.optimalRange})`}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#59b559] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Target Duration
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setTargetDuration('1')}
                className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${
                  targetDuration === '1'
                    ? 'bg-[#337e51] text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                1M
              </button>
              <button
                onClick={() => setTargetDuration('3')}
                className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${
                  targetDuration === '3'
                    ? 'bg-[#337e51] text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                3M
              </button>
              <button
                onClick={() => setTargetDuration('6')}
                className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${
                  targetDuration === '6'
                    ? 'bg-[#337e51] text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                6M
              </button>
              <button
                onClick={() => setTargetDuration('9')}
                className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${
                  targetDuration === '9'
                    ? 'bg-[#337e51] text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                9M
              </button>
              <button
                onClick={() => setTargetDuration('12')}
                className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${
                  targetDuration === '12'
                    ? 'bg-[#337e51] text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                1Y
              </button>
            </div>
          </div>

          <button
            onClick={() => setGoalStep(3)}
            disabled={!targetValue || !targetDuration}
            className={`w-full py-3 rounded-full font-medium transition-colors ${
              targetValue && targetDuration
                ? 'bg-[#337e51] hover:bg-[#2a6742] text-white'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            Continue to Action Plan
          </button>
        </div>
      );
    } else if (goalStep === 3 && selectedBiomarker) {
      const actionPlan = generateActionPlan(selectedBiomarker);
      return (
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => setGoalStep(2)}
              className="p-1 hover:bg-slate-100 rounded-full"
            >
              <ChevronLeft className="w-5 h-5 text-slate-600" />
            </button>
            <h3 className="text-lg font-semibold text-slate-900">Your Action Plan</h3>
          </div>

          <div className="bg-gradient-to-br from-[#337e51] to-[#2a6742] rounded-2xl p-4 text-white mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5" />
              <span className="font-semibold">Goal Summary</span>
            </div>
            <p className="text-sm text-white/90">
              Improve {selectedBiomarker.name} from {selectedBiomarker.current} to {targetValue} {selectedBiomarker.unit} by {new Date(new Date().setMonth(new Date().getMonth() + parseInt(targetDuration))).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </p>
          </div>

          <p className="text-sm text-slate-600 mb-3">Follow these personalized recommendations to achieve your goal:</p>

          <div className="space-y-3 max-h-64 overflow-y-auto">
            {actionPlan.map((action) => (
              <div key={action.id} className="border border-slate-200 rounded-2xl p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#337e51]/10 text-[#337e51] inline-flex items-center justify-center flex-shrink-0">
                    {getCategoryIcon(action.category)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-slate-900 text-sm">{action.title}</h4>
                      <span className="text-xs text-slate-500 capitalize bg-slate-100 px-2 py-0.5 rounded-full">
                        {action.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600">{action.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2 pt-4">
            <button
              onClick={() => {
                setCreatingGoal(false);
                setGoalStep(1);
                setSelectedBiomarker(null);
                setTargetValue('');
                setTargetDuration('3');
              }}
              className="flex-1 py-3 border border-slate-200 rounded-full font-medium text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateGoal}
              className="flex-1 py-3 bg-[#337e51] hover:bg-[#2a6742] text-white rounded-full font-medium transition-colors"
            >
              Create Goal
            </button>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="bg-white rounded-3xl px-3 py-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-slate-900 font-medium">
            Health Goals
          </h3>
          <p className="text-slate-500 text-sm mt-1">Track progress towards better health</p>
        </div>
        <button
          onClick={() => setCreatingGoal(true)}
          className="p-2 text-teal-500 hover:text-teal-600 hover:bg-teal-50 rounded-full transition-colors"
          aria-label="Create new goal"
        >
          <PlusCircle size={20} className="text-[#337e51]" />
        </button>
      </div>

      {goals.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Target className="w-8 h-8 text-slate-400" />
          </div>
          <p className="text-slate-600 text-sm mb-4">No active goals yet</p>
          <button
            onClick={() => setCreatingGoal(true)}
            className="px-6 py-2.5 bg-[#337e51] hover:bg-[#2a6742] text-white rounded-full text-sm font-medium transition-colors"
          >
            Create Your First Goal
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {goals.map((goal) => {
            const categoryCounts = getCategoryCounts(goal.actionPlan);
            
            return (
              <button
                key={goal.id}
                onClick={() => onViewGoal?.(goal)}
                className="w-full border border-slate-200 rounded-2xl p-5 hover:border-[#337e51] hover:shadow-md transition-all text-left relative"
              >
                {/* Goal Header */}
                <div className="mb-6 space-y-2">
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
                            <div className="w-4 h-4 text-[#337e51] flex items-center justify-center flex-shrink-0">
                              {getCategoryIcon(firstCategory[0])}
                            </div>
                            <span className="text-sm font-medium text-slate-700">
                              {firstCategory[1]} {firstCategory[0]}
                            </span>
                          </div>
                        )}
                        {secondCategory && (
                          <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-50 rounded-lg whitespace-nowrap flex-shrink-0">
                            <div className="w-4 h-4 text-[#337e51] flex items-center justify-center flex-shrink-0">
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

      {/* Modal Overlay */}
      {creatingGoal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6">
              {renderGoalCreationFlow()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}