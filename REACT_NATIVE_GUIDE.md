# Blood Test Tracking App - React Native Architecture Guide

## Overview
This guide provides a complete architecture plan for rebuilding your blood test tracking web app as a React Native application for iOS and Android.

## Tech Stack Recommendations

### Core Framework
- **React Native** (latest stable version)
- **Expo** (recommended for faster development) OR **React Native CLI** (for more control)

### Essential Dependencies

```json
{
  "dependencies": {
    "@react-navigation/native": "^6.x",
    "@react-navigation/bottom-tabs": "^6.x",
    "@react-navigation/stack": "^6.x",
    "react-native-paper": "^5.x",
    "react-native-vector-icons": "^10.x",
    "react-native-chart-kit": "^6.x",
    "react-native-svg": "^13.x",
    "react-native-gifted-charts": "^1.x",
    "react-native-linear-gradient": "^2.x",
    "react-native-async-storage": "^1.x",
    "react-native-safe-area-context": "^4.x",
    "react-native-screens": "^3.x",
    "react-native-gesture-handler": "^2.x",
    "react-native-reanimated": "^3.x",
    "formik": "^2.x",
    "yup": "^1.x",
    "date-fns": "^2.x",
    "zustand": "^4.x"
  }
}
```

## Project Structure

```
blood-test-app/
├── src/
│   ├── navigation/
│   │   ├── AppNavigator.tsx
│   │   ├── AuthNavigator.tsx
│   │   └── MainNavigator.tsx
│   ├── screens/
│   │   ├── auth/
│   │   │   ├── SplashScreen.tsx
│   │   │   ├── PhoneAuthScreen.tsx
│   │   │   ├── OTPVerificationScreen.tsx
│   │   │   └── onboarding/
│   │   │       ├── BasicInfoScreen.tsx
│   │   │       ├── ActivityLevelScreen.tsx
│   │   │       ├── MedicalConditionsScreen.tsx
│   │   │       └── GoalsSelectionScreen.tsx
│   │   ├── main/
│   │   │   ├── HomeScreen.tsx
│   │   │   ├── ResultsScreen.tsx
│   │   │   ├── LearnScreen.tsx
│   │   │   ├── CoachingScreen.tsx
│   │   │   └── ProfileScreen.tsx
│   │   ├── biomarkers/
│   │   │   ├── BiomarkerDetailScreen.tsx
│   │   │   ├── BiomarkerTrendScreen.tsx
│   │   │   └── TestHistoryScreen.tsx
│   │   ├── goals/
│   │   │   ├── GoalDetailScreen.tsx
│   │   │   └── GoalEditScreen.tsx
│   │   └── notifications/
│   │       └── NotificationsScreen.tsx
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Header.tsx
│   │   │   └── LoadingSpinner.tsx
│   │   ├── charts/
│   │   │   ├── SemiCircularGauge.tsx
│   │   │   ├── LineChart.tsx
│   │   │   └── BarChart.tsx
│   │   ├── biomarkers/
│   │   │   ├── BiomarkerCard.tsx
│   │   │   ├── BiomarkerList.tsx
│   │   │   └── StatusIndicator.tsx
│   │   ├── goals/
│   │   │   ├── GoalCard.tsx
│   │   │   ├── GoalProgress.tsx
│   │   │   └── GoalList.tsx
│   │   └── coaching/
│   │       ├── PlanCard.tsx
│   │       └── PlanComparison.tsx
│   ├── theme/
│   │   ├── colors.ts
│   │   ├── typography.ts
│   │   ├── spacing.ts
│   │   └── theme.ts
│   ├── utils/
│   │   ├── validators.ts
│   │   ├── formatters.ts
│   │   └── helpers.ts
│   ├── stores/
│   │   ├── authStore.ts
│   │   ├── userStore.ts
│   │   ├── biomarkerStore.ts
│   │   └── goalStore.ts
│   ├── types/
│   │   ├── navigation.ts
│   │   ├── biomarker.ts
│   │   ├── goal.ts
│   │   └── user.ts
│   ├── constants/
│   │   ├── biomarkers.ts
│   │   └── coachingPlans.ts
│   └── services/
│       ├── api.ts
│       ├── auth.ts
│       └── storage.ts
├── assets/
│   ├── images/
│   ├── fonts/
│   └── icons/
├── App.tsx
└── app.json
```

