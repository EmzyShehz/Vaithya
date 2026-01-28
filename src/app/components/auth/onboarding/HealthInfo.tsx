import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Weight, Ruler, ArrowRight, ChevronLeft } from 'lucide-react';
import { UserData } from '../OnboardingFlow';

interface HealthInfoProps {
  data: UserData;
  onNext: (data: Partial<UserData>) => void;
  onBack: () => void;
}

export function HealthInfo({ data, onNext, onBack }: HealthInfoProps) {
  const [weight, setWeight] = useState(data.weight);
  const [height, setHeight] = useState(data.height);
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>('kg');
  const [heightUnit, setHeightUnit] = useState<'cm' | 'ft'>('cm');
  const [heightFeet, setHeightFeet] = useState('');
  const [heightInches, setHeightInches] = useState('');

  const isValid = weight && (heightUnit === 'cm' ? height : (heightFeet && heightInches));

  // Convert weight to kg for BMI calculation
  const getWeightInKg = () => {
    const weightNum = parseFloat(weight);
    if (weightUnit === 'lbs') {
      return weightNum * 0.453592; // lbs to kg
    }
    return weightNum;
  };

  // Convert height to cm for BMI calculation
  const getHeightInCm = () => {
    if (heightUnit === 'ft') {
      const feet = parseFloat(heightFeet) || 0;
      const inches = parseFloat(heightInches) || 0;
      return (feet * 12 + inches) * 2.54; // feet + inches to cm
    }
    return parseFloat(height);
  };

  // Calculate BMI
  const calculateBMI = () => {
    const weightKg = getWeightInKg();
    const heightCm = getHeightInCm();
    if (weightKg && heightCm) {
      return weightKg / Math.pow(heightCm / 100, 2);
    }
    return 0;
  };

  const handleSubmit = () => {
    if (isValid) {
      // Store height in cm for consistency
      const heightInCm = getHeightInCm().toString();
      const weightInKg = getWeightInKg().toString();
      onNext({ weight: weightInKg, height: heightInCm });
    }
  };

  const bmi = calculateBMI();
  const heightCm = getHeightInCm();

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
          Your health metrics
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-lg text-slate-600"
        >
          Help us personalize your experience
        </motion.p>
      </div>

      {/* Form */}
      <div className="space-y-4">
        {/* Weight Row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-slate-50 rounded-xl p-4 border border-slate-200"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Weight className="w-5 h-5 text-[#59b559]" />
              <span className="text-sm font-semibold text-slate-700">Weight</span>
            </div>
            <div className="flex gap-1 bg-white rounded-lg p-1 border border-slate-200">
              <button
                onClick={() => setWeightUnit('kg')}
                className={`px-3 py-1 rounded text-xs font-medium transition-all ${
                  weightUnit === 'kg'
                    ? 'bg-[#59b559] text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                KG
              </button>
              <button
                onClick={() => setWeightUnit('lbs')}
                className={`px-3 py-1 rounded text-xs font-medium transition-all ${
                  weightUnit === 'lbs'
                    ? 'bg-[#59b559] text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                LBS
              </button>
            </div>
          </div>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder={weightUnit === 'kg' ? '70' : '154'}
            className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#59b559] focus:border-transparent text-lg"
          />
        </motion.div>

        {/* Height Row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-slate-50 rounded-xl p-4 border border-slate-200"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Ruler className="w-5 h-5 text-[#59b559]" />
              <span className="text-sm font-semibold text-slate-700">Height</span>
            </div>
            <div className="flex gap-1 bg-white rounded-lg p-1 border border-slate-200">
              <button
                onClick={() => setHeightUnit('cm')}
                className={`px-3 py-1 rounded text-xs font-medium transition-all ${
                  heightUnit === 'cm'
                    ? 'bg-[#59b559] text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                CM
              </button>
              <button
                onClick={() => setHeightUnit('ft')}
                className={`px-3 py-1 rounded text-xs font-medium transition-all ${
                  heightUnit === 'ft'
                    ? 'bg-[#59b559] text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                FT
              </button>
            </div>
          </div>
          {heightUnit === 'cm' ? (
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="170"
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#59b559] focus:border-transparent text-lg"
            />
          ) : (
            <div className="flex gap-2">
              <div className="flex-1">
                <input
                  type="number"
                  value={heightFeet}
                  onChange={(e) => setHeightFeet(e.target.value)}
                  placeholder="5"
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#59b559] focus:border-transparent text-lg"
                />
                <span className="block text-xs text-slate-500 mt-1 text-center">feet</span>
              </div>
              <div className="flex-1">
                <input
                  type="number"
                  value={heightInches}
                  onChange={(e) => setHeightInches(e.target.value)}
                  placeholder="10"
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#59b559] focus:border-transparent text-lg"
                />
                <span className="block text-xs text-slate-500 mt-1 text-center">inches</span>
              </div>
            </div>
          )}
        </motion.div>

        {/* BMI Display */}
        {weight && heightCm && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`rounded-xl p-4 border ${
              (() => {
                if (bmi < 18.5) return 'bg-gradient-to-r from-orange-100 to-orange-50 border-orange-300';
                if (bmi >= 18.5 && bmi < 25) return 'bg-gradient-to-r from-[#59b559]/10 to-[#4a9d4a]/10 border-[#59b559]/20';
                return 'bg-gradient-to-r from-red-100 to-red-50 border-red-300';
              })()
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-700 font-medium">Your BMI</span>
              <span className={`text-2xl font-bold ${
                (() => {
                  if (bmi < 18.5) return 'text-orange-600';
                  if (bmi >= 18.5 && bmi < 25) return 'text-[#59b559]';
                  return 'text-red-600';
                })()
              }`}>
                {bmi.toFixed(1)}
              </span>
            </div>
            <div className="text-center mt-2 text-xs text-slate-600">
              Optimal BMI for {heightCm}cm: {(18.5 * Math.pow(heightCm / 100, 2)).toFixed(1)}kg - {(24.9 * Math.pow(heightCm / 100, 2)).toFixed(1)}kg
            </div>
          </motion.div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-3 mt-8">
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          onClick={onBack}
          className="px-6 py-4 rounded-xl font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all flex items-center gap-2"
        >
          <ChevronLeft className="w-5 h-5" />
          Back
        </motion.button>
        
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          onClick={handleSubmit}
          disabled={!isValid}
          className={`flex-1 py-4 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all ${
            isValid
              ? 'bg-[#337e51] hover:bg-[#2a6742] shadow-lg hover:shadow-xl'
              : 'bg-slate-300 cursor-not-allowed'
          }`}
        >
          Continue
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.div>
  );
}