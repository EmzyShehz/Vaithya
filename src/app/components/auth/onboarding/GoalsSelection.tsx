import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Target, 
  TrendingDown, 
  Heart, 
  Activity, 
  Battery, 
  Moon,
  Scale,
  Dumbbell,
  Apple,
  Brain,
  CheckCircle2,
  ChevronLeft
} from 'lucide-react';
import { UserData } from '../OnboardingFlow';

interface GoalsSelectionProps {
  data: UserData;
  onNext: (data: Partial<UserData>) => void;
  onBack: () => void;
}

const goalOptions = [
  {
    id: 'improve-biomarkers',
    icon: TrendingDown,
    title: 'Improve Biomarkers',
    description: 'Optimize blood test results',
    color: 'from-red-500 to-orange-500',
  },
  {
    id: 'heart-health',
    icon: Heart,
    title: 'Heart Health',
    description: 'Strengthen cardiovascular system',
    color: 'from-pink-500 to-rose-500',
  },
  {
    id: 'increase-energy',
    icon: Battery,
    title: 'Increase Energy',
    description: 'Boost daily vitality',
    color: 'from-yellow-500 to-amber-500',
  },
  {
    id: 'better-sleep',
    icon: Moon,
    title: 'Better Sleep',
    description: 'Improve sleep quality',
    color: 'from-indigo-500 to-purple-500',
  },
  {
    id: 'weight-management',
    icon: Scale,
    title: 'Weight Management',
    description: 'Achieve healthy weight',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'fitness',
    icon: Dumbbell,
    title: 'Build Fitness',
    description: 'Increase strength & endurance',
    color: 'from-orange-500 to-red-500',
  },
  {
    id: 'nutrition',
    icon: Apple,
    title: 'Better Nutrition',
    description: 'Optimize diet & eating habits',
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'mental-wellness',
    icon: Brain,
    title: 'Mental Wellness',
    description: 'Reduce stress & anxiety',
    color: 'from-purple-500 to-violet-500',
  },
];

export function GoalsSelection({ data, onNext, onBack }: GoalsSelectionProps) {
  const [selectedGoals, setSelectedGoals] = useState<string[]>(data.primaryGoals);

  const toggleGoal = (goalId: string) => {
    if (selectedGoals.includes(goalId)) {
      setSelectedGoals(selectedGoals.filter(g => g !== goalId));
    } else {
      setSelectedGoals([...selectedGoals, goalId]);
    }
  };

  const handleSubmit = () => {
    onNext({ primaryGoals: selectedGoals });
  };

  const isValid = selectedGoals.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="mb-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-extrabold text-slate-900 mb-3"
        >
          What are your goals?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-lg text-slate-600"
        >
          Select all that apply - we'll personalize your experience
        </motion.p>
      </div>

      {/* Goals List */}
      <div className="space-y-3 mb-6 max-h-[400px] overflow-y-auto pr-2">
        {goalOptions.map((goal, index) => {
          const isSelected = selectedGoals.includes(goal.id);
          const Icon = goal.icon;
          
          return (
            <motion.button
              key={goal.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              onClick={() => toggleGoal(goal.id)}
              className={`w-full p-4 rounded-xl text-left transition-all flex items-center gap-4 ${
                isSelected
                  ? 'bg-[#59b559] text-white shadow-md border-2 border-[#59b559]'
                  : 'bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Icon with gradient background */}
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                isSelected 
                  ? 'bg-white/20' 
                  : `bg-gradient-to-br ${goal.color}`
              }`}>
                <Icon className="w-6 h-6 text-white" />
              </div>

              {/* Text Content */}
              <div className="flex-1">
                <h3 className={`font-bold text-base mb-0.5 ${
                  isSelected ? 'text-white' : 'text-slate-900'
                }`}>
                  {goal.title}
                </h3>
                <p className={`text-sm ${
                  isSelected ? 'text-white/80' : 'text-slate-600'
                }`}>
                  {goal.description}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Selected Count */}
      {selectedGoals.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#59b559]/10 border border-[#59b559]/20 rounded-xl p-3 mb-6 text-center"
        >
          <p className="text-sm text-[#59b559] font-medium">
            {selectedGoals.length} {selectedGoals.length === 1 ? 'goal' : 'goals'} selected
          </p>
        </motion.div>
      )}

      {/* Navigation Buttons */}
      <div className="flex gap-3">
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onClick={onBack}
          className="px-6 py-4 rounded-xl font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all flex items-center gap-2"
        >
          <ChevronLeft className="w-5 h-5" />
          Back
        </motion.button>
        
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onClick={handleSubmit}
          disabled={!isValid}
          className={`flex-1 py-4 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all ${
            isValid
              ? 'bg-[#337e51] hover:bg-[#2a6742] shadow-lg hover:shadow-xl'
              : 'bg-slate-300 cursor-not-allowed'
          }`}
        >
          {isValid ? 'Complete Setup' : 'Select at least one goal'}
          {isValid && <CheckCircle2 className="w-5 h-5" />}
        </motion.button>
      </div>
    </motion.div>
  );
}