## Theme Configuration

### colors.ts
```typescript
export const colors = {
  primary: '#337e51',      // Main green
  primaryLight: '#4a9d6f',
  primaryDark: '#2a6742',
  
  secondary: '#f59e0b',
  
  // Status colors
  optimal: '#59b559',      // Original green for optimal markers
  elevated: '#ff5f5f',     // Red for elevated
  borderline: '#ffbd44',   // Orange for borderline
  
  background: '#f8fafc',
  surface: '#ffffff',
  
  text: {
    primary: '#0f172a',
    secondary: '#64748b',
    tertiary: '#94a3b8',
  },
  
  border: '#e2e8f0',
  
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
};
```

### typography.ts
```typescript
export const typography = {
  fontFamily: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
  },
  
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
  },
  
  fontWeight: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
};
```

## Screen-by-Screen Implementation Guide

### 1. Authentication Flow

#### SplashScreen.tsx
```typescript
import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const SplashScreen = () => {
  const navigation = useNavigation();
  
  useEffect(() => {
    // Check auth status
    setTimeout(() => {
      // Navigate to Auth or Main based on auth status
      navigation.replace('PhoneAuth');
    }, 2000);
  }, []);
  
  return (
    <View style={styles.container}>
      <Image 
        source={require('@/assets/vaithya-logo.png')} 
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#337e51',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 80,
  },
});
```

#### PhoneAuthScreen.tsx
Key features:
- Phone number input with country code selector
- Material Design 3 styling
- Form validation using Formik/Yup
- OTP request handling

#### OTPVerificationScreen.tsx
Key features:
- 6-digit OTP input (use `react-native-otp-input` or custom component)
- Auto-focus and auto-submit
- Resend OTP functionality
- Timer countdown

#### Onboarding Screens (4 steps)
1. **BasicInfoScreen**: Name, DOB, gender selection
2. **ActivityLevelScreen**: Activity level cards with icons
3. **MedicalConditionsScreen**: Multi-select chips/cards
4. **GoalsSelectionScreen**: Goal selection with custom goals input

Use:
- React Native Paper for Material Design components
- Progress indicator at top
- Bottom navigation buttons (Back/Next)
- Form state management with Formik

### 2. Main Navigation

#### Bottom Tab Navigator
```typescript
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

export const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#337e51',
        tabBarInactiveTintColor: '#94a3b8',
        tabBarStyle: {
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Results" 
        component={ResultsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="clipboard-text" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Learn" 
        component={LearnScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="book-open-variant" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Coaching" 
        component={CoachingScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="account-heart" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
```

### 3. Home Screen

#### HomeScreen.tsx
Key components:
1. **Header** with notifications bell icon
2. **Semi-circular gauge** (use react-native-gifted-charts or custom SVG)
3. **Score display** with change indicator bubble
4. **Latest Results** section
5. **Biomarkers Focus** cards
6. **Health Goals** section

#### SemiCircularGauge.tsx Component
```typescript
import React from 'react';
import { View } from 'react-native';
import Svg, { Path, G } from 'react-native-svg';

interface GaugeProps {
  score: number;
  previousScore: number;
}

export const SemiCircularGauge: React.FC<GaugeProps> = ({ score, previousScore }) => {
  // Implement using react-native-svg
  // Create arcs for red, orange, yellow, green zones
  // Add needle/indicator for current score
  
  return (
    <View>
      <Svg width={300} height={200}>
        {/* Draw colored arcs */}
        {/* Draw score indicator */}
      </Svg>
    </View>
  );
};
```

Alternative: Use `react-native-gifted-charts` PieChart in semi-circle mode

#### Score Change Bubble
```typescript
import { View, Text, StyleSheet } from 'react-native';

const scoreDifference = score - previousScore;
const isPositive = scoreDifference > 0;

<View style={[
  styles.bubble,
  { backgroundColor: isPositive ? '#e8f5ee' : '#fee2e2' }
]}>
  <Text style={[
    styles.bubbleText,
    { color: isPositive ? '#337e51' : '#dc2626' }
  ]}>
    {isPositive ? '+' : ''}{scoreDifference.toFixed(1)}
  </Text>
</View>

const styles = StyleSheet.create({
  bubble: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  bubbleText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
```

### 4. Biomarker Components

