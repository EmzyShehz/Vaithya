import image_e4a06c2e5310bf3279847237a4634192b0b18136 from '@/assets/e4a06c2e5310bf3279847237a4634192b0b18136.png';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, ArrowRight, Check, ChevronLeft } from 'lucide-react';
import vaithyaText from '@/assets/7d6b53efc078c0030fa563bc08163619de4a413e.png';
import vaithyaHorizontal from '@/assets/a2ace1e244d4363559689aa7ca71fc828c17259e.png';
import { OTPInput } from './OTPInput';

interface AuthContainerProps {
  onAuthenticated: (isNewUser: boolean) => void;
}

export function AuthContainer({ onAuthenticated }: AuthContainerProps) {
  const [showLogin, setShowLogin] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  // Timer effect for resend countdown
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleGetStarted = () => {
    setShowLogin(true);
  };

  const handleBack = () => {
    setShowLogin(false);
    setShowOTP(false);
    setPhoneNumber('');
    setOtp('');
    setResendTimer(0); // Reset timer on back
  };

  const handleSendOTP = async () => {
    if (phoneNumber.length === 10) {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsLoading(false);
      setShowOTP(true);
      setResendTimer(30); // Start 30-second timer
    }
  };

  const handleResendOTP = async () => {
    if (resendTimer === 0) {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsLoading(false);
      setResendTimer(30); // Reset timer
      setOtp(''); // Clear OTP input
    }
  };

  const handleVerifyOTP = async () => {
    if (otp.length === 6) {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsLoading(false);
      
      const isNewUser = otp !== '123456';
      onAuthenticated(isNewUser);
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
      {/* Logo - moves up when login shows */}
      <motion.div
        initial={{ y: '40vh' }}
        animate={{ 
          y: showLogin ? '5vh' : '40vh',
          scale: showLogin ? 1 : 1
        }}
        transition={{ 
          type: "spring", 
          stiffness: 260, 
          damping: 30,
          duration: 0.6 
        }}
        className="absolute left-0 right-0 flex flex-col items-center"
      >
        <AnimatePresence mode="wait">
          {!showLogin ? (
            <motion.div
              key="splash-logo"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center"
            >
              {/* Logo Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 260, 
                  damping: 20,
                  duration: 0.8 
                }}
                className="mb-6"
              >
                <img src={image_e4a06c2e5310bf3279847237a4634192b0b18136} alt="Vaithya Logo" className="w-30 h-30" />
              </motion.div>

              {/* Vaithya Text */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="mb-4"
              >
                <img src={vaithyaText} alt="Vaithya" className="h-10 w-auto" />
              </motion.div>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="text-lg text-black/90 max-w-xs mx-auto px-6 mb-12 text-center"
              >
                Your journey to optimal health starts here
              </motion.p>

              {/* Get Started Button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.6 }}
                onClick={handleGetStarted}
                className="bg-black text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-shadow"
              >
                Get Started
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="login-logo"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="mb-6"
            >
              <img src={vaithyaHorizontal} alt="Vaithya" className="h-26 w-auto" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Login Form - slides up from bottom */}
      <AnimatePresence>
        {showLogin && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ 
              type: "spring", 
              stiffness: 260, 
              damping: 30,
              duration: 0.6 
            }}
            className="absolute inset-x-0 top-[20vh] bottom-0 bg-white rounded-t-3xl shadow-2xl p-6 pt-8 overflow-y-auto"
          >
            {/* Back Button */}
            <button
              onClick={handleBack}
              className="absolute top-6 left-6 text-slate-600 hover:text-slate-900 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="max-w-md mx-auto mt-8">
              {!showOTP ? (
                <motion.div
                  key="phone"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h2 className="text-2xl font-semibold text-slate-900 mb-2 text-center">Welcome Back</h2>
                  <p className="text-slate-600 mb-8 text-center">Sign in to continue your health journey</p>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Phone Number
                      </label>
                      <div className="flex items-center gap-3">
                        <div className="px-4 py-3 bg-slate-50 rounded-xl text-slate-900 font-medium">
                          +91
                        </div>
                        <input
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                          placeholder="Enter 10 digit number"
                          className="flex-1 px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#59b559] focus:border-transparent text-lg"
                          maxLength={10}
                        />
                      </div>
                      <p className="text-xs text-slate-500 mt-2 text-center text-[13px]">
                        By continuing, you agree to our Terms & Privacy Policy
                      </p>
                    </div>

                    <button
                      onClick={handleSendOTP}
                      disabled={phoneNumber.length !== 10 || isLoading}
                      className={`w-full py-4 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all ${
                        phoneNumber.length === 10 && !isLoading
                          ? 'bg-[#59b559] hover:bg-[#4a9d4a] shadow-lg hover:shadow-xl'
                          : 'bg-slate-300 cursor-not-allowed'
                      }`}
                    >
                      {isLoading ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                      ) : (
                        <>
                          Send OTP
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="otp"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <div className="mb-6">
                    <button
                      onClick={() => setShowOTP(false)}
                      className="text-[#59b559] text-sm font-medium hover:underline mb-4"
                    >
                      ← Change number
                    </button>
                    <h2 className="text-xl font-semibold text-slate-900 mb-2">Enter verification code</h2>
                    <p className="text-slate-600">
                      We sent a code to +91 {phoneNumber}
                    </p>
                  </div>

                  <div className="space-y-6">
                    <OTPInput value={otp} onChange={setOtp} length={6} />

                    <button
                      onClick={handleVerifyOTP}
                      disabled={otp.length !== 6 || isLoading}
                      className={`w-full py-4 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all ${
                        otp.length === 6 && !isLoading
                          ? 'bg-[#59b559] hover:bg-[#4a9d4a] shadow-lg hover:shadow-xl'
                          : 'bg-slate-300 cursor-not-allowed'
                      }`}
                    >
                      {isLoading ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                      ) : (
                        <>
                          Verify & Continue
                          <Check className="w-5 h-5" />
                        </>
                      )}
                    </button>

                    <button
                      onClick={handleResendOTP}
                      disabled={resendTimer > 0}
                      className={`w-full text-sm font-medium ${
                        resendTimer > 0 
                          ? 'text-slate-400 cursor-not-allowed' 
                          : 'text-[#59b559] hover:underline'
                      }`}
                    >
                      {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend code'}
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Dev Skip Button */}
              <button
                onClick={() => onAuthenticated(false)}
                className="text-center text-xs text-slate-400 hover:text-slate-600 mt-3 w-full"
              >
                Skip to App (Dev Only)
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
