import image_e4a06c2e5310bf3279847237a4634192b0b18136 from '@/assets/e4a06c2e5310bf3279847237a4634192b0b18136.png';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  CircularProgress,
  Container,
  Chip,
} from '@mui/material';
import { ArrowForward, Check, ChevronLeft } from '@mui/icons-material';
import vaithyaText from '@/assets/7d6b53efc078c0030fa563bc08163619de4a413e.png';
import vaithyaHorizontal from '@/assets/a2ace1e244d4363559689aa7ca71fc828c17259e.png';
import { OTPInput } from './OTPInput';
import { MaterialThemeWrapper } from '@/theme/MaterialThemeWrapper';

interface AuthContainerProps {
  onAuthenticated: (isNewUser: boolean) => void;
}

export function AuthContainerMaterial({ onAuthenticated }: AuthContainerProps) {
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
    setResendTimer(0);
  };

  const handleSendOTP = async () => {
    if (phoneNumber.length === 10) {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsLoading(false);
      setShowOTP(true);
      setResendTimer(30);
    }
  };

  const handleResendOTP = async () => {
    if (resendTimer === 0) {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsLoading(false);
      setResendTimer(30);
      setOtp('');
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
    <div style={{ width: '100%', height: '100%' }}>
      <MaterialThemeWrapper>
        <Box
          sx={{
            position: 'fixed',
            inset: 0,
            bgcolor: '#f8fafc',
            overflow: 'hidden',
          }}
        >
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
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <AnimatePresence mode="wait">
              {!showLogin ? (
                <motion.div
                  key="splash-logo"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
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
                    style={{ marginBottom: 24 }}
                  >
                    <img src={image_e4a06c2e5310bf3279847237a4634192b0b18136} alt="Vaithya Logo" style={{ width: 120, height: 120 }} />
                  </motion.div>

                  {/* Vaithya Text */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    style={{ marginBottom: 16 }}
                  >
                    <img src={vaithyaText} alt="Vaithya" style={{ height: 40, width: 'auto' }} />
                  </motion.div>

                  {/* Tagline */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        color: 'rgba(0, 0, 0, 0.9)',
                        maxWidth: 320,
                        textAlign: 'center',
                        px: 3,
                        mb: 6,
                      }}
                    >
                      Your journey to optimal health starts here
                    </Typography>
                  </motion.div>

                  {/* Get Started Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1, duration: 0.6 }}
                  >
                    <Button
                      variant="contained"
                      size="large"
                      onClick={handleGetStarted}
                      sx={{
                        bgcolor: '#337e51',
                        color: 'white',
                        px: 4,
                        py: 1.5,
                        borderRadius: '999px',
                        fontSize: '1.125rem',
                        fontWeight: 600,
                        boxShadow: '0 10px 25px rgba(51, 126, 81, 0.3)',
                        '&:hover': {
                          bgcolor: '#2a6742',
                          boxShadow: '0 15px 30px rgba(51, 126, 81, 0.4)',
                        },
                      }}
                    >
                      Get Started
                    </Button>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  key="login-logo"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  style={{ marginBottom: 24 }}
                >
                  <img src={vaithyaHorizontal} alt="Vaithya" style={{ height: 104, width: 'auto' }} />
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
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: '20vh',
                  bottom: 0,
                  backgroundColor: 'white',
                  borderRadius: '24px 24px 0 0',
                  boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.1)',
                  padding: '32px 24px',
                  overflowY: 'auto',
                }}
              >
                {/* Back Button */}
                <IconButton
                  onClick={handleBack}
                  sx={{
                    position: 'absolute',
                    top: 24,
                    left: 24,
                    color: 'text.secondary',
                  }}
                >
                  <ChevronLeft />
                </IconButton>

                <Container maxWidth="sm" sx={{ mt: 4 }}>
                  {!showOTP ? (
                    <motion.div
                      key="phone"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 600, mb: 1 }}>
                        Welcome Back
                      </Typography>
                      <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 4 }}>
                        Sign in to continue your health journey
                      </Typography>
                      
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 500, mb: 1.5, color: 'text.primary' }}>
                            Phone Number
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 1.5 }}>
                            <Chip
                              label="+91"
                              sx={{
                                bgcolor: 'grey.100',
                                fontWeight: 600,
                                fontSize: '1rem',
                                height: 56,
                                px: 1,
                              }}
                            />
                            <TextField
                              fullWidth
                              variant="outlined"
                              placeholder="Enter 10 digit number"
                              value={phoneNumber}
                              onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                              inputProps={{
                                maxLength: 10,
                                style: { fontSize: '1.125rem' },
                              }}
                            />
                          </Box>
                          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center', mt: 1 }}>
                            By continuing, you agree to our Terms & Privacy Policy
                          </Typography>
                        </Box>

                        <Button
                          fullWidth
                          variant="contained"
                          size="large"
                          onClick={handleSendOTP}
                          disabled={phoneNumber.length !== 10 || isLoading}
                          endIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <ArrowForward />}
                          sx={{ py: 1.75 }}
                        >
                          {isLoading ? 'Sending...' : 'Send OTP'}
                        </Button>
                      </Box>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="otp"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      <Box sx={{ mb: 4 }}>
                        <Button
                          onClick={() => setShowOTP(false)}
                          sx={{ mb: 2, color: 'primary.main', fontWeight: 600 }}
                        >
                          ← Change number
                        </Button>
                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                          Enter verification code
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                          We sent a code to +91 {phoneNumber}
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <OTPInput value={otp} onChange={setOtp} length={6} />

                        <Button
                          fullWidth
                          variant="contained"
                          size="large"
                          onClick={handleVerifyOTP}
                          disabled={otp.length !== 6 || isLoading}
                          endIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <Check />}
                          sx={{ py: 1.75 }}
                        >
                          {isLoading ? 'Verifying...' : 'Verify & Continue'}
                        </Button>

                        <Button
                          fullWidth
                          onClick={handleResendOTP}
                          disabled={resendTimer > 0}
                          sx={{
                            color: resendTimer > 0 ? 'text.disabled' : 'primary.main',
                            fontWeight: 600,
                          }}
                        >
                          {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend code'}
                        </Button>
                      </Box>
                    </motion.div>
                  )}

                  {/* Dev Skip Button */}
                  <Button
                    fullWidth
                    onClick={() => onAuthenticated(false)}
                    sx={{
                      mt: 2,
                      color: 'text.disabled',
                      fontSize: '0.75rem',
                    }}
                  >
                    Skip to App (Dev Only)
                  </Button>
                </Container>
              </motion.div>
            )}
          </AnimatePresence>
        </Box>
      </MaterialThemeWrapper>
    </div>
  );
}