#### BiomarkerCard.tsx
```typescript
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface BiomarkerCardProps {
  name: string;
  value: number;
  unit: string;
  status: 'optimal' | 'borderline' | 'elevated';
  range: string;
  onPress: () => void;
}

export const BiomarkerCard: React.FC<BiomarkerCardProps> = ({
  name, value, unit, status, range, onPress
}) => {
  const statusColors = {
    optimal: '#59b559',
    borderline: '#ffbd44',
    elevated: '#ff5f5f',
  };
  
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.name}>{name}</Text>
        <View style={[styles.indicator, { backgroundColor: statusColors[status] }]} />
      </View>
      
      <View style={styles.content}>
        <Text style={styles.value}>{value} {unit}</Text>
        <Text style={styles.range}>{range}</Text>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.status}>{status.toUpperCase()}</Text>
        <Icon name="chevron-right" size={20} color="#94a3b8" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
  },
  indicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  content: {
    marginBottom: 12,
  },
  value: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 4,
  },
  range: {
    fontSize: 14,
    color: '#64748b',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  status: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});
```

### 5. Charts Implementation

For biomarker trends, use **react-native-gifted-charts** or **react-native-chart-kit**:

```typescript
import { LineChart } from 'react-native-gifted-charts';

const BiomarkerTrendChart = ({ data }) => {
  return (
    <LineChart
      data={data}
      width={350}
      height={250}
      color="#337e51"
      thickness={3}
      startFillColor="#337e51"
      endFillColor="#e8f5ee"
      startOpacity={0.4}
      endOpacity={0.1}
      spacing={60}
      backgroundColor="#ffffff"
      hideRules
      yAxisColor="#e2e8f0"
      xAxisColor="#e2e8f0"
      yAxisTextStyle={{ color: '#64748b' }}
      xAxisLabelTextStyle={{ color: '#64748b' }}
      curved
    />
  );
};
```

### 6. Goals Management

#### GoalCard.tsx
```typescript
import { View, Text, StyleSheet } from 'react-native';
import { ProgressBar } from 'react-native-paper';

interface GoalCardProps {
  title: string;
  progress: number;
  target: string;
  current: string;
  dueDate: string;
}

export const GoalCard: React.FC<GoalCardProps> = ({
  title, progress, target, current, dueDate
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      
      <View style={styles.metrics}>
        <Text style={styles.current}>{current}</Text>
        <Text style={styles.separator}>→</Text>
        <Text style={styles.target}>{target}</Text>
      </View>
      
      <ProgressBar 
        progress={progress / 100} 
        color="#337e51"
        style={styles.progressBar}
      />
      
      <Text style={styles.dueDate}>Due: {dueDate}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 12,
  },
  metrics: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  current: {
    fontSize: 18,
    fontWeight: '700',
    color: '#337e51',
  },
  separator: {
    marginHorizontal: 8,
    color: '#94a3b8',
  },
  target: {
    fontSize: 18,
    fontWeight: '600',
    color: '#64748b',
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  dueDate: {
    fontSize: 12,
    color: '#64748b',
  },
});
```

### 7. Coaching Screen

#### PlanCard.tsx for Coaching Plans
```typescript
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface PlanCardProps {
  title: string;
  price: number;
  features: string[];
  imageUrl: string;
  onSelect: () => void;
}

export const PlanCard: React.FC<PlanCardProps> = ({
  title, price, features, imageUrl, onSelect
}) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: imageUrl }} style={styles.headerImage} />
      
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.price}>${price}/month</Text>
        
        <View style={styles.features}>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureRow}>
              <Icon name="check-circle" size={20} color="#337e51" />
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>
        
        <TouchableOpacity style={styles.button} onPress={onSelect}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  headerImage: {
    width: '100%',
    height: 150,
    backgroundColor: '#1a1a1a',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 8,
  },
  price: {
    fontSize: 32,
    fontWeight: '700',
    color: '#337e51',
    marginBottom: 16,
  },
  features: {
    marginBottom: 20,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureText: {
    marginLeft: 12,
    fontSize: 15,
    color: '#475569',
  },
  button: {
    backgroundColor: '#337e51',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
```

### 8. Notifications Screen

