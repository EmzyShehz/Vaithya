# Web to React Native Component Mapping

This document maps your current web components to their React Native equivalents.

## HTML/Web Elements → React Native Components

| Web Element | React Native Component | Notes |
|-------------|----------------------|-------|
| `<div>` | `<View>` | Basic container |
| `<span>`, `<p>`, `<h1>`-`<h6>` | `<Text>` | All text must be in Text component |
| `<button>` | `<TouchableOpacity>` or `<Pressable>` | Use Pressable for better press effects |
| `<input>` | `<TextInput>` | From react-native or Paper |
| `<img>` | `<Image>` | Use FastImage for better performance |
| `<a>` | `<TouchableOpacity>` + `<Text>` | Handle with onPress and navigation |
| `<ul>`, `<ol>` | `<FlatList>` or `<SectionList>` | For performant lists |
| Scrollable container | `<ScrollView>` | For scrollable content |

## Tailwind CSS → React Native StyleSheet

### Layout
```typescript
// Tailwind: className="flex flex-row items-center justify-between"
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

// Tailwind: className="w-full h-screen p-4 m-2"
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: Dimensions.get('window').height,
    padding: 16,
    margin: 8,
  },
});
```

### Colors & Backgrounds
```typescript
// Tailwind: className="bg-slate-50 text-gray-700"
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8fafc',
    color: '#374151', // Note: color goes on Text, not View
  },
});

// For Text specifically
<Text style={{ color: '#374151' }}>Hello</Text>
```

### Border & Radius
```typescript
// Tailwind: className="rounded-lg border border-gray-200"
const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
});
```

### Shadows
```typescript
// Tailwind: className="shadow-lg"
const styles = StyleSheet.create({
  card: {
    // iOS shadows
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    // Android shadow
    elevation: 8,
  },
});
```

### Typography
```typescript
// Tailwind: className="text-2xl font-bold leading-tight"
const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 30,
  },
});
```

## Material-UI → React Native Paper

| Material-UI | React Native Paper | Example |
|-------------|-------------------|---------|
| `Button` | `Button` | `<Button mode="contained">Click</Button>` |
| `TextField` | `TextInput` | `<TextInput label="Email" mode="outlined" />` |
| `Card` | `Card` | `<Card><Card.Content>...</Card.Content></Card>` |
| `Chip` | `Chip` | `<Chip mode="outlined">Tag</Chip>` |
| `IconButton` | `IconButton` | `<IconButton icon="heart" />` |
| `Switch` | `Switch` | `<Switch value={enabled} onValueChange={setEnabled} />` |
| `Checkbox` | `Checkbox` | `<Checkbox status={checked ? 'checked' : 'unchecked'} />` |
| `Radio` | `RadioButton` | `<RadioButton value="first" />` |
| `ProgressBar` | `ProgressBar` | `<ProgressBar progress={0.5} />` |
| `Snackbar` | `Snackbar` | `<Snackbar visible={visible}>Message</Snackbar>` |
| `Dialog` | `Dialog` | `<Dialog visible={visible}>...</Dialog>` |
| `AppBar` | Custom with `Appbar` | `<Appbar.Header>...</Appbar.Header>` |

## Your Current Web Components → React Native

### 1. Header Component
**Web:** `/src/app/components/Header.tsx`

**React Native:**
```typescript
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const Header = ({ title, showBack, onBack, onNotifications }) => {
  return (
    <Appbar.Header style={styles.header}>
      {showBack && <Appbar.BackAction onPress={onBack} />}
      <Appbar.Content title={title} />
      <Appbar.Action 
        icon="bell" 
        onPress={onNotifications}
        color="#337e51"
      />
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#ffffff',
    elevation: 2,
  },
});
```

### 2. HomePage Semi-Circular Gauge
**Web:** Chart.js Doughnut chart

**React Native:**
```typescript
import { View } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';

export const HealthScoreGauge = ({ score }) => {
  const pieData = [
    { value: 15, color: '#ff5f5f' },
    { value: 25, color: '#ffbd44' },
    { value: 25, color: '#d4e157' },
    { value: 15, color: '#43a047' },
    { value: 20, color: '#eeeeee' },
  ];

  return (
    <View style={{ alignItems: 'center' }}>
      <PieChart
        data={pieData}
        donut
        innerRadius={100}
        radius={130}
        innerCircleBorderWidth={0}
        showText={false}
        startAngle={225}
        endAngle={-45}
      />
      {/* Center overlay with score */}
      <View style={styles.scoreOverlay}>
        <Text style={styles.scoreValue}>{score}</Text>
        <Text style={styles.scoreLabel}>Very good</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scoreOverlay: {
    position: 'absolute',
    top: '40%',
    alignItems: 'center',
  },
  scoreValue: {
    fontSize: 56,
    fontWeight: '700',
    color: '#333333',
  },
  scoreLabel: {
    fontSize: 20,
    fontWeight: '500',
    color: '#666666',
    marginTop: 4,
  },
});
```

