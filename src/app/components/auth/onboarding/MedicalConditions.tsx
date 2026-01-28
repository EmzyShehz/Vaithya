import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, X, ArrowRight, ChevronLeft } from 'lucide-react';
import { UserData } from '../OnboardingFlow';

interface MedicalConditionsProps {
  data: UserData;
  onNext: (data: Partial<UserData>) => void;
  onBack: () => void;
}

const commonConditions = [
  'Diabetes',
  'Hypertension',
  'Heart Disease',
  'High Cholesterol',
  'Thyroid',
  'PCOD/PCOS',
  'Arthritis',
  'Asthma',
];

export function MedicalConditions({ data, onNext, onBack }: MedicalConditionsProps) {
  const [medicalConditions, setMedicalConditions] = useState<string[]>(data.medicalConditions);
  const [customCondition, setCustomCondition] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const toggleCondition = (condition: string) => {
    if (medicalConditions.includes(condition)) {
      setMedicalConditions(medicalConditions.filter(c => c !== condition));
    } else {
      setMedicalConditions([...medicalConditions, condition]);
    }
  };

  const addCustomCondition = () => {
    if (customCondition.trim() && !medicalConditions.includes(customCondition.trim())) {
      setMedicalConditions([...medicalConditions, customCondition.trim()]);
      setCustomCondition('');
      setShowCustomInput(false);
    }
  };

  const removeCondition = (condition: string) => {
    setMedicalConditions(medicalConditions.filter(c => c !== condition));
  };

  const handleSubmit = () => {
    onNext({ medicalConditions });
  };

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
          Medical conditions
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-lg text-slate-600"
        >
          Any existing conditions? (Optional)
        </motion.p>
      </div>

      {/* Form */}
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {/* Selected Conditions */}
          {medicalConditions.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {medicalConditions.map((condition) => (
                <motion.div
                  key={condition}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="bg-[#59b559] text-white px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2"
                >
                  {condition}
                  <button
                    onClick={() => removeCondition(condition)}
                    className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              ))}
            </div>
          )}

          {/* Common Conditions Grid */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            {commonConditions.map((condition) => (
              <button
                key={condition}
                onClick={() => toggleCondition(condition)}
                disabled={medicalConditions.includes(condition)}
                className={`py-2.5 px-3 rounded-lg text-sm font-medium transition-all ${
                  medicalConditions.includes(condition)
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {condition}
              </button>
            ))}
          </div>

          {/* Custom Condition Input */}
          {showCustomInput ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={customCondition}
                onChange={(e) => setCustomCondition(e.target.value)}
                placeholder="Enter condition"
                onKeyPress={(e) => e.key === 'Enter' && addCustomCondition()}
                className="flex-1 px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#59b559] focus:border-transparent text-sm"
              />
              <button
                onClick={addCustomCondition}
                className="px-4 py-2 bg-[#337e51] text-white rounded-lg hover:bg-[#2a6742] transition-colors"
              >
                Add
              </button>
              <button
                onClick={() => {
                  setShowCustomInput(false);
                  setCustomCondition('');
                }}
                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
            </motion.div>
          ) : (
            <button
              onClick={() => setShowCustomInput(true)}
              className="w-full py-2.5 border-2 border-dashed border-slate-300 rounded-lg text-slate-600 hover:border-[#59b559] hover:text-[#59b559] transition-all flex items-center justify-center gap-2 text-sm font-medium"
            >
              <Plus className="w-4 h-4" />
              Add other condition
            </button>
          )}
        </motion.div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-3 mt-8">
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
          className="flex-1 py-4 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all bg-[#337e51] hover:bg-[#2a6742] shadow-lg hover:shadow-xl"
        >
          Continue
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.div>
  );
}