#### NotificationsScreen.tsx
```typescript
import { FlatList, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const NotificationsScreen = () => {
  const notifications = [
    // Mock data
  ];
  
  return (
    <FlatList
      data={notifications}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.notificationItem}>
          <View style={styles.iconContainer}>
            <Icon name={item.icon} size={24} color="#337e51" />
          </View>
          <View style={styles.content}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.message}>{item.message}</Text>
            <Text style={styles.time}>{item.time}</Text>
          </View>
          {item.unread && <View style={styles.unreadDot} />}
        </TouchableOpacity>
      )}
      ListEmptyComponent={
        <View style={styles.empty}>
          <Icon name="bell-off" size={64} color="#cbd5e1" />
          <Text style={styles.emptyText}>No notifications yet</Text>
        </View>
      }
    />
  );
};
```

## State Management with Zustand

### authStore.ts
```typescript
import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  login: (phoneNumber: string, otp: string) => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  
  login: async (phoneNumber, otp) => {
    // API call
    // Update state
    set({ isAuthenticated: true, user: userData });
  },
  
  logout: () => {
    set({ isAuthenticated: false, user: null });
  },
  
  updateUser: (user) => {
    set({ user });
  },
}));
```

### biomarkerStore.ts
```typescript
import { create } from 'zustand';

interface BiomarkerState {
  biomarkers: Biomarker[];
  testHistory: TestResult[];
  fetchBiomarkers: () => Promise<void>;
  fetchTestHistory: () => Promise<void>;
  getBiomarkerTrend: (biomarkerId: string) => TrendData[];
}

export const useBiomarkerStore = create<BiomarkerState>((set, get) => ({
  biomarkers: [],
  testHistory: [],
  
  fetchBiomarkers: async () => {
    // API call
    set({ biomarkers: data });
  },
  
  fetchTestHistory: async () => {
    // API call
    set({ testHistory: data });
  },
  
  getBiomarkerTrend: (biomarkerId) => {
    // Calculate trend from testHistory
    return trendData;
  },
}));
```

## Data Types

### types/biomarker.ts
```typescript
export interface Biomarker {
  id: string;
  name: string;
  abbreviation: string;
  value: number;
  unit: string;
  status: 'optimal' | 'borderline' | 'elevated';
  optimalRange: {
    min: number;
    max: number;
  };
  category: string;
  description: string;
  lastUpdated: Date;
}

export interface TestResult {
  id: string;
  date: Date;
  biomarkers: {
    biomarkerId: string;
    value: number;
  }[];
  overallScore: number;
}

export interface TrendData {
  date: string;
  value: number;
}
```

### types/goal.ts
```typescript
export interface Goal {
  id: string;
  title: string;
  description: string;
  category: 'weight' | 'biomarker' | 'lifestyle' | 'custom';
  targetValue: number;
  currentValue: number;
  unit: string;
  progress: number;
  startDate: Date;
  targetDate: Date;
  status: 'active' | 'completed' | 'paused';
}
```

## Navigation Types

### types/navigation.ts
```typescript
import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Splash: undefined;
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
};

export type AuthStackParamList = {
  PhoneAuth: undefined;
  OTPVerification: { phoneNumber: string };
  Onboarding: NavigatorScreenParams<OnboardingStackParamList>;
};

export type OnboardingStackParamList = {
  BasicInfo: undefined;
  ActivityLevel: { name: string; dob: string; gender: string };
  MedicalConditions: { activityLevel: string };
  GoalsSelection: { conditions: string[] };
};

export type MainTabParamList = {
  Home: undefined;
  Results: undefined;
  Learn: undefined;
  Coaching: undefined;
};

export type HomeStackParamList = {
  HomeMain: undefined;
  BiomarkerDetail: { biomarkerId: string };
  BiomarkerTrend: { biomarkerId: string };
  GoalDetail: { goalId: string };
  TestHistory: undefined;
  Notifications: undefined;
};
```

## API Service

### services/api.ts
```typescript
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'https://your-api.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Request interceptor for auth token
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  requestOTP: (phoneNumber: string) => 
    api.post('/auth/request-otp', { phoneNumber }),
    
  verifyOTP: (phoneNumber: string, otp: string) =>
    api.post('/auth/verify-otp', { phoneNumber, otp }),
};

export const biomarkerApi = {
  getBiomarkers: () => api.get('/biomarkers'),
  
  getTestHistory: () => api.get('/test-results'),
  
  getBiomarkerTrend: (biomarkerId: string, period: string) =>
    api.get(`/biomarkers/${biomarkerId}/trend`, { params: { period } }),
};

export const goalApi = {
  getGoals: () => api.get('/goals'),
  
  createGoal: (goal: Partial<Goal>) => api.post('/goals', goal),
  
  updateGoal: (goalId: string, updates: Partial<Goal>) =>
    api.patch(`/goals/${goalId}`, updates),
    
  deleteGoal: (goalId: string) => api.delete(`/goals/${goalId}`),
};
```

