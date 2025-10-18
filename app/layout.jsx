// app/_layout.jsx
import React from 'react';
import { View, StatusBar } from 'react-native';
import { styled } from 'nativewind';
import { Stack } from 'expo-router';

const StyledView = styled(View);

export default function RootLayout() {
  return (
    <StyledView className="flex-1 bg-gray-50">
      {/* Status Bar Configuration */}
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor="#f9fafb" 
        translucent={false}
      />
      
      {/* Stack Navigator with Consistent Header Styling */}
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f9fafb',
          },
          headerTintColor: '#1f2937',
          headerTitleStyle: {
            fontWeight: '600',
          },
          contentStyle: {
            backgroundColor: '#f9fafb',
          },
        }}
      />
    </StyledView>
  );
}