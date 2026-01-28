import React, { useState } from 'react';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { ResultsPage } from './components/ResultsPage';
import { TestHistoryPage } from './components/TestHistoryPage';
import { LearnPage } from './components/LearnPage';
import { CoachingPage } from './components/CoachingPage';
import { GoalDetailPage } from './components/GoalDetailPage';
import { PlanDetailsPage } from './components/PlanDetailsPage';
import { ProfilePage } from './components/ProfilePage';
import { NotificationsPage } from './components/NotificationsPage';
import { BottomNav } from './components/BottomNav';
import { SplashScreen } from './components/auth/SplashScreen';
import { PhoneAuth } from './components/auth/PhoneAuth';
import { AuthContainerMaterial } from './components/auth/AuthContainerMaterial';
import { OnboardingFlowMaterial, UserData } from './components/auth/OnboardingFlowMaterial';
import type { Goal } from './components/HealthGoals';

type AuthState = 'splash' | 'auth' | 'onboarding' | 'authenticated';

export default function App() {
  const [authState, setAuthState] = useState<AuthState>('splash');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [activeTab, setActiveTab] = useState('home');
  const [selectedTestName, setSelectedTestName] = useState('Comprehensive Metabolic Panel');
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  
  // Manage goals state at App level
  const [goals, setGoals] = useState<Goal[]>([
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
  ]);

  const handleViewGoal = (goal: Goal) => {
    setSelectedGoal(goal);
    setActiveTab('goalDetail');
  };

  const calculateProgress = (initialValue: number, currentValue: number, targetValue: number): number => {
    const totalChange = Math.abs(initialValue - targetValue);
    const currentChange = Math.abs(initialValue - currentValue);
    
    if (totalChange === 0) return 0;
    
    const progress = Math.round((currentChange / totalChange) * 100);
    return Math.min(Math.max(progress, 0), 100);
  };

  const handleUpdateValue = (goalId: string, newValue: number) => {
    setGoals(goals.map(goal => {
      if (goal.id === goalId) {
        const newProgress = calculateProgress(goal.initialValue, newValue, goal.target);
        const updatedGoal = { ...goal, current: newValue, progress: newProgress };
        if (selectedGoal && selectedGoal.id === goalId) {
          setSelectedGoal(updatedGoal);
        }
        return updatedGoal;
      }
      return goal;
    }));
  };

  const handleDeleteGoal = (goalId: string) => {
    setGoals(goals.filter(goal => goal.id !== goalId));
  };

  const handleToggleAction = (goalId: string, actionId: string) => {
    setGoals(goals.map(goal => {
      if (goal.id === goalId) {
        const updatedPlan = goal.actionPlan.map(action =>
          action.id === actionId ? { ...action, completed: !action.completed } : action
        );
        const updatedGoal = { ...goal, actionPlan: updatedPlan };
        if (selectedGoal && selectedGoal.id === goalId) {
          setSelectedGoal(updatedGoal);
        }
        return updatedGoal;
      }
      return goal;
    }));
  };

  const handleSplashComplete = () => {
    setAuthState('auth');
  };

  const handleAuthenticated = (isNewUser: boolean) => {
    if (isNewUser) {
      setAuthState('onboarding');
    } else {
      setAuthState('authenticated');
    }
  };

  const handleOnboardingComplete = (data: UserData) => {
    setUserData(data);
    setAuthState('authenticated');
  };

  // Render authentication or main app
  if (authState === 'splash' || authState === 'auth') {
    return <AuthContainerMaterial onAuthenticated={handleAuthenticated} />;
  }

  if (authState === 'onboarding') {
    return <OnboardingFlowMaterial onComplete={handleOnboardingComplete} />;
  }

  const renderPage = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage setActiveTab={setActiveTab} goals={goals} onUpdateGoals={setGoals} onViewGoal={handleViewGoal} />;
      case 'results':
        return <ResultsPage setActiveTab={setActiveTab} testName={selectedTestName} />;
      case 'history':
        return <TestHistoryPage setActiveTab={setActiveTab} setSelectedTestName={setSelectedTestName} />;
      case 'knowledge':
        return <LearnPage />;
      case 'coaching':
        return <CoachingPage setActiveTab={setActiveTab} onSelectPlanDetails={setSelectedPlan} />;
      case 'goalDetail':
        return selectedGoal ? (
          <GoalDetailPage 
            goal={selectedGoal}
            setActiveTab={setActiveTab}
            onUpdateValue={handleUpdateValue}
            onDeleteGoal={handleDeleteGoal}
            onToggleAction={handleToggleAction}
          />
        ) : null;
      case 'planDetails':
        return selectedPlan ? (
          <PlanDetailsPage 
            plan={selectedPlan}
            setActiveTab={setActiveTab}
            onSelectPlan={setSelectedPlan}
          />
        ) : null;
      case 'profile':
        return <ProfilePage setActiveTab={setActiveTab} userName={userData?.name || 'John Doe'} userInitial={(userData?.name || 'John Doe').charAt(0).toUpperCase()} onLogout={() => setAuthState('splash')} />;
      case 'notifications':
        return <NotificationsPage setActiveTab={setActiveTab} />;
      default:
        return <HomePage setActiveTab={setActiveTab} goals={goals} onUpdateGoals={setGoals} onViewGoal={handleViewGoal} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {authState === 'authenticated' && <Header setActiveTab={setActiveTab} />}
      {renderPage()}
      {authState === 'authenticated' && <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />}
    </div>
  );
}