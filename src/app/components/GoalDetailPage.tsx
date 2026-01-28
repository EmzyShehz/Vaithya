import React, { useState } from 'react';
import { ChevronLeft, Clock, Trash2, Utensils, Dumbbell, Leaf, Pill } from 'lucide-react';

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

interface GoalDetailPageProps {
  goal: Goal;
  setActiveTab: (tab: string) => void;
  onUpdateValue: (goalId: string, newValue: number) => void;
  onDeleteGoal: (goalId: string) => void;
  onToggleAction: (goalId: string, actionId: string) => void;
}

export function GoalDetailPage({ goal, setActiveTab, onUpdateValue, onDeleteGoal, onToggleAction }: GoalDetailPageProps) {
  const [updatingValue, setUpdatingValue] = useState(false);
  const [newTestValue, setNewTestValue] = useState('');

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

  const handleUpdateValue = () => {
    const value = parseFloat(newTestValue);
    if (!isNaN(value)) {
      onUpdateValue(goal.id, value);
      setUpdatingValue(false);
      setNewTestValue('');
    }
  };

  const handleDelete = () => {
    onDeleteGoal(goal.id);
    setActiveTab('home');
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <div className="relative flex items-center justify-center mb-6">
          <button
            onClick={() => setActiveTab('home')}
            className="absolute left-0 p-2 hover:bg-white rounded-full transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-slate-700" />
          </button>
          <h2 className="text-lg font-semibold text-slate-900">Goal Details</h2>
          <button
            onClick={handleDelete}
            className="absolute right-0 p-2 hover:bg-red-50 rounded-full transition-colors text-red-600 hover:text-red-700"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>

        {/* Goal Summary Card */}
        <div className="bg-gradient-to-br from-[#59b559] to-[#4a9d4a] rounded-3xl p-4 shadow-sm text-white">
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="mb-1">
                <h2 className="text-lg font-semibold drop-shadow-sm font-bold">Improve {goal.biomarker}</h2>
              </div>
              <div className="flex items-center gap-2 text-xs drop-shadow-sm">
                <Clock className="w-3.5 h-3.5" />
                <span className="font-medium">Due {new Date(goal.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </div>
            </div>
            <div className="relative flex items-center justify-center flex-shrink-0">
              <svg width="80" height="80" viewBox="0 0 80 80" className="transform -rotate-90">
                <circle
                  cx="40"
                  cy="40"
                  r="32"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.3)"
                  strokeWidth="8"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="32"
                  fill="none"
                  stroke="white"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 32}`}
                  strokeDashoffset={`${2 * Math.PI * 32 * (1 - goal.progress / 100)}`}
                  className="transition-all duration-500"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold text-white drop-shadow-sm">{goal.progress}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Biomarker Tracking */}
        <div className="bg-white rounded-3xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-semibold text-slate-900">Biomarker Tracking</h3>
            {!updatingValue && (
              <button
                onClick={() => setUpdatingValue(true)}
                className="text-xs text-[#59b559] font-medium hover:text-[#4a9d4a] transition-colors"
              >
                Update from Test
              </button>
            )}
          </div>
          
          {updatingValue ? (
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-slate-600 mb-2">
                  Enter new test result ({goal.unit})
                </label>
                <input
                  type="number"
                  value={newTestValue}
                  onChange={(e) => setNewTestValue(e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#59b559] focus:border-transparent"
                  placeholder={`e.g., ${goal.current}`}
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setUpdatingValue(false);
                    setNewTestValue('');
                  }}
                  className="flex-1 py-2 border border-slate-200 rounded-full text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateValue}
                  className="flex-1 py-2 bg-[#59b559] hover:bg-[#4a9d4a] text-white rounded-full text-sm font-medium transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              <div className="p-2.5 bg-slate-50 rounded-xl text-center">
                <span className="block text-xs text-slate-600 mb-1">Starting</span>
                <span className="block text-sm font-semibold text-slate-900">{goal.initialValue}</span>
                <span className="block text-xs text-slate-500">{goal.unit}</span>
              </div>
              <div className="p-2.5 bg-blue-50 border border-blue-100 rounded-xl text-center">
                <span className="block text-xs text-blue-900 font-medium mb-1">Current</span>
                <span className="block text-sm font-bold text-blue-900">{goal.current}</span>
                <span className="block text-xs text-blue-700">{goal.unit}</span>
              </div>
              <div className="p-2.5 bg-[#59b559]/10 border border-[#59b559]/20 rounded-xl text-center">
                <span className="block text-xs text-[#59b559] font-medium mb-1">Target</span>
                <span className="block text-sm font-bold text-[#59b559]">{goal.target}</span>
                <span className="block text-xs text-[#59b559]/70">{goal.unit}</span>
              </div>
            </div>
          )}
        </div>

        {/* Action Plan */}
        <div className="bg-white rounded-3xl p-5 shadow-sm">
          <h3 className="text-base font-semibold text-slate-900 mb-4">Action Plan</h3>
          <div className="space-y-3">
            {goal.actionPlan.map((action) => (
              <div
                key={action.id}
                className="border-2 rounded-2xl p-4 bg-white border-slate-200"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#59b559]/10 text-[#59b559] inline-flex items-center justify-center flex-shrink-0">
                    <div className="w-4 h-4 flex items-center justify-center">
                      {getCategoryIcon(action.category)}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-medium text-slate-900">
                        {action.title}
                      </p>
                      <span className="text-xs text-slate-500 capitalize bg-slate-100 px-2 py-0.5 rounded-full">
                        {action.category}
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed text-slate-600">
                      {action.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
