import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Box,
  TextField,
  Button,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { UserData } from '../OnboardingFlowMaterial';

interface PersonalInfoProps {
  data: UserData;
  onNext: (data: Partial<UserData>) => void;
}

export function PersonalInfoMaterial({ data, onNext }: PersonalInfoProps) {
  const [name, setName] = useState(data.name);
  const [dob, setDob] = useState(data.dob);
  const [sex, setSex] = useState(data.sex);

  const isValid = name.trim() && dob && sex;

  const handleSubmit = () => {
    if (isValid) {
      onNext({ name, dob, sex });
    }
  };

  const handleSexChange = (
    event: React.MouseEvent<HTMLElement>,
    newSex: string | null,
  ) => {
    if (newSex !== null) {
      setSex(newSex);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Box
        sx={{
          maxWidth: 600,
          mx: 'auto',
        }}
      >
        {/* Header */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Typography variant="h3" gutterBottom sx={{ fontWeight: 700, mb: 1.5 }}>
              Tell us about yourself
            </Typography>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.125rem' }}>
              Let's start with some basic information
            </Typography>
          </motion.div>
        </Box>

        {/* Form */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Name Input */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <TextField
              fullWidth
              label="Full Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              autoComplete="name"
              sx={{
                bgcolor: 'white',
                borderRadius: 2,
                '& .MuiOutlinedInput-root': {
                  bgcolor: 'white',
                },
              }}
            />
          </motion.div>

          {/* Date of Birth */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <TextField
              fullWidth
              label="Date of Birth"
              type="date"
              variant="outlined"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                max: new Date().toISOString().split('T')[0],
              }}
              sx={{
                bgcolor: 'white',
                borderRadius: 2,
                '& .MuiOutlinedInput-root': {
                  bgcolor: 'white',
                },
              }}
            />
          </motion.div>

          {/* Sex Selection */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 1.5, color: 'text.primary' }}>
              Sex
            </Typography>
            <ToggleButtonGroup
              value={sex}
              exclusive
              onChange={handleSexChange}
              fullWidth
              sx={{
                display: 'flex',
                gap: 1,
                '& .MuiToggleButtonGroup-grouped': {
                  border: '1px solid',
                  borderColor: 'divider',
                  '&:not(:first-of-type)': {
                    marginLeft: 0,
                    borderLeft: '1px solid',
                    borderLeftColor: 'divider',
                  },
                },
                '& .MuiToggleButton-root': {
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  borderRadius: 2,
                  bgcolor: 'white',
                  '&.Mui-selected': {
                    bgcolor: 'primary.main',
                    color: 'white',
                    '&:hover': {
                      bgcolor: 'primary.dark',
                    },
                  },
                  '&:hover': {
                    bgcolor: 'grey.50',
                  },
                },
              }}
            >
              <ToggleButton value="Male">Male</ToggleButton>
              <ToggleButton value="Female">Female</ToggleButton>
              <ToggleButton value="Other">Other</ToggleButton>
            </ToggleButtonGroup>
          </motion.div>
        </Box>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={handleSubmit}
            disabled={!isValid}
            endIcon={<ArrowForward />}
            sx={{ mt: 4, py: 1.75 }}
          >
            Continue
          </Button>
        </motion.div>
      </Box>
    </motion.div>
  );
}