### 3. BiomarkerCard
**Web:** `/src/app/components/BiomarkerCard.tsx`

**React Native:**
```typescript
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const BiomarkerCard = ({ biomarker, onPress }) => {
  const statusColor = {
    optimal: '#59b559',
    borderline: '#ffbd44',
    elevated: '#ff5f5f',
  }[biomarker.status];

  return (
    <Card style={styles.card} onPress={onPress}>
      <Card.Content>
        <View style={styles.header}>
          <Text style={styles.name}>{biomarker.name}</Text>
          <View style={[styles.indicator, { backgroundColor: statusColor }]} />
        </View>
        
        <Text style={styles.value}>
          {biomarker.value} {biomarker.unit}
        </Text>
        
        <Text style={styles.range}>
          Optimal: {biomarker.optimalRange.min}-{biomarker.optimalRange.max}
        </Text>
        
        <View style={styles.footer}>
          <Text style={[styles.status, { color: statusColor }]}>
            {biomarker.status.toUpperCase()}
          </Text>
          <Icon name="chevron-right" size={20} color="#94a3b8" />
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
    borderRadius: 12,
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
  value: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 4,
  },
  range: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 12,
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

### 4. LatestResults List
**Web:** Map over array with divs

**React Native:**
```typescript
import { FlatList, View, Text, StyleSheet } from 'react-native';
import { BiomarkerCard } from './BiomarkerCard';

export const LatestResults = ({ biomarkers, onViewAll }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Latest Results</Text>
        <TouchableOpacity onPress={onViewAll}>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={biomarkers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <BiomarkerCard biomarker={item} onPress={() => {}} />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f172a',
  },
  viewAll: {
    fontSize: 14,
    fontWeight: '600',
    color: '#337e51',
  },
});
```

### 5. HealthGoals Component
**Web:** `/src/app/components/HealthGoals.tsx`

**React Native:**
```typescript
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { GoalCard } from './GoalCard';
import { Button } from 'react-native-paper';

export const HealthGoals = ({ goals, onAddGoal, onViewGoal }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Health Goals</Text>
        <Button 
          mode="text" 
          onPress={onAddGoal}
          textColor="#337e51"
        >
          Add Goal
        </Button>
      </View>
      
      <FlatList
        data={goals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <GoalCard goal={item} onPress={() => onViewGoal(item)} />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No goals yet</Text>
            <Button mode="contained" onPress={onAddGoal}>
              Create Your First Goal
            </Button>
          </View>
        }
      />
    </View>
  );
};
```

### 6. Coaching Plan Cards
**Web:** Material-UI Card with dark header image

**React Native:**
```typescript
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const CoachingPlanCard = ({ plan, onSelect }) => {
  return (
    <Card style={styles.card}>
      <Image 
        source={{ uri: plan.imageUrl }} 
        style={styles.headerImage}
        resizeMode="cover"
      />
      
      <Card.Content style={styles.content}>
        <Text style={styles.title}>{plan.title}</Text>
        <Text style={styles.price}>${plan.price}/month</Text>
        
        <View style={styles.features}>
          {plan.features.map((feature, index) => (
            <View key={index} style={styles.featureRow}>
              <Icon name="check-circle" size={20} color="#337e51" />
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>
        
        <TouchableOpacity style={styles.button} onPress={onSelect}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
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

### 7. OTP Input Component
**Web:** Six separate input fields

**React Native:**
```typescript
import React, { useRef, useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

export const OTPInput = ({ onComplete }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputs = useRef([]);

  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Auto-focus next input
    if (text && index < 5) {
      inputs.current[index + 1].focus();
    }

    // Check if complete
    if (index === 5 && text) {
      onComplete(newOtp.join(''));
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  return (
    <View style={styles.container}>
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          ref={(ref) => (inputs.current[index] = ref)}
          style={styles.input}
          value={digit}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          keyboardType="number-pad"
          maxLength={1}
          selectTextOnFocus
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  input: {
    width: 45,
    height: 55,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    color: '#0f172a',
  },
});
```

### 8. Onboarding Steps with Progress
**Web:** Material-UI Stepper

**React Native:**
```typescript
import { View, StyleSheet } from 'react-native';
import { ProgressBar } from 'react-native-paper';

export const OnboardingProgress = ({ currentStep, totalSteps }) => {
  return (
    <View style={styles.container}>
      <ProgressBar 
        progress={currentStep / totalSteps} 
        color="#337e51"
        style={styles.progressBar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
  },
});
```

### 9. Biomarker Trend Chart
**Web:** Chart.js Line Chart

**React Native:**
```typescript
import { LineChart } from 'react-native-gifted-charts';

export const BiomarkerTrendChart = ({ data, biomarker }) => {
  const chartData = data.map(point => ({
    value: point.value,
    label: point.date,
    dataPointText: `${point.value}`,
  }));

  return (
    <LineChart
      data={chartData}
      width={350}
      height={250}
      color="#337e51"
      thickness={3}
      startFillColor="#337e51"
      endFillColor="#e8f5ee"
      startOpacity={0.4}
      endOpacity={0.1}
      spacing={60}
      initialSpacing={20}
      curved
      yAxisColor="#e2e8f0"
      xAxisColor="#e2e8f0"
      yAxisTextStyle={{ color: '#64748b', fontSize: 12 }}
      xAxisLabelTextStyle={{ color: '#64748b', fontSize: 10, width: 60 }}
      dataPointsColor="#337e51"
      dataPointsRadius={4}
      textColor="#0f172a"
      textFontSize={12}
      noOfSections={4}
      yAxisLabelSuffix={` ${biomarker.unit}`}
    />
  );
};
```

### 10. Filter Buttons (Time Period)
**Web:** Button group

**React Native:**
```typescript
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';

export const PeriodFilter = ({ selected, onSelect }) => {
  return (
    <SegmentedButtons
      value={selected}
      onValueChange={onSelect}
      buttons={[
        { value: '1M', label: '1M' },
        { value: '3M', label: '3M' },
        { value: '6M', label: '6M' },
        { value: '1Y', label: '1Y' },
        { value: 'ALL', label: 'All' },
      ]}
      style={styles.segmented}
    />
  );
};

const styles = StyleSheet.create({
  segmented: {
    marginHorizontal: 16,
    marginVertical: 12,
  },
});
```

## Animation Equivalents

### Web: Framer Motion → React Native: Reanimated

**Web (Framer Motion):**
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  Content
</motion.div>
```

**React Native (Reanimated):**
```tsx
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming 
} from 'react-native-reanimated';

const Component = () => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 300 });
    translateY.value = withTiming(0, { duration: 300 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      {/* Content */}
    </Animated.View>
  );
};
```

## Navigation Equivalents

### Web: Tab State → React Native: Bottom Tab Navigator

**Web:**
```tsx
const [activeTab, setActiveTab] = useState('home');
```

**React Native:**
```tsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

<Tab.Navigator>
  <Tab.Screen name="Home" component={HomeScreen} />
  <Tab.Screen name="Results" component={ResultsScreen} />
</Tab.Navigator>
```

## Form Handling

### Web: React Hook Form → React Native: Formik

**Web (React Hook Form):**
```tsx
const { register, handleSubmit } = useForm();
```

**React Native (Formik):**
```tsx
import { Formik } from 'formik';
import * as Yup from 'yup';

<Formik
  initialValues={{ name: '', email: '' }}
  validationSchema={Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid').required('Required'),
  })}
  onSubmit={(values) => console.log(values)}
