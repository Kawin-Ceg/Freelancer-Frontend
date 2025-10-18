import React, { useEffect, useState } from 'react';
import { View, Text, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { styled } from 'nativewind';
// eslint-disable-next-line import/no-unresolved
import {store} from '../redux/store';

 // Assuming store.js exists

const StyledView = styled(View);
const StyledText = styled(Text);

// Import your tab screens (placeholder components)
function HomeScreen() {
  return (
    <StyledView className="flex-1 bg-gray-50 justify-center items-center">
      <StyledText className="text-2xl font-bold text-gray-800">Home Screen</StyledText>
      <StyledText className="text-gray-600 mt-2">Welcome to FreelanceHub</StyledText>
    </StyledView>
  );
}

function FreelancersScreen() {
  return (
    <StyledView className="flex-1 bg-gray-50 justify-center items-center">
      <StyledText className="text-2xl font-bold text-gray-800">Freelancers</StyledText>
      <StyledText className="text-gray-600 mt-2">Find talented professionals</StyledText>
    </StyledView>
  );
}

function ProjectsScreen() {
  return (
    <StyledView className="flex-1 bg-gray-50 justify-center items-center">
      <StyledText className="text-2xl font-bold text-gray-800">Projects</StyledText>
      <StyledText className="text-gray-600 mt-2">Browse available projects</StyledText>
    </StyledView>
  );
}

function PaymentsScreen() {
  return (
    <StyledView className="flex-1 bg-gray-50 justify-center items-center">
      <StyledText className="text-2xl font-bold text-gray-800">Payments</StyledText>
      <StyledText className="text-gray-600 mt-2">Manage your finances</StyledText>
    </StyledView>
  );
}

function MessagesScreen() {
  return (
    <StyledView className="flex-1 bg-gray-50 justify-center items-center">
      <StyledText className="text-2xl font-bold text-gray-800">Messages</StyledText>
      <StyledText className="text-gray-600 mt-2">Communicate with clients</StyledText>
    </StyledView>
  );
}

function ProfileScreen() {
  return (
    <StyledView className="flex-1 bg-gray-50 justify-center items-center">
      <StyledText className="text-2xl font-bold text-gray-800">Profile</StyledText>
      <StyledText className="text-gray-600 mt-2">Manage your account</StyledText>
    </StyledView>
  );
}

// Splash Screen Component
function SplashScreen({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2500); // 2.5 seconds

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <StyledView className="flex-1 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 justify-center items-center">
      <StatusBar barStyle="light-content" backgroundColor="#4f46e5" />
      <StyledView className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl items-center border border-white/20">
        <StyledText className="text-5xl font-bold text-white mb-4 text-center">
          FreelanceHub 🚀
        </StyledText>
        <StyledText className="text-xl text-white/90 text-center mb-2">
          Connecting Talent & Opportunity
        </StyledText>
        <StyledText className="text-white/70 text-center mt-4">
          Your freelance journey starts here
        </StyledText>
        
        {/* Loading indicator */}
        <StyledView className="mt-8 w-24 h-1 bg-white/30 rounded-full overflow-hidden">
          <StyledView className="h-full bg-white rounded-full animate-pulse" />
        </StyledView>
      </StyledView>
    </StyledView>
  );
}

// Bottom Tabs Navigator
const Tab = createBottomTabNavigator();

function TabsLayout() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Freelancers') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'Projects') {
            iconName = focused ? 'briefcase' : 'briefcase-outline';
          } else if (route.name === 'Payments') {
            iconName = focused ? 'card' : 'card-outline';
          } else if (route.name === 'Messages') {
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#7c3aed',
        tabBarInactiveTintColor: '#9ca3af',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#f3f4f6',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 3.84,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: 2,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Freelancers" component={FreelancersScreen} />
      <Tab.Screen name="Projects" component={ProjectsScreen} />
      <Tab.Screen name="Payments" component={PaymentsScreen} />
      <Tab.Screen name="Messages" component={MessagesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// Main App Component
export default function App() {
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  const handleSplashFinish = () => {
    setIsSplashVisible(false);
  };

  return (
    <Provider store={store}>
      <StatusBar barStyle="light-content" backgroundColor="#4f46e5" />
      {isSplashVisible ? (
        <SplashScreen onFinish={handleSplashFinish} />
      ) : (
        <NavigationContainer>
          <TabsLayout />
        </NavigationContainer>
      )}
    </Provider>
  );
}