## Performance Optimization Tips

1. **Use React.memo** for biomarker cards and goal cards to prevent unnecessary re-renders
2. **FlatList optimization**: Use `getItemLayout`, `initialNumToRender`, `maxToRenderPerBatch`
3. **Image optimization**: Use FastImage library for better image caching
4. **Code splitting**: Use React.lazy for screens not immediately needed
5. **AsyncStorage**: Cache frequently accessed data locally
6. **Animations**: Use react-native-reanimated for 60fps animations

## Testing Strategy

1. **Unit tests**: Jest for business logic, utilities, stores
2. **Component tests**: React Native Testing Library
3. **E2E tests**: Detox for critical user flows
4. **Manual testing**: Test on both iOS and Android devices

## Deployment Checklist

### iOS
1. Configure app icons and splash screen
2. Set up App Store Connect
3. Configure push notifications (Apple Developer Console)
4. Handle permissions (camera, notifications, etc.)
5. TestFlight beta testing
6. App Store submission

### Android
1. Generate signed APK/AAB
2. Configure Google Play Console
3. Set up Firebase Cloud Messaging for push notifications
4. Handle permissions in AndroidManifest.xml
5. Internal testing track
6. Production release

## Key Implementation Notes

### Chart.js Replacement
The web app uses Chart.js which doesn't work in React Native. Replace with:
- **react-native-gifted-charts** (recommended) - Similar API, good documentation
- **react-native-chart-kit** - Simpler, good for basic charts
- **Victory Native** - More powerful but heavier

### Material UI Replacement
Replace Material-UI with **React Native Paper** (Material Design 3):
- Similar component API
- Built-in theming
- Good accessibility support

### Form Handling
- Use **Formik** for form state management
- **Yup** for validation schemas
- React Native Paper TextInput components

### Date Handling
- Use **date-fns** (same as web) for date manipulation
- **react-native-date-picker** for native date picker UI

### Storage
- Replace localStorage with **AsyncStorage**
- For complex data, consider **WatermelonDB** or **Realm**

### Authentication
- Implement phone auth using Firebase Auth
- Or build custom OTP system with backend
- Store auth token in AsyncStorage (or secure storage)

### Push Notifications
- **Firebase Cloud Messaging** for both iOS and Android
- **react-native-push-notification** for local notifications

## Development Workflow

1. **Start with Expo** for rapid prototyping
2. Build authentication flow first
3. Implement bottom tab navigation
4. Build Home screen with mock data
5. Implement biomarker listing and details
6. Add charts and trends
7. Implement goals management
8. Build coaching plans screen
9. Add notifications
10. Integrate real API
11. Polish UI/UX
12. Test on devices
13. Prepare for deployment

## Estimated Timeline

- **Setup & Navigation**: 1-2 days
- **Authentication & Onboarding**: 3-4 days
- **Home Screen**: 2-3 days
- **Biomarkers & Charts**: 4-5 days
- **Goals Management**: 2-3 days
- **Coaching & Other Screens**: 2-3 days
- **API Integration**: 3-4 days
- **Testing & Bug Fixes**: 3-5 days
- **Polish & Optimization**: 2-3 days

**Total**: 22-32 days for full implementation

## Resources

- [React Native Docs](https://reactnative.dev/)
- [React Navigation](https://reactnavigation.org/)
- [React Native Paper](https://callstack.github.io/react-native-paper/)
- [React Native Gifted Charts](https://gifted-charts.web.app/)
- [Expo Documentation](https://docs.expo.dev/)

## Next Steps

1. Set up React Native project (`npx react-native init` or `expo init`)
2. Install dependencies from package.json above
3. Set up navigation structure
4. Create theme configuration
5. Start building screens following this guide
6. Integrate with your backend API
7. Test on iOS and Android devices
8. Deploy to app stores

Good luck with your React Native implementation! 🚀
