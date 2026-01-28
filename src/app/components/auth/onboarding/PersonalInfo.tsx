import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, Calendar, Users, ArrowRight } from 'lucide-react';
import { UserData } from '../OnboardingFlow';

interface PersonalInfoProps {
  data: UserData;
  onNext: (data: Partial<UserData>) => void;
}

export function PersonalInfo({ data, onNext }: PersonalInfoProps) {
  const [name, setName] = useState(data.name);
  const [dob, setDob] = useState(data.dob);
  const [sex, setSex] = useState(data.sex);

  const isValid = name.trim() && dob && sex;

  const handleSubmit = () => {
    if (isValid) {
      onNext({ name, dob, sex });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-3xl shadow-xl p-8"
    >
      {/* Header */}
      <div className="mb-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-extrabold text-slate-900 mb-3"
        >
          Tell us about yourself
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-lg text-slate-600"
        >
          Let's start with some basic information
        </motion.p>
      </div>

      {/* Form */}
      <div className="space-y-6">
        {/* Name Input */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#59b559] focus:border-transparent"
          />
        </motion.div>

        {/* Date of Birth */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Date of Birth
          </label>
          <div className="relative">
            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
              className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#59b559] focus:border-transparent"
            />
          </div>
        </motion.div>

        {/* Sex Selection */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <label className="block text-sm font-semibold text-slate-700 mb-3">
            Sex
          </label>
          <div className="grid grid-cols-3 gap-3">
            {['Male', 'Female', 'Other'].map((option) => (
              <button
                key={option}
                onClick={() => setSex(option)}
                className={`py-3 px-4 rounded-xl font-medium transition-all ${
                  sex === option
                    ? 'bg-[#59b559] text-white shadow-lg scale-105'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Continue Button */}
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        onClick={handleSubmit}
        disabled={!isValid}
        className={`w-full mt-8 py-4 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all ${
          isValid
            ? 'bg-[#337e51] hover:bg-[#2a6742] shadow-lg hover:shadow-xl'
            : 'bg-slate-300 cursor-not-allowed'
        }`}
      >
        Continue
        <ArrowRight className="w-5 h-5" />
      </motion.button>
    </motion.div>
  );
}