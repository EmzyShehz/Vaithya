import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PersonalInfo } from './onboarding/PersonalInfo';
import { HealthInfo } from './onboarding/HealthInfo';
import { MedicalConditions } from './onboarding/MedicalConditions';
import { GoalsSelection } from './onboarding/GoalsSelection';

export interface UserData {
  name: string;
  dob: string;
  sex: string;
  weight: string;
  height: string;
  medicalConditions: string[];
  primaryGoals: string[];
}

interface OnboardingFlowProps {
  onComplete: (userData: UserData) => void;
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState<UserData>({
    name: '',
    dob: '',
    sex: '',
    weight: '',
    height: '',
    medicalConditions: [],
    primaryGoals: [],
  });

  const totalSteps = 4;

  const handleNext = (data: Partial<UserData>) => {
    const updatedData = { ...userData, ...data };
    setUserData(updatedData);
    
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(updatedData);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-slate-600">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm font-medium text-[#59b559]">
              {Math.round((currentStep / totalSteps) * 100)}% Complete
            </span>
          </div>
          <div className="h-2 bg-white rounded-full overflow-hidden shadow-inner">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-[#59b559] to-[#4a9d4a]"
            />
          </div>
        </motion.div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <PersonalInfo
              key="personal"
              data={userData}
              onNext={handleNext}
            />
          )}
          {currentStep === 2 && (
            <HealthInfo
              key="health"
              data={userData}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {currentStep === 3 && (
            <MedicalConditions
              key="medical"
              data={userData}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {currentStep === 4 && (
            <GoalsSelection
              key="goals"
              data={userData}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}