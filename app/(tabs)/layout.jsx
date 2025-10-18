import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, Text } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);

// Import placeholder screen components (replace with actual screens)
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

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  return (
    <NavigationContainer>
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
        <Tab.Screen 
          name="Home" 
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
          }}
        />
        <Tab.Screen 
          name="Freelancers" 
          component={FreelancersScreen}
          options={{
            tabBarLabel: 'Freelancers',
          }}
        />
        <Tab.Screen 
          name="Projects" 
          component={ProjectsScreen}
          options={{
            tabBarLabel: 'Projects',
          }}
        />
        <Tab.Screen 
          name="Payments" 
          component={PaymentsScreen}
          options={{
            tabBarLabel: 'Payments',
          }}
        />
        <Tab.Screen 
          name="Messages" 
          component={MessagesScreen}
          options={{
            tabBarLabel: 'Messages',
          }}
        />
        <Tab.Screen 
          name="Profile" 
          component={ProfileScreen}
          options={{
            tabBarLabel: 'Profile',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}