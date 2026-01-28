import React from 'react';
import { MessageCircle, Phone, Calendar, Video, Users, Award, Star, CheckCircle, ArrowRight, Target, TrendingUp, Apple, Dumbbell, Brain, X, Clock, Activity, Heart, Sparkles } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

interface CoachingPageProps {
  setActiveTab?: (tab: string) => void;
  onSelectPlanDetails?: (plan: any) => void;
}

export function CoachingPage({ setActiveTab, onSelectPlanDetails }: CoachingPageProps) {
  const [hasPlan, setHasPlan] = React.useState(false);
  const [selectedPlan, setSelectedPlan] = React.useState<any>(null);
  const [selectedDuration, setSelectedDuration] = React.useState('1');

  const healthPlans = [
    {
      id: 1,
      name: 'Metabolic Reset',
      subtitle: 'Balance Blood Sugar & Energy',
      pricing: {
        '1': 49,
        '3': 45,
        '6': 42,
        '12': 39
      },
      targetBiomarkers: ['Glucose', 'HbA1c', 'Insulin', 'Triglycerides'],
      description: 'Comprehensive program to optimize metabolic health through personalized nutrition and lifestyle interventions.',
      shortDescription: 'Powerful tools to optimize your metabolic health',
      features: [
        'Personalized meal plans & recipes',
        'Blood sugar tracking tools',
        'Exercise routines for insulin sensitivity',
        'Weekly progress check-ins',
        'Expert nutritionist support'
      ],
      icon: Activity,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      image: 'https://images.unsplash.com/photo-1712873069353-87c44687d345?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwZm9vZCUyMHZlZ2V0YWJsZXN8ZW58MXx8fHwxNzY5MzM1MTU1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 2,
      name: 'Heart Health Pro',
      subtitle: 'Optimize Cardiovascular Markers',
      pricing: {
        '1': 59,
        '3': 55,
        '6': 52,
        '12': 49
      },
      targetBiomarkers: ['LDL Cholesterol', 'HDL Cholesterol', 'Blood Pressure', 'CRP'],
      description: 'Evidence-based program to improve cardiovascular health and reduce inflammation through targeted interventions.',
      shortDescription: 'Powerful tools to optimize your heart health',
      features: [
        'Heart-healthy Mediterranean diet plan',
        'Cardio & strength training programs',
        'Stress management techniques',
        'Supplement recommendations',
        'Cardiologist-reviewed protocols'
      ],
      icon: Heart,
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
      image: 'https://images.unsplash.com/photo-1649134296132-56606326c566?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydW5uaW5nJTIwZXhlcmNpc2UlMjBmaXRuZXNzfGVufDF8fHx8MTc2OTI2NTIzNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 3,
      name: 'Complete Wellness',
      subtitle: 'Full-Spectrum Health Optimization',
      pricing: {
        '1': 79,
        '3': 75,
        '6': 72,
        '12': 69
      },
      targetBiomarkers: ['All Core Biomarkers', 'Hormones', 'Vitamins', 'Minerals'],
      description: 'Holistic program addressing all aspects of health with comprehensive diet, exercise, sleep, and stress protocols.',
      shortDescription: 'Powerful tools to optimize your complete wellness',
      features: [
        'All-inclusive meal & workout plans',
        'Sleep optimization strategies',
        'Mental health & mindfulness training',
        'Supplement & vitamin protocols',
        'Multi-specialist support team',
        'Quarterly biomarker review'
      ],
      icon: Sparkles,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      image: 'https://images.unsplash.com/photo-1635545999375-057ee4013deb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWxsbmVzcyUyMG1lZGl0YXRpb24lMjB5b2dhfGVufDF8fHx8MTc2OTMzMjAwMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    }
  ];

  const handleSelectPlan = (plan: any) => {
    setSelectedPlan(plan);
    setHasPlan(true);
  };

  const handleViewDetails = (plan: any) => {
    if (onSelectPlanDetails) {
      onSelectPlanDetails(plan);
    }
    if (setActiveTab) {
      setActiveTab('planDetails');
    }
  };

  const calculateSavings = (duration: '1' | '3' | '6' | '12') => {
    if (!selectedPlan || duration === '1') return 0;
    const monthlyPrice = selectedPlan.pricing['1'];
    const discountedPrice = selectedPlan.pricing[duration];
    return monthlyPrice - discountedPrice;
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {!hasPlan ? (
          <>
            {/* Health Plans */}
            <div className="space-y-5">
              {healthPlans.map((plan) => (
                <div key={plan.id} className="bg-white rounded-3xl overflow-hidden shadow-md border border-slate-200">
                  {/* Dark Header with Image */}
                  <div className="relative bg-[#337e51] h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-6 w-full">
                      <div className="mb-2">
                        <h3 className="font-bold text-white mb-2 text-[32px]">{plan.name}</h3>
                      </div>
                      <p className="text-white/90 text-sm mb-1">{plan.subtitle}</p>
                      <p className="text-white font-semibold">Starts at ${plan.pricing['1']} per month</p>
                    </div>
                  </div>

                  {/* White Content Section */}
                  <div className="p-6">
                    <h4 className="text-slate-900 font-semibold mb-4">{plan.shortDescription}</h4>
                    
                    <ul className="space-y-3 mb-5">
                      {plan.features.slice(0, 3).map((feature: string, index: number) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-slate-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <CheckCircle className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-slate-700 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <button
                      onClick={() => handleViewDetails(plan)}
                      className="w-full py-4 bg-[#337e51] hover:bg-[#2a6742] text-white rounded-2xl font-bold text-sm uppercase tracking-wide transition-all hover:shadow-lg"
                    >
                      Explore {plan.name}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Active Plan Card */}
            <div className="bg-gradient-to-br from-[#59b559] to-[#4a9d4a] rounded-3xl p-6 shadow-sm text-white">
              {/* Plan Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-white/30 rounded-full flex items-center justify-center ring-2 ring-white/50">
                  {selectedPlan?.icon && <selectedPlan.icon className="w-7 h-7" />}
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-0.5">{selectedPlan?.name}</h2>
                  <p className="text-sm text-white/80">{selectedPlan?.subtitle}</p>
                  <p className="text-xs text-white/90 mt-1">{selectedPlan?.price}</p>
                </div>
              </div>

              {/* Target Biomarkers */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 mb-4">
                <p className="text-xs text-white/80 mb-2">Targeting:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedPlan?.targetBiomarkers.map((biomarker: string, index: number) => (
                    <span key={index} className="bg-white/20 rounded-full px-2.5 py-1 text-xs font-medium">
                      {biomarker}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button className="bg-white text-[#59b559] py-3.5 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-white/90 transition-all hover:shadow-lg">
                  <Apple className="w-4 h-4" />
                  Meal Plans
                </button>
                <button className="bg-white/20 backdrop-blur-sm text-white py-3.5 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-white/30 transition-all border border-white/30">
                  <Dumbbell className="w-4 h-4" />
                  Workouts
                </button>
              </div>
            </div>

            {/* Upcoming Sessions */}
            <div className="bg-white rounded-3xl p-5 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Upcoming Sessions</h3>
              
              <div className="space-y-3">
                <div className="border border-slate-200 rounded-2xl p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-900 mb-1">Nutrition Review</h4>
                      <p className="text-sm text-slate-600">Dr. Sarah Johnson</p>
                    </div>
                    <div className="w-10 h-10 bg-[#59b559]/10 rounded-lg flex items-center justify-center">
                      <Video className="w-5 h-5 text-[#59b559]" />
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      <span>Jan 25, 2026</span>
                    </div>
                    <span className="text-slate-400">•</span>
                    <span>2:00 PM - 2:30 PM</span>
                  </div>
                  <button className="w-full mt-3 py-2 bg-[#337e51] hover:bg-[#2a6742] text-white rounded-full text-sm font-medium transition-colors">
                    Join Session
                  </button>
                </div>
              </div>
            </div>

            {/* Resources */}
            <div className="bg-white rounded-3xl p-5 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Recommended Resources</h3>
              
              <div className="space-y-3">
                <button className="w-full border border-slate-200 rounded-2xl p-4 hover:border-[#59b559] hover:bg-[#59b559]/5 transition-all text-left">
                  <h4 className="font-semibold text-slate-900 text-sm mb-1">Understanding Blood Sugar</h4>
                  <p className="text-xs text-slate-600">Learn how to manage glucose levels through diet and lifestyle</p>
                </button>
                
                <button className="w-full border border-slate-200 rounded-2xl p-4 hover:border-[#59b559] hover:bg-[#59b559]/5 transition-all text-left">
                  <h4 className="font-semibold text-slate-900 text-sm mb-1">Heart-Healthy Recipes</h4>
                  <p className="text-xs text-slate-600">Delicious meals that support cardiovascular health</p>
                </button>
                
                <button className="w-full border border-slate-200 rounded-2xl p-4 hover:border-[#59b559] hover:bg-[#59b559]/5 transition-all text-left">
                  <h4 className="font-semibold text-slate-900 text-sm mb-1">Exercise for Metabolic Health</h4>
                  <p className="text-xs text-slate-600">Workout routines tailored to improve your biomarkers</p>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}