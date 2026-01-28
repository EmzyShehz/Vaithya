import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import {
  Box,
  Button,
  TextField,
  Card,
  CardContent,
  Typography,
  Chip,
  LinearProgress,
  Alert,
} from '@mui/material';
import { CheckCircle, Favorite, Star } from '@mui/icons-material';
import { materialTheme } from '@/theme/materialTheme';

export function MaterialDemo() {
  return (
    <ThemeProvider theme={materialTheme}>
      <Box sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
        <Typography variant="h3" gutterBottom>
          Material Design 3 Demo
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 4 }}>
          {/* Buttons */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Buttons</Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button variant="contained">Contained</Button>
                <Button variant="outlined">Outlined</Button>
                <Button variant="text">Text</Button>
                <Button variant="contained" startIcon={<CheckCircle />}>
                  With Icon
                </Button>
              </Box>
            </CardContent>
          </Card>

          {/* Text Fields */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Text Fields</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField label="Standard" variant="outlined" />
                <TextField label="With Helper" helperText="Some helper text" />
                <TextField label="Disabled" disabled />
              </Box>
            </CardContent>
          </Card>

          {/* Chips */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Chips</Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Chip label="Default" />
                <Chip label="Primary" color="primary" />
                <Chip label="Success" color="success" />
                <Chip label="With Icon" icon={<Favorite />} color="primary" />
                <Chip label="Deletable" onDelete={() => {}} />
              </Box>
            </CardContent>
          </Card>

          {/* Progress */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Progress</Typography>
              <LinearProgress value={75} variant="determinate" sx={{ mb: 2 }} />
              <LinearProgress />
            </CardContent>
          </Card>

          {/* Alerts */}
          <Alert severity="success">This is a success alert!</Alert>
          <Alert severity="info">This is an info alert!</Alert>
          <Alert severity="warning">This is a warning alert!</Alert>
          <Alert severity="error">This is an error alert!</Alert>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
