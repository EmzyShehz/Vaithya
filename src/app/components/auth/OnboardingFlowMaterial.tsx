import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Box, Container, LinearProgress, Typography, Chip } from '@mui/material';
import { PersonalInfoMaterial } from './onboarding/PersonalInfoMaterial';
import { HealthInfo } from './onboarding/HealthInfo';
import { MedicalConditions } from './onboarding/MedicalConditions';
import { GoalsSelection } from './onboarding/GoalsSelection';
import { MaterialThemeWrapper } from '@/theme/MaterialThemeWrapper';
import vaithyaHorizontal from 'figma:asset/a2ace1e244d4363559689aa7ca71fc828c17259e.png';

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

export function OnboardingFlowMaterial({ onComplete }: OnboardingFlowProps) {
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
  const progress = (currentStep / totalSteps) * 100;

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
    <div style={{ width: '100%', height: '100%' }}>
      <MaterialThemeWrapper>
        <Box
          sx={{
            minHeight: '100vh',
            bgcolor: '#f8fafc',
            display: 'flex',
            flexDirection: 'column',
            py: 4,
            px: 3,
          }}
        >
          {/* Logo Header */}
          <Container maxWidth="md">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{ 
                display: 'flex',
                justifyContent: 'center',
                marginBottom: 32
              }}
            >
              <img src={vaithyaHorizontal} alt="Vaithya" style={{ height: 60, width: 'auto' }} />
            </motion.div>

            {/* Progress Bar */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Box sx={{ mb: 5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Chip
                    label={`Step ${currentStep} of ${totalSteps}`}
                    color="default"
                    sx={{ fontWeight: 600 }}
                  />
                  <Chip
                    label={`${Math.round(progress)}% Complete`}
                    color="primary"
                    sx={{ fontWeight: 600 }}
                  />
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={progress}
                  sx={{
                    height: 8,
                    borderRadius: 2,
                    bgcolor: 'white',
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 2,
                      background: 'linear-gradient(90deg, #59b559 0%, #4a9d4a 100%)',
                    },
                  }}
                />
              </Box>
            </motion.div>

            {/* Step Content */}
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <PersonalInfoMaterial
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
          </Container>
        </Box>
      </MaterialThemeWrapper>
    </div>
  );
}