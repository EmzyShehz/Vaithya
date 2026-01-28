import React from 'react';
import { ArrowLeft, CheckCircle, Target, TrendingUp, Brain, Clock, ChevronRight, Award, Users, Activity } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

interface PlanDetailsPageProps {
  plan: any;
  setActiveTab: (tab: string) => void;
  onSelectPlan: (plan: any) => void;
}

export function PlanDetailsPage({ plan, setActiveTab, onSelectPlan }: PlanDetailsPageProps) {
  const [selectedDuration, setSelectedDuration] = React.useState<'1' | '3' | '6' | '12'>('12');

  const calculateSavings = (duration: '1' | '3' | '6' | '12') => {
    if (duration === '1') return 0;
    const monthlyPrice = plan.pricing['1'];
    const discountedPrice = plan.pricing[duration];
    return monthlyPrice - discountedPrice;
  };

  const calculateTotal = (duration: '1' | '3' | '6' | '12') => {
    const monthlyPrice = plan.pricing[duration];
    const months = parseInt(duration);
    return monthlyPrice * months;
  };

  const getSavingsPercentage = (duration: '1' | '3' | '6' | '12') => {
    if (duration === '1') return 0;
    const savings = calculateSavings(duration);
    const originalPrice = plan.pricing['1'];
    return Math.round((savings / originalPrice) * 100);
  };

  const handleSelectPlan = () => {
    onSelectPlan(plan);
    setActiveTab('coaching');
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-44">
      <div className="max-w-md mx-auto">
        {/* Hero Header with Image */}
        <div className="relative h-96 overflow-hidden">
          <div className="absolute inset-0 bg-[#337e51]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />
          
          {/* Back Button */}
          <button
            onClick={() => setActiveTab('coaching')}
            className="absolute top-6 left-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors z-10"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>

          {/* Plan Name & Pricing */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            <h1 className="text-4xl font-bold text-white mb-2">{plan.name}</h1>
            <p className="text-white/90 text-lg mb-3">{plan.subtitle}</p>
            <p className="text-white text-xl font-semibold">
              Starts at ₹{plan.pricing[selectedDuration]} per month
            </p>
          </div>
        </div>

        <div className="px-4 -mt-6 relative z-10 space-y-5">
          {/* Value Prop Card */}
          <div className="bg-green-50 rounded-2xl p-4 flex items-start gap-3 shadow-sm">
            <div className="w-10 h-10 bg-[#337e51] rounded-xl flex items-center justify-center flex-shrink-0 self-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <p className="text-slate-800 text-sm leading-relaxed pt-1.5">
              {plan.description}
            </p>
          </div>

          {/* Duration Selection Cards */}
          <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide">
            {/* 12 Month Plan */}
            <button
              onClick={() => setSelectedDuration('12')}
              className={`rounded-2xl p-5 border-2 transition-all text-left min-w-[280px] flex-shrink-0 snap-center ${
                selectedDuration === '12'
                  ? 'border-[#337e51] bg-white shadow-lg'
                  : 'border-slate-200 bg-white'
              }`}
            >
              <p className="text-slate-900 font-bold text-lg mb-2">12 Months</p>
              <p className="text-[#337e51] text-2xl font-bold mb-1">
                ₹{plan.pricing['12']} <span className="text-sm font-normal text-slate-600">per month</span>
              </p>
              <p className="text-slate-600 text-xs mb-4">Total - ₹ {calculateTotal('12')}</p>
              
              {getSavingsPercentage('12') > 0 && (
                <div className="bg-green-50 rounded-lg p-2.5 flex items-center gap-2 mb-4 h-[60px]">
                  <Award className="w-5 h-5 text-[#337e51] flex-shrink-0" />
                  <p className="text-xs text-[#337e51] font-medium leading-tight">
                    Save {getSavingsPercentage('12')}% with Yearly plan
                  </p>
                </div>
              )}

              <div className="w-full py-3.5 bg-[#337e51] hover:bg-[#2a6641] text-white rounded-xl text-sm font-bold uppercase tracking-wide text-center transition-colors">
                Buy Now
              </div>
            </button>

            {/* 1 Month Plan */}
            <button
              onClick={() => setSelectedDuration('1')}
              className={`rounded-2xl p-5 border-2 transition-all text-left min-w-[280px] flex-shrink-0 snap-center ${
                selectedDuration === '1'
                  ? 'border-[#337e51] bg-white shadow-lg'
                  : 'border-slate-200 bg-white'
              }`}
            >
              <p className="text-slate-900 font-bold text-lg mb-2">1 Month</p>
              <p className="text-[#337e51] text-2xl font-bold mb-1">
                ₹{plan.pricing['1']} <span className="text-sm font-normal text-slate-600">per month</span>
              </p>
              <p className="text-slate-600 text-xs mb-4">Total - ₹ {calculateTotal('1')}</p>
              
              <div className="bg-slate-50 rounded-lg p-2.5 flex items-center gap-2 mb-4 h-[60px]">
                <Award className="w-5 h-5 text-slate-400 flex-shrink-0" />
                <p className="text-xs text-slate-500 font-medium leading-tight">
                  No Discount
                </p>
              </div>

              <div className="w-full py-3.5 bg-[#337e51] hover:bg-[#2a6641] text-white rounded-xl text-sm font-bold uppercase tracking-wide text-center transition-colors">
                Buy Now
              </div>
            </button>

            {/* 3 Month Plan */}
            <button
              onClick={() => setSelectedDuration('3')}
              className={`rounded-2xl p-5 border-2 transition-all text-left min-w-[280px] flex-shrink-0 snap-center ${
                selectedDuration === '3'
                  ? 'border-[#337e51] bg-white shadow-lg'
                  : 'border-slate-200 bg-white'
              }`}
            >
              <p className="text-slate-900 font-bold text-lg mb-2">3 Months</p>
              <p className="text-[#337e51] text-2xl font-bold mb-1">
                ₹{plan.pricing['3']} <span className="text-sm font-normal text-slate-600">per month</span>
              </p>
              <p className="text-slate-600 text-xs mb-4">Total - ₹ {calculateTotal('3')}</p>
              
              {getSavingsPercentage('3') > 0 && (
                <div className="bg-green-50 rounded-lg p-2.5 flex items-center gap-2 mb-4 h-[60px]">
                  <Award className="w-5 h-5 text-[#337e51] flex-shrink-0" />
                  <p className="text-xs text-[#337e51] font-medium leading-tight">
                    Save {getSavingsPercentage('3')}% with 3-month plan
                  </p>
                </div>
              )}

              <div className="w-full py-3.5 bg-[#337e51] hover:bg-[#2a6641] text-white rounded-xl text-sm font-bold uppercase tracking-wide text-center transition-colors">
                Buy Now
              </div>
            </button>

            {/* 6 Month Plan */}
            <button
              onClick={() => setSelectedDuration('6')}
              className={`rounded-2xl p-5 border-2 transition-all text-left min-w-[280px] flex-shrink-0 snap-center ${
                selectedDuration === '6'
                  ? 'border-[#337e51] bg-white shadow-lg'
                  : 'border-slate-200 bg-white'
              }`}
            >
              <p className="text-slate-900 font-bold text-lg mb-2">6 Months</p>
              <p className="text-[#337e51] text-2xl font-bold mb-1">
                ₹{plan.pricing['6']} <span className="text-sm font-normal text-slate-600">per month</span>
              </p>
              <p className="text-slate-600 text-xs mb-4">Total - ₹ {calculateTotal('6')}</p>
              
              {getSavingsPercentage('6') > 0 && (
                <div className="bg-green-50 rounded-lg p-2.5 flex items-center gap-2 mb-4 h-[60px]">
                  <Award className="w-5 h-5 text-[#337e51] flex-shrink-0" />
                  <p className="text-xs text-[#337e51] font-medium leading-tight">
                    Save {getSavingsPercentage('6')}% with 6-month plan
                  </p>
                </div>
              )}

              <div className="w-full py-3.5 bg-[#337e51] hover:bg-[#2a6641] text-white rounded-xl text-sm font-bold uppercase tracking-wide text-center transition-colors">
                Buy Now
              </div>
            </button>
          </div>

          {/* Features List */}
          <div className="bg-white rounded-2xl shadow-sm">
            <h3 className="text-slate-900 font-bold text-lg px-5 py-4 border-b border-slate-100">
              Here's what you get:
            </h3>
            <ul className="divide-y divide-slate-100">
              {plan.features.map((feature: string, index: number) => (
                <li key={index} className="px-5 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center ${
                      index % 3 === 0 ? 'bg-green-100' : index % 3 === 1 ? 'bg-red-100' : 'bg-blue-100'
                    }`}>
                      {index % 3 === 0 ? (
                        <Target className={`w-5 h-5 text-[#337e51]`} />
                      ) : index % 3 === 1 ? (
                        <Activity className={`w-5 h-5 text-red-600`} />
                      ) : (
                        <Brain className={`w-5 h-5 text-blue-600`} />
                      )}
                    </div>
                    <span className="text-slate-800 font-medium">{feature}</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                </li>
              ))}
            </ul>
          </div>

          {/* Social Proof Section */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h3 className="text-slate-900 font-bold text-lg text-center">
              We've Transformed Many, It's Your Turn!
            </h3>
            
          </div>
        </div>
      </div>

      {/* Sticky Bottom CTA */}
      <div className="fixed bottom-20 left-0 right-0 bg-white border-t border-slate-200 shadow-lg z-20">
        <div className="max-w-md mx-auto px-4 py-4">
          <button
            onClick={handleSelectPlan}
            className="w-full py-4 bg-[#337e51] hover:bg-[#2a6641] text-white rounded-2xl text-lg font-bold transition-all shadow-md uppercase tracking-wide"
          >
            Buy Now
          </button>
          <p className="text-center text-xs text-slate-500 mt-2">
            {selectedDuration} Month{selectedDuration !== '1' ? 's' : ''} @ ₹ {plan.pricing[selectedDuration]}/month
          </p>
        </div>
      </div>
    </div>
  );
}