>
  {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
    <View>
      <TextInput
        onChangeText={handleChange('name')}
        onBlur={handleBlur('name')}
        value={values.name}
      />
      {errors.name && <Text>{errors.name}</Text>}
      
      <Button onPress={handleSubmit}>Submit</Button>
    </View>
  )}
</Formik>
```

## Modal/Dialog Equivalents

### Web: MUI Dialog → React Native Paper: Dialog

**React Native:**
```tsx
import { Dialog, Portal, Button, Text } from 'react-native-paper';

export const ConfirmDialog = ({ visible, onDismiss, onConfirm, title, message }) => {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <Text>{message}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Cancel</Button>
          <Button onPress={onConfirm}>Confirm</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
```

## Image Handling

### Web: img tag with Unsplash → React Native: Image with FastImage

```tsx
import FastImage from 'react-native-fast-image';

<FastImage
  source={{
    uri: 'https://images.unsplash.com/...',
    priority: FastImage.priority.normal,
  }}
  style={{ width: 200, height: 200 }}
  resizeMode={FastImage.resizeMode.cover}
/>
```

## Icon Libraries

### Web: lucide-react → React Native: react-native-vector-icons

**Web:**
```tsx
import { Heart, Calendar } from 'lucide-react';
```

**React Native:**
```tsx
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

<Icon name="heart" size={24} color="#337e51" />
<Icon name="calendar" size={24} color="#337e51" />
```

## Common Pitfalls to Avoid

1. **Text must be in Text component**: All text in React Native must be wrapped in `<Text>`
2. **No CSS**: Use StyleSheet.create() instead of Tailwind classes
3. **Dimensions**: Use `Dimensions.get('window')` not `100vw`
4. **ScrollView vs FlatList**: Use FlatList for long lists (better performance)
5. **SafeAreaView**: Always wrap content in SafeAreaView for iOS notch
6. **Keyboard**: Use KeyboardAvoidingView for forms
7. **Images**: Must specify width and height explicitly
8. **Touchables**: Use TouchableOpacity/Pressable not onClick
9. **Navigation**: Use react-navigation not state management for screens
10. **Platform-specific code**: Use `Platform.OS === 'ios'` for conditional logic

This mapping should help you translate every component from your web app to React Native! 🎯
