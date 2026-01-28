import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Phone, ArrowRight, Check } from 'lucide-react';
import { OTPInput } from './OTPInput';

interface PhoneAuthProps {
  onAuthenticated: (isNewUser: boolean) => void;
}

export function PhoneAuth({ onAuthenticated }: PhoneAuthProps) {
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

  const handleSendOTP = async () => {
    if (phoneNumber.length === 10) {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsLoading(false);
      setShowOTP(true);
      setResendTimer(30); // Start 30-second timer
    }
  };

  const handleResendOTP = async () => {
    if (resendTimer === 0) {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsLoading(false);
      setResendTimer(30); // Reset timer
      setOtp(''); // Clear OTP input
    }
  };

  const handleVerifyOTP = async () => {
    if (otp.length === 6) {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsLoading(false);
      
      // Simulate checking if user exists (for demo, treat 123456 as existing user)
      const isNewUser = otp !== '123456';
      onAuthenticated(isNewUser);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 bg-[#59b559] rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-4">
            <Phone className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back</h1>
          <p className="text-slate-600">Sign in to continue your health journey</p>
        </motion.div>

        {/* Auth Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-3xl shadow-xl p-8"
        >
          {!showOTP ? (
            <motion.div
              key="phone"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h2 className="text-xl font-semibold text-slate-900 mb-6">Enter your phone number</h2>
              
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
                  <p className="text-xs text-slate-500 mt-2">
                    We'll send you a one-time password to verify your number
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
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-sm text-slate-500 mt-6"
        >
          By continuing, you agree to our Terms & Privacy Policy
        </motion.p>

        {/* Dev Skip Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          onClick={() => onAuthenticated(false)}
          className="text-center text-xs text-slate-400 hover:text-slate-600 mt-3 w-full"
        >
          Skip to App (Dev Only)
        </motion.button>
      </motion.div>
    </div>